#!/bin/sh
set -eu

if [ "${SKIP_DB_SETUP:-false}" != "true" ]; then
  /app/node_modules/.bin/prisma db push --skip-generate
fi

exec node /app/server.js
