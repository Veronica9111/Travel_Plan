<?php
$plan_name = $_POST['plan_name'];
$places = $_POST['places'];
$opt = $_POST['opt'];

//Database information
$con = mysql_connect("127.0.0.1","root","123456");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }
mysql_select_db("test", $con);

error_log('result: ' . var_export($places, true), 3, 'tmp');
if ($opt == 1) {
//Insert the Plan 
foreach ($places as $place=>$point) {
$sql = "INSERT INTO plan (plan_name, place, longitude, latitude) values ('" . $plan_name . "', '" . $place . "', '" . $point[0] . "', '" . $point[1] . "')";
error_log('sql: ' . $sql, 3, 'tmp');
$result = mysql_query($sql, $con);
}

	echo 'OK';
}
else {
	echo 'NOK';
}
?>