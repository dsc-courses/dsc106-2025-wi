---
layout: assignment
title: 'Project 3: Interactive Visualization'
parent: '📝 Projects'
released: true
nav_order: 4
---

# Project 3: Interactive Visualization

For this assignment, you will explore the issues involved in implementing interactive visualizations. You will build a visualization that enables interactive exploration of a health dataset and deploy it on the web.

One goal of this assignment is to gain familiarity with implementing interaction techniques for visualizations. For example, the [zipdecode][link] and [NameGrapher][link1] applications apply the interactive technique of dynamic queries – as explored in the earlier [HomeFinder][link2] application – to the problem of uncovering patterns in zip codes and baby names.

Similarly, [treemaps][link3] were originally developed to display hierarchical file structures and were later adapted to the problem of interactively depicting a [map of the stock market][link4]. We have seen many other examples of interactive visualization techniques in class. The goal of this assignment is not only for you to gain hands-on implementation experience, but also for you to think about the effectiveness of the specific techniques for your chosen data domain.

One challenge is to **scope the assignment so that you can finish it within two weeks**. Focus on designing a limited yet compelling visualization that enables interactive exploration along a few critical dimensions. The [NameGrapher][link1] application is a nice example that uses a simple but elegant interaction design to enable engaging explorations. **A tightly focused, well-implemented interactive graphic is much preferred to a sprawling design that attempts too much!**

[link]: http://benfry.com/zipdecode/
[link1]: https://namerology.com/baby-name-grapher/
[link2]: http://www.cs.umd.edu/hcil/spotfire/
[link3]: http://www.cs.umd.edu/hcil/treemap/
[link4]: http://www.bewitched.com/marketmap.html

## Team Registration

For this assignment, you should work in teams of **3-4 students**. You might want to find project partners that you will continue to work with for the final project.

As soon as you have formed a team and chosen a dataset, submit the [team registration form][link5]. Your form must include **the names, UCSD email addresses, and PIDs** of each team member, along with a **concise title for your interactive visualization**. The visualization title need not be exact, **just a rough title should be a good start**. If you are looking for project partners, please post to Ed to find classmates with similar interests! **You should submit your team registration by Mon 02/10, 11:55 pm.** Please ensure that the team has been finalized before filling the form, and that the details are correct.

You will submit your interactive prototype as a webpage hosted on [GitHub Pages][link6].

[link5]: https://forms.gle/Hbdj233sjR6BVRxY9
[link6]: https://pages.github.com/

## Deliverables

Design an interactive graphic aimed at enabling understanding of a compelling question. You must use one of the health datasets listed below. To determine what subset of the data and which interactive options are most promising, you may want to perform additional exploratory analysis. What aspects of the data reveal the most interesting discoveries or stories? **Do not feel obligated to try to convey everything about the data: focus on a compelling subset.**

Your graphic must include interactions that enable exploration. Possible techniques include panning, zooming, brushing, details-on-demand (e.g., tooltips), dynamic query filters, and selecting different measures to display. You are free to also consider highlights, annotations, or other narrative features intended to draw attention to particular items of interest and provide additional context.

Implement your interactive graphic and deploy it to the web. You may **only use only D3.js** for this project. **Vega-lite/Plotly/Altair/any other high-level plotting library or tool** are **strictly not allowed** for this project. You can use other non-plotting related JavaScript libraries, e.g. Lodash, Svelte, Moment, etc. Your graphic should not require customized server-side support; you should simply load data from a static data file or public web API.

You will use [GitHub pages to host your visualization][link7] from your project repository. **Make sure that you make your repository "Public"**. We recommend keeping everything (development files and website) in your master branch: either serve your website from the root folder or the "/docs" folder. Your repo must also contain the (unobfuscated) source code for your visualization.

Your deployed web page should also include a write-up with the following components:

- A rationale for your design decisions. How did you choose your particular visual encodings and interaction techniques? What alternatives did you consider and how did you arrive at your ultimate choices?

- An overview of your development process. Describe how the work was split among the team members. Include a commentary on the development process, including answers to the following questions: Roughly how much time did you spend developing your application (in people-hours)? What aspects took the most time?

You can either include your write-up on the same page as your visualization or link to a separate file.

[link7]: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

## Grading Criteria

Projects that squarely meet the requirements for the assignment will receive a score of 9/10.

Going beyond the call of duty can net additional points, for example:

- Advanced interaction techniques
- Novel visualization elements
- Effective multi-view coordination
- Thoughtful and elegant graphic design
- Insightful & engaging exploration experience

Point deductions will be made when projects suffer from:

- Errors or broken features
- Ineffective visual encodings
- Confusing interface design or unhelpful interactions
- Lack of exploratory interaction techniques
- Incomplete or insufficient write-up

### Rubric

The assignment is out of 10 points possible. Submissions that squarely meet the project requirements (Satisfactory column) will get 9/10 points.

