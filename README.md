# steam-organizer - frontend [![Build Status](https://travis-ci.org/rodrigo-kayala/steam-organizer-front.svg)](https://travis-ci.org/rodrigo-kayala/steam-organizer-front)
Steam Organizer is a simple web application to organize, sort and filter your **Steam** game library.

It has been developed as a demonstration purpose of my skills in frontend development.

## Main technologies
For frontend development the following tools, languagues and technologies has been used:
+ AngularJS 1.4.3
+ Bootstrap 3.3.5
+ Angular Bootstrap 0.13.2
+ Karma (unit tests)
+ Bower (package manager)
+ Grunt (task runner)

## How to setup

### Using Vagrant VM

1. Install VirtualBox to be used as a provider: https://www.virtualbox.org/
1. Install Vagrant: https://www.vagrantup.com/
1. In the project folder, execute `vagrant up`
1. After VM setup, run `vagrant ssh` to connect to virtual machine
1. Go to vagrant shared folder: `cd /vagrant`

+ To first time project build, run `npm install`
+ To start development server, run `grunt serve`
