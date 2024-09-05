---
layout: page
title: 'Project 2: Deceptive Visualization'
parent: '📝 Projects'
---

# Project 2: Deceptive Visualization

Data visualizations are becoming a key medium for the public to understand news and information. It's crucial to recognize how the design of a visualization can affect what people understand and remember from the data. In this task, you need to pick a dataset you find interesting and create two static visualizations using the same dataset. The first should be a **truthful** representation of the data. The second should be a **deceptive** visualization, designed to deceive the viewer. However, you should avoid clear distortions or leaving out information for this deceptive visualization.

## Assignment

Your objective is to create two static (single image) visualizations of a selected dataset. The first visualization should be designed to clearly and sincerely convey insights from the data. In contrast, the second should be crafted to intentionally mislead the viewer, causing them to make incorrect inferences. Additionally, you are required to write a brief explanation, limited to four paragraphs, outlining your design strategy for both visualizations.

In this task, an earnest visualization is defined as one that:

- Is easily understandable and can be interpreted by the general public.
- Uses visual encodings that are suitable and effective for the desired purpose.
- Clearly and openly describes any transformations made to the data.
- Transparently communicates the source of the data and any possible biases involved.

Conversely, a deceptive visualization typically displays these characteristics:

- The graphical depiction is deliberately unsuitable or deceptive.
- Headings are crafted to influence the viewer's understanding in a biased manner.
- There is intentional manipulation or selective filtering of data to deceive.
- It's not transparent about possible bias present in the data.

For the earnest visualization, your goal is to be as clear and transparent as possible to help viewers answer your intended question. For the deceptive visualization, your goal is to trick the viewer (including the course staff!) into believing that the visualization is legitimate and earnest. **It should not be immediately obvious which visualization is trying to be deceptive.** Subtle ineffective choices in the design should require close and careful reading to be identified.

For the deceptive visualization, misleading strategies are fine but outright lying is not. For example, sketchy, unreliable or untrustworthy input datasets are discouraged, but misleading omission, filtering, or transformation of trustworthy data records is fine. Deliberate lies in the title, axes, labels, or annotations is discouraged, but technically true/relevant but otherwise misleading text in the visualization is fine.

For both visualization designs, start by choosing a question you would like to answer. Design your visualization to answer that question either correctly (for the earnest visualization) or incorrectly (for the deceptive visualization). You may choose to address a different question with each visualization. Be sure to document the question as part of the visualization design (e.g., title, subtitle, or caption) and in your assignment write-up.

Your write-up should contain the following information:

- The specific question each visualization aims to answer.
- A description of your design rationale and important considerations for each visualization.

## Recommended Data Sources

To help get you started, this assignment, we’ve provided three possible datasets for you to use, although you're welcome to select any dataset you prefer. **You must use the same dataset for both visualizations**, but you may transform the data differently, use additional data variables, or choose to address a different question for each design. These datasets are intentionally chosen to cover politically charged topics for the simple reason that these are typically the types of data where deceptive visualizations may proliferate.

### Data on Energy by Our World in Data, 1900-2022

[Our World in Data][link], a non-profit that gathers and analyzes data about global issues, has published data about energy usage for countries (e.g. coal consumption, hydropower consumption, etc.) around the world since 1900. You can download the data [here][link2].

[link]: https://ourworldindata.org/
[link2]: https://github.com/owid/energy-data?tab=readme-ov-file#data-on-energy-by-our-world-in-data

### Education Data

Every year, the federal government releases large amounts of data on US schools, districts, and colleges. However, this information is scattered across multiple datasets. Urban Institute’s Education Data Explorer tries to fix this issue by putting together data from various sources such as the National Center for Education Statistics’ Common Core of Data (CCD), the Civil Rights Data Collection (CRDC), the US Department of Education’s EDFacts, and IPUMS’ National Historical Geographic Information System (NHGIS) and makes it available as an API. You can download the data by making an API call using the code available on the [website][link3] or alternatively clicking on the downloads button on the website.