| Component                  | Excellent                                                                                                                                                            | Satisfactory                                                                                                                                                                                                                                                      | Not Satisfactory                                                                                                                                                                                                                                                                   |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Visual Encodings           | The visualization does not violate the expressiveness criteria and the design choices (marks and encoding channels) are clear, evocative, and effective. (+3 points) | The visualization does not violate the expressiveness criteria, but another set of design choices (marks and encoding channels) could have been more effective (e.g. using the area visual channel instead of position when possible). (+2.5 points)              | The visualization violates the expressiveness criteria (e.g. heavy overplotting, encodings that imply incorrect readings, etc.), and these violations are not addressed using the available interactions (e.g. overplotting that cannot be filtered or zoomed into). (+1.5 points) |
| Data Transformations       |                                                                                                                                                                      | The visualization uses appropriate data transformations (e.g. filtering, aggregating) and clearly describes the transformations to the reader (e.g. in the subtitle of the plot). (+1.5 points)                                                                   | The visualization used an inappropriate set of data transformations (e.g. filtering out important outliers), or did not clearly describe these transformations to the reader. (+1 point)                                                                                           |
| Interaction                | The interactive elements of the plot are polished, mostly bug-free, and enable the reader to discover interesting patterns in the data. (+3.5 points)                | The interactive elements of the plot are functional and enable the reader to discover interesting patterns in the data, but a static plot (perhaps with a different encoding) could have conveyed the same information just as effectively. (+3 points)           | The plot would have been substantially more effective as a static plot without the interaction; or, the interaction has major bugs that preclude use. (+2 point)                                                                                                                   |
| Writeup                    |                                                                                                                                                                      | The writeup clearly describes the motivation for the visualization and the rationale for its design decisions (e.g. the visual encodings, data transformations, color palette, etc.). It also contains an overview of the team’s development process. (+2 points) | One or more required elements of the writeup has major issues (e.g. rationale misses important parts of the visualization design) or is missing. (+1 points)                                                                                                                       |
| Creativity and Originality | The submission exceeds the assignment requirements, with original insights or particularly engaging visualizations. (+1 bonus point)                                 | The submission meets the assignment requirements. (+0 points)                                                                                                                                                                                                     |                                                                                                                                                                                                                                                                                    |

## Submission Details

### Team Registration

Submit your [team registration form][link5] by **Mon 02/10, 11:59 PM**.

### Checkpoint Submission

The submission must be made on gradescope by **Tue 02/11, 11:59 PM**. For this submission, submit an **mp4** video no longer than 2 minutes with the following details:

1. Name of your team and team members
2. Dataset chosen. Explain the aspects of the datasets you plan to use.
3. 5-6 exploratory graphs you have come up with (static/dynamic) that lead you to choose the (below) question.
4. Title of your graph / the question you are aiming to answer.
5. Current progress on the final dynamic graph.

Please ensure that the video has an associated audio/voiceover rather than just text. The video recording does not need to include all members of the team.

{: .note }

**Only submit one video per team**. It is important to add all members of your team to the submission.

### Final Submission

You must have a working prototype online by **Tue 02/18, 11:59 pm**. Your prototype should be accessible on GitHub pages using a publicly viewable URL.

In addition, **you must submit the URL on Gradescope**. **One submission per team is sufficient**.

Submissions will be reviewed as part of a subsequent peer review assignment, so try to avoid a late submission; assignments submitted late may not be included as part of the peer review and thus not receive peer feedback.

## Data Sources

We’ve provided four datasets for you to use. **You must only pick a dataset from the list below**. Note that these datasets are the same as the ones from Project 2. Feel free to reuse the dataset you used in Project 2 to speed up your development process.

All datasets contain time series data relevant to health, but from different cohort (and species), different time scales, and different modalities. Time series analyses in themselves are not critical to exploring the data, but allow for forecasting and windowing of classifier data alongside unsupervised and statistical approaches.

### BIG IDEAs Lab Glycemic Variability and Wearable Device Data v1.0.0

Prof. Jessilynn Dunn at Duke released glucose measurements and wrist-worn multimodal wearable sensor data from high-normoglycemic participants. 2 weeks each to identify spikes and/or hypoglycemic events.

Address: [BIG IDEAs Lab Glycemic Variability and Wearable Device Data][link6]

Generated by the Empatica 4 wearable device paired with a DexCom 6 continuous glucose monitor, 16 people aged 35-65 are represented by 8-10 days each of continuous, multimodal wearable data. This is paired with meal logs and medical histories about metabolic and cardiac conditions. Data is downloadable as .csv files.

[link6]: https://physionet.org/content/big-ideas-glycemic-wearable/1.1.2/

### Physionet

Physionet, an online repository of physiological data sets from many sources, has an Open Datasets section. These contain abstracts and descriptions per project.

Address: [PhysioNet Databases][link7]

The largest of the data sources on this list, provided for those seeking more open exploration. This Database is comprised of dozens of data sets. Open Access data sets can be reached by the “Open databases” link at the top left of the landing page.

[link7]: https://physionet.org/about/database/

### Mouse data

Mouse data covering 2 weeks of minute level activity and core body temperature in males and females. Light is on a 12-on : 12-off controlled square wave so that daily rhythms are aligned. Every 4 days females display “estrus” which is associated with ovulation, and a longer/hotter active period.

Address: [Mouse Data.xlsx][link8] (Note: Use UCSD email ID to access the link.)

Columns are unique IDs (so, e.g., F1 is the same in all tabs). Rows are minutes, in order, across 14 days (there are 1440 minutes in a day). Lights turn on and off every 12 h (mice are nocturnal, so most active when it is dark). Lights Off is t=0, then every 720 it switches. Estrus (the day of ovulation) for all females starts day 2, repeating every 4 days. Activity and body temperature for each individual in each minute are recorded. Data is available as a .xlsx file.

[link8]: https://docs.google.com/spreadsheets/d/1RXL_oUa1IYxnqfCW-9duz3M83wPlki4y/edit?gid=1872476945#gid=1872476945

### Korean Surgery Dataset (Demographics, Clinical, and Waveform of physiology from surgeries): “VitalDB”

Address: [VitalDB][link9]

Korean hospital data (inter-operative, meaning during the operation) from 6,388 individual surgeries. High frequency biosensor data captures biosigns throughout the procedures, and these are paired with outcomes and related medical records. Data are downloadable zipped .csv files.

[link9]: https://vitaldb.net/dataset/
