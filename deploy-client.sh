rm -rf build
yarn build:$1
cd build
echo '{}' > composer.json
echo '<?php include_once("home.html"); ?>' > index.php
mv index.html home.html
git init
git add .
git commit -m 'Initial commit'
git push --force https://git.heroku.com/client-feed-list-$1.git master
