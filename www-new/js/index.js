/*
 * YAMVA: Yet Another Mobile Vegan App
 * Copyright 2013 Yannic Haupenthal
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
		// TODO: check data connection!
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

	scan: function() {
        console.log('scan(): init');
        var scanner = cordova.require("cordova/plugin/BarcodeScanner");
        scanner.scan(
                function (result) {
					if (!result.cancelled) {
						$("input#barcode").val(result.text);
						$("input#submit").click();
					}
                },
                function (error) {
                    alert("Scanning failed: " + error);
                }
        );
    }

};

// i18n
var i18n_please_add_it = "Bitte Produkt hinzufügen";
var i18n_view_on_website = "Auf Website ansehen";
var i18n_veganity = "Veganität";
var i18n_new_search = "Neue Suche";
var i18n_vegan = "vegan";
var i18n_not_vegan = "unvegan"
var i18n_uncertain = "unklar"
var i18n_unknown = "unbekannt"

$("form").submit(function(){
	var gtin = $("input#barcode").val();
	var rooturl = "http://yava.yhaupenthal.org:3000";
    $.ajax({
        type: 'POST',
        data: {search : gtin},
        url: rooturl+"/msearch.json",
		dataType: "jsonp",
		jsonpCallback: "yamva",
        success: function(data){
			clear_result();
			hide_form();
			if (data.id === undefined) {
				$(".result").append("<p>"+data.error+"</p><p><a href='#' onclick=\"window.open('"+rooturl+"/products/new?gtin="+gtin+"', '_system', 'location=yes')\">"+i18n_please_add_it+"</a></p>");
			} else {
				$(".result").append("<h3>"+data.name+"</h3>");
				$(".result").append("<p>"+i18n_veganity+": "+get_veganity(data.veganity_id)+"</p>");
				$(".result").append("<hr><p><a href='#' onclick=\"window.open('"+rooturl+"/products/"+data.id+"', '_system', 'location=yes')\">"+i18n_view_on_website+"</a></p>");
			
				// empty search
				$("input#barcode").val("");
				// reset submit button
			}
			link_show_form();
        }
    });
    return false;
});

clear_result = function() {
	$(".result").empty();
}

hide_form = function() {
	$("form").hide();
}

link_show_form = function() {
	$(".result").append("<hr><p><a href='#' onclick=\"location.reload();\">"+i18n_new_search+"</a></p>");
}

function get_veganity(veganity_id) {
	switch (veganity_id) {
		case (1):
			return i18n_vegan;
			break;
		case (2):
			return i18n_not_vegan;
			break;
		case (3):
			return i18n_uncertain;
			break;
		case (4):
			return i18n_unknown;
			break;
		default:
			i18n_unknown;
	}
}

