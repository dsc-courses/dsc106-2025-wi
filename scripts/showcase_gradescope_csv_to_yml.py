#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.10"
# dependencies = [
#     "pandas",
#     "pyyaml",
#     "docopt",
# ]
# ///
"""Convert Gradescope CSV to YAML for project showcase.

Usage:
    showcase_gradescope_csv_to_yml.py <csv_file> [--output=<output_file>]

Options:
    -h --help     Show this help message
    --output=<output_file>  Output YAML file path [default: ../_data/projects.yml]
"""
import pandas as pd
import yaml
from urllib.parse import urlparse
import re
from docopt import docopt

# Column names from Gradescope CSV
COL_PERMISSION = 'Question 4.1 Response'
COL_VIDEO_PERMISSION = 'Question 4.2 Response'
COL_PROJECT_URL = 'Question 2 Response'
COL_VIDEO_URL = 'Question 3 Response'
COL_AWARD = 'Award?'
COL_SUBMISSION_ID = 'Submission ID'
COL_STUDENT_NAME = 'Name'


def extract_title_from_url(url):
    # Parse the URL and get the path
    path = urlparse(url).path

    # Split the path and get the last meaningful segment
    segments = [s for s in path.split('/') if s]
    if not segments:
        return None

    # Convert the last segment to a title format
    title = segments[-1].replace('_', ' ').replace('-', ' ')
    title = ' '.join(word.capitalize() for word in title.split())
    return title


def convert_csv_to_yml(csv_path, yml_path):
    # Read the CSV file
    df = pd.read_csv(csv_path)

    # Group by submission ID to combine team members
    grouped_projects = {}

    for _, row in df.iterrows():
        # Skip if no permission given
        if (pd.isna(row[COL_PERMISSION]) or
                'text_file_id' not in str(row[COL_PERMISSION])):
            continue

        submission_id = str(row[COL_SUBMISSION_ID])

        # Use submission ID as key for grouping
        if submission_id not in grouped_projects:
            url = row[COL_PROJECT_URL].strip()
            project = {
                'title': extract_title_from_url(url) or 'Untitled Project',
                'submission_id': submission_id,
                'url': url,
                'team': [],
            }

            # Add video URL if permission given
            if (not pd.isna(row[COL_VIDEO_PERMISSION]) and
                    'i would like my video to be linked' in str(row[COL_VIDEO_PERMISSION]).lower()):
                video_url = row.get(COL_VIDEO_URL)
                if not pd.isna(video_url):
                    project['video'] = video_url.strip()

            # Add award if applicable
            if not pd.isna(row[COL_AWARD]):
                if row[COL_AWARD].lower() == 'yes':
                    project['award'] = 'Best Project Award (top 5%)'
                elif row[COL_AWARD].lower() == 'honorable':
                    project['award'] = 'Honorable Mention Award (top 10%)'

            grouped_projects[submission_id] = project

        # Add team member from Name column
        if not pd.isna(row[COL_STUDENT_NAME]):
            student_name = row[COL_STUDENT_NAME].strip()
            if student_name not in grouped_projects[submission_id]['team']:
                grouped_projects[submission_id]['team'].append(student_name)

    # Convert dictionary to list and write to YAML
    projects = list(grouped_projects.values())

    # Write to YAML file
    with open(yml_path, 'w', encoding='utf-8') as f:
        yaml.dump(projects, f, default_flow_style=False,
                  allow_unicode=True, sort_keys=False)


if __name__ == '__main__':
    args = docopt(__doc__)
    convert_csv_to_yml(args['<csv_file>'], args['--output'])
