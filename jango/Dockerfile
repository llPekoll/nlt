FROM python:3.9-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN mkdir /app

WORKDIR /app

RUN pip install --upgrade pip


COPY . .
RUN pip install -r requirements.txt

RUN python manage.py makemigrations
RUN python manage.py migrate


EXPOSE 8000