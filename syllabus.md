---
layout: page
title: 📖 Syllabus
description: >-
  Course policies and information.
nav_order: 2
---

<!-- prettier-ignore-start -->

# 📖 Syllabus
{:.no_toc}

## Table of contents
{:.no_toc}

1. TOC
{:toc}

<!-- prettier-ignore-end -->

---

[ed]: https://edstem.org/us/join/HzA7pj
[github]: https://github.com/dsc-courses/dsc106-2025-wi
[gradescope]: https://www.gradescope.com/courses/935202

## About 🧐

Data visualization is one of our most powerful cognitive tools to make sense of
large amounts of data. Well-designed visualizations enable us to use visual
processing rather than calculation, allowing to "see" patterns in data. DSC 106
is a project-centered course that covers fundamental principles and techniques
in data visualization. By the end of the course, you will:

- Understand and apply key visualization techniques and theory.
- Design, evaluate, and critique visualization designs.
- Implement interactive data visualizations for the web using D3.js.
- Develop a substantial visualization project.

**New**{: .label .label-green } In this quarter's (and Spring 2025's) offering
of DSC 106, the course will be themed around health data with help from
professor [Benjamin Smarr][ben] from HDSI.

[ben]: https://smarr.ucsd.edu/

**Prerequisites:** DSC 80.

---

## Getting Started 💻

