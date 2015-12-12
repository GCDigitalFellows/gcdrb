#!/usr/bin/env bash

# install rubygems
if ! type 'gem' > /dev/null 2>&1; then
  log "Installing rubygems"
  git clone https://github.com/rubygems/rubygems.git
  cdx rubygems
  ruby setup.rb
  cd .. > /dev/null 2>&1
  rm -rf rubygems
  log "Rubygems was Installed"
fi
# install bundler
if ! type 'bundle' > /dev/null 2>&1; then
  log "Installing bundler"
  gem install bundler
  log "Bundler was installed"
fi

warning "This package depends on gulp-cli#4.0."
if (confirm "Ok to uninstall your global gulp and install gulp4 [y/N]?"); then
  npm uninstall gulp -g
  npm install -g gulpjs/gulp-cli#4.0
else
  warning "Please be sure that you have gulp-cli#4.0 installed globally or else you will get errors when you try to run gulp on this project."
fi

log "Installing bower globally"
npm install -g bower

if [[ -d "./gcdrb" ]]; then
  cd gcdrb
else
  git clone https://github.com/GCDigitalFellows/gcdrb.git
  cd gcdrb || exit
fi

log "Installing NPM dependencies"
npm install
log "Installing Bower dependencies"
bower install
log "Installing Ruby dependencies"
bundle install

log "Installation complete! Run `gulp` to build the site and view it on your local computer."
