<?php
    if (isset($_POST['go'])) {
        define("GEOLOCATION", $_POST['location']);
        $location = json_decode($_POST['address'], true);
        define("ADDRESS", $location['formatted_address']);
        if (!$_POST['radius_m']) {
            define("RADIUS", 100000);
        } else {
            define("RADIUS", $_POST['radius_m']);
        }
        define("CONTENTTYPE", $_POST['type']);
        define("CONTENT", $_POST['content']);
        define("NONCONTENTTYPE", $_POST['nontype']);
        define("NONCONTENT", $_POST['noncontent']);
    } else {
        define("SETTINGS", "LOCATOR");
        define("GEOLOCATION", "NULL");
        define("ADDRESS", "Thrissur");
        define("CONTENTTYPE", "IMG");
        define("CONTENT", "http://webneel.com/wallpaper/sites/default/files"
                . "/images/04-2013/indian-beach-wallpaper.jpg");
        define("NONCONTENTTYPE", "IMG");
        define("NONCONTENT", "http://webneel.com/wallpaper/sites/default/"
                . "files/images/04-2013/indian-beach-wallpaper.jpg");
    }
?>
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
                color: #fff;
            }
            #result {
                width: 100%;
                max-width: 1400px;
                max-height: 600px;
                overflow: hidden;
            }
            #inner {
                margin: 0 auto;
            }
            #header {
                width: 100%;
                height: 50px;
                text-align: center;
                background-color: background;
            }
            #header a {
                color: #eee;
            }
            #footer {
                width: 100%;
                height: 30px;
                text-align: right;
                background-color: #ddd;
                color: #666;
                font-size: 12px;
                padding: 10px 0 0 0;
                position: absolute;
                bottom: 0;
            }
            #map-canvas {
                width: 49%;
                height: 200px;
                margin-right: 5px;
                padding: 0;
                float: left;
            }
            #map-canvas2 {
                width: 49%;
                height: 200px;
                margin-left: 5px;
                padding: 0;
                float: left;
            }

        </style>
        <script 
            type="text/javascript" 
            src="//code.jquery.com/jquery-1.11.3.min.js"></script>
        <script 
            type="text/javascript" 
            src="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places&signed_in=true&key=AIzaSyAhtpDqV3eFcqXbywJKMnvghzjQkvHAus8"></script>

        <script type="text/javascript">

            var geocoder = new google.maps.Geocoder();
            var input = "";
            var map, map1;
            var infowindow = new google.maps.InfoWindow();
            var customGeo, content, globalLatlng;

            /**
             * 
             * Initialize the pre defined settings
             * @returns {undefined}
             */
            $(document).ready(function() {

                var geoCode;
                var loc;

                if ("<?php echo GEOLOCATION; ?>".toString().length > 0) {
                    console.log("JSON data:", "<?php echo GEOLOCATION; ?>");
                    input = "<?php echo GEOLOCATION; ?>";
                    var latlngStr = input.split(',', 2);
                    var latlng1 = new google.maps.LatLng(latlngStr[0], latlngStr[1]);
                    geoCode = {'location': latlng1};

                    loc = "<?php echo GEOLOCATION; ?>";
                    latlng = new google.maps.LatLng(latlngStr[0], latlngStr[1]);
                }
                else if ("<?php echo ADDRESS; ?>".toString().length > 0) {
                    console.log("JSON data:", "<?php echo ADDRESS; ?>");
                    geoCode = {'address': "<?php echo ADDRESS; ?>"};

                    var latitude = "<?php echo $location['geometry']['location']['G']; ?>";
                    var longitude = "<?php echo $location['geometry']['location']['K']; ?>";

                    loc = "<?php echo $location['formatted_address']; ?>";
                    latlng = new google.maps.LatLng(parseFloat(latitude), parseFloat(longitude));
                }

                if (!geoCode)
                    alert('Invalid settings');

                latlng = new google.maps.LatLng(parseFloat(latitude), parseFloat(longitude));
                globalLatlng = latlng;

                geocoder.geocode(geoCode, function(results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        customGeo = results;
                        console.log(results);

                        if (!customGeo) {
                            alert('Invalid settings');
                        }
                    }
                });
                if ("<?php echo CONTENTTYPE ?>" == "IMG")
                    content = "<img src='<?php echo CONTENT; ?>' />";
                else if ("<?php echo CONTENTTYPE ?>" == "URL")
                    content = "<iframe src='<?php echo CONTENT; ?>' width='100%' height='600px' ></iframe>";
                else
                    content = "<?php echo CONTENT; ?>";

            });

            var rad = function(x) {
                return x * Math.PI / 180;
            };

            var getDistance = function(p1, p2) {
                var R = 6378137; // Earth’s mean radius in meter
                var dLat = rad(p2.lat() - p1.lat());
                var dLong = rad(p2.lng() - p1.lng());
                var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                        Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
                        Math.sin(dLong / 2) * Math.sin(dLong / 2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                var d = R * c;
                return d; // returns the distance in meter
            };

            /**
             * 
             * Geting current location of the user
             * @returns {undefined}
             */
            function initialize() {
                // Try HTML5 geolocation
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        codeLatLng(position.coords.latitude, position.coords.longitude);
                    }, function() {
                        handleNoGeolocation(true);
                    });
                } else {
                    // Browser doesn't support Geolocation
                    handleNoGeolocation(false);
                }
            }

            /**
             * 
             * Find current location of the user and matches with pre-defined 
             * loction
             * @param {number} longitude
             * @param {number} latitude 
             * @returns {Boolean}
             */
            function codeLatLng(latitude, longitude) {

                var latlng = new google.maps.LatLng(latitude, longitude);
                var latlng1 = latlng;

                var latlng2 = globalLatlng;

                var result = getDistance(latlng1, latlng2);
                console.log(result);

                geocoder.geocode({'location': latlng}, function(results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        if (results[1]) {

                            $('#footer').text("Location: " + results[1].formatted_address);
                            if (result < <?php echo RADIUS; ?>) {
                                $('#result').html('<div id="inner">' + content + '</div>');
                            } else {
                                if ("<?php echo NONCONTENTTYPE ?>" == "IMG")
                                    content = "<img src='<?php echo NONCONTENT; ?>' />";
                                else if ("<?php echo NONCONTENTTYPE ?>" == "URL")
                                    content = "<iframe src='<?php echo NONCONTENT; ?>' width='100%' height='600px' ></iframe>";
                                else
                                    content = "<?php echo NONCONTENT; ?>";
                                $('#result').html('<div id="inner">' + content + '</div>');
                            }
                        }
                        else {
                            window.alert('No results found');
                        }
                    } else {
                        window.alert('Geocoder failed due to: ' + status);
                    }
                });
            }

            /**
             * 
             * @param {type} errorFlag
             * @returns {undefined}         */
            function handleNoGeolocation(errorFlag) {
                if (errorFlag) {
                    var content = 'Error: The Geolocation service failed.';
                } else {
                    var content = 'Error: Your browser doesn\'t support geolocation.';
                }
                alert(content);
            }

            google.maps.event.addDomListener(window, 'load', initialize);

        </script>
    </head>

    <body>

        <div id="header">
            <h2>Location Locker</h2>
            <a href="index.php" style="position: absolute; right: 20px; top: 17px;">Settings</a>
        </div>
        <div id="result"></div>
        <div></div>
        <div id="footer"></div>
    </body>
</html>