The course website, [dsc106.com](https://dsc106.com), will contain links to all
course content. There are also a few things you'll need to do to get set up.

### Websites

You'll need to make accounts or join the class on the following sites.

- **Ed:** We’ll be using Ed as our course message and discussion board. More
  details are in the [Communication](#communication-) section below. If you
  didn’t already get an invitation to our Ed course, [sign up
  here][ed].

- **Gradescope:** You’ll submit all assignments to [Gradescope][gradescope]. This is where
  all of your grades will live as well. You should have received an email
  invitation for Gradescope.

- **GitHub:** Like in DSC 30 and 80, you'll _access_ all course content
  (lecture slides and assignments) by _pulling_ [our course GitHub repository][github].
  In Project 3 and the Final Project, you will also _push_ to your personal GitHub.

Note that we will not be using Canvas for anything this quarter.

### Development Environment

As soon as you are able to, go follow the steps in [Lab 0](../labs/lab00) to set
up your development environment for the course.

---

## Communication 💬

This quarter, we’ll be using Ed as our course message board. You will be added
to Ed automatically; use the invite link in the section above if you weren't
added.

If you have a question about anything to do with the course — if you’re stuck
on a problem, didn’t understand something from lecture, want clarification on
course logistics, or just have a general question about data science — you can
make a post on Ed. We only ask that if your question includes some or all of an
answer (even if you’re not sure it’s right), please make your post private so
that others cannot see it. You can also post anonymously to other students if
you prefer.

Course staff will regularly check Ed and try to answer any questions that you
have. You’re also encouraged to answer questions asked by other students.
Explaining something is a great way to solidify your understanding of it!

**Please don’t email individual staff members, just make a private or public Ed
post instead.**

---

## Course Components 🍎

### Lectures

Lectures will be held in-person on Wednesdays and Fridays from 11:00-11:50AM and
12:00-12:50PM in Center Hall 109. **Lecture attendance is not strictly required,
but is one option for earning your participation grade (detailed below)**.
Lectures will be podcasted, and lecture slides will be posted before class.

### Discussions

We will be holding discussions as scheduled from 3:00-3:50pm and 4:00-4:50pm in
CENTR 216. **Discussion attendance is not strictly required,
but is one option for earning your participation grade (detailed below)**.
Discussions will be podcasted, and slides will be posted on the course website.

### Participation

Developing expertise in data visualization also means being able to clearly
communicate, critique, and explain data visualizations to others. To develop
this skill, participation in class will count for 8% of your course grade. Each
week of the course will count for 1% of your grade, and the lowest two weeks
will be dropped. There are **3 options** for fulfilling the participation
expectations for a particular week:

1. **Attend both lectures, participate in the lecture exercises, and attend discussion.**
   Participation will be tracked using an online form given during class and discussion.

2. **Share and critique at least 1 interesting data visualization on Ed under
   the Critiques category that hasn't already been shared during
   class, labs, or projects.** To receive credit, the critique needs to have at
   least 3 paragraphs of around 3-4 sentences each. The three paragraphs should:

   1. Summarize the visualization and describe how it connects to a lecture
      concept from the current week or the previous week. If a dataset for the
      visualization is publicly available, provide a link.
   2. Describe the strengths of this particular visualization.
   3. Describe the weaknesses of this particular visualization.

3. **Respond to 2 different visualization critiques from other students on Ed
   under the Critiques category.** To receive credit, each response needs to
   have at least 2 paragraphs of around 3-4 sentences each. The paragraphs
   should:
   1. Explain what parts of the critique you agree and disagree with.
   2. Suggest an improvement for the visualization. You can sketch out your
      improved visualization or write a program to generate it.

⚠️If you choose to fulfill lecture participation through option 2 or 3, you must
make a **public** post on EdStem under the Critiques category. In the title of
your post or response, clearly state that it is being used as an opportunity to
fulfill lecture participation. The deadline for submitting critiques to count
for the corresponding week is **Sunday at 11:59 PM**.

### Labs

There will be **9 lab assignments** due weekly throughout the quarter. Each lab
assignment is designed to be a walkthrough of practical material that you will
use for your projects. Labs are meant to serve as [worked examples][worked examples]: much of the solution code will be given to you as part of the lab. To
receive credit for labs, you will need to complete the lab and then submit your
lab to Gradescope. The check off requirements will be clearly described at the
end of each lab assignment.

[worked examples]: https://tll.mit.edu/teaching-resources/how-people-learn/worked-examples/

Each lab is worth 1% of your final grade, and the lowest lab grade will be
dropped. Labs will be released on Fridays and due on the following **Fridays**
at 11:59PM.

You will access labs by pulling the course GitHub repository.

### Projects

There will be **4 projects** due throughout the quarter. The projects are
open-ended and are the primary focus of the course. **As such, our standards for
grading will be similar to the way portfolio pieces are evaluated for
internship/research lab/job applications --- we expect your best work!** The
first two projects are **solo** projects. For Project 3 and the Final Project,
you may work in groups of either 3 or 4 students.

**Working in Groups**

You will work together on Project 3 and the Final Project in a group of 3-4
students. You will be required to actively contribute to all parts of the
project. You are encouraged to follow the pair programming model, in which you
work on just a single computer and alternate who writes the code and who thinks
about the problems at a high level.

- Only one group member needs to submit the project on Gradescope; this member
  should add the other partner to their submission.
- You and your group members will receive the same score on any submissions you
  make together.
- You can stay in the same group for both Project 3 and the Final Project, but
  you don't have to.

If you are unhappy with your group (e.g., if a group member does not keep
in touch, does not come prepared to work on the assignment, or does not seem to
be engaged in the process), please first address your concerns to your groupmate,
and try to agree on what should be done to make the partnership work well for
both of you. If that approach is not successful, explain the issues to the
instructors, who will work with you and your partner to improve the situation.

**Note that you may not work with partners on lab assignments, however you're
encouraged to discuss all assignments with others at a conceptual level in
office hours and study groups.**

### Final Project Showcase

At the end of the quarter, we will have a Final Project Showcase where you will
present your Final Project work to course staff, faculty in HDSI, and our
industry partners. This showcase will take place during our regularly scheduled
Final Exam slot in the HDSI MPR. We will announce logistical details of this
showcase on Ed. **All DSC 106 students will be required to attend the Final
Project Showcase.**

### Office Hours

To get help on assignments and concepts, course staff will be hosting several
office hours per week. The majority of our office hours are held in-person,
though a few are held remotely – **if you're able to, you're strongly
encouraged to attend in-person**. See the [Calendar](../calendar) tab of the
course website for the most up-to-date schedule and instructions.

### Weekly Schedule

To summarize all of the events and deadlines, refer to this general weekly
schedule (which is subject to change in any given week):

| Monday     | Tuesday                                           | Wednesday | Thursday | Friday                                        |
| ---------- | ------------------------------------------------- | --------- | -------- | --------------------------------------------- |
| NO LECTURE |                                                   | Lecture   |          | Lecture                                       |
|            | <span style='color:red'><b>Project due</b></span> |           |          | <span style='color:red'><b>Lab due</b></span> |

---

## Policies 💯

### Grading

Here is how we'll compute your grade:

| Component           | Weight | Notes                                                                        |
| ------------------- | ------ | ---------------------------------------------------------------------------- |
| Participation       | 8%     | 1% per week, 2 lowest weeks dropped                                          |
| Labs                | 8%     | 1% per lab, 1 lowest lab dropped                                             |
| Project 1           | 10%    |                                                                              |
| Project 2           | 15%    | 10% for submission, 5% for peer review                                       |
| Project 3           | 15%    | 10% for submission, 5% for peer review                                       |
| Project Checkpoints | 4%     | 1% for Project 1 and 2 checkpoints, 2% for Project 3 checkpoint              |
| Final Project       | 40%    | 2% for proposal, 3% prototype, 10% video, 15% final submission, 10% showcase |

### Late Policy, Slip Days, and Drops

All assignments must be submitted by 11:59PM San Diego time on the due date to
be considered on time. You may turn them in as many times as you like before
the deadline, and only the most recent submission will be graded, so it’s a
good habit to submit early and often. If you make a submission after the
deadline, your assignment will be counted as late.

You have **6 "slip days"** to use throughout the quarter. A slip day extends
the deadline of an assignment by 24 hours. The number of slip days you can use
on an assignment depends on the kind of assignment:

- On labs, you may use up to 1 slip day.
- On projects, you may use up to 2 slip days. Projects will not be
  accepted more than 48 hours after the deadline. Note that you will not be
  able to use slip days on the Final Project Deliverables due on Monday,
  March 17, 2025.

Slip days are designed to be a transparent and predictable source of leniency
in deadlines. You can use a slip day if you are too busy to complete an
assignment on its original due date (or if you forgot about it). But slip days
are also meant for things like the internet going down at 11:58 PM just as you
go to submit your assignment. Slip days are meant to be used in exceptional
circumstances, so **you probably should not need to use all 6, but if you have
something going on in your life that is impeding your ability to do your
classwork on time, please reach out to us as soon as possible so we can work
something out**.

**Slip days are applied automatically at the end of the quarter, and you don’t
need to ask in order to use one.** It’s your responsibility to keep track of
how many you have left. If you’ve run out of slip days and submit an assignment
late, that assignment may still be graded, but you will receive a 0 on it when
we calculate grades at the end of the quarter. However, in the event that you
use all 6 days and submit another assignment late, we will allocate your slip
days first to your projects (in chronological order), then to your labs (in
chronological order), and then to other assignments. This is done to prevent
you from receiving a 0 on, say, Project 3, if you've used all of your slip days
on labs up until that point; in such a case, you’d instead receive a 0 on an
earlier lab that isn’t weighted as much in your grade.

### Regrade Requests

If you feel that there in an error in grading, you may submit a regrade request
within **two days** of the grades being released. If you do not submit a
regrade request within two days, your original grade will be final.

To submit a regrade request for a manually graded problem, make the regrade
request directly on Gradescope. Note that part of your grade is clarity, so if
your answer was mostly right but unclear you may still not be eligible for full
credit.

### Incompletes

In the unfortunate circumstance that you become sick, suffer a loss, or
otherwise experience a significant setback that is outside of your control, you
may be eligible for an Incomplete grade, which allows you to complete the rest
of the work at a later time. If you are experiencing challenges due to
circumstances outside your control, please contact me ASAP and we can discuss
the best course of action. Note that an Incomplete does not allow you to re-do
work that has already been completed, only to do work that hasn’t been
completed, so it’s best to reach out right away.

### A note on letter grades

_The following is adapted from [CSE
160](https://courses.cs.washington.edu/courses/cse160/20au/syllabus/index.html#curve)
at the University of Washington._

Grading for this class is not curved in the sense that the average is set at
(say) a B+ and half of the class must receive a grade lower than that. If
everyone does well and shows mastery of the material, everyone can receive an A
(this would be awesome!). If no one does well (this is unlikely), then everyone
can receive a C.

Grading for this class is curved in the sense that we do not have a pre-defined
mapping from project and exam scores to a final GPA. There is no pre-determined
score (e.g., 90% of all possible points) that earns an A or a B or a C or any
other grade. To determine the final grade, we will ask questions like “Did this
student master the material?”. With that said, grades will not be any stricter
than the standard grading scale (where an A+ is a 97+, A is 93+, A- is 90+,
etc). For instance, the threshold for an “A” will never be higher than 93%.

Try your best not to worry about grades, and we’ll reciprocate by being fair.
We’re in this together 😎.

---

## Collaboration Policy and Academic Integrity 🤝

DSC 106 is known for being a rigorous but rewarding course. While you will be
challenged this quarter, we will be offering you plenty of support through
office hours and Ed. Make good use of these resources, and you will be able to
succeed in this course.

There is no excuse for cheating in this course. If you do cheat, we will
enforce the [UCSD Policy on Integrity of
Scholarship](https://senate.ucsd.edu/Operating-Procedures/Senate-Manual/Appendices/2).
This means you will likely fail the course and the Dean of your college will
put you on probation or suspend or dismiss you from UCSD. Students agree that
by taking this course, their assignments may be submitted to third-party
software to help detect plagiarism.

### Why is academic integrity important?

Academic integrity is an issue that is pertinent to all students on campus.
When students act unethically by copying someone’s work, taking an exam for
someone else, plagiarizing, etc., these students are misrepresenting their
academic abilities. This makes it impossible for instructors to give grades
(and for the University to give degrees) that reflect student knowledge. This
devalues the worth of a UCSD degree for all students, making it imperative for
the the campus as a whole to enforce that all members of this community are
honest and ethical. We want your degree to be meaningful and we want you to be
proud to call yourself a graduate of UCSD!

The UCSD Policy on Integrity of Scholarship and this syllabus list some of the
standards by which you are expected to complete your academic work, but your
good ethical judgment (or asking us for advice) is also expected as we cannot
list every behavior that is unethical or not in the spirit of academic
integrity. Ignorance of the rules will not excuse you from any violations.

### What counts as cheating?

In DSC 106, you can read books, surf the web, get inspiration from previous
work or AI tools like ChatGPT, talk to your friends and the DSC 106 staff to
get help understanding the concepts you need to know to complete your
assignments. However, all code must be written by you (or, in the instance of
projects, together with your partner).

The following activities are considered cheating and are not allowed (not an
exhaustive list):

- Using or submitting code acquired from other students (except from your pair
  programming partner during projects), the web, or any other resource not
  officially sanctioned by this course without substantial contributions of your
  own
- Having any other person complete any part of your assignment on your behalf
- Completing an assignment on behalf of someone else
- Providing code to any other student in the course

The following activities are examples of appropriate collaboration and are
allowed (not an exhaustive list):

- **(new) Using AI code generation tools, such as GitHub Copilot and ChatGPT,
  to help write your code**
- Discussing the general approach to solving labs or projects
- Talking about problem-solving strategies or issues you ran into and how you
  solved them
- Discussing the answers to exams with other students who have already taken
  the exam after the exam is complete
- Using code provided in class, by the textbook or any other assigned reading
  or video, with attribution
- Using Google to search for documentation.
- Working together with other students on assignments without copying or
  sharing answers
- Posting a question about your approach to a problem on Ed, without sharing
  your code

### How can I be sure that my actions are NOT considered cheating?

The best way to avoid problems is by using your best judgement and remembering
to act with Honesty, Trust, Fairness, Respect, Responsibility, and Courage.
Here are some suggestions for completing your work:

- Don't look at or discuss the details of another student's code for an
  assignment you are working on, and don't let another student look at your
  code.
- Don't start with someone else's code and make changes to it, or in any way
  share code with other students.
- If you are talking to another student about an assignment, don't take notes,
  and wait an hour afterward before you write any code.

---

## Support 🫂

### Accommodations

From the [Office for Students with Disabilities (OSD)](https://osd.ucsd.edu/):

> OSD works with students with documented disabilities to review documentation
> and determine reasonable accommodations. Disabilities can occur in these
> areas: psychological, psychiatric, learning, attention, chronic health,
> physical, vision, hearing, and acquired brain injuries, and may occur at any
> time during a student’s college career. We encourage you to contact the OSD
> as soon as you become aware of a condition that is disabling so that we can
> work with you.

If you already have accommodations via OSD, please make sure that we receive
your Authorization for Accommodation (AFA) letter by the end of Week 1 so that
we can make arrangements for accommodations. Share your AFA letter with the
instructor and the Data Science OSD Liaison, who can be reached at
dscstudent@ucsd.edu.

### Diversity and Inclusion

We are committed to an inclusive learning environment that respects our
diversity of perspectives, experiences, and identities. Our goal is to create a
diverse and inclusive learning environment where all students feel comfortable
and can thrive. If you have any suggestions as to how we could create a more
inclusive setting, please let us know. We also expect that you, as a student in
this course, will honor and respect your classmates, abiding by the [UCSD
Principles of
Community](https://www.google.com/url?q=https%3A%2F%2Fucsd.edu%2Fabout%2Fprinciples.html&sa=D&sntz=1&usg=AFQjCNE1YPiUyffLg0kI10zLtUQl6iCDmQ).
Please understand that others’ backgrounds, perspectives and experiences may be
different than your own, and help us to build an environment where everyone is
respected and feels comfortable.

### Campus Resources

If there is an issue you feel uncomfortable speaking with us or are searching
for help on a specific concern, there are several campus resources available to
you, including:

- [UCSD Counseling and Psychological Services (CAPS)](https://caps.ucsd.edu/)
- [Hub Basic Needs Center](https://thehub.ucsd.edu/)
- [Office for Students with Disability (OSD)](https://osd.ucsd.edu/)
- [Office for Prevention of Sexual Harrassment and
  Discrimination](https://blink.ucsd.edu/HR/policies/sexual/OPHD.html)

---

## Acknowledgements 🙏

Materials for this course have been adapted from classes taught by **Soohyun Nam
Liao** and **Jared Wilber** at UCSD, **Jeffrey Heer** and **Leilani Battle** at
UW, **Arvind Satyanarayan** at MIT, and **Maneesh Agrawala** and **Michael
Bernstein** at Stanford University. Special thanks to **Lea Verou** at MIT, who
developed the original material for many of the labs used in this course.

The class draws heavily on materials and examples found online, and we try our
best to give credit by linking to the original source. Please contact us if you
find materials where credit is missing or that you would rather have removed.

---
