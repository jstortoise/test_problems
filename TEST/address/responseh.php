<?php 
$var = '<!DOCTYPE html>
<html>
<head>
  <title>Embed HTML STREETVIEW</title>
   <style>
       
      html, body {
        height: 100%;
        margin: 0px;
        padding: 0px
      }
    
      #panor {
        float: left;
        height: 100%;
        width: 100%;
        overflow: inherit !important;
      }
    </style>
  <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyD-eTBHTHTGlm7xZornK2HWtF7sZMmLDSc&libraries=places"></script>
  
</head>
<body>
<div id="panor"></div>
 <script>
      function setstreetView() {
        var fenway = {lat: '.$_REQUEST['lt'].', lng: '.$_REQUEST['ln'].'};       
        var panorama = new google.maps.StreetViewPanorama(
            document.getElementById(\'panor\'), {
              position: fenway,
              pov: {
                heading: 34,
                pitch: 10
              }
            });
      }
       google.maps.event.addDomListener(window, \'load\', setstreetView);

    </script>
</body>
</html>';
echo $var; 
?>