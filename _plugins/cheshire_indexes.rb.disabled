module Jekyll
  # CheshireIndexGenerator
  # Generates index pages for Cheshire journal entries organized by year and month
  class CheshireIndexGenerator < Generator
    safe true

    def generate(site)
      # puts "CheshireIndexGenerator: Starting index generation"
      
      # Only process journal entries from the cheshire collection
      journal_entries = site.collections['cheshire'].docs.select { |doc| doc.data['categories'].include?('journal') }
      # puts "Journal entries found: #{journal_entries.length}"
      
      # If there are no entries, do nothing
      return if journal_entries.empty?
      
      # Create the main journal index page (shows latest entry and recent months)
      site.pages << JournalIndexPage.new(site, journal_entries)
      
      # Organize entries by year, month, and day
      entries_by_year_month = group_entries_by_year_month(journal_entries)

      # Create year and month index pages for archive browsing
      create_year_and_month_pages(site, entries_by_year_month)
      
      # puts "Generated #{entries_by_year_month.size} year indexes and #{entries_by_year_month.values.sum { |m| m.size }} month indexes"
    end
    
    private
    
    # Organizes entries into a nested hash structure: {year => {month => {day => entry}}}
    def group_entries_by_year_month(journal_entries)
      entries_by_year_month = {}
      
      journal_entries.each do |entry|
        date = entry.data['date']
        year = date.year.to_s
        month = date.strftime('%m')
        day = date.strftime('%d')
        
        # Create nested structure as needed
        entries_by_year_month[year] ||= {}
        entries_by_year_month[year][month] ||= {}
        entries_by_year_month[year][month][day] = entry
      end
      
      entries_by_year_month
    end
    
    # Creates year index pages and month index pages based on the organized entries
    def create_year_and_month_pages(site, entries_by_year_month)
      entries_by_year_month.each do |year, months|
        # Prepare data for year index page
        year_data = {
          'year' => year,
          'months' => months.keys.sort.map do |month|
            {
              'number' => month,
              'name' => Date.new(year.to_i, month.to_i, 1).strftime('%B'),
              'entry_count' => months[month].size
            }
          end
        }
        
        # Create year index page
        site.pages << YearIndexPage.new(site, year, year_data)
        
        # Create month index pages for each month in this year
        months.each do |month, days|
          month_data = {
            'year' => year,
            'month' => {
              'number' => month,
              'name' => Date.new(year.to_i, month.to_i, 1).strftime('%B')
            },
            'entries' => format_entries_for_month(year, month, days)
          }
          
          site.pages << MonthIndexPage.new(site, year, month, month_data)
        end
      end
    end
    
    # Formats the entries for a specific month into a format usable by the templates
    def format_entries_for_month(year, month, days)
      days.keys.sort.map do |day|
        entry = days[day]
        date_obj = Date.new(year.to_i, month.to_i, day.to_i)
        {
          'date' => date_obj,
          'day' => day,
          'weekday' => date_obj.strftime('%A'),
          'formatted_day' => Utils.ordinal_day(day.to_i),
          'url' => entry.url
        }
      end
    end
  end
  
  # Utility methods shared across classes
  module Utils
    # Formats a day number with the appropriate ordinal suffix (1st, 2nd, 3rd, etc.)
    def self.ordinal_day(day)
      if (11..13).include?(day % 100)
        "#{day}th"
      else
        case day % 10
        when 1 then "#{day}st"
        when 2 then "#{day}nd"
        when 3 then "#{day}rd"
        else "#{day}th"
        end
      end
    end
    
    # Converts a collection of entries into a standardized format for templates
    def self.format_entries(entries)
      entries.map do |entry|
        date = entry.data['date']
        day = date.day
        {
          'date' => date,
          'day' => day.to_s,
          'weekday' => date.strftime('%A'),
          'formatted_day' => ordinal_day(day),
          'url' => entry.url
        }
      end
    end
  end
  
  # Base class for all index pages
  # Handles common initialization logic for all index page types
  class BaseIndexPage < Page
    def initialize(site, dir, layout_name, title)
      @site = site
      @base = site.source
      @dir = dir
      @name = "index.html"
      
      self.process(@name)
      self.read_yaml(File.join(@base, '_layouts'), layout_name)
      self.data['title'] = title
    end
  end
  
  # Year index page - shows all months containing entries for a specific year
  class YearIndexPage < BaseIndexPage
    def initialize(site, year, year_data)
      super(site, "cheshire/journal/#{year}", 'cheshire_year_index.html', "Cheshire Journal - #{year}")
      self.data['year_data'] = year_data
    end
  end
  
  # Month index page - shows all entries for a specific month
  class MonthIndexPage < BaseIndexPage
    def initialize(site, year, month, month_data)
      super(site, "cheshire/journal/#{year}/#{month}", 'cheshire_month_index.html', 
            "Cheshire Journal - #{month_data['month']['name']} #{year}")
      self.data['month_data'] = month_data
    end
  end

  # Main journal index page - shows latest entry and recent months
  class JournalIndexPage < BaseIndexPage
    def initialize(site, journal_entries)
      super(site, "cheshire/journal", 'cheshire_journal_index.html', "Cheshire Journal - Latest Entry")
      
      # Sort entries by date (newest first)
      sorted_entries = journal_entries.sort_by { |entry| entry.data['date'] }.reverse
      
      # Get the latest entry
      latest_entry = sorted_entries.first
      latest_date = latest_entry.data['date']
      
      # Calculate date ranges for current and previous months
      current_month_start = Date.new(latest_date.year, latest_date.month, 1)
      next_month_start = if latest_date.month == 12
                           Date.new(latest_date.year + 1, 1, 1)
                         else
                           Date.new(latest_date.year, latest_date.month + 1, 1)
                         end
      current_month_end = next_month_start - 1
      
      previous_month_start = current_month_start << 1 # Go back one month
      previous_month_end = current_month_start - 1
      
      # Filter entries by date range
      current_month_entries = filter_entries_by_date_range(sorted_entries, current_month_start, current_month_end)
      previous_month_entries = filter_entries_by_date_range(sorted_entries, previous_month_start, previous_month_end)
      
      # Format entries data for the template
      current_month_formatted = Utils.format_entries(current_month_entries)
      previous_month_formatted = Utils.format_entries(previous_month_entries)
      
      # Prepare data for the template
      self.data['latest_entry'] = {
        'date' => latest_entry.data['date'],
        'url' => latest_entry.url,
        'content' => latest_entry.content
      }
      
      self.data['current_month'] = {
        'name' => current_month_start.strftime('%B'),
        'year' => current_month_start.year.to_s,
        'month_num' => current_month_start.strftime('%m'),
        'entries' => current_month_formatted,
        'has_entries' => !current_month_formatted.empty?
      }
      
      self.data['previous_month'] = {
        'name' => previous_month_start.strftime('%B'),
        'year' => previous_month_start.year.to_s,
        'month_num' => previous_month_start.strftime('%m'),
        'entries' => previous_month_formatted,
        'has_entries' => !previous_month_formatted.empty?
      }
      
      # Get all years for navigation
      years = journal_entries.map { |e| e.data['date'].year.to_s }.uniq.sort.reverse
      self.data['years'] = years
    end
    
    private
    
    # Filters entries that fall within the specified date range
    def filter_entries_by_date_range(entries, start_date, end_date)
      entries.select do |entry|
        entry_date = entry.data['date'].to_date
        entry_date >= start_date && entry_date <= end_date
      end
    end
  end
end