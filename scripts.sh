dev-build() {
  docker-compose -f docker-compose.yml -f docker-compose.dev.yml build
}

dev-start-common() {
  docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d backend redis postgres $1
}

dev-start-bot() {
  dev-start-common bot
}

dev-start-ui() {
  dev-start-common frontend
}

dev-down() {
  docker-compose -f docker-compose.yml -f docker-compose.dev.yml down
}

prod-build() {
  docker-compose -f docker-compose.yml -f docker-compose.prod.yml up build
}

prod-start-common() {
  docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d backend redis postgres $1
}

prod-start-bot() {
  prod-start-common bot
}

prod-start-ui() {
  prod-start-common frontend
}

prod-down() {
    docker-compose -f docker-compose.yml -f docker-compose.prod.yml down
}

makeMigration() {
  if [ "$1" = '' ]; then
    echo "You must specify migration name"
    return
  fi

  if [[ "$1" = --help || "$1" = -H ]]; then
    echo "Usage: createMigration migration_name"
    return
  fi

  pushd ./server 1>/dev/null || exit 1
  npx knex migrate:make $1
  popd 1>/dev/null || exit 1
}

runMigrations() {
  source ./server/.env

  pushd ./server 1>/dev/null || exit 1
  POSTGRES_USER=$POSTGRES_USER POSTGRES_DB=$POSTGRES_DB POSTGRES_PASSWORD=$POSTGRES_PASSWORD npx knex migrate:latest
  popd 1>/dev/null || exit 1
}

rollbackMigrations() {
  source ./server/.env

  pushd ./server 1>/dev/null || exit 1
  POSTGRES_USER=$POSTGRES_USER POSTGRES_DB=$POSTGRES_DB POSTGRES_PASSWORD=$POSTGRES_PASSWORD npx knex migrate:rollback
  popd 1>/dev/null || exit 1
}
