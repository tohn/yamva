# YAMVA: Yet Another Mobile Vegan App

YAMVA is the mobile app to use with the website [here][] and is a part
of my [bachelor thesis][].

To build YAMVA from scratch, you should install the following
dependencies.<br>
All the other dependencies as [jQuery][] or [jQuery Mobile][] are shipped with
this package.

## Dependencies

* [node.js][]

Afterwards, install with node.js:

	npm install -g cordova
	npm install -g phonegap
	npm install -g plugman

## Setup

First create a new and empty phonegap project (required, this will
add cordova):

	phonegap create .

Then remove the new www folder and move www-new to www:

	rm -rf www && mv www-new www

Then install the following plugins:

	cordova plugin add https://github.com/phonegap-build/BarcodeScanner
	cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-camera.git
	cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-network-information.git

Afterwards, build an Android app with:

	phonegap build android

or install it directly to the attached phone running Android with:

	phonegap run android

[here]: http://yava.yhaupenthal.org
[bachelor thesis]: http://yhaupenthal.org/bachelor.htm
[node.js]: http://nodejs.org/
[jQuery]: https://jquery.org/
[jQuery Mobile]: http://jquerymobile.com/
