<!DOCTYPE html>
<html>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
		<link rel="stylesheet" href="css/style.css">
		<!-- jQuery library -->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
		<!-- Latest compiled JavaScript -->
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
		<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyCBjzENITL9m-v5VXHZXz10nHzE5VpCWVo&libraries=places"></script>
	</head>
	<body>
		<h2>Google Street View Generator</h2>		
		<div class="modal fade bs-example-modal-sm" id="mySmallModel">
		  <div class="modal-dialog modal-sm" role="document">
			<div class="modal-content" style="padding:20px;min-height:60px;color:#333;">
			   Embeded source code copied!!
			</div>
		  </div>
		</div>
		<br />
		<br />
		<div class="row">
		  <div class="col-md-6">
			<div class="col-md-12">
				<label for="searchTextField">Enter Address</label>
				<input type="text" class="form-control" id="searchTextField">
			</div>
			<div class="col-md-12">	<br /><br />
				<textarea id="responsehtml" class="form-control" rows="15" cols="40" ></textarea>
				<br>
				<button type="button" onclick="myFunction()" class="btn btn-primary">Copy source code</button>
			</div>
		  </div>
		  <div class="col-md-6">
						<div class="map">
							<div id="pano" style="float: left;"><span style="padding-left:20px;">Please type location in address input box</span></div>
						</div>	
						<div class="clear"></div>	
		  </div>
		  <div class="clear"></div>	
		</div>

	  <script type="text/javascript">
		function initialize(){
			autocomplete = new google.maps.places.Autocomplete((document.getElementById("searchTextField")));
				google.maps.event.addListener(autocomplete,"place_changed",function(){
					  var b=autocomplete.getPlace();
					  console.log(b.geometry.location.lat());
					  console.log(b.geometry.location.lng());
					  setstreetView(b.geometry.location.lat(),b.geometry.location.lng())
				}
			  )
		}
		google.maps.event.addDomListener(window, 'load', initialize);
	  </script>

	  <script type="text/javascript">
			  function setstreetView(lt,ln) {
				  var fenway = {lat: lt, lng: ln};
				var panorama = new google.maps.StreetViewPanorama(
					document.getElementById('pano'), {
					  position: fenway,
					  pov: {
						heading: 34,
						pitch: 10
					  }
					});
				var xhr = new XMLHttpRequest();
				xhr.onreadystatechange = function() {
					if (xhr.readyState == XMLHttpRequest.DONE) {
						
						 document.getElementById("responsehtml").innerText = xhr.responseText;
					}
				}
				xhr.open('GET', "responseh.php?lt="+lt+"&ln="+ln, true);
				xhr.send(null);
			  }

			function myFunction() {
			  // Get the text field /
			  var copyText = document.getElementById("responsehtml");			
			  // Select the text field /
			  copyText.select();
			  document.execCommand("copy");
			  
				jQuery(document).ready(function(){
					jQuery('#mySmallModel').modal('show');
				})
			
				setTimeout(function (){
					jQuery('#mySmallModel').modal('hide');
				}, 1000);		
			}
		</script>
	</body>
</html>
