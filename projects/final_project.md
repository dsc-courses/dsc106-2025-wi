---
layout: assignment
title: 'Final Project'
parent: '📝 Projects'
released: true
nav_order: 6
---

<!-- prettier-ignore-start -->

# Final Project
{:.no_toc}

## Table of contents
{:.no_toc}

1. TOC
{:toc}

<!-- prettier-ignore-end -->

---

## Overview

The final project will provide hands-on experience designing, implementing, and deploying interactive visualizations. Your project should address a concrete visualization challenge and should propose a novel, creative solution. The final deliverable will take the form of an explorable explanation, deployed as an interactive web page. Project teams should consist of 3-4 people. You may choose to continue with the same teams as Project 3 as well.

In addition to your webpage, you will be responsible for presenting your final results. At the end of the quarter we will have a video showcase for you to share your work.

Prior to diving in, it is helpful to gain a sense of what goes into formulating a successful visualization project and to beware of common pitfalls. We encourage you to read [A Nested Model for Visualization Design and Validation by Tamara Munzner][link].

[link]: http://www.cs.ubc.ca/labs/imager/tr/2009/NestedModel/NestedModel.pdf

## Theme: Explorable Explanations

Your task is to create an Explorable Explanation: an interactive article that explains a complex subject to the reader. The dataset needs to be picked from the same list as Project 2 / Project 3. Focus on creating one or more interactive diagrams interlinked with explanatory text or annotations. We urge you to focus on a highly visual and/or interactive experience, as opposed to expecting a viewer to read large amounts of article text.

Some useful references are:

