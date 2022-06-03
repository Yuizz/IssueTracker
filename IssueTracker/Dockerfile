FROM python:3.8

ENV PYTHONUNBUFFERED=1

RUN mkdir /IssueTracker
WORKDIR /IssueTracker

COPY requirements.txt /IssueTracker/

RUN pip install -r requirements.txt

COPY . /IssueTracker/
