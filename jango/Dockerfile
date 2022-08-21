FROM python:3.9-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV STATE PROD

RUN mkdir /jango

WORKDIR /jango

RUN pip install --upgrade pip


COPY . .
RUN pip install -r requirements.txt

EXPOSE 8000