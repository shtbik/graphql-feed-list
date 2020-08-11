## Demo

PROD - https://client-feed-list-prod.herokuapp.com/ (EU)
DEV - https://client-feed-list-dev.herokuapp.com/ (US)

test@test.ru | 123456

## UI

![Example of WebSocket](https://i.imgur.com/c1I4wqn.gif)

![Example of Interface](https://imgur.com/BS7bMQF.png)

## Start Project

1. yarn install
2. cd ./server && yarn install
3. yarn start
4. yarn start:server
5. localhost:3000 - client
6. localhost:4000 - server

## Deploy Client to Heroku

1. yarn deploy:{env}

https://medium.com/@agavitalis/how-to-deploy-a-simple-static-html-website-on-heroku-492697238e48

## Deploy Schema to Prisma

1. cd ./server
2. prisma:deploy:{env}

## Deploy Server to Heroku

1. cd ./server
2. yarn prisma generate (isn't require)
3. git subtree push --prefix server heroku master
4. https://graphql-feed-list.herokuapp.com/

https://medium.com/@shalandy/deploy-git-subdirectory-to-heroku-ea05e95fce1f

## About Prisma

For start both schemas at single playground at the moment you should:

1. cd ./server
2. yarn start - local queries/mutations
3. yarn start:plgr - include prisma queries/mutations

https://www.prisma.io/docs/1.13/tutorials/build-graphql-servers/development/build-a-graphql-server-from-scratch-nahgaghei6#generating-the-prisma-database-schema

## TODO

- move to monorepo for client and server sides
- refactoring build commands
- fix bugs with search after implementation of infinity loader
- change schemes format
- add upvoting feature
- add personal page with list of contents
- add new fields (title, source, author, etc.) to feed model
