var loadingData = {};
var calcDataURL = "https://docs.google.com/spreadsheets/d/1z46zEJD7NCM6sEyILnlPr9IcpUyn4I3Nio121Duf41Q/gviz/tq";

// Objects to hold raw data from datasource
var baseSalaries = [];
var retentionSupplements = [];
var eduLevels = [];
var positions = [];
var certificationStipend = 0;
var specialAssignments = [];
var paidBenefits = [];

// Load google API to query gDocs
google.charts.load('current', {callback: initSalaryCalc});

// Fetch initial data from google sheets.
function initSalaryCalc() {

  // Education level data.
  loadingData.educationData = true;
  var salaryQuery = new google.visualization.Query(calcDataURL + '?gid=404946052');
  salaryQuery.setQuery('select A, B');
  salaryQuery.send(function(response) {handleQueryResponse(response, loadEducationLevels)});

  // Salary schedule data.
  loadingData.salaryData = true;
  var salaryQuery = new google.visualization.Query(calcDataURL + '?gid=1883612601');
  salaryQuery.setQuery('select A, B');
  salaryQuery.send(function(response) {handleQueryResponse(response, loadSalaryData)});

  // Retention Supplement data.
  loadingData.retentionData = true;
  var retentionQuery = new google.visualization.Query(calcDataURL + '?gid=1887651803');
  retentionQuery.setQuery('select A, B');
  retentionQuery.send(function(response) {handleQueryResponse(response, loadRetentionData)});

  // Teaching positions + stipends.
  loadingData.positionData = true;
  var positionQuery = new google.visualization.Query(calcDataURL + '?gid=1123752341');
  positionQuery.setQuery('select A, B, C, D, E');
  positionQuery.send(function(response) {handleQueryResponse(response, loadPositionData)});

  // Board certification.
  loadingData.certificationData = true;
  var certificationQuery = new google.visualization.Query(calcDataURL + '?gid=585349983');
  certificationQuery.setQuery('select A');
  certificationQuery.send(function(response) {handleQueryResponse(response, loadCertificationData)});

  // Special assignemnts
  loadingData.assignmentsData = true;
  var assignmentsQuery = new google.visualization.Query(calcDataURL + '?gid=1861703994');
  assignmentsQuery.setQuery('select A, B, C, D');
  assignmentsQuery.send(function(response) {handleQueryResponse(response, loadAssignmentsData)});

  // Paid Benefits
  loadingData.paidBenefits = true;
  var benefitsQuery = new google.visualization.Query(calcDataURL + '?gid=436419350');
  benefitsQuery.setQuery('select A, B');
  benefitsQuery.send(function(response) {handleQueryResponse(response, loadBenefitsData)});

  addListeners();
}

function handleQueryResponse(response, next) {
  if (response.isError()) {
    // console.log('Error querying datasource: ' + response.getMessage() + ' ' + response.getDetailedMessage());
    return;
  }

  var data = response.getDataTable();
  var jsonData = JSON.parse(data.toJSON());

  if (next) {
    next(jsonData);
  } else {
    // console.log("Nothing else to do? Here's the data you requested: " + jsonData);
  }
}

function loadEducationLevels(data) {
  data.rows.forEach(function(eduRow, index){
    eduLevels.push({label: eduRow.c[0].v, stipend: eduRow.c[1].v});

    document.getElementById('salaryFormEducationLevel').appendChild(new Option(eduLevels[index].label, index));
  });

  console.log(eduLevels);
  delete loadingData.educationData;
}

function loadSalaryData(data) {
  // Format the annual salary data to be used in the total calculation.
  data.rows.forEach(function(year, index){
    baseSalaries[year.c[0].v] = year.c[1].v;
  });

  console.log(baseSalaries);
  delete loadingData.salaryData;
}

function loadRetentionData(data) {
  // Format the retention supplement data to be used in the total calculation.
  data.rows.forEach(function(year, index){
    retentionSupplements[year.c[0].v] = year.c[1].v;
  });

  console.log(retentionSupplements);
  delete loadingData.retentionData;
}

