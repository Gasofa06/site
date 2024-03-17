<div alt style="text-align: center;">
	<picture>
		<source media="(prefers-color-scheme: dark)" srcset="/apps/docs/assets/web-sample.png"/>
		<img alt="Roger's website." src="/apps/docs/assets/web-sample.png"/>
	</picture>
</div>

<br>

> ✨ Navigate at [rogerrovira.com](https://rogerrovira.com)

This is the source code of my [personal site](https://rogerrovira.com).

For formatter is recommended to install "Prettier - Code formatter" and "php cd
fixer"

## PHP formatter

Install composer https://getcomposer.org/download/ !important

```
sudo php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"

php -r "if (hash_file('sha384', 'composer-setup.php') === 'dac665fdc30fdd8ec78b38b9800061b4150413ff2e3b6f88543c636f7cd84f6db9189d43a81e5503cda447da73c7e5b6') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"

sudo php composer-setup.php

sudo php -r "unlink('composer-setup.php');"
```

Most likely, you want to put the composer.phar into a directory on your PATH, so
you can simply call composer from any directory (Global install), using for
example:

sudo mv composer.phar /usr/local/bin/composer

## Installation

The recommended way to install PHP CS Fixer is to use Composer in a dedicated
composer.json file in your project, for example in the tools/php-cs-fixer
directory: https://github.com/PHP-CS-Fixer/PHP-CS-Fixer

`mkdir -p tools/php-cs-fixer `
`composer require --working-dir=tools/php-cs-fixer friendsofphp/php-cs-fixer`

## Update your system

Before installing any new software, you should update your system to ensure that
all packages are up to date. You can do this by running the following command in
the terminal:

`$ sudo apt update && sudo apt upgrade`

## Install Apache

To install Apache on Ubuntu 22.04 or Debian [version], run the following command
in the terminal:

`$ sudo apt install apache2`

Once the installation is complete, you can start the Apache service by running
the following command:

`$ sudo systemctl start apache2`

Comprovate:

`$ sudo systemctl status apache2`

It should return you:

```
(...)
Active: active (running)
(...)
```

## Habilita mod_rewrite

El siguiente paso es activar mod_rewrite. El comando para hacerlo es:

`$ sudo a2enmod rewrite`

El comando anterior habilitará el modo de reescribir o te informará si ya está
en uso. Después de esto, reinicia Apache:

`$ sudo service apache2 restart`

## Install PHP-FPM

To install PHP for Nginx, support with another apt-get install command, tou can
replace 8.2 with the desired PHP version, but you may need to make some changes:
Our PHP version is 8.2.

`$ sudo apt install nginx php{PHP version}-fpm`

Once the installation is complete, you can start the PHP-FPM service by running
the following command:

`$ sudo systemctl start php{PHP version}-fpm`

Comprovate:

`$ sudo systemctl status php{PHP version}-fpm`

It should return you:

```
(...)
Active: active (running)
(...)
```

## Configure Apache to use PHP-FPM

To configure Apache to use PHP-FPM, you need to enable the “proxy_fcgi” and
“proxy” modules. You can do this by running the following command:

`$ sudo a2enmod proxy_fcgi proxy`

Create a new configuration file for your virtual host using the following
command, in domain you can put you romain name or dejarlo como esta:

`$ sudo nano /etc/apache2/sites-available/[domain].com.conf`

In this case my [domain] will be rogerrovira. Inside the new configuration file,
add the following configuration with PHP-FPM:

```
<VirtualHost *:80>
    ServerName [domain].com
    ServerAlias www.[domain].com
    DocumentRoot [root]/site/apps/web

    <Directory [root]/site/apps/web>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    <FilesMatch \.php$>
        SetHandler "proxy:unix:/run/php/php[version]-fpm.sock|fcgi://localhost/"
    </FilesMatch>

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

[root] needs to be the root in where tou have made the git clone of the code.
For example in mys case, [root] will be /var/www

[domain] tyour domain and [version] your PHP version. In my case [domain] =
rogerrovira and [version] = 8.2

Save and close the file by pressing CTRL+X, then Y and ENTER.

You may need to:

```
sudo a2dissite 000-default
sudo systemctl reload apache2
```

And enable the new virtual host by running the following command:

`$ sudo a2ensite [domain].com.conf`

Reload the Apache web server to apply the changes:

`$ sudo systemctl reload apache2`