- [Harry Stevens' simulitis visualizations][link2]
- [Visualizations of the Boston subway system][link3]
- [Explorables Site][link4]
- [Idyll Gallery][link5]
- [Bret Victor][link6]
- [Explorable Explanations][link7]

[link2]: https://www.washingtonpost.com/graphics/2020/world/corona-simulator/
[link3]: https://mbtaviz.github.io/
[link4]: https://explorabl.es/
[link5]: https://idyll-lang.org/gallery
[link6]: http://worrydream.com/
[link7]: http://worrydream.com/ExplorableExplanations/

## Project Milestones

The final project consists of the following milestones:

- **Proposal (Tue 02/25, 11:59pm, Can Use Slip Days)**. Propose your chosen topic, dataset(s), and team members. Complete the registration form (one per team, [Registration Link][link8]). We need the following information in the project proposal:

  - Project Title
  - Dataset
  - Brief writeup of what you intend to do (5-10 lines)
  - 5-6 static visualizations on your dataset

Apart from the team registration form, please also submit the gradescope assignmemt for the proposal.

- **Initial Prototype (Tue 03/04, 11:59pm, Can Use Slip Days)**. Develop an initial prototype of your project and, similar to Project 3, publish it using GitHub pages. This prototype will be used by the course staff to provide feedback on your designs. It is expected that your project will not yet be in a "complete" state; however, by this point you should have the structure of your project laid out, rough prototypes of your main visualization(s) and interactions, and at least basic descriptive text. Each team should submit the URL for their project on Gradescope.

- **Demo Video (Tue 03/11, 11:59pm, Can Use Slip Days)**. You must produce a demo video (not to exceed 2 minutes in length) that introduces and explains your project. Your video can take the form of a narrated demo of your project, and may include additional content as you see fit. More information about preparing the video is available in the project deliverables section.

- **Deliverables (Mon 03/17, 11:59pm)**. Publish your final project web page. You may make final touches to your page after any feedback from our video session. More information about preparing the final deliverables is available in the project deliverables section.

Your video should be posted to YouTube, and a URL to your video must be submitted via Gradescope by Tue 03/11. The links for the complete version of your final project webpage should be submitted on Gradescope by Mon 03/17.

[link8]: https://forms.gle/6XsetkFSGeDYz6NS7

## Project Deliverables

To complete your final project, you must provide two primary deliverables:

- A demonstration video (<= 2 minutes in length) that communicates your project goals and visualizations. YouTube URL due on Gradescope by 11:59pm, Tue 03/11.
- An interactive visualization web page for your chosen topic. Code and website due on Gradescope by 11:59pm, Mon 03/17.

### Online Visualization

Your final project visualizations must be published on GitHub pages. For your visualizations you need to utilize D3.js. Keep your source code (HTML markup, visualization JavaScript code, etc.) in the top-level of your GitHub repo.

### Video Presentation

In addition to your interactive web page, each team must produce a short demonstration video (no longer than 2 minutes!) introducing your project. Your video must communicate the specific topic and goals of your project along with your visualization designs. We expect most videos will use a mixture of static slides and interactive screen capture with overlaid narration. You might consider showing your web page as published on the web. Alternatively, you might create a stripped down version that removes text in favor of spoken narration, bringing more focus and screen space to your visualizations. The initial frame of your video should include your project name and the team members' names.

Be sure that your video communicates how your visualization designs enable a better understanding of your chosen data. Do not simply enumerate the various features you implemented: focus on what viewers can learn from your visualization(s).

Please carefully read the [video production guide][link9] for details on how to design and record your video. Your videos should be in MPEG4 (.mp4, .m4v) format. Use appropriate compression to ensure your video file is not unnecessarily large. You will post videos online, so we encourage you to put your best face forward to the world!

Your demo video must be published on YouTube. In addition you must submit a URL linking to your video via Gradescope by Tue 03/11, 11:59pm. We will have a video showcase during our last lecture session on Fri 03/14.

{: .note}
Please do not enable the option for YouTube Kids while uploading the video as it can't be added to playlists.

[link9]: https://github.com/dsc-courses/dsc106-wi24/raw/gh-pages/resources/reading/Prod_Guide.pdf

## Rubric

### Initial Prototype

- Webpage: 0.5 Point
- GitHub Repo: 0.5 Point
- Visualization: 1 Point
- Writeup: 1 Point

| Component         | Complete                                                                                                                                                                                                                      | Incomplete                                                                                                                 | Missing                                                 |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| **Webpage**       | The submitted URL leads to a web page. (+0.5 point)                                                                                                                                                                           |                                                                                                                            | The URL is missing or leads to a 404 error. (+0 points) |
| **Github Repo**   | The project has a public-facing GitHub repo. (+0.5 point)                                                                                                                                                                     |                                                                                                                            | No GitHub repo available. (+0 points)                   |
| **Visualization** | The page has at least 1 visualization on the screen with at least 1 working interaction. (+1 point)                                                                                                                           | The page has at least one visualization, but the visualization doesn’t have an interaction. (+0.5 point)                   | No visualization is working on the page. (+0 point)     |
| **Writeup**       | The web page writeup contains at least 4 sentences for each of the following questions (≥8 sentences total): 1. What have you done so far? 2. What will be the most challenging of your project to design and why? (+1 point) | The description answered one out of two questions, or didn’t provide at least 4 sentences for each question. (+0.5 points) | The description is missing. (+0 points)                 |

### Demo Video

The assignment is out of 10 points possible. Submissions that squarely meet the project requirements (Satisfactory column) will get 7/10 points.

| Component                            | Excellent                                                                                                                                                                                                                                                                 | Satisfactory                                                                                                                                                                                             | Not Satisfactory                                                                                            |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Video URL and Length**             |                                                                                                                                                                                                                                                                           | The video is uploaded as a public video on YouTube, and its length is 2 minutes or less. (+1 point)                                                                                                      | The submitted video URL is broken, or it goes substantially over 2 minutes. (+0.5 points)                   |
| **Hook**                             |                                                                                                                                                                                                                                                                           | The video opens with a hook – an interesting research question or attention-grabbing statement. (+1 point)                                                                                               | The video doesn’t open with a hook (e.g. it immediately starts describing the visualization). (+0.5 points) |
| **Motivation**                       | The video explains the motivation for your project – why do you think your visualization is better than other explanations? E.g. what does your visualization allow that other explorables don’t? (+2 points)                                                             | The video explains the motivation for your project but doesn’t explain what your project does better than other explanations. (+1 point)                                                                 | The video does not contain motivation for the project. (+0.5 points)                                        |
| **Explanation of the visualization** | The video clearly demonstrates all relevant features of the visualization, including its interactions and design choices. The video explains the most interesting features, surprising features, or most challenging features to implement. (+2.5 points)                 | The video clearly demonstrates all relevant features of the visualization, including its interactions and design choices, but doesn’t mention its most interesting or surprising features. (+1.5 points) | The explanation of the visualization does not sufficiently demonstrate its features. (+0.5 points)          |
| **Takeaways**                        | The video ends with an interesting takeaway and explains why your visualization demonstrates this takeaway effectively. What is the one thing that everyone should learn from your visualization? And why does your visualization succeed at explaining it? (+2.5 points) | The video ends with a takeaway message but the presentation could be improved (e.g. the takeaway isn’t surprising, or focuses too much on the implementation of the visualization). (+1.5 points)        | The video does not end with a takeaway message. (+0.5 points)                                               |
| **Viewing experience**               |                                                                                                                                                                                                                                                                           | The video is easy to view: all images are clearly visible and all text is legible. (+1 point)                                                                                                            | The video is difficult to view (e.g. some images and text are too small to see clearly). (+0.5 points)      |
| **Creativity and Originality**       | The submission exceeds the assignment requirements, with original insights or a particularly engaging presentation. (+1 bonus point)                                                                                                                                      | The submission meets the assignment requirements. (+0 points)                                                                                                                                            |                                                                                                             |

### Final Deliverables

The assignment is out of 15 points possible. Submissions that squarely meet the project requirements (Satisfactory column) will get 12/15 points.

| Component                             | Excellent                                                                                                                                                                     | Satisfactory                                                                                                                                                                                                                                                  | Poor                                                                                                                                                                                                                                                                                    |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Web page URL, video URL, and Repo** |                                                                                                                                                                               | The web page is publicly viewable on GitHub pages, the project video is linked (or embedded) within the web page, and the repository is publicly available. (+1 point)                                                                                        | The submitted web page URL, project video, or repository URL is broken. (+0 points)                                                                                                                                                                                                     |
| **Hook**                              |                                                                                                                                                                               | The project opens with a hook – an interesting research question or attention-grabbing statement. (+1 point)                                                                                                                                                  | The project doesn’t open with a hook (e.g. it immediately shows a visualization without explanation). (+0 points)                                                                                                                                                                       |
| **Storytelling**                      | The project tells a compelling story. It follows the and-but-therefore structure and also incorporates elements of surprise, personalization, or emotion. (+3 points)         | The project tells a story – it follows the and-but-therefore structure. (+2 points)                                                                                                                                                                           | The project does not tell a story (e.g. it doesn’t follow the and-but-therefore structure or something similar). (+1 point)                                                                                                                                                             |
| **Visual Encodings**                  | The project visualizations do not violate the expressiveness criteria and the design choices (marks and encoding channels) are clear, evocative, and effective. (+3 points)   | The project visualizations do not violate the expressiveness criteria, but another set of design choices (marks and encoding channels) could have been more effective (e.g. using the area visual channel instead of position when possible). (+2 points)     | The project visualizations violate the expressiveness criteria (e.g. heavy overplotting, encodings that imply incorrect readings, etc.), and these violations are not addressed using the available interactions (e.g. overplotting that cannot be filtered or zoomed into). (+1 point) |
| **Interaction**                       | The interactive elements of the project are polished, bug-free, and enable the reader to discover interesting patterns in the data or the concept being explored. (+3 points) | The interactive elements of the project are functional and enable the reader to discover interesting patterns, but a static plot (perhaps with a different encoding) could have conveyed the same information just as effectively. (+2 points)                | The plot would have been substantially more effective as a static plot without the interaction; or, the interaction has major bugs that preclude use. (+1 point)                                                                                                                        |
| **Annotations**                       |                                                                                                                                                                               | The visualizations contain helpful annotations (e.g. text, coloring, shading) that draw attention to interesting findings. (+1 point)                                                                                                                         | The visualizations contain no annotations. (+0 points)                                                                                                                                                                                                                                  |
| **Takeaways**                         |                                                                                                                                                                               | The project ends with an interesting takeaway and explains why your visualization demonstrates this takeaway effectively. What is the one thing that everyone should learn from your project? And why does your project succeed at explaining it? (+2 points) | The project is missing a takeaway, or ends with a takeaway message but the presentation could be improved (e.g. the takeaway isn’t surprising, or focuses too much on the implementation of the visualization). (+1 point)                                                              |
| **Viewing experience**                |                                                                                                                                                                               | The project is easy to view: all images are clearly visible and all text is legible on a typical laptop screen size. (+1 point)                                                                                                                               | The project is difficult to view (e.g. some images and text are too small to see clearly). (+0 points)                                                                                                                                                                                  |
| **Creativity and Originality**        | The submission exceeds the assignment requirements, with original insights or a particularly engaging presentation. (+1 bonus point)                                          | The submission meets the assignment requirements. (+0 points)                                                                                                                                                                                                 |

### Project Showcase

The assignment is out of 10 points possible. Presentations that squarely meet the project requirements (Satisfactory column) will get 9/10 points.

| Component                            | Excellent                                                                                                                                                                                                                                                                                   | Satisfactory                                                                                                                                                                                                                                                                                    | Poor                                                                                                                                                                                                                                  |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Hook**                             |                                                                                                                                                                                                                                                                                             | The presentation opens with a hook – an interesting research question or attention-grabbing statement. (+2 point)                                                                                                                                                                               | The presentation doesn’t open with a hook (e.g. it immediately starts describing the visualization). (+1 point)                                                                                                                       |
| **Motivation**                       |                                                                                                                                                                                                                                                                                             | The presentation explains the motivation for your project – why do you think your visualization is better than the status quo? E.g. what does your visualization allow that others don’t? (+2 points)                                                                                           | The presentation explains the motivation for your project but doesn’t explain what your project does better than other past work or potential approaches. (+1 point)                                                                  |
| **Explanation of the visualization** | The presentation clearly demonstrates the most relevant features of the visualization, including its interactions and design choices. The presentation explains the most interesting features, surprising results, or most challenging features to implement. (+2.5 points)                 | The presentation clearly demonstrates the most relevant features of the visualization, including its interactions and design choices, but doesn’t mention its most interesting or surprising features. (+2 points)                                                                              | The presentation of the visualization does not sufficiently demonstrate its features. (+1 point)                                                                                                                                      |
| **Takeaway**                         | The presentation ends with an interesting takeaway and explains why your visualization demonstrates this takeaway effectively. What is the one surprising thing that everyone should learn from your visualization? And why does your visualization succeed at explaining it? (+2.5 points) | The presentation ends with a takeaway message but the presentation could be improved (e.g. the takeaway isn’t surprising, or focuses too much on the implementation of the visualization). (+2 points)                                                                                          | The presentation does not end with a takeaway message. (+1 point)                                                                                                                                                                     |
| **Response to Followups**            |                                                                                                                                                                                                                                                                                             | The presenter has clearly prepared for many kinds of followup questions, responds with information and personal opinions beyond simply what is shown in the visualization, and states speculations when they do not know the answer (e.g. “I’m not sure, but this is my best guess). (+1 point) | The presenter has not clearly prepared for common followup questions, or fails to engage questions that they do not know the answer to (e.g. only stating “I’m not sure.” without deeper engagement with the question). (+0.5 points) |
| **Creativity and Originality**       | The presentation exceeds the assignment requirements, with particularly engaging, clear, and memorable parts. (up to +1 bonus point)                                                                                                                                                        | The presentation meets the assignment requirements.                                                                                                                                                                                                                                             |                                                                                                                                                                                                                                       |
