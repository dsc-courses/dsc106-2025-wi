---
layout: page
title: 'Project 1: Expository Visualization'
parent: '📝 Projects'
---

# Project 1: Expository Visualization

An expository article requires the author to investigate an idea, evaluate
evidence, expound on the idea, and set forth an argument concerning that idea
in a clear and concise manner.

In this assignment, you will design an expository visualization to clearly
communicate an idea based on a small data set. In addition, you must provide a
rigorous rationale for your design choices. You should in theory be ready to
explain the contribution of every pixel in the display towards your expository
goals. You are free to use any graphics or charting tool you please - including
Altair, Plotly, Tableau, and pen and paper.

## Data: Climate in Major U.S. Cities

The climate of a place can have a tremendous impact on people's lived
experience, ranging from personal moods to how an entire region defines itself.
Here, you will examine a set of average monthly climate measurements for six
major U.S. cities, roughly covering the edges of the continental United States.

[**The dataset can be downloaded here.**][dataset]

The data has seven columns:

- `city`: The name of the city.
- `lon`: The longitude of the city.
- `lat`: The latitude of the city.
- `month`: The name of a month (Jan, Feb, etc.).
- `monthnum`: The number of a month (1, 2, etc.).
- `sunshine`: The average hours of sunshine observed during that month.
- `rain`: The average inches of rain observed during that month.

The climate data were collected from [https://www.usclimatedata.com/]().

[dataset]: https://github.com/dsc-courses/dsc106-wi24/raw/gh-pages/resources/data/weather.csv

## Task

Your task is to design a single static (i.e., single image) visualization
that you believe effectively communicates an idea about the data, and provide
a short write-up (no more than 4 paragraphs) describing your design. Start
by choosing a question you'd like your visualization to answer. **Design your
visualization to answer that question, and use the question as the title of
your graphic**.

While you must use the data set given, you are free to transform the data as
you see fit. Such transforms may include (but are not limited to) log
transformation, computing percentages or averages, grouping elements into new
categories, or removing unnecessary variables or records. You are also free to
incorporate additional external data. **Your chart image should be
interpretable without needing to reference your write-up**. Do not forget to
include title, axis labels, or legends as needed!

As different visualizations can emphasize different aspects of a data set, your
write-up should document what aspects of the data you are attempting to most
effectively communicate. In short, what story are you trying to tell? Just as
important, also note which aspects of the data might be obscured due to your
visualization design.

Your write-up should provide a rigorous rationale for your design decisions.
Document the visual encodings you used and why they are appropriate for the
data and your specific question. These decisions include the choice of
visualization type, size, color, scale, and other visual elements, as well as
the use of sorting or other data transformations. How do these decisions
facilitate effective communication?

## Grading

The assignment score is out of a maximum of 10 points. The expected median
score on this assignment is an 8.5, which corresponds to an A-. We will
determine scores by judging both the soundness of your design and the quality
of the write-up. We will also look for consideration of audience, message, and
intended task. Here are examples of aspects that may lead to point deductions:

- Use of misleading, unnecessary, or unmotivated graphic elements.
- Missing chart title, axis labels, or data transformation description.
- Missing or incomplete design rationale in write-up.
- Ineffective encodings for your stated goal (e.g., distracting colors,
  improper data transformation).

Your project will get 9/10 points if you fulfill all the requirements in the
project description. You’ll get higher than 9 points if you go above and beyond
the project requirements, up to 10 points. We’ll possibly give even higher than
10 points if the work is truly exceptional (e.g. could be published in a
popular news article). From our perspective, the project description tells you
how to get a passing grade on the project — if you followed the description and
published your work as part of a portfolio, it would be considered good quality
work by an outside reviewer (e.g. a professional data scientist), but probably
wouldn’t be outstanding or memorable. Getting a 9/10 on the project grade
reflects that.

Projects that go "above and beyond" the assignment requirements to produce
effective graphics may include, for example, outstanding visual design,
meaningful incorporation of external data to reveal important trends,
exceptional creativity, or effective annotations and other narrative devices.

## Submission Details

This is an individual assignment. **You may not work in groups.** Your
completed assignment is due on **Fri 1/19, by 11:59pm**.

You must submit your assignment using Gradescope. Please upload a single image
file (PNG, JPG) of your visualization design using the correct file
extension, such as "a1.png" for PNG image files or "a1.jpg" for JPEG image
files. Please do not include your name or PID in the filename, and be sure
your image is sized for a reasonable viewing experience! Viewers should not
have to zoom or scroll in order to effectively view your submission.

In addition, submit your write-up to Gradescope as a plain text file, named
exactly as "readme.txt", with content that follows the instructions above. Do
not include your name or PID in the filename!
