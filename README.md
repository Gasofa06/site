# Roger's Website

This is the source code of my [personal site](https://rogerrovira.com).

## Installation
El codigo ets pensado apra funcionar en un dispositivo con Linux.

Pa poder acceder remotamente al dispositivo mediante SSH, primero se debe instalar la extension Remote-SSH en VS code.
Una vez instalada, se debe buscar la direccion IP en del dispositivo y acceder a el.

Instalar git en el dispositivo. Instalar la extension GitLens para el dispositivo.

Primero instale git en el dispositivo. For Debian-based distribution, such as Ubuntu: 

$ sudo apt install git-all
$ git clone git@github.com:fabe/site.git# site


## Download the latest Nginx and PHP packages
Every software install in Ubuntu should start with a quick apt-get update and possibly an apt-get upgrade command.

$ sudo apt-get update -y
$ sudo apt-get upgrade -y


## Install Nginx on Ubuntu
To install PHP on Nginx, you must first install Nginx, which you can achieve through a simple apt-get install command:

$ sudo apt-get install nginx -y

Verify the running Nginx server
To verify the successful installation and configuration of Nginx on Ubuntu, query the HTTP server’s status:

$ sudo systemctl status nginx
    Active: active (Nginx running)

## Install PHP for Nginx
To install PHP for Nginx, support with another apt-get install command:

$ sudo apt install nginx php8.2-fpm -y

## Modify NGINX file

sudo nano /etc/nginx/sites-available/default

and paste there the server code.

In 
root        "/home/user/repo/apps/web";
you will need to put the path in wich the code of the web is.


## How to validate an Nginx config file
The following command validates the updated Nginx config file to ensure the edits do not create any syntax errors:

sudo nginx -t
nginx php config: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx php-fpm config: configuration file /etc/nginx/nginx.conf test is successful

## To enable the Nginx PHP fastCGI setup, restart the server:

sudo systemctl restart nginx