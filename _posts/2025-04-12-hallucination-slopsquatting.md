---
layout: post
title: "'Slopsquatting' on Hallucinated Package Names"
place: Truckee, CA
time: 6:15 AM

tags: ['ai', 'llm', 'security']
categories: ['links']

image: /assets/images/LIEbraries.png
description: "Practice safe vibecoding, kids."

link: https://www.theregister.com/2025/04/12/ai_code_suggestions_sabotage_supply_chain/
---

From the department of 🤦‍♂️

{% include link.html link="https://www.theregister.com/2025/04/12/ai_code_suggestions_sabotage_supply_chain/" link_text="LLMs can't stop making up software dependencies and sabotaging everything" via="https://bsky.app/profile/daviddlevine.com/post/3lmnllla4vr2q" %}

Apparently LLMs don't just hallucinate package names (and include unnecessary *real* packages), but they hallucinate the *same* non-existent package names, enough that it's possible bad actors could register malicious packages under the made up names.

> As noted by security firm Socket recently, the academic researchers who explored the subject last year found that re-running the same hallucination-triggering prompt ten times resulted in 43 percent of hallucinated packages being repeated every time and 39 percent never reappearing.

This isn't a new concept. "Typosquatting" has long been an issue, registering frequently typo'd domain names for scam sites and phishing attempts.

And I guess it's already happening in the wild...

> "When we investigate, we sometimes find realistic looking READMEs, fake GitHub repos, even sketchy blogs that make the package seem authentic," he said, adding that Socket's security scans will catch these packages because they analyze the way the code works."

This is the icing on the cake:

> "Even worse, when you Google one of these slop-squatted package names, you’ll often get an AI-generated summary from Google itself confidently praising the package, saying it’s useful, stable, well-maintained. But it’s just parroting the package’s own README, no skepticism, no context. To a developer in a rush, it gives a false sense of legitimacy.
>
> "What a world we live in: AI hallucinated packages are validated and rubber-stamped by another AI that is too eager to be helpful."

Just this morning I was using Claude to prototype an AI Agent that uses MCP, and it generated a script with these super useful sounding packages:

```python
# MCP and agent libraries
from mcp.agent import Agent
from mcp.tools import ToolRegistry
from mcp.tools.rss import RssFeedTool
from mcp.tools.github import GitHubTool
from mcp.memory import MemoryStore
from mcp.scheduler import Scheduler
from mcp.llm import LLMClient
```

As an experienced developer I was skeptical that such a convenient collection of tools existed for such a new standard, so I followed up:

<blockquote class="prompt">
This looks great, can you point me to documentation for the mcp libraries?
</blockquote>

And got the response:

<blockquote class="prompt">
I should clarify something important: the MCP (Model Context Protocol) libraries used in my example (mcp.agent, mcp.tools, etc.) are conceptual and don't currently exist as published packages in this exact form. I created a hypothetical implementation based on what an ideal MCP framework might look like.
</blockquote>

Thanks for the clarification, Claude.

So, how would one profit off of malicious mcp libraries? Asking for a friend.