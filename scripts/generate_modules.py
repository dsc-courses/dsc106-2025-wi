"""Generate week-by-week schedule for website from CSV file.

Use this to convert from the course calendar spreadsheet to modules that work
with the course website template. Only run it on the weeks that haven't
occurred yet, otherwise it'll erase any manual work. Run from the root
directory of this repo, **not** from the scripts folder.

Usage:
    generate_modules.py CSV_FILE

Examples:
    python scripts/generate_modules.py scripts/fa23.csv
"""

import numpy as np
import pandas as pd
from docopt import docopt
from yaml import dump


def generate_modules(csv_file):
    df = (
        pd.read_csv(csv_file)
        .pipe(ffill_weeks)
        .pipe(parse_dates)
        .pipe(melt_into_events)
        .pipe(mark_exams_and_canceled_lectures)
        .pipe(number_events)
    )
    df.pipe(write_into_module_files)


def ffill_weeks(df):
    cols = {"week": df["Week"].ffill(), "week_title": df["Week Title"].ffill()}
    return df.assign(**cols).drop(columns=["Week", "Week Title"])


def parse_dates(df):
    return df.assign(
        date=pd.to_datetime(df["Date"], format="%a %m/%d/%y")
    ).drop(columns=["Date"])


def melt_into_events(df):
    return (
        df.melt(
            id_vars=["week", "date"],
            value_vars=["Lecture", "Discussion", "Lab Due", "Project Due"],
            var_name="event_type",
            value_name="title",
        )
        .dropna(subset=["title"])
        .assign(week=lambda df: df["week"].astype(int))
        .sort_values("date")
        .reset_index(drop=True)
    )


def mark_exams_and_canceled_lectures(
    df, cancelled_prefix="NO ", exam_substring="Exam"
):
    canceled = df["title"].str.startswith(cancelled_prefix)
    exams = (df["event_type"] == "Lecture") & (
        df["title"].str.contains(exam_substring)
    )
    marked_events = (
        df["event_type"].mask(canceled, "Canceled").mask(exams, "Exam")
    )
    return df.assign(event_type=marked_events)


def number_events(df):
    # Number lectures from 1-N, labs from 1-N, projects from 1-N, etc.
    #
    # [1] Labs: Number from 1-N
    # [2] Projects: Extract number from "Project 1 checkpoint", "Project 2", etc.
    # [3] Lectures: Number from 1-N
    # [4] Discussions: Number from 1-N
    # [5] Exams: Don't number
    # [6] Final Project: Mark as "FINAL PROJ"
    # [7] Canceled: Don't number
    df = df.copy()

    # [1] Labs
    labs = df.query('event_type == "Lab Due"')
    lab_numbers = "LAB " + pd.Series(
        np.arange(len(labs)) + 1, labs.index
    ).astype(str)

    # [2] Projects
    regular_projects = (
        df.query('event_type == "Project Due"')["title"]
        .str.extract(r"Project (\d+)")[0]
        .dropna()
    )
    project_numbers = "PROJ " + regular_projects

    # [3] Lectures
    lecs = df.query('event_type == "Lecture"')
    lec_numbers = "LEC " + pd.Series(
        np.arange(len(lecs)) + 1, lecs.index
    ).astype(str)

    # [4] Discussions
    discs = df.query('event_type == "Discussion"')
    disc_numbers = "DISC " + pd.Series(
        np.arange(len(discs)) + 1, discs.index
    ).astype(str)

    # [6] Final Project
    final_proj = df[
        (df["event_type"] == "Project Due")
        & df["title"].str.contains("Final Project")
    ].assign(event_number="FINAL PROJ")["event_number"]

    # [7] Canceled
    canceled = df.query('event_type == "Canceled"')
    canceled_labels = pd.Series(
        ["CANCELED" for _ in np.arange(len(canceled))], canceled.index
    )

    event_numbers = pd.concat(
        [
            lab_numbers,
            project_numbers,
            lec_numbers,
            disc_numbers,
            final_proj,
            canceled_labels,
        ]
    ).rename("event_number")
    return df.join(event_numbers)


def write_into_module_files(
    df,
    css_class_for_event_type={
        "Lab Due": "lab",
        "Project Due": "proj",
        "Lecture": "lecture",
        "Discussion": "disc",
        "Exam": "exam",
        "Canceled": "canceled",
    },
):
    def make_days(events):
        return [
            {
                "name": e.event_number,
                "type": css_class_for_event_type[e.event_type],
                "title": e.title,
            }
            for e in events.itertuples(index=False)
        ]

    def write_week_module_file(week_df):
        week = int(week_df["week"].iloc[0])
        date_events = week_df.groupby("date").apply(
            make_days, include_groups=False
        )
        days = [
            {"date": date.strftime(r"%Y-%m-%d"), "events": events}
            for date, events in date_events.items()
        ]
        week_data = dump(
            {
                "title": f"Week {week}",
                "weekNumber": week,
                "days": days,
            },
            sort_keys=False,
        )
        module_file_path = f"_modules/week-{week:02d}.md"
        with open(module_file_path, "w") as f:
            f.writelines(["---\n", week_data, "---\n"])
        print(f"Wrote: {module_file_path}")

    return df.groupby("week")[
        ["week", "date", "event_type", "title", "event_number"]
    ].apply(write_week_module_file)


if __name__ == "__main__":
    args = docopt(__doc__, version="1.0")
    generate_modules(args["CSV_FILE"])
