# pull official base image
FROM python:3.10.1

# set work directory
WORKDIR /app/back-end

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install dependencies
RUN pip install gunicorn
RUN pip install --upgrade pip
COPY requirements.txt /app/back-end/
RUN pip install -r requirements.txt

# copy project
COPY . /app/back-end/