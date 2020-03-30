## UI

![Example of WebSocket](https://i.imgur.com/c1I4wqn.gif)

![Example of Interface](https://imgur.com/BS7bMQF.png)

## Demo

https://shtbik.github.io/graphql-feed-list

test@test.ru | 123456

## Start Project

1. yarn install
2. cd ./server && yarn install
3. yarn start
4. yarn start:server
5. localhost:3000 - client
6. localhost:4000 - server

## Deploy Client to Github Pages

1. yarn predeploy
2. yarn deploy

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

- fix bugs with search after implementation of infinity loader
- change schemes format
- add upvoting feature
- add personal page with list of contents
- add new fields (title, source, author, etc.) to feed model
