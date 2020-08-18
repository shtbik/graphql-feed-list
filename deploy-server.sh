PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g')

cd ./server
yarn version --no-git-tag-version
yarn schema:generate:$1
git add .
git commit -m "Build $PACKAGE_VERSION"
git push https://git.heroku.com/graphql-feed-list-$1.git master