function loadCertificationData(data) {
  console.log(data);
  certificationStipend = data.rows[0].c[0].v;

  console.log(certificationStipend);
  delete loadingData.certificationData;
}

function loadPositionData(data) {
  // console.log(data);
  var schoolTypes = [];

  data.rows.forEach(function(positionRow, index){
    // Pull out the school types and format them nicely.
    schoolTypes = [];
    positionRow.c.slice(2).forEach(function(schoolType){
      if (schoolType && schoolType.v) {
        schoolTypes.push(schoolType.v);

        // go ahead and set up the school type select for the first
        // option in the positions select.
        if (index === 0) {
          document.getElementById('salaryFormSchoolType').appendChild(new Option(schoolType.v, encodeURIComponent(schoolType.v)));
        }
      }
    });

    positions.push({label: positionRow.c[0].v, stipend: positionRow.c[1].v, schools: schoolTypes});

    // Add this position to the pisitions dropdown.
    document.getElementById('salaryFormDesiredPosition').appendChild(new Option(positions[index].label, index));
  });

  console.log(positions);
  delete loadingData.positionData;
}

function loadAssignmentsData(data) {
  // console.log(data);
  var additionalWorkContainer = document.getElementById('salaryFormAdditionalWork');

  data.rows.forEach(function(specialAssignment, index){
    specialAssignments.push({schoolType: specialAssignment.c[0].v, category: specialAssignment.c[1].v, label: specialAssignment.c[2].v, stipend: specialAssignment.c[3].v});

    var checkboxRow = document.createElement('div');
    checkboxRow.id = "special-assignment-" + index + "-row";
    checkboxRow.classList.add(encodeURIComponent(specialAssignments[index].schoolType));

    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.name = specialAssignments[index].label;
    checkbox.value = index;
    checkbox.classList.add("salary-form-item");
    checkbox.classList.add("additional-work-item");
    checkbox.id = "special-assignment-" + index;

    var label = document.createElement('label');
    label.htmlFor = "special-assignment-" + index;
    label.classList.add("checkbox-label");
    label.appendChild(document.createTextNode(specialAssignments[index].label));

    checkboxRow.appendChild(checkbox);
    checkboxRow.appendChild(label);
    additionalWorkContainer.appendChild(checkboxRow);
  });

  delete loadingData.assignmentsData;
}

function loadBenefitsData(data) {
  // console.log(data);
  data.rows.forEach(function(benefit, index){
    paidBenefits.push({label: benefit.c[0].v, value: benefit.c[1].v});
  });

  console.log(paidBenefits);
  delete loadingData.paidBenefits;
}

function addListeners() {
  // Make sure we're not still loading data.
  if (Object.keys(loadingData).length) {
    console.log("Form data is still loading, delaying listeners.");
    setTimeout(addListeners, 1000);
    return;
  }

  // Add event listeners on all of the form elements.
  var form = document.getElementById('salaryForm');
  var inputs = form.getElementsByClassName('salary-form-item');
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].onchange = calculateSalary;
  }

  // Add listener to the school type select to filter special assignments.
  document.getElementById('salaryFormSchoolType').onchange = filterSpecialAssignments;

  // Go ahead and do the initial filtering of special assignments
  // without recalculating the salary data.
  filterSpecialAssignments(false);
}

function filterSpecialAssignments(recalculate) {
  recalculate = typeof recalculate !== 'undefined' ? recalculate : true;

  var schoolType = document.getElementById('salaryFormSchoolType').value;
  var specialAssignments = document.getElementById('salaryFormAdditionalWork').children;

  for (var i = 0; i < specialAssignments.length; i++) {
    if (specialAssignments[i].classList.contains(schoolType)) {
      specialAssignments[i].classList.remove('hidden');
    } else {
      specialAssignments[i].classList.add('hidden');
    }
  }
  if (recalculate) {
    // Delay a little to give things time to settle.
    setTimeout(calculateSalary, 10);
  }
}

