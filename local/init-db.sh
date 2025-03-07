#!/bin/bash
POSTGRES_HOST="0.0.0.0"

function test_postgresql {
  pg_isready -h ${POSTGRES_HOST} -U ${POSTGRES_USER} > /dev/null && \
  echo "Postgres: ok"
}

function create_db {
  db_name=$1

  count=0
  attempts=60

  until ( test_postgresql ); do
    ((count++))

    if [[ ${count} -gt ${attempts} ]]; then
      echo "* Error: Postgres services is not responding"
      exit 1
    fi

    echo "> Waiting for Postgres to connect (attempt: ${count})"
    sleep 1
  done

  createdb ${db_name} -U ${POSTGRES_USER} -h ${POSTGRES_HOST} -p 5432 2> /dev/null

  echo "Database ${db_name}: created"
}

create_db ${POSTGRES_DB}
create_db ${POSTGRES_TEST_DB}
