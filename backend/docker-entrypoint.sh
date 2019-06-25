#!/bin/bash

set -e

COMMANDLINE="$@"

function bundle_install () {
  if [ ! -f /usr/local/bundle/.wait ]; then
    echo START: bundle install
    echo "$COMMANDLINE" > /usr/local/bundle/.wait
    bundle install --clean --jobs=4
    rm -f /usr/local/bundle/.wait
    echo END: bundle install
    return 0
  else
    if [ -z "$wait_bundle_install" ]; then
      wait_bundle_install=1
      echo WAITING: bundle install
    fi
  fi
  return 1
}

function yarn_install () {
  if [ ! -f /app/node_modules/.wait ]; then
    echo START: yarn install
    echo "$COMMANDLINE" > /app/node_modules/.wait
    yarn install --silent
    rm -f /app/node_modules/.wait
    echo END: yarn install
    return 0
  else
    if [ -z "$wait_yarn_install" ]; then
      wait_yarn_install=1
      echo WAITING: yarn install
    fi
  fi
  return 1
}

until bundle_install; do
  sleep 1
done

until yarn_install; do
  sleep 1
done

if echo "$@" | grep -q 'bundle exec rails s'; then
  [ -f $APP_PATH/tmp/pids/server.pid ] && rm -v -f $APP_PATH/tmp/pids/server.pid
fi

if echo "$@" | grep -q 'bundle exec rails resque:work'; then
  dockerize -wait tcp://db:5432
  # dockerize -wait tcp://cache:6379
fi

if echo "$@" | grep -q 'bundle exec spring'; then
  dockerize -wait tcp://db:5432
  # dockerize -wait tcp://cache:6379
fi

if echo "$@" | grep -q 'bundle exec guard'; then
  dockerize -wait tcp://db:5432
  # dockerize -wait tcp://cache:6379
fi

echo EXEC: "$@"
exec "$@"