function calculateSalary() {
  // Total compensation components:
  var baseSalary;
  var experienceCredit;
  var retirementCredit;
  var positionStipend;
  var certStipend;
  var specialAssignmentsStipend;
  var totalComp;

  // Start from 0.
  totalComp = 0;
  console.log("Starting with " + totalComp + " totalComp.");

  // Pull data from the form.
  var eduLevel = Number(document.getElementById('salaryFormEducationLevel').value); // Education level
  var yearsTeaching = Number(document.getElementById('salaryFormYearsTeaching').value) || 0; // Years teaching
  var desiredPosition = Number(document.getElementById('salaryFormDesiredPosition').value);
  var previousEmployment = document.getElementById('salaryFormPreviousEmployment').checked;
  var yearsPreviousEmployment = Number(document.getElementById('salaryFormYearsPreviousEmployment').value) || 0;
  var boardCertified = document.getElementById('salaryFormBoardCertified').checked;
  var certificationYear = Number(document.getElementById('salaryFormCertificationYear').value);
  var additionalWorkOptions = document.getElementById('salaryFormAdditionalWork').getElementsByClassName('additional-work-item');

  // Additional work needs a bit more work to pull out the selected items
  var additionalWork = [];
  for (var i = 0; i < additionalWorkOptions.length; i++) {
    if (additionalWorkOptions[i].checked && !additionalWorkOptions[i].parentNode.classList.contains('hidden')) {
      additionalWork.push(specialAssignments[additionalWorkOptions[i].value]);
    }
  }

  // Everything stays the same if years teaching entered is over the max year from the spreadsheet.
  if (yearsTeaching > baseSalaries.length - 1) {
    yearsTeaching = baseSalaries.length - 1;
  }

  // Same with previous employment.
  if (yearsPreviousEmployment > retentionSupplements.length - 1) {
    yearsPreviousEmployment = retentionSupplements.length - 1;
  }

  if (previousEmployment) {
    // Show the previous employme years input, if it's not already visible.
    showElement('salaryFormYearsPreviousEmploymentContainer', 'fadeIn');
  } else {
    yearsPreviousEmployment = 0;
    hideElement('salaryFormYearsPreviousEmploymentContainer', 'fadeOut');
  }

  // Add previous employme service to years teaching.
  var yearsExperience = yearsTeaching;

  console.log("eduLevel: " + eduLevel);
  console.log("yearsTeaching: " + yearsTeaching);
  console.log("desiredPosition: " + desiredPosition);
  console.log("previousEmployment: " + previousEmployment);
  console.log("yearsPreviousEmployment: " + yearsPreviousEmployment);
  console.log("boardCertified: " + boardCertified);
  console.log("certificationYear: " + certificationYear);
  console.log("additionalWork: " + additionalWork);
  console.log("yearsExperience: " + yearsExperience);

  // Look up the base salary using education level and years teaching.
  baseSalary = baseSalaries[yearsExperience];

  // Is there a retention supplement?
  if (retentionSupplements[yearsPreviousEmployment]) {
    console.log()
    baseSalary += retentionSupplements[yearsPreviousEmployment];
  }

  totalComp += baseSalary;
  document.getElementById('salaryFormBase').innerHTML = baseSalary.formatMoney(2);
  showElement('salaryFormBaseContainer', 'fadeInLeft');
  console.log("Base salary: " + baseSalary + " | totalComp is now: " + totalComp);

  // Is there a teaching experience credit?
  // if (baseSalaries[yearsExperience][10].v) {
  //   experienceCredit = baseSalaries[yearsExperience][10].v;
  //   totalComp += experienceCredit;
  //   document.getElementById('salaryFormExperienceCredit').innerHTML = experienceCredit.formatMoney(2);
  //   showElement('salaryFormExperienceCreditContainer', 'fadeInLeft');
  //   // console.log("Teaching experience credit: " + experienceCredit + " | totalComp is now: " + totalComp);
  // } else {
  //   experienceCredit = 0;
  //   document.getElementById('salaryFormExperienceCredit').innerHTML = experienceCredit.formatMoney(2);
  //   hideElement('salaryFormExperienceCreditContainer', 'fadeOutLeft');
  // }

  // Retirement credit?
  // if (baseSalaries[yearsExperience][11].v) {
  //   retirementCredit = baseSalaries[yearsExperience][11].v;
  //   totalComp += retirementCredit;
  //   document.getElementById('salaryFormRetirementCredit').innerHTML = retirementCredit.formatMoney(2);
  //   showElement('salaryFormRetirementCreditContainer', 'fadeInLeft');
  //   // console.log("State-paid retirement credit: " + retirementCredit + " | totalComp is now: " + totalComp);
  // } else {
  //   retirementCredit = 0;
  //   document.getElementById('salaryFormRetirementCredit').innerHTML = retirementCredit.formatMoney(2);
  //   hideElement('salaryFormRetirementCreditContainer', 'fadeOutLeft');
  // }

  // National board certification?
  if (boardCertified) {
    // Show the certification year input, if it's not already visible.
    // showElement('salaryFormCertificationYearContainer', 'fadeIn');
    certStipend = certificationStipend;

    totalComp += certStipend;
    document.getElementById('salaryFormCertificationStipend').innerHTML = certStipend.formatMoney(2);
    showElement('salaryFormCertificationStipendContainer', 'fadeInLeft');
  } else {
    certStipend = 0;
    hideElement('salaryFormCertificationStipendContainer', 'fadeOutLeft');
    // hideElement('salaryFormCertificationYearContainer', 'fadeOut');
  }

  // Is there a stipend for the desired position?
  if (positions[desiredPosition].stipend) {
    positionStipend = positions[desiredPosition].stipend;

    // Is the stipend a % of base?
    if (positionStipend < 1) {
      positionStipend = (baseSalary + experienceCredit) * positionStipend;
    }

    totalComp += positionStipend;
    document.getElementById('salaryFormPositionStipend').innerHTML = positionStipend.formatMoney(2);
    showElement('salaryFormPositionStipendContainer', 'fadeInLeft');
    // console.log("Desired position stipend: " + positionStipend + " | totalComp is now: " + totalComp);
  } else {
    positionStipend = 0;
    document.getElementById('salaryFormPositionStipend').innerHTML = positionStipend.formatMoney(2);
    hideElement('salaryFormPositionStipendContainer', 'fadeOutLeft');
  }

  // Update the school type selector, in case the position changed.
  var schoolTypeSelect = document.getElementById('salaryFormSchoolType');
  var existingSchoolTypes = [];
  var changed = false;

  // First remove any options in the select that we don't need for this position.
  for (var i = 0; i < schoolTypeSelect.length; i++) {
    if (positions[desiredPosition].schools.indexOf(decodeURIComponent(schoolTypeSelect[i].value)) === -1) {
      schoolTypeSelect.remove(i);
      changed = true;
      i--;
    } else {
      existingSchoolTypes.push(schoolTypeSelect[i].value);
    }
  }

  // Now add back any school types that are missing from the select.
  positions[desiredPosition].schools.forEach(function(schoolType, index){
    if (existingSchoolTypes.indexOf(encodeURIComponent(schoolType)) === -1) {
      schoolTypeSelect.add(new Option(schoolType, encodeURIComponent(schoolType)), index);
      changed = true;
    }
  });

  // Hide the school type select if there is only one school type.
  if (positions[desiredPosition].schools.length === 1) {
    hideElement('salaryFormSchoolTypeContainer', 'fadeOut');
  } else {
    showElement('salaryFormSchoolTypeContainer', 'fadeIn');
  }

  // Filter the special assignments in case the school type changed.
  if (changed) {
    filterSpecialAssignments();
  }

  // Additional work?
  specialAssignmentsStipend = 0; // We need to reset this every time.
  if (additionalWork.length) {
    additionalWork.forEach(function(additionalPosition, index){
      specialAssignmentsStipend += additionalPosition.stipend;
    });
    totalComp += specialAssignmentsStipend;
    document.getElementById('salaryFormSpecialAssignmentsStipend').innerHTML = specialAssignmentsStipend.formatMoney(2);
    showElement('salaryFormSpecialAssignmentsStipendContainer', 'fadeInLeft');
    // console.log("Special assignemnts stipend: " + specialAssignmentsStipend + " | totalComp is now: " + totalComp);
  } else {
    document.getElementById('salaryFormSpecialAssignmentsStipend').innerHTML = specialAssignmentsStipend.formatMoney(2);
    hideElement('salaryFormSpecialAssignmentsStipendContainer', 'fadeOutLeft');
  }

  // Paid benefits
  var benefitValue = 0;
  paidBenefits.forEach(function(benefit, index){
    // console.log(benefit);
    benefitValue = benefit.value;

    // Is the benefit value a % of base?
    if (benefitValue < 1) {
      benefitValue = (baseSalary + experienceCredit) * benefitValue;
    }

    totalComp += benefitValue;

    var BenefitRowId = "salaryForm" + benefit.label.replace(/\s+/g, '');
    var benefitRow = document.getElementById(BenefitRowId);

    if (!benefitRow) {
      benefitRow = document.createElement('tr');
      benefitRow.classList.add("hidden");
      benefitRow.id = BenefitRowId;
      document.getElementById('salaryFormBenefitsTable').appendChild(benefitRow);
    }

    benefitRow.innerHTML = "<td>" + benefit.label + ":</td><td>$" + benefitValue.formatMoney(2) + "</td>";
    showElement(BenefitRowId, 'fadeInLeft');

    // console.log(benefit.label + ": " + benefitValue + " | totalComp is now: " + totalComp);
  });

  document.getElementById('salaryFormTotalComp').innerHTML = totalComp.formatMoney(2);
  showElement('salaryFormResults', 'fadeIn');
  // console.log("Total compensation: " + totalComp);

  // Delay a bit, then pin the results inside their container.
  if (!$('#salaryFormResults').hasClass('pinned')) {
    setTimeout(function(){
      $('#salaryFormResults').addClass('pinned');
      $('#salaryFormResults').pin({
        minWidth: 1220
      });
    }, 2000);
  }
}

