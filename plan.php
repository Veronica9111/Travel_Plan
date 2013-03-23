<?php
$plan_name = $_GET['name'];

?>


<html>
	<head>
		<script type="text/javascript"
			src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCHZKH75W2dTHlmmI_Q8DX12q3aJsIN97c&sensor=true&libraries=places,visualization">
		</script>
		<link rel="stylesheet" type="text/css" href="lib/my.css" />
		
		<script src="http://code.jquery.com/jquery-latest.js"></script>
		<script src="http://code.jquery.com/ui/1.10.1/jquery-ui.js"></script>
		<script src="lib/qtip2/jquery.qtip.min.js"></script>
		<link rel="stylesheet" type="text/css" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.0/themes/humanity/jquery-ui.css" />
		<link rel="stylesheet" type="text/css" href="lib/qtip2/jquery.qtip.min.css">
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
		<input id='place-name' type="text-field" value=""></input><br>
		on Date:
		<input id="place-date"></input><br>
		Comment for the place:<br>
		<textarea id='place-comment' rows="5" value=""></textarea>
	</div>
	<!-- Draw Lines -->
	<!-- <input id="draw-lines" type="button" class="ui-button" value="Draw Lines"></input> -->
	
	<!-- Draw Directions -->
	<select id='travel-mode'>
		<option>DRIVING</option>
		<option>BICYCLING</option>
		<option>TRANSIT</option>
		<option>WALKING</option>
	</select>
	<input id="draw-directions" type="button" class="ui-button" value="Draw Directions"></input>
	<!-- Clean -->
	<input id="clean" type="button" class="ui-button" value="Clean"></input>
	<!-- -Search Nearby -->
	Search:
	<input id="search-nearby_type"></input>
	in
	<select id="search-nearby-distance">
		<option>100</option>
		<option>200</option>
		<option>500</option>
		<option>1000</option>
		<option>1500</option>
		<option>2000</option>
		<option>5000</option>
		<option>10000</option>
	</select> meters
	<input id="search-nearby" type="button" class="ui-button" value="Go"></input>
	<!-- Save the Plan -->
	<input id="save-plan" type="button" class="ui-button" value="Save Plan"></input>
	<!-- Remove Marker -->
	<div id="remove-marker-dialog" title="Are you sure to remove the place?">
	</div>
	
	<!-- Dialog for nearby search results-->
	<div id="nearby-results">
		<div id="nearby-content"></div>
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