[link3]: https://educationdata.urban.org/documentation/schools.html#overview

### Internet Usage Data

UNdata brings international statistical databases within easy reach of users through a single-entry point. It is maintained by the Development Data Section of the Development Data and Outreach Branch within the Statistics Division of the Department of Economic and Social Affairs (UN DESA) of the UN Secretariat. You can find the internet usage data [here][link4]. Feel free to take a look at some of the other datasets made available by UNdata [here][link5].

This data has the following columns:

- `Region/country Code:` code representing the country or region.
- `Region or Country Name:` Field containing the country name.
- `Year:` Field containing the year at which the data was collected.
- `Value:` Field denoting the Percentage of individuals using the internet.
- `Source:` Field denoting the source of the data.

[link4]: https://github.com/dsc-courses/dsc106-wi24/raw/gh-pages/resources/data/Internet_data.csv
[link5]: https://data.un.org/

Here are some other possible sources to consider. You are also free to use data from a source different from those included here. If you have any questions on whether a dataset is appropriate, please ask the course staff ASAP!

- [City of San Diego open data][link6]
- [U.S. Government Open Datasets][link7]
- [U.S. Census Bureau][link8] - Census Datasets
- [IPUMS.org][link9] - Integrated Census & Survey Data from around the World
- [Federal Elections Commission][link10] - Campaign Finance & Expenditures
- [Federal Aviation Administration][link11] - FAA Data & Research
- NOAA Daily Weather - NOAA Daily Global Historical Climatology Network Data
- [yelp.com/dataset][link12] - Yelp Open Dataset
- [fivethirtyeight.com][link13] - Data and Code behind the Stories and Interactives
- [Buzzfeed News][link14] - Open-source data from BuzzFeed's newsroom

[link6]: https://data.sandiego.gov/
[link7]: data.gov
[link8]: https://www.census.gov/data.html
[link9]: https://www.ipums.org/
[link10]: https://www.fec.gov/data/
[link11]: https://www.faa.gov/data_research/
[link12]: https://www.yelp.com/dataset
[link13]: https://github.com/fivethirtyeight/data/
[link14]: https://github.com/BuzzFeedNews

## Grading

The assignment score is out of a maximum of 10 points. We will determine scores by judging the soundness of your visualization designs, the duplicity of your deceptive visualization, and the quality of the write-up. Here are examples of aspects that may lead to point deductions:

- Obvious identification of the earnest and deceptive visualizations.
- Ineffective visual encodings for your stated goal.
- Missing indication of the main analysis question.
- Missing or incomplete design rationale in write-up.

We will reward entries that go above and beyond the assignment requirements to produce effective (and deceptive) graphics. Examples may include outstanding visual design, effective annotations and other narrative devices, exceptional creativity, or deceptive designs that require the write-up in order to properly identify the misleading design components.

## Submission Details

This is an individual assignment. **You may not work in groups**. Your completed assignment is due on **Fri 2/2, by 11:59 pm**.

You must submit your assignment using Gradescope. Please upload two image files (PNG, JPG) of your visualization design using the correct file extension, such as **“a2_earnest.png”** and **“a2_deceptive.png”** for PNG image files or **“a2_earnest.jpg”** or **“a2_deceptive.jpg”** for JPEG image files. Please do not include your name or PID in the filename, and be sure your image is sized for a reasonable viewing experience! Viewers should not have to zoom or scroll in order to effectively view your submission.

In addition, submit your write-up to Gradescope as a plain text file, named exactly as **“readme.txt”**, with content that follows the instructions above. Do not include your name or PID in the filename!

Please use the correct file names for your submissions; typos that require manual correction by the course staff may result in point deductions. Do not worry about resubmissions, feel free to resubmit as needed prior to the deadline (if you are using late days to do a resubmission, please notify the course staff). **Remember, the visualization itself should not give away which design is earnest and which is deceptive;** the file names will be randomized by the course staff prior to peer review.