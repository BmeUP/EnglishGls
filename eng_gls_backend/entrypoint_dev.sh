#!/bin/sh
until ./manage.py migrate
do
    echo "Waiting for db to be ready..."
    sleep 2
done

DEBUG=True ./manage.py runserver 0.0.0.0:8000