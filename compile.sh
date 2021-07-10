#!/bin/sh
cd ./frontend && yarn relocate && cd ..
docker-compose run --rm issue python manage.py collectstatic --noinput
docker-compose down