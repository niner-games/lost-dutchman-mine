<p style="text-align: center">
    <a href="https://github.com/yiisoft" target="_blank">
        <img src="https://avatars0.githubusercontent.com/u/993323" height="100px" alt="Yii Soft Logo">
    </a>
</p>
<h1 style="text-align: center">Yii 2 Basic Project Template</h1>
<br />

Yii 2 Basic Project Template is a skeleton [Yii 2](http://www.yiiframework.com/) application best for
rapidly creating small projects.

The template contains the basic features including user login/logout and a contact page.
It includes all commonly used configurations that would allow you to focus on adding new
features to your application.

- [Requirements](#requirements)
- [Installation](#installation)
    * [XAMPP installation](#xampp-installation)
    * [Installing Git for Windows](#installing-git-for-windows)
    * [Composer installation](#composer-installation)
    * [Installing the project using Git and Composer](#installing-the-project-using-git-and-composer)
- [Configuration](#configuration)
    * [Database](#database)
    * [Migrations](#migrations)
- [Running](#running)
- [Testing](#testing)
    * [Running acceptance tests](#running-acceptance-tests)
    * [Code coverage support](#code-coverage-support)

This in-line ToC has been generated using [GitHub Wiki TOC generator](https://ecotrust-canada.github.io/markdown-toc/).
For details, see [end of README.md](README.md#table-of-contents) file.

## Requirements

The following components are required and must be installed (if you don't already have them):

1. A local LAMP web server, e.g. [XAMPP](https://www.apachefriends.org/index.html) or standalone PHP language interpreter in version **8.0.0** at minimum
2. [Composer](http://getcomposer.org/) dependency manager
3. [Git for Windows](https://gitforwindows.org/)
4. Any web browser in a relatively new version

The solution was tested in **Windows 11 Pro** only, under the control of **PHP 8.2.4**.

## Installation

### XAMPP installation

If you don't have [XAMPP](https://www.apachefriends.org/index.html) or any other LAMP-like server, you can download and install it from the [ApacheFriends.org](https://www.apachefriends.org/download.html) website.

If you choose the 8.1 or 8.0 branch of PHP, you will need to use the `--ignore-platform-req=php` flag when executing Composer (as described below and in [here](https://forum.yiiframework.com/t/current-version-of-yii-2-not-ready-for-php-8-2/135156/2?u=trader)).

### Installing Git for Windows

If you don't have [Git for Windows](https://gitforwindows.org/) or another version of git, you can download it from their [homepage](https://gitforwindows.org/).

### Composer installation

If you do not have [Composer](http://getcomposer.org/), you can find installation instructions on the [getcomposer.org](http://getcomposer.org/doc/00-intro.md#installation-nix) website.

### Installing the project using Git and Composer

Execute the following commands in the Windows console:

~~~
git clone git@github.com:akademia-slaska/template-repository.git
composer update --ignore-platform-req=php
~~~

The `--ignore-platform-req=php` flag must only be used if you have [PHP version 8.2 or later](https://forum.yiiframework.com/t/current-version-of-yii-2-not-ready-for-php-8-2/135156/2?u=trejder) installed.

## Configuration

### Database

Create or open the [`config/db.php`](https://github.com/akademia-slaska/base-web/blob/main/config/db.php) file and fill it with the database credentials, for example:

```php
return [
     'class' => 'yii\db\Connection',
     'dsn' => 'mysql:host=localhost;dbname=yii2basic',
     'username' => 'root',
     'password' => '1234',
     'charset' => 'utf8',
];
```

In most cases you only need to change the database name (the string after `;dbname=`), the username (`root`) in the example above, and the password (`1234` above). The rest of the file is usually left untouched.

### Migrations

Check, if any data migrations (updates) are available and run them:

~~~
cd htdocs/base-web
php yii migrate
~~~

You have to create the database yourself if it doesn't exist; will not be created automatically. And migrations will fail (as the whole application, if there is no database or if application is incorrectly configured -- see above).

## Running

Run your local server or use the built-in PHP server:

~~~
php yii serve
~~~

Then launch your browser of choice and go to [`http://localhost:8080`](http://localhost:8080).

**Comments**:

-
- Check and possibly change the other configuration parameters in the files located in the [`config`](https://github.com/akademia-slaska/base-web/tree/main/config) folder (if you know what you are doing; incorrect changes to these files can kill the entire application!)
- Additional information (for example about tests) can be found in the file [`YII.md`](YII.md)

## Testing


Tests are located in `tests` directory. They are developed with [Codeception PHP Testing Framework](http://codeception.com/).
By default, there are 3 test suites:

- `unit`
- `functional`
- `acceptance`

Tests can be executed by running

```
vendor/bin/codecept run
```

The command above will execute unit and functional tests. Unit tests are testing the system components, while functional
tests are for testing user interaction. Acceptance tests are disabled by default as they require additional setup since
they perform testing in real browser.


### Running acceptance tests

To execute acceptance tests do the following:

1. Rename `tests/acceptance.suite.yml.example` to `tests/acceptance.suite.yml` to enable suite configuration

2. Replace `codeception/base` package in `composer.json` with `codeception/codeception` to install full-featured
   version of Codeception

3. Update dependencies with Composer

    ```
    composer update  
    ```

4. Download [Selenium Server](http://www.seleniumhq.org/download/) and launch it:

    ```
    java -jar ~/selenium-server-standalone-x.xx.x.jar
    ```

   In case of using Selenium Server 3.0 with Firefox browser since v48 or Google Chrome since v53 you must download [GeckoDriver](https://github.com/mozilla/geckodriver/releases) or [ChromeDriver](https://sites.google.com/a/chromium.org/chromedriver/downloads) and launch Selenium with it:

    ```
    # for Firefox
    java -jar -Dwebdriver.gecko.driver=~/geckodriver ~/selenium-server-standalone-3.xx.x.jar
    
    # for Google Chrome
    java -jar -Dwebdriver.chrome.driver=~/chromedriver ~/selenium-server-standalone-3.xx.x.jar
    ``` 

   As an alternative way you can use already configured Docker container with older versions of Selenium and Firefox:

    ```
    docker run --net=host selenium/standalone-firefox:2.53.0
    ```

5. (Optional) Create `yii2basic_test` database and update it by applying migrations if you have them.

   ```
   tests/bin/yii migrate
   ```

   The database configuration can be found at `config/test_db.php`.


6. Start web server:

    ```
    tests/bin/yii serve
    ```

7. Now you can run all available tests

   ```
   # run all available tests
   vendor/bin/codecept run

   # run acceptance tests
   vendor/bin/codecept run acceptance

   # run only unit and functional tests
   vendor/bin/codecept run unit,functional
   ```

### Code coverage support

By default, code coverage is disabled in `codeception.yml` configuration file, you should uncomment needed rows to be able
to collect code coverage. You can run your tests and collect coverage with the following command:

```
#collect coverage for all tests
vendor/bin/codecept run --coverage --coverage-html --coverage-xml

#collect coverage only for unit tests
vendor/bin/codecept run unit --coverage --coverage-html --coverage-xml

#collect coverage for unit and functional tests
vendor/bin/codecept run functional,unit --coverage --coverage-html --coverage-xml
```

You can see code coverage output under the `tests/_output` directory.