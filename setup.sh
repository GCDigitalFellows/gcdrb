#!/usr/bin/env bash

# helper confirmation function
confirm () {
    # call with a prompt string or use a default
    echo "${1:-Are you sure? [y/N]}"
    read response
    case $response in
        [yY][eE][sS]|[yY])
            return 0
            ;;
        *)
            return 1
            ;;
    esac
}

echo "Please enter the *BASE* directory where you want to clone this project (it will create a new folder called gcdrb in this location): "
read clonedir
cd "$clonedir" || exit

# install homebrew on macs
if [[ `uname` == 'Darwin' ]]; then
  if ! type 'brew' > /dev/null 2>&1; then
    echo ' + Installing Homebrew...'
    ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go)"
    brew update
  fi
fi

# install git command line
if ! type 'git' > /dev/null 2>&1; then
  if [[ `uname` == 'Darwin' ]]; then
    echo "Installing git via homebrew"
    brew install git
  elif [[ `uname` == 'Linux' ]]; then
    if type 'apt-get' > /dev/null 2>&1; then
      echo "Installing git via apt-get"
      sudo apt-get update
      sudo apt-get install git
    elif type 'yum' > /dev/null 2>&1; then
      echo "Installing git via yum"
      sudo yum install git
    else
      echo 'Please manually install git before proceeding'
      exit 0
    fi
  fi
fi

# install n and nodejs
if ! type 'n' > /dev/null 2>&1; then
  if type 'npm' > /dev/null 2>&1; then
    echo "It looks like you installed node.js/npm without using n. I recommend uninstalling the system node.js and using n to manage your node environment. For now I'm going to leave things alone, but you've been warned."
    echo "If you want to try it my way, uninstall node/npm and re-run this script."
  else
    echo "Installing n using n-install"
    curl -L http://git.io/n-install | bash
  fi
else
  if ! type 'npm' > /dev/null 2>&1; then
    echo "Installing the latest version of node/npm via n"
    n latest
  else
    echo 'Looks like n and npm are already installed. Please double check your system configuration to be sure that the correct versions of node/npm are being used.'
    echo '`which npm` should return something like "[User Home]/n/bin/npm" '
    echo 'Result of `which npm`:'
    which npm
    echo 'If the above output does not look correct, please uninstall npm and re-run this script. You might also need to add "$N_PREFIX/bin" to your PATH variable (e.g., in .bashrc) and/or set the environment variable N_PREFIX to your n installation directory (e.g., ~/n).'
  fi
fi

# install chruby and ruby
if ! type 'chruby' > /dev/null 2>&1; then
  echo "I recommend using chruby (or rbenv, but not rvm) to manage your ruby environment."
  if (confirm "Should I install chruby/ruby-install for you [y/N]? "); then
    wget -O chruby-0.3.9.tar.gz https://github.com/postmodern/chruby/archive/v0.3.9.tar.gz
    tar -xzvf chruby-0.3.9.tar.gz
    cd chruby-0.3.9/ > /dev/null 2>&1 || exit
    source scripts/setup.sh
    cd .. > /dev/null 2>&1
    rm -rf chruby-0.3.9 chruby-0.3.9.tar.gz

    # install ruby-install
    if ! type 'ruby-install' > /dev/null 2>&1; then
      # install ruby-install
      wget -O ruby-install-0.5.0.tar.gz https://github.com/postmodern/ruby-install/archive/v0.5.0.tar.gz
      tar -xzvf ruby-install-0.5.0.tar.gz
      cd ruby-install-0.5.0 > /dev/null 2>&1 || exit
      sudo make install
      cd .. > /dev/null 2>&1
      rm -rf ruby-install-0.5.0 ruby-install-0.5.0.tar.gz
    fi
    ruby_latest=$(ruby-install | awk '/  ruby:/,/  jruby:/' | tail -2 | head -1)
    export ruby_latest
    ruby-install "$ruby_latest"
    chruby "$ruby_latest"
    echo "Installed chruby and the latest version of ruby."
    echo "*** Please check that you have the command 'chruby $ruby_latest' somewhere in your .bashrc/.zshrc/.profile so that the correct version of ruby gets loaded when you start a new terminal."
  else
    echo "Not installing chruby. You're on your own..."
  fi
else
  if ! type 'ruby-install' > /dev/null 2>&1; then
    echo "It looks like you have chruby installed but not ruby-install."
    if (confirm "Should I install ruby-install for you [y/N]? "); then
      # install ruby-install
      wget -O ruby-install-0.5.0.tar.gz https://github.com/postmodern/ruby-install/archive/v0.5.0.tar.gz
      tar -xzvf ruby-install-0.5.0.tar.gz
      cd ruby-install-0.5.0 > /dev/null 2>&1 || exit
      sudo make install
      cd .. > /dev/null 2>&1
      rm -rf ruby-install-0.5.0 ruby-install-0.5.0.tar.gz
    else
      echo "Please be sure that you have installed the correct version of Ruby and that chruby is configured to use that version globally."
    fi
    echo "It looks like you already have chruby installed on your system."
    if (confirm "Should I try to install the latest version of ruby for you [y/N]?"); then
      ruby_latest=$(ruby-install | awk '/  ruby:/,/  jruby:/' | tail -2 | head -1)
      export ruby_latest
      ruby-install "$ruby_latest"
      chruby "$ruby_latest"
      echo "Installed the latest version of ruby."
      echo "*** Please check that you have the command 'chruby $ruby_latest' somewhere in your .bashrc/.zshrc/.profile so that the correct version of ruby gets loaded when you start a new terminal."
    else
      echo " Please double check your ruby installation to be sure everything is configured correctly."
    fi
  fi
fi

#reload shell
/usr/bin/env bash

# install rubygems
if ! type 'gem' > /dev/null 2>&1; then
  echo "Installing rubygems"
  git clone https://github.com/rubygems/rubygems.git
  cd rubygems > /dev/null 2>&1 || echo "Error: Rubygems did not git clone correctly." && exit
  ruby setup.rb
  cd .. > /dev/null 2>&1
  rm -rf rubygems
  echo "Rubygems was Installed"
fi
# install bundler
if ! type 'bundle' > /dev/null 2>&1; then
  echo "Installing bundler"
  gem install bundler
  echo "Bundler was installed"
fi

echo "This package depends on gulp-cli#4.0."
if (confirm "Ok to uninstall your global gulp and install gulp4 [y/N]?"); then
  npm uninstall gulp -g
  npm install -g gulpjs/gulp-cli#4.0
else
  echo "Please be sure that you have gulp-cli#4.0 installed globally or else you will get errors when you try to run gulp on this project."
fi

if [[ -d "./gcdrb" ]]; then
  cd gcdrb
else
  git clone https://github.com/GCDigitalFellows/gcdrb.git
  cd gcdrb || exit
fi

echo "Installing NPM dependencies"
npm install
echo "Installing Bower dependencies"
bower install
echo "Installing Ruby dependencies"
bundle install

echo "Installation complete! Run `gulp` to build the site and view it on your local computer."
