# Roger's Website

<div alt style="text-align: center;">
	<picture>
		<source media="(prefers-color-scheme: dark)" srcset="/apps/docs/assets/web-sample-dark.png"/>
		<img alt="Roger's website." src="/apps/docs/assets/web-sample.png"/>
	</picture>
</div>

## Welcome Traveler

This repository is a place for us to transparently host our content, algorithms, and share updates about the program.

The folder `/sourcecode` holds the [open-source code](https://github.com/twitter/communitynotes/tree/main/sourcecode) powering Community Notes under the hood.

The folder `/documentation` holds the [Markdown content](https://github.com/twitter/communitynotes/tree/main/documentation) that is used to generate our [documentation website](https://communitynotes.x.com/guide).

Here you can also find our [research paper](https://github.com/twitter/communitynotes/blob/main/birdwatch_paper_2022_10_27.pdf).

This is the source code of my [personal site](https://rogerrovira.com).

The website is up and running | Visit [rogerrovira.com](https://rogerrovira.com).


## How to run this site

The website is under ..., so the code cannot be distributed. All the code is formatted with two different extensions of Visual Studio Code. The first formatter is "Prettier - Code formatter" and the second one is "Format HTML in PHP".

---

### Install Apache and enable _mod_rewrite_

To install Apache and start it's service on Ubuntu or Debian, run the following commands in the terminal:

```
$ apt update && sudo apt upgrade
$ apt install apache2
$ systemctl start apache2
```

Then after downloading and starting the Apache tou may want to comprovate it by typing: `$ systemctl status apache2`. It should return: `Active: active (running)`. El siguiente paso es activar mod_rewrite, Después de esto, reinicia Apache. El comando para hacerlo es:

```
$ a2enmod rewrite
$ service apache2 restart
```

### Install PHP-FPM

To install PHP8.2-FPM (we are using 8.2 version) and start running it's service, you will need to call this commands:

```
$ sudo apt install nginx php8.2-fpm
$ systemctl start php8.2-fpm
```

Then after downloading and starting the PHP8.2-FPM tou may want to comprovate it by typing: `$ systemctl status php8.2-fpm`.

### Configure Apache to use PHP-FPM

To configure Apache to use PHP-FPM, you need to enable the _proxy_fcgi_ and _proxy_ modules. You can do this by running the following command:

```
$ a2enmod proxy_fcgi proxy
```

Create a new configuration file for your virtual host using the following command:

```
$ sudo nano /etc/apache2/sites-available/[domain].com.conf
```

Inside the new configuration file, add the following code, changing the _[root]_ with the root in where tou have made the git clone of the code.:

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

After saving and closing the file, you will need to run this commands, as to enable new virtual host:

```
$ a2dissite 000-default
$ a2ensite [domain].com.conf
$ systemctl reload apache2
```
