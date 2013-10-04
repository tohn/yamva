#!/bin/bash

root=$(dirname $0)
config="$root/www/config.xml"
name=$(sed -n '2p' www/config.xml | cut -d\  -f 2 | cut -d\. -f 3 | sed 's/"$//')
version=$(sed -n '2p' www/config.xml | cut -d\  -f 3 | sed 's/^version="//;s/"$//')

# Workaround to exclude barcodescanner.js
mv $root/www/barcodescanner.js $root
zip -r ${name}-${version}.zip www/
mv $root/barcodescanner.js $root/www
