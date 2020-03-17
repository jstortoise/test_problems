<?php
    // $lat = $_POST['lat'];
    // $lng = $_POST['lng'];
    // $address = $_POST['address'];

    // Save to json file
	$file = 'db.json';
	// Open the file to get existing content
	$current = file_get_contents($file);
	// Append a new person to the file
	// $data_list = json_decode($current, true);

    // $ret = array();
	// foreach ($data_list as $data) {
	// 	if (stripos($data['address'], $address) !== false) {
	// 		$ret[sizeof($ret)] = $data;
	// 	}
    // }
    
    // echo json_encode($ret);
    echo $current;
?>
