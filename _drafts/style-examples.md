---
layout: post
title: 'Style Examples: Asides, Blockquotes, and Prompts'
place: Truckee, CA
time: 10:00 AM PDT
---

This post demonstrates the different styling options available for asides, blockquotes, and prompts.

## Asides

Asides are used for links and notes about external sources. They use the `<aside>` HTML tag:

<aside>
This is an aside with a link to <a href="https://example.com">an example website</a>. Asides are perfect for contextual information, links to external resources, or brief explanations that supplement the main content.
</aside>

## Blockquotes

Blockquotes are used for quotations. They use Markdown's `>` syntax:

> This is a blockquote containing a quote from someone. Notice how it uses italic text and a different background color compared to asides. Blockquotes are ideal for highlighting excerpts or quotes from other sources.
>
> You can have multiple paragraphs in a blockquote by putting the `>` at the start of each line.

## Prompts

Prompts are used for examples of AI prompts or commands. They use a blockquote with a `prompt` class:

<blockquote class="prompt">
Write a poem about the changing seasons in exactly four lines, with each line representing a different season. Use vivid imagery that evokes the unique characteristics of each season.
</blockquote>

You can also format code or commands within your prompts:

<blockquote class="prompt">
Analyze the following code and suggest optimizations:
```python
def fibonacci(n):
    if n <= 1:
        return n
    else:
        return fibonacci(n-1) + fibonacci(n-2)
```
</blockquote>

## Combined Example

You can use all these elements together in a single post:

> First, I'll quote something meaningful.

<aside>
Then I'll provide some additional context or a relevant link.
</aside>

<blockquote class="prompt">
Finally, I'll show what prompt I used to generate ideas for this post.
</blockquote>