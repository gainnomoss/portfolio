### Overview

Investigator Copilot is an AI-powered platform built for the Singapore Police Force. I led the redesign of its Speech-to-Text experience after inheriting an MVP from an external vendor, transforming it into a workflow that better supports live investigations through clearer interactions, real-time note-taking, and AI-assisted review.

> Role
> Sole Product Designer

> Timeline
> Nov 2024 - Present

> Team
> 1 PM
> 5 Engineers

> Platform
> Desktop Web

> Focus
> Speech-to-Text

30 second overview

Users: Investigation Officers

Goal: Review interviews while they are ongoing live

Challenge: Redesign an existing MVP to better support officers during live interviews

My contribution: Redesigned the core transcription workflow from research through implementation

### The Problem

Every investigative interview generates hours of audio that must be reviewed and documented accurately. Traditionally, officers either waited several days for outsourced transcription or attempted to take notes manually during interviews, often dividing their attention between listening and documenting.

An MVP transcription tool had already been developed by an external vendor, but usability testing revealed that it introduced new friction rather than reducing it. Officers struggled to keep up with live transcripts, important interactions were difficult to discover, and the interface lacked support for the way investigations are actually conducted.

- Difficult to review transcripts during live interviews
- Important transcript interactions were easy to miss
- No workspace for capturing investigative observations

### My Role

I was the sole product designer responsible for the Speech-to-Text experience after taking over an MVP delivered by an external vendor. I conducted usability testing, redesigned key workflows, created reusable UI components, and partnered closely with one Product Manager and five engineers through implementation.

### Research & Discovery

#### Understanding investigators' workflow

> I conducted moderated usability testing with investigation officers using the existing MVP to understand how the interface performed during realistic interview scenarios.

#### Three key insights

---

### 1. Officers couldn't confidently distinguish transcript states

!Before

Before

Hover and selection shared similar visual treatments.

Users frequently clicked twice because they couldn't tell whether a transcript had already been marked.

### 2. Live transcription made interaction difficult

The transcript continuously shifted during interviews, forcing users to chase moving content whenever they wanted to bookmark an important statement.

### 3. Investigation isn't just transcription

Officers needed to

- capture observations
- identify admissions
- rename speakers
- summarize interviews

The transcript alone wasn't enough.

## Design Process

I then studied transcription apps, such as Otter, Dovetail, Transcribe to identify common design patterns and layouts to learn from what was already out there.

### Design Principles

Every design decision was guided by three principles.

### 1 Reduce cognitive load

Important states should be immediately distinguishable without requiring users to remember interaction history.

### 2 Support live investigations

Interactions should remain reliable even while transcripts continue updating in real time.

### 3 Keep investigators focused

The interface should reduce context switching by bringing summaries, notes and marked evidence into a single workspace.

I explored with different variations in how the transcript row could be designed - if the bookmark icon should always be displayed, how speaker avatars should be shown, when order the speaker names, timestamps and texts should shown, and how does the different states affect the layouts.

!Transcript iterations.png

### Key Design Decisions:

**01 Clear transcript states**

!Before default, hover and marked states for a transcript row

Before default, hover and marked states for a transcript row

To make the hover and marked states more visually distinct, I explored a few options, including changing the colours used to indicate hover/marked states, and changing the interaction of how a transcript can get marked. One consideration was to make the clickable area of marking a transcript larger, as the current area was determined by the length of the transcript text.

!Hover marked states explorations.png

I eventually decided on a mark button that would appear whenever the user hovered over transcript row, which informs users that they can click on it to mark the text. A persistent bookmark icon in sufficient colour contrast would show if the text was marked, so that it is easily identifiable.

!Hover and marked state - final.png

**02 Side panel instead of modal**

!Viewing marked segments required opened a modal on the original design

Viewing marked segments required opened a modal on the original design

Investigators constantly reference transcripts through the course of the interview, and a modal would block investigators from referring to the current transcripts if they wanted to view any of the transcript segments they bookmarked during the course of the interview.

I considered using an overlay modal because it required minimal layout changes. However, officers frequently referenced transcripts while reviewing marked evidence, forcing them to repeatedly open and close the modal. I instead explored a persistent side panel, accepting slightly narrower transcript columns in exchange for continuous access to both views.

**03 Supporting live note-taking**

To allow officers to record key observations noted during interviews, a note-taking feature was implemented alongside marked transcript texts. This allowed officers to remain on the platform throughout the course of the interview without having to switch between manual notetaking and transcription recording.

!marked segments card states.png

### Design System

There was also a gap in our current workflow as a team.

There was no existing design system or UI library in place. The team had to spend time making decisions for UI components or patterns frequently, and developers also implemented components differently.

I thus worked on a set of reusable components that improved the consistency across the different use cases in this product.

!components array.png

I worked together with developers to agree on a set of components we would delivery first, and based on the developers preference, I took ShadCN as the base set, and adjusted any styling and colour further from there to fit SPF branding.
We also discussed on how we could name our design tokens, and due to time constraints and not needing to cater for dark mode or other brand colours, we decided to use a two layer token naming system.

!design system tokens naming.png

The component set has also been adopted as the default set of components used across all Investigator Copilot use cases.

!other screens.png

As a team, this helped us to make decisions more quickly, and be able to discuss other issues other than UI issues.

### Usability Testing

During a usability testing session conducted with the new designs with 11 participants, it achieved a SUS score of 75.

Users did not report further issues with bookmarking transcripts, and gave feedback that the new improved interface is easier to use.

### Outcome / Impact

The product was launched in April 2026, with officers adopting it for their workflows.

The redesign introduced:

- clearer transcript interactions
- integrated investigative notes
- AI-generated summaries
- improved transcript organisation

The team is still gathering feedback as the product goes live, and working on further enhancements.

### Reflections

**1 Designing begins at the component lev**el

One thing I underestimated was how many interaction states a transcript could have simultaneously. What initially appeared to be a list became a system where playback, editing, marking and scrolling all influenced one another. Designing at the component level before designing screens ultimately reduced complexity and made the interface more scalable.

!Transcription row component.png

**2 Balancing user needs, technical limitations, and stakeholder priorities**

Designing for investigators reinforced that productivity tools are rarely about adding more features—they're about reducing cognitive effort during high-pressure work.

Working within government constraints also taught me the importance of balancing user needs, technical limitations, and stakeholder priorities while still advocating for better user experiences.
