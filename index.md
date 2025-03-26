---
layout: home
title: 🏠 Home
nav_exclude: false
nav_order: 1
---

# {{ site.tagline }}

{: .mb-2 }
{{ site.description }}
{: .fs-6 .fw-300 }

{{ site.staffersnobio }}

<!-- [Jump to the current week](#week-9-code-sklearn-code-pipelines-generalization-and-cross-validation){: .btn } -->

<!-- [Recordings](https://podcast.ucsd.edu/){: .btn .btn-blue } -->

{: .note }
**March 25, 2025:** The Winter 2025 offering of DSC 106 has
concluded. Please visit our [Final Project Showcase](showcase) page to see our
students' final projects, including our award winners!

{% for module in site.modules %}
{{ module }}
{% endfor %}

<!-- <center>
<iframe src="10-80-enrollment.html" scrolling="no" style="border:none;" seamless="seamless" height="480" width="100%">
</center> -->
