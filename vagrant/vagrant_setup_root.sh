#!/bin/bash

#cleanup unused packages
apt-get -y --force-yes remove puppet puppet-common chef

# set locale
locale-gen pt_BR.UTF-8

# git
apt-get -y --force-yes install git

# install nodejs 0.12
curl -sL https://deb.nodesource.com/setup_0.12 | bash -
apt-get -y --force-yes install nodejs
apt-get -y --force-yes install build-essential
apt-get -y --force-yes install libfontconfig
apt-get -y --force-yes install g++

npm -g upgrade npm
npm install -g grunt-cli bower yo generator-karma generator-angular --silent
