---
layout: page
title: 'Project 3: Interactive Visualization'
parent: '📝 Projects'
---

# Project 3: Interactive Visualization

For this assignment, you will explore the issues involved in implementing interactive visualizations. You will build a visualization that enables interactive exploration of a dataset of your choosing (we do have some suggestions as well which you can find below) and deploy it on the web.

One goal of this assignment is to gain familiarity with implementing interaction techniques for visualizations. For example, the [zipdecode][link] and [NameGrapher][link1] applications apply the interactive technique of dynamic queries – as explored in the earlier [HomeFinder][link2] application – to the problem of uncovering patterns in zip codes and baby names.

Similarly, [treemaps][link3] were originally developed to display hierarchical file structures and were later adapted to the problem of interactively depicting a [map of the stock market][link4]. We have seen many other examples of interactive visualization techniques in class. The goal of this assignment is not only for you to gain hands-on implementation experience, but also for you to think about the effectiveness of the specific techniques for your chosen data domain.

One challenge is to **scope the assignment so that you can finish it within two weeks**. Focus on designing a limited yet compelling visualization that enables interactive exploration along a few critical dimensions. The [NameGrapher][link1] application is a nice example that uses a simple but elegant interaction design to enable engaging explorations. **A tightly focused, well-implemented interactive graphic is much preferred to a sprawling design that attempts too much!**

[link]: http://benfry.com/zipdecode/
[link1]: https://namerology.com/baby-name-grapher/
[link2]: http://www.cs.umd.edu/hcil/spotfire/
[link3]: http://www.cs.umd.edu/hcil/treemap/
[link4]: http://www.bewitched.com/marketmap.html

## Team Registration

For this assignment, you should work in teams of 2-3 students. You might want to find project partners that you will continue to work with for the final project.

As soon as you have formed a team and chosen a dataset, submit the [team registration form][link5]. Your form must include **the names, UCSD email addresses, and PIDs** of each team member, along with a **concise title for your interactive visualization**. The visualization title need not be exact, **just a rough title should be a good start**. If you are looking for project partners, please post to Ed to find classmates with similar interests! **You should submit your team registration by Mon 02/05, 11:55 pm.**

You will submit your interactive prototype as a webpage hosted on [GitHub Pages][link6].

[link5]: https://forms.gle/z2YzKkeZ86MjLqPs9
[link6]: https://pages.github.com/

## Deliverables

Design an interactive graphic aimed at enabling understanding of a compelling question for a dataset of your choosing or you may choose any of the suggested datasets. To determine what subset of the data and which interactive options are most promising, you may want to perform additional exploratory analysis. What aspects of the data reveal the most interesting discoveries or stories? **Do not feel obligated to try to convey everything about the data: focus on a compelling subset.**

Your graphic must include interactions that enable exploration. Possible techniques include panning, zooming, brushing, details-on-demand (e.g., tooltips), dynamic query filters, and selecting different measures to display. You are free to also consider highlights, annotations, or other narrative features intended to draw attention to particular items of interest and provide additional context.

Implement your interactive graphic and deploy it to the web. You may **only use only D3.js** for this project. **Vega-lite/Plotly/Altair/any other high-level plotting library or tool** are **strictly not allowed** for this project. You can use other non-plotting related JavaScript libraries, e.g. Lodash, Svelte, Moment, etc. Your graphic should not require customized server-side support; you should simply load data from a static data file or public web API. Please refer to the Tech Support page for instructions on deploying a GitHub Pages website using Svelte. For deploying websites with other libraries, feel free to explore on your own. Using our template to complete this project is not mandatory.

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

## Submission Details

Submit your [team registration form][link5] by **Mon 02/05, 11:55 PM**.

You must have a working prototype online by **Fri 02/16, 11:59 pm**. Your prototype should be accessible on GitHub pages using a publicly viewable URL.

In addition, **you must submit the URL on Gradescope**. **One submission per team is sufficient**.

Submissions will be reviewed as part of a subsequent peer review assignment (due Fri 02/23), so try to avoid a late submission; assignments submitted late may not be included as part of the peer review and thus not receive peer feedback.

## Rubric

The assignment is out of 10 points possible. Submissions that squarely meet the project requirements (Satisfactory column) will get 9/10 points.

