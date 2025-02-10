--- 
layout: post
title: How To Install wkhtmltopdf PHP Bindings
place: San Francisco, CA
time: 11:55am
---

This isn't a difficult process, but I'm sure I'll need it again, so here it is.

### Pre-requisites:
1. Download the latest version of `libwkhtmltox` and the source of `wkhtmltopdf` [from Google Code](http://code.google.com/p/wkhtmltopdf/downloads/list).
2. Copy `lib/libwkhtmltox.so` from `libwkhtmltox` to `/usr/local/lib`.
3. Copy `include/wkhtmltox` from `wkhtmltopdf` to `/usr/local/include`.
4. Run the following command (just to make sure it's loaded):

    ```sh
    $ldconfig -v | grep wkhtml
    ```

### PHP Bindings:
1. Grab [php-wkhtmltox from GitHub](https://github.com/mreiferson/php-wkhtmltox).
2. Install.

### Installation:

If development tools aren't installed:

```sh
$apt-get install build-essential php5-dev  # (ubuntu)
$phpize
$./configure
$make install
```

Add `extension=phpwkhtmltox.so` to `php.ini`.

<small>P.S. These instructions are for Ubuntu. If you're on CentOS, things are more difficult, good luck.</small>