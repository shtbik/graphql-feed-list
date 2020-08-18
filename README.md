## Demo

DEV - https://client-feed-list-dev.herokuapp.com/ (US)
PROD - https://client-feed-list-prod.herokuapp.com/ (EU)

test@test.ru | 123456

## UI

![Example of WebSocket](https://i.imgur.com/c1I4wqn.gif)

![Example of Interface](https://imgur.com/BS7bMQF.png)

## Start Project

1. yarn install
2. create .env.local for client
3. cd ./server && yarn install
4. create .env.local for server
5. yarn start
6. yarn start:server
7. localhost:3000 - client
8. localhost:4000 - server

## Deploy Client to Heroku

1. yarn client:deploy:\${env}

https://medium.com/@agavitalis/how-to-deploy-a-simple-static-html-website-on-heroku-492697238e48

## Deploy Schema to Prisma

1. cd ./server
2. schema:generate:\${env}
3. prisma:deploy:\${env}

https://us1.prisma.sh/alexander-shtykov-ca308e/prisma/dev
https://eu1.prisma.sh/alexander-shtykov-ca308e/prisma/prod

## Deploy Server to Heroku

1. server:deploy:{env}

https://graphql-feed-list-dev.herokuapp.com/
https://graphql-feed-list-prod.herokuapp.com/

https://medium.com/@shalandy/deploy-git-subdirectory-to-heroku-ea05e95fce1f

## About Prisma

For start both schemas at single playground at the moment you should:

1. cd ./server
2. yarn start - local queries/mutations
3. yarn start:plgr - include prisma queries/mutations

https://www.prisma.io/docs/1.13/tutorials/build-graphql-servers/development/build-a-graphql-server-from-scratch-nahgaghei6#generating-the-prisma-database-schema

## TODO

- move to monorepo for client and server sides
- fix few loaders after searching and scrolling
- change client's schemes format
- move to prisma v2
- add upvoting feature
- add personal page with list of contents
- add new fields (title, source, author, etc.) to feed model