| Component                  | Excellent                                                                                                                                                            | Satisfactory                                                                                                                                                                                                                                                      | Not Satisfactory                                                                                                                                                                                                                                                                   |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Visual Encodings           | The visualization does not violate the expressiveness criteria and the design choices (marks and encoding channels) are clear, evocative, and effective. (+3 points) | The visualization does not violate the expressiveness criteria, but another set of design choices (marks and encoding channels) could have been more effective (e.g. using the area visual channel instead of position when possible). (+2.5 points)              | The visualization violates the expressiveness criteria (e.g. heavy overplotting, encodings that imply incorrect readings, etc.), and these violations are not addressed using the available interactions (e.g. overplotting that cannot be filtered or zoomed into). (+1.5 points) |
| Data Transformations       |                                                                                                                                                                      | The visualization uses appropriate data transformations (e.g. filtering, aggregating) and clearly describes the transformations to the reader (e.g. in the subtitle of the plot). (+1.5 points)                                                                   | The visualization used an inappropriate set of data transformations (e.g. filtering out important outliers), or did not clearly describe these transformations to the reader. (+1 point)                                                                                           |
| Interaction                | The interactive elements of the plot are polished, mostly bug-free, and enable the reader to discover interesting patterns in the data. (+3.5 points)                | The interactive elements of the plot are functional and enable the reader to discover interesting patterns in the data, but a static plot (perhaps with a different encoding) could have conveyed the same information just as effectively. (+3 points)           | The plot would have been substantially more effective as a static plot without the interaction; or, the interaction has major bugs that preclude use. (+2 point)                                                                                                                   |
| Writeup                    |                                                                                                                                                                      | The writeup clearly describes the motivation for the visualization and the rationale for its design decisions (e.g. the visual encodings, data transformations, color palette, etc.). It also contains an overview of the team’s development process. (+2 points) | One or more required elements of the writeup has major issues (e.g. rationale misses important parts of the visualization design) or is missing. (+1 points)                                                                                                                       |
| Creativity and Originality | The submission exceeds the assignment requirements, with original insights or particularly engaging visualizations. (+1 bonus point)                                 | The submission meets the assignment requirements. (+0 points)                                                                                                                                                                                                     |                                                                                                                                                                                                                                                                                    |

## Suggested Data Sources

To help get you started, this assignment, we’ve provided three possible datasets for you to use, although you're welcome to select any dataset you prefer. Note that these datasets are the same as the ones from Project 2. Feel free to reuse the dataset you used in Project 2 to speed up your development process.

### Data on Energy by Our World in Data, 1900-2022

[Our World in Data][link8], a non-profit that gathers and analyzes data about global issues, has published data about energy usage for countries (e.g. coal consumption, hydropower consumption, etc.) around the world since 1900. You can download the data [here][link9].

[link8]: https://ourworldindata.org/
[link9]: https://github.com/owid/energy-data?tab=readme-ov-file#data-on-energy-by-our-world-in-data

### Education Data

Every year, the federal government releases large amounts of data on US schools, districts, and colleges. However, this information is scattered across multiple datasets. Urban Institute’s Education Data Explorer tries to fix this issue by putting together data from various sources such as the National Center for Education Statistics’ Common Core of Data (CCD), the Civil Rights Data Collection (CRDC), the US Department of Education’s EDFacts, and IPUMS’ National Historical Geographic Information System (NHGIS) and makes it available as an API. You can download the data by making an API call using the code available on the [website][link10] or alternatively clicking on the downloads button on the website.

[link10]: https://educationdata.urban.org/documentation/schools.html#overview

### Internet Usage Data

UNdata brings international statistical databases within easy reach of users through a single-entry point. It is maintained by the Development Data Section of the Development Data and Outreach Branch within the Statistics Division of the Department of Economic and Social Affairs (UN DESA) of the UN Secretariat. You can find the internet usage data [here][link11]. Feel free to take a look at some of the other datasets made available by UNdata [here][link12].

This data has the following columns:

- `Region/country Code:` code representing the country or region.
- `Region or Country Name:` Field containing the country name.
- `Year:` Field containing the year at which the data was collected.
- `Value:` Field denoting the Percentage of individuals using the internet.
- `Source:` Field denoting the source of the data.

[link11]: https://github.com/dsc-courses/dsc106-wi24/raw/gh-pages/resources/data/Internet_data.csv
[link12]: https://data.un.org/

Here are some other possible sources to consider. You are also free to use data from a source different from those included here. If you have any questions on whether a dataset is appropriate, please ask the course staff ASAP!

- [City of San Diego open data][link13]
- [U.S. Government Open Datasets][link14]
- [U.S. Census Bureau][link15] - Census Datasets
- [IPUMS.org][link16] - Integrated Census & Survey Data from around the World
- [Federal Elections Commission][link17] - Campaign Finance & Expenditures
- [Federal Aviation Administration][link18] - FAA Data & Research
- NOAA Daily Weather - NOAA Daily Global Historical Climatology Network Data
- [yelp.com/dataset][link19] - Yelp Open Dataset
- [fivethirtyeight.com][link20] - Data and Code behind the Stories and Interactives
- [Buzzfeed News][link21] - Open-source data from BuzzFeed's newsroom

[link13]: https://data.sandiego.gov/
[link14]: data.gov
[link15]: https://www.census.gov/data.html
[link16]: https://www.ipums.org/
[link17]: https://www.fec.gov/data/
[link18]: https://www.faa.gov/data_research/
[link19]: https://www.yelp.com/dataset
[link20]: https://github.com/fivethirtyeight/data/
[link21]: https://github.com/BuzzFeedNews
