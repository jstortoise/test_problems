
<script type="text/javascript" src="//code.jquery.com/jquery-1.11.3.min.js"></script>
<script>
	// Set address value here
	function getAddress() {
		var myinfo = {};
		$.ajax({
			url: `https://api.ipdata.co?api-key=95c250147de167a6d3a00d2e586e0c6c19b6382c5b67032be01bc8cc`,
			async: false,
			json: true,
			success: function(res) {
				var { latitude, longitude, city } = res;
				var address = "tokyo";
				myinfo = { latitude, longitude, city };
			}
		});
		return myinfo;
	}

	function rad(x) {
		return x * Math.PI / 180;
	}

	function getDistance(p1, p2) {
		var R = 6378137; // Earth’s mean radius in meter
		var dLat = rad(p2.lat - p1.lat);
		var dLong = rad(p2.lng - p1.lng);
		var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
				Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
				Math.sin(dLong / 2) * Math.sin(dLong / 2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		var d = R * c;
		return d || 0; // returns the distance in meter
	};

	const { latitude, longitude, city } = getAddress();

	$.get('./ajax.php', function(res) {
		var ret = JSON.parse(res);
		ret.forEach(obj => {
			const { location, radius, redirect_url } = obj;
			const [ lat, lng ] = location.split(', ');
			const p1 = { lat, lng };
			const p2 = { lat: latitude, lng: longitude };
			const distance = getDistance(p1, p2);
			
			if (distance < parseInt(radius)) {
				document.location = redirect_url;
			}
		});
	});
	
</script>
