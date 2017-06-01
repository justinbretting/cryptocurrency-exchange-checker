
To get started, you should simply be able to run:

$ npm install -g babel-cli gulp
$ npm install -g gulp
$ npm install

# Recommended for Development #
$ npm install -g nodemon babel-node

# See Package.json for other scripts #

# create the bundle and watch files for updates
# you MUST leave this running while you develop for most changes to be synced to your bundle
$ source .env && gulp bundle-dev

# start the server at http://localhost:3000
$ babel-node src/server/index.js
