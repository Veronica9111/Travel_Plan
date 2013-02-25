<?php
$plan_name = $_GET['name'];

?>


<html>
	<head>
		<script type="text/javascript"
			src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCHZKH75W2dTHlmmI_Q8DX12q3aJsIN97c&sensor=true&amp;language=en-UK">
		</script>
		<link rel="stylesheet" type="text/css" href="lib/my.css" />
		<script src="http://code.jquery.com/jquery-latest.js"></script>
		<script src="http://code.jquery.com/ui/1.10.1/jquery-ui.js"></script>
		<link rel="stylesheet" type="text/css" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.0/themes/humanity/jquery-ui.css" />
		<script type="text/javascript"
			src="lib/my.js">
		</script>

	</head>
	<body>
	<div id='decorate' style="margin-left:350px">
		<img src="pic/hr.png" ></img>
	</div>
	<h1 id="plan-title" value="<?php echo $plan_name?>"><?php
		echo $plan_name;
	?></h1>
	<!-- Search for the place -->
	<input id="search-place" type='text-field'></input>
	<input id="search-button" type='button' class="ui-button" value="Search"></input>
	
	<!-- Add Marker -->
	<input id="add-marker" type='button' class="ui-button" value="Add Marker"></input>
	<div id="add-marker-dialog">
		<p>Place Name</p>
		<input id='place-name' type="text-field" value=""></input>
	</div>
	<!-- Draw Lines -->
	<input id="draw-lines" type="button" class="ui-button" value="Draw Lines"></input>
	<!-- Save the Plan -->
	<input id="save-plan" type="button" class="ui-button" value="Save Plan"></input>
	<!-- Remove Marker -->
	<div id="remove-marker-dialog" title="Are you sure to remove the place?">
	</div>
	
	<!-- Map Canvas -->
	<div id="map_canvas" style="width:80%; height:100%; float:right"></div>
	<!-- List -->
	<div id="place-list">
		<ul id="sortable">
		</ul>
	</div>
	
	
	</body>

</html>