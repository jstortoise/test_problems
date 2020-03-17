<script type="text/javascript">

function test() {
  var value = '<?php echo $val = getSession(); ?>';
  if (value == null || value == "null" || value == 0) {
      var gip = "";
      $.get("https://api.ipdata.co?api-key=8705b56ff5920952268a8d4ed5ec8883ae91d185c46e685ac17e74bc", function (response) {
          $("#response").val(response.ip);
      }, "jsonp")
      .fail(function() {
      	$.get('http://api.db-ip.com/v2/free/8.8.8.8', function(response) {
			$("#response").val(response.ipAddress);
      	}).fail(function() {
      		$.get('http://ip-api.com/json/', function(response) {
      			$("#response").val(response.query);
      		}).fail(function() {
      			$.get('https://ipapi.co/json/', function(response) {
      				$("#response").val(response.ip);
      			}).fail(function() {
      				$.get('https://ipvigilante.com/', function() {
      					$("#response").val(response.ipv4);
      				})
      			})
      		})
      	});
      });
      value = $("#response").val();

      $.post("ajax_session.php", {val: value}, function (data) {});

  }
  setTimeout(test, 4000);
}

</script>