// Helper functions to hide and show elements with animation.
// These need jQuery, pure js was conflicting with something
// being included by finalsite (possibly jquery itself)

function showElement(elementId, animation) {
  var element = $('#'+elementId);
  if (element.hasClass('hidden')) {
    console.log("Showing element " + elementId);
    element.addClass('animated');
    element.addClass(animation);
    element.removeClass('hidden');
    element.one(animationEnd, function(){
      console.log("Finished animating " + elementId);
      element.removeClass(animation);
    });
  }
}

function hideElement(elementId, animation) {
  var element = $('#'+elementId);
  if (!element.hasClass('hidden')) {
    console.log("Hiding element " + elementId);
    element.addClass('animated');
    element.addClass(animation);
    element.one(animationEnd, function(){
      console.log("Finished animating" + elementId);
      element.addClass('hidden');
      element.removeClass(animation);
    });
  }
}

// Helper function to determine appropriate animationEnd
var animationEnd = (function(el) {
  var animations = {
    animation: 'animationend',
    OAnimation: 'oAnimationEnd',
    MozAnimation: 'mozAnimationEnd',
    WebkitAnimation: 'webkitAnimationEnd',
  };

  for (var t in animations) {
    if (el.style[t] !== undefined) {
      return animations[t];
    }
  }
})(document.createElement('div'));

// Helper function for formatting money.
Number.prototype.formatMoney = function(c, d, t){
    var n = this,
    c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d == undefined ? "." : d,
    t = t == undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };
