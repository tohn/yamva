#!/bin/bash

if [[ $# != 2 ]] ; then
	echo "  Usage: $0 <project_root> <image>"
	echo "Example: $0 ~/tmp/test ~/pics/test.png"
	exit 1
fi

root="$1"
img="$2"

# test root
if [[ ! -d $root ]] ; then
	echo "Folder not found"
	exit 1
fi

# test image
if [[ ! -e $img ]] ; then
	echo "Image not found"
	exit 1
fi

#name="icon.png"

while read line ; do
	mos=$(echo $line | cut -d\| -f 1)
	res=$(echo $line | cut -d\| -f 2)
	dst=$(echo $line | cut -d\| -f 3)
	echo $line
	convert -geometry $res $img $root/res/icon/$mos/${dst}.png
done << !
android|36x36|icon-36-ldpi
android|48x48|icon-48-mdpi
android|72x72|icon-72-hdpi
android|96x96|icon-96-xhdpi
bada|128x128|icon-128
bada-wac|48x48|icon-48-type5
bada-wac|50x50|icon-50-type3
bada-wac|80x80|icon-80-type4
blackberry|80x80|icon-80
ios|114x114|icon-57-2x
ios|57x57|icon-57
ios|144x144|icon-72-2x
ios|72x72|icon-72
tizen|128x128|icon-128
webos|64x64|icon-64
windows-phone|173x173|icon-173-tile
windows-phone|48x48|icon-48
windows-phone|62x62|icon-62-tile
!
