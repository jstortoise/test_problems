<!DOCTYPE html>
<html>
    <head>
        <title>Location Locker</title>
        <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
        <meta charset="utf-8">
        <style>
            html, body {
                height: 100%;
                margin: 0;
                padding: 0;
                font-family: verdana;
            }
            h2 {
                padding-top: 10px;
                margin: 0 auto;
                color: #000;
                padding: 10px;
            }
            #container {
                width: 100%;
            }
            #settings {
                width: 500px;
                float: left;
                margin-left: 50px;
            }
            input, label, select, textArea {
                margin: 10px 5px;
            }
            input[type="text"], textArea {
                width: 300px;
                padding: 5px;
            }
            select {
                width: 310px;
                padding: 4px;
            }
            input[type="submit"] {
                width: 50px;
                padding: 3px;
            }
            .special {
                color: coral;
                font-size: 12px;
            }
            #map-canvas {
                width: 49%;
                height: 200px;
                margin-right: 5px;
                padding: 0;
            }


        </style>
        <script 
            type="text/javascript" 
            src="//code.jquery.com/jquery-1.11.3.min.js"></script>
        <script 
            type="text/javascript" 
            src="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places&signed_in=true&key=AIzaSyAhtpDqV3eFcqXbywJKMnvghzjQkvHAus8"></script>
        <script>
            /**
             * Setup current location map using geo location entered
             * @axis geolocation string
             * @returns {undefined}
             */
            function setupmap(axis) {
                var latlngStr = axis.split(',', 2);
                var latlng = new google.maps.LatLng(latlngStr[0], latlngStr[1]);

                console.log(latlngStr[0] + "," + latlngStr[1]);

                var mapOptions = {
                    center: latlng,
                    zoom: 13
                };
                var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
            }
            
            /**
             * Automatically bind the map for the location entered
             * @returns {undefined}
             */
            function initialize() {
                var latlng;
                var lat = 10.5245952;
                var lng = 76.24009;

                var mapOptions = {
                    center: {lat: lat, lng: lng},
                    zoom: 13
                };
                var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

                var input = /** @type {HTMLInputElement} */(
                        document.getElementById('pac-input'));

                var autocomplete = new google.maps.places.Autocomplete(input);
                autocomplete.bindTo('bounds', map);

                var infowindow = new google.maps.InfoWindow();
                var marker = new google.maps.Marker({
                    map: map,
                    anchorPoint: new google.maps.Point(0, -29)
                });
                google.maps.event.addListener(autocomplete, 'place_changed', function() {
                    infowindow.close();
                    marker.setVisible(false);
                    var place = autocomplete.getPlace();
                    $('#address').val(JSON.stringify(place));
                    console.log(place);
                    console.log(place.geometry.location.G);

                    if (!place.geometry) {
                        window.alert("Autocomplete's returned place contains no geometry");
                        return;
                    }
                    if (place.geometry.viewport) {
                        map.fitBounds(place.geometry.viewport);
                    } else {
                        map.setCenter(place.geometry.location);
                        map.setZoom(17);  // Why 17? Because it looks good.
                    }
                    marker.setIcon(/** @type {google.maps.Icon} */({
                        url: place.icon,
                        size: new google.maps.Size(71, 71),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(17, 34),
                        scaledSize: new google.maps.Size(35, 35)
                    }));
                    marker.setPosition(place.geometry.location);
                    marker.setVisible(true);

                    var address = '';
                    if (place.address_components) {
                        address = [
                            (place.address_components[0] && place.address_components[0].short_name || ''),
                            (place.address_components[1] && place.address_components[1].short_name || ''),
                            (place.address_components[2] && place.address_components[2].short_name || '')
                        ].join(' ');
                    }

                    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
                    infowindow.open(map, marker);
                });
            }
            
            google.maps.event.addDomListener(window, 'load', initialize);
            
            $(document).ready(function() {
                $('#pac-input').focusout(function() {
                    $('#address').val($('#pac-input').val());
                });
                $('#location').focusout(function() {
                    if ($('#location').val() != "") {
                        setupmap($('#location').val());
                    }
                });

                $('#radius_m').keyup(function() {
                    $('#radius_k').val($('#radius_m').val() / 1000);
                });

                $('#radius_k').keyup(function() {
                    $('#radius_m').val($('#radius_k').val() * 1000);
                });
            });
        </script>

    </head>
    <body>
        <div id="container">
            <div id="settings">
                <h2>SETTINGS</h2>
                <form action="locator.php" method="POST">
                    <label for="address">Enter Address:</label><br>
                    <input id="pac-input" class="controls" type="text"
                           placeholder="Enter a location">
                    <input type="text" placeholder="Address.." hidden="true" 
                           id="address" name="address" /><br>
                    
                    <label for="radius_m">Enter radius:</label><br>
                    <input id="radius_m" name="radius_m" class="controls" 
                           type="text" style="width: 110px;" 
                           placeholder="in Meter"> or
                    <input id="radius_k" name="radius_k" class="controls" 
                           type="text" style="width: 110px;"
                           placeholder="in Kilometer"><br>
                    
                    <label for="location">Enter geolocation(40.714224,
                           -73.961452):</label>
                    <input type="text" placeholder="latitude, longitude" 
                           id="location" name="location" />
                    
                    <br>
                    <label for="type">Select content type  for users within 
                           Geo Location:</label><br>
                    <select id="type" name="type">
                        <option value="IMG">Image</option>
                        <option value="URL">Url</option>
                        <option value="TXT">Other</option>
                    </select>
                           
                    <br>
                    <label for="content">Enter content:</label><br>
                    <textarea id="content" name="content" cols="10" rows="5" 
                            placeholder="Enter content for users within Geo Location..."></textarea>
                    
                    <br>
                    <label for="nontype">Select content type  for users 
                            not in Geo Location:</label><br>
                    <select id="nontype" name="nontype">
                        <option value="IMG">Image</option>
                        <option value="URL">Url</option>
                        <option value="TXT">Other</option>
                    </select>
                            
                    <br>
                    <label for="noncontent">Enter content:</label><br>
                    <textarea id="noncontent" name="noncontent" cols="10" 
                              rows="5" placeholder="Enter content for users not in Geo Location..."></textarea>
                    <br>
                    <input type="submit" id="go" name="go" value="GO" />

                </form>
            </div>
            
            <div id="map-canvas"></div>
            
            <br>

            <p class="special">
                /** <br>
                * Settings page to define custom settings <br>
                * <b>GEOLOCATION :</b> is the pair of latitude,longitude 
                        of the location <br>
                *  &emsp;eg: "40.714224,-73.961452" for NewYork <br><br>
                * <b>ADDRESS :</b> is the physical address of the location(with 
                        auto filling) <br>
                *  &emsp;eg1: Kerala, India <br>
                *  &emsp;eg1: London <br>
                *  &emsp;eg1: any local address <br><br>
                * <b>RADIUS :</b> This is the boundary defined. Mesure if you 
                        are in this boundary of the location or not <br>
                *  &emsp;eg1: 1000  <br><br>
                * <b>CONTENTTYPE : IMG|URL|TXT </b><br>
                *  &emsp; <b>Image =></b> It's for image path <br>
                *      &emsp;&emsp;if TYPE is IMG the CONTENT must be path <br>
                *      &emsp;&emsp;eg: http://webneel.com/wallpaper/sites/
                        default/files/images/04-2013/indian-beach-wallpaper.jpg 
                        <br><br>
                *  &emsp; <b>Url =></b> It's for iframe/url <br>
                *      &emsp;&emsp;if TYPE is URL the CONTENT must be url of 
                        the content <br>
                *      &emsp;&emsp;eg: https://www.google.com/maps/embed?
                        pb=!1m18!1m12!1m3!1d355071.77657984296!2d75.97576683
                        3721!3d10....... <br><br>
                *  &emsp; <b>Other =></b> it's for other type of content, 
                        like text/html type <br>
                *      &emsp;&emsp;eg1: <'p'>sample <'b'>text<'/b'><'/p'> <br>
                *      &emsp;&emsp;eg2: sample text  <br><br>
                * <b>CONTENT :</b> Is the content to be displayed if the 
                        current location and <br>
                *  pre-defined location is in same country <br><br>
                *  <br>
                */
            </p>
        </div>
        <div id="map-canvas"></div>
    </body>