var map = null;
var geocoder = null;
var place = {};
var marker_number = 0;
var poly;
var draw_line = false;
var service;
var nearby_place = {};
var directionsService;
var directionsDisplay = {};
var count = 0;
var my_routes = [];
var direction_index = 0;
$(function(){
	$('a[title]').qtip();
	$("#place-date").datepicker({ dateFormat: "yy-mm-dd" });
	//Initiate the Google Map
	
	 var mapOptions = {
          center: new google.maps.LatLng(31.397, 121.644),
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("map_canvas"),
            mapOptions);

			



	
	//Search for the place
	geocoder = new google.maps.Geocoder();
	$("#search-button").click(function(){

		
		var address = $("#search-place").val();
		
		geocoder = new google.maps.Geocoder();
		geocoder.geocode({'address': address}, function(results, status){
			if (status == google.maps.GeocoderStatus.OK) {
				var lat = results[0].geometry.location.lat();
				var lng = results[0].geometry.location.lng();
				var point = new google.maps.LatLng(lat, lng);
				map.setCenter(point, 15);
				map.setZoom(12);
				$("#add-marker-dialog").dialog("open");
				//Add the marker for the place
				/*var marker = new google.maps.Marker({
					position: map.getCenter(),
					draggable: true,
					map: map,
					title: address
				});
				place[place_name] = map.getCenter();
				marker_number++;
				//Set info window for marker
				var infowindow = new google.maps.InfoWindow();
				infowindow.setContent(address);
				infowindow.open(map, marker);
			
				//Add the place into list
				var text = address;
				text = text.replace(/,/g, "");
				alert(text);
				var $li = $("<li class='ui-state-default' id='"+text.replace(/\s/g, "-")+"'/>").text(text);
				$("#sortable").append($li);
				
				//Drag Marker Listener
				google.maps.event.addListener(marker, 'dragend', function() {
					place[address]=marker.getPosition();
					poly.setMap(null);
				});
				
				
			
				//Remove Marker Listener
				google.maps.event.addListener(marker, 'dblclick', function(){
					$("#remove-marker-dialog").dialog("open");
					place[address]="";
					poly.setMap(null);
				});
				
				//Remove Marker dialog
				$("#remove-marker-dialog").dialog({
					resizable: false,
					height:140,
					modal: true,
					autoOpen: false,
					buttons: {
						"Remove": function() {
							var remove_id = marker.getTitle().replace(/\s/g, "-");
							remove_id = remove_id.replace(/,/g,"");
							$("#"+remove_id+"").remove();
							place[remove_id] = "";
							marker.setMap(null);
							marker_number--;
							$( this ).dialog( "close" );
						},
						Cancel: function() {
							$( this ).dialog( "close" );
						}
					}
				});
			*/
			}
			else{
				alert('Can not find the place you need!');
			}
		});
	});

	//Auto complete search box
	 $("#search-place").autocomplete({ source: function(request, response) {
	geocoder.geocode( {'address': request.term }, function(results, status) { 
			if (status == google.maps.GeocoderStatus.OK) {
				var lat = results[0].geometry.location.lat();
				var lng = results[0].geometry.location.lng();
				var latlng = new google.maps.LatLng(lat, lng);


				geocoder.geocode({'latLng': latlng}, function(results1, status1) {
					if (status1 == google.maps.GeocoderStatus.OK) {
						if (results1[1]) {
							response($.map(results1, function(loc) {
								return {
									label: loc.address_components.short_name,
									value: loc.formatted_address,
									bounds: loc.geometry.bounds
								}
							}));
						}
					}
				});
			}
		});
	}});
	
	//Add Markers
	$("#add-marker").click(function(){
	

		var place_name_html = "<input id='place-name' type='text-field' value=''></input>";
		$("#place-name").replaceWith(place_name_html);

		var place_date_html = "<input id='place-date'></input>";
		$("#place-date").replaceWith(place_date_html);
		$("#place-date").datepicker({ dateFormat: "yy-mm-dd" });
		var place_comment_html = "<textarea id='place-comment' value=''></textarea>";
		$("#place-comment").replaceWith(place_comment_html);

		$("#add-marker-dialog").dialog("open");
	});
	//Dialog of Add Marker's Name
	//var marker;
	//var place_name;
	$("#add-marker-dialog").dialog({
		resizable: true,
		height:380,
		modal: true,
		autoOpen: false,
		title: 'Add Place',
		buttons: {
			"Add Marker": function() {
			//Get Place's Name
			var place_name = $("#place-name").val();
			var comment = $("#place-comment").val();
			var date = $("#place-date").val();
			//Add a marker at center
				var marker = new google.maps.Marker({
				position: map.getCenter(),
				draggable: true,
				map: map,
				title: place_name
			});
			//##
			var place_name_show = place_name;
			place_name = place_name.replace(/\s/g,"-");
			place[place_name] = map.getCenter();
			marker_number++;
			if (marker_number > 2) {
				if (draw_line == true) {


				}
			}
			//Set info window for marker
			var infowindow = new google.maps.InfoWindow();
			infowindow.setContent(place_name_show);
			infowindow.open(map, marker);
			
			//Add the place into list
			var text = place_name_show;
			text = text.replace(/,/g, "");
			var text_content = "<a title='"+ comment + "===> on Date: " + date +"'>" + text + "</a>";
			var $li = $("<li class='ui-state-default' id='"+text.replace(/\s/g, "-")+"' value='"+text+"'/>");//.text(text);
			$(text_content).appendTo($li);
			//$li.add(text_content);
			$("#sortable").append($li);
			
			//Re draw the lines
			if (draw_line == true) {
	
				
			//Redraw the directions
				
				
			directionsList = [];
			
			if (count >=1) {
				clean_directions();
				count= count+1;
			}

			//var mode = google.maps.DirectionsTravelMode.DRIVING;
			var select_mode = $("#travel-mode").val();
			//alert('hello');
			//alert(select_mode);
			var mode;
			if (select_mode == 'DRIVING'){
			     mode = google.maps.DirectionsTravelMode.DRIVING;
			}
			else if(select_mode == 'BICYCLING') {
				mode = google.maps.DirectionsTravelMode.BICYCLING;
			}
			else if (select_mode == 'TRANSIT') {
				mode = google.maps.DirectionsTravelMode.TRANSIT;
			}
			else {
				mode = google.maps.DirectionsTravelMode.WALKING;
			}
			
			var routes = [];
		
			directionList = [];
			for (index in place) {
				directionsList.push(place[index]);
			}
		
			for (var i = 0; i < directionsList.length - 1; i++) {
				var is_end = false;
				if ( i == directionsList.length) {
					is_end = true;
				}

			
				draw_direction(directionsList[i], directionsList[i+1], mode, is_end);
			}
		
			count++;
				
		}
			
			//Drag Marker Listener
			google.maps.event.addListener(marker, 'dragend', function() {
			//##
			place_name = place_name.replace(/\s/g,"-");
			place[place_name]=marker.getPosition();
			if (draw_line == true) {
				//poly.setMap(null);
			}
			
			//Re draw the lines
			if (draw_line == true) {

				//Get the list
				var oList = new Array();
				$('#place-list li').each(function(iIndex, oElement) {
					oList.push($(this).attr('id'));
				});
		
				
				
				directionsList = [];
			
			if (count >=1) {
				clean_directions();
				count= count+1;
			}

			var mode = google.maps.DirectionsTravelMode.DRIVING;
			var routes = [];
		
			directionList = [];
			for (index in place) {
				directionsList.push(place[index]);
			}
		
			for (var i = 0; i < directionsList.length - 1; i++) {
				var is_end = false;
				if ( i == directionsList.length) {
					is_end = true;
				}

			
				draw_direction(directionsList[i], directionsList[i+1], mode, is_end);
			}
		
			count++;
				
				
		}
			
			
			
			
			
			});

			
			//Remove Marker Listener
			google.maps.event.addListener(marker, 'dblclick', function(){
			$("#remove-marker-dialog").dialog({
				resizable: false,
				height:140,
				modal: true,
				autoOpen: false,
				buttons: {
					"Remove": function() {
						var remove_id = marker.getTitle().replace(/\s/g,"-");
						remove_id = remove_id.replace(/,/g, "");
						//alert(remove_id);
						$("#"+remove_id+"").remove();
						place[remove_id] = "";
						marker.setMap(null);
						//poly.setMap(null);
						marker_number--;
						$( this ).dialog( "close" );
						
									//Re draw the lines
			if (draw_line == true) {

				var polyOptions = {
					strokeColor: '#000000',
					strokeOpacity: 1.0,
					strokeWeight: 3
				}
				var poly_array = new Array();
		
				//Get the list
				var oList = new Array();
				$('#place-list li').each(function(iIndex, oElement) {
					oList.push($(this).attr('id'));
				});
		
				for (var index in oList) {
					poly_array.push(place[oList[index]]);
				}
		
				poly.setMap(null);
				poly.setMap(map);
				poly.setPath(poly_array);
			}
					},
					Cancel: function() {
						$( this ).dialog( "close" );
					}
				}
			});
				$("#remove-marker-dialog").dialog("open");
				//Remove Marker dialog
				
			

			});
			
			
			
			
			//Close
			$( this ).dialog( "close" );
			},
			Cancel: function() {
				$( this ).dialog( "close" );
			}
		}
    });
	

			
	//Draw Lines
	$("#draw-lines").click(function(){
		draw_line = true;
		var polyOptions = {
			strokeColor: '#000000',
			strokeOpacity: 1.0,
			strokeWeight: 3
		}
		var poly_array = new Array();
		
		//Get the list
		oList = new Array();
		$('#place-list li').each(function(iIndex, oElement) {
			oList.push($(this).attr('id'));
		});
		
		for (var index in oList) {
			//alert(oList[index]);
			poly_array.push(place[oList[index]]);
		}

		poly = new google.maps.Polyline(poly_array);
		poly.setMap(null);
		poly.setMap(map);
		poly.setPath(poly_array);
	});
	
	//Sortable lists
	$( "#sortable" ).sortable({
		revert: true,
		stop:  function (event, ui) {
            //Re draw the directions
			
		
				//Get the list
				directionsList = [];
				oList = new Array();
				$('#place-list li').each(function(iIndex, oElement) {
					if ($(this).attr('id') != 'undefined'){ 
						oList.push($(this).attr('id'));
						alert($(this).attr('id'));
					}
				});
		
				for (var index in oList) {
					//poly_array.push(place[oList[index]]);
					directionsList.push(place[oList[index]]);
				}
		
		
		
					if (draw_line == true) {
	
				
			//Redraw the directions
				
				
			
			
			if (count >=1) {
				clean_directions();
				count= count+1;
			}

			//var mode = google.maps.DirectionsTravelMode.DRIVING;
			var select_mode = $("#travel-mode").val();
			alert('hello');
			alert(select_mode);
			var mode;
			if (select_mode == 'DRIVING'){
			     mode = google.maps.DirectionsTravelMode.DRIVING;
			}
			else if(select_mode == 'BICYCLING') {
				mode = google.maps.DirectionsTravelMode.BICYCLING;
			}
			else if (select_mode == 'TRANSIT') {
				mode = google.maps.DirectionsTravelMode.TRANSIT;
			}
			else {
				mode = google.maps.DirectionsTravelMode.WALKING;
			}
			var routes = [];
		
			/*directionList = [];
			for (index in place) {
				directionsList.push(place[index]);
			}
			*/
			//alert(directionsList.length);
			for (var i = 0; i < directionsList.length - 1; i++) {
			//alert(directionsList[i]);
				var is_end = false;
				if ( i == directionsList.length) {
					is_end = true;
				}

			
				draw_direction(directionsList[i], directionsList[i+1], mode, is_end);
			}
		
			count++;
				
		}
			
		
		

			}
        
    });

    $( "#draggable" ).draggable({
		connectToSortable: "#sortable",
		helper: "clone",
		revert: "invalid"
    });
    $( "ul, li" ).disableSelection();
	
	
	//Save the whole plan
	$("#save-plan").click(function(){
		var plan_name = $("#plan-title").attr('value');
		
		var place_array={};
		for(var index in place){
			place_array[index] = {};
			place_array[index][0] = '' + place[index].lat();
			place_array[index][1] = '' + place[index].lng();
			//alert(index);
		}
		
		$.post("query.php", {"plan_name":plan_name, "places":place_array, "opt":1}, function(status){
		if (status == "OK") {
			alert("Your Plan has been saved!")
		}
		else {
			alert("Sorry! Your plan is failed to be saved!");
		}
		});
	});
	
	$("#search-nearby").click(function(){
	
	var distance = $("#search-nearby-distance").val();
	var search_type = $("#search-nearby_type").val();
	
		var request = {
			location:map.getCenter(),
			radius: distance,
			types:[search_type]
		};
		service = new google.maps.places.PlacesService(map);
		service.nearbySearch(request, function(results, status){
			//alert(results);
			if (status == google.maps.places.PlacesServiceStatus.OK) {
				
				
				var place_name_str = "";
				for (var i = 0; i < results.length; i++) {
					var place = results[i];
					
					place_name_str += "<input class = 'nearby_checkbox' id='" + place.id + "' type = 'checkbox' name='nearby_checkbox' value = '"+place.name+"'>" + place.name + "</input><br>";
					nearby_place[place.id] = place;
					//alert(place_name_str);
					//alert(place.id);
				}
				place_name_str = "<div id='nearby-content'>" + place_name_str + "</div>";
				$("#nearby-content").replaceWith(place_name_str);
				$("#nearby-results").dialog({
				
					resizable: true,
					height:360,
					modal: true,
					autoOpen: false,
					buttons: {
						"Add to List": function() {

							
							
								$("input[name='nearby_checkbox']:checkbox:checked").each(function(){
		//							alert($(this).attr('checked'));
			//						if ($(this).attr('checked') == true) {
										//nearby_place.push($(this).attr('id'));
										
										//alert($(this).attr('id'));
										addMarker($(this).attr('id'));
				//					}
								});
								
								/*alert($(this).attr('id'));
								alert($(this).attr('checked'));
								if ($(this).attr('checked') == true) {
									nearby_place.append($(this.attr('id')));
									alert($(this).attr('id'));
								}*/
							

							$( this ).dialog( "close" );
						},
						Cancel: function() {
							$( this ).dialog( "close" );
						}
					}
				});
				$("#nearby-results").dialog("open");
			}
		});
	});
	
	function addMarker(place_id){
		var marker = new google.maps.Marker({
				position: nearby_place[place_id].geometry.location,
				draggable: false,
				map: map,
				title: nearby_place[place_id].name
			});
		//Add to global 'place'
		place[nearby_place[place_id].name] = nearby_place[place_id].geometry.location;
		marker_number++;
		//Add to list
			var text = nearby_place[place_id].name;
			text = text.replace(/,/g, "");
			var $li = $("<li class='ui-state-default' id='"+text.replace(/\s/g, "-")+"' value='"+text+"'/>").text(text);
			$("#sortable").append($li);
	}
	
	//Draw directions
	
	$("#draw-directions").click(function(){
		directionsList = [];
		draw_line = true;
		if (count >=1) {
		clean_directions();
		count= count+1;
		}

		//var mode = google.maps.DirectionsTravelMode.DRIVING;
		var select_mode = $("#travel-mode").val();
			alert('hello');
			alert(select_mode);
			var mode;
			if (select_mode == 'DRIVING'){
			     mode = google.maps.DirectionsTravelMode.DRIVING;
			}
			else if(select_mode == 'BICYCLING') {
				mode = google.maps.DirectionsTravelMode.BICYCLING;
			}
			else if (select_mode == 'TRANSIT') {
				mode = google.maps.DirectionsTravelMode.TRANSIT;
			}
			else {
				mode = google.maps.DirectionsTravelMode.WALKING;
			}
		var routes = [];
		
		directionList = [];
		for (index in place) {
			directionsList.push(place[index]);
		}
		
		for (var i = 0; i < directionsList.length - 1; i++) {
			var is_end = false;
			if ( i == directionsList.length) {
				is_end = true;
			}

			
			draw_direction(directionsList[i], directionsList[i+1], mode, is_end);
		}
		
		count++;
		
		
		
	});
	
	function draw_direction(start, end, mode, is_end)
	{
		//alert('hi');
		//alert(start);
		var origin = start;
		var dest = end;
		//var directionsDisplay = new google.maps.DirectionsRenderer;
		
		
		
		
		directionsService = new google.maps.DirectionsService();
		var request = {origin: start, destination: end, travelMode: mode, optimizeWaypoints: true, avoidHighways: false, avoidTolls: false}
		
		if (is_end) {
		//directionsDisplay.setMap(null);
			request = null;
			
		}
		
		directionsService.route
		(
			request, function(response, status){
				if (status == google.maps.DirectionsStatus.OK) {
				//alert(response);
				    directionsDisplay[direction_index] = new google.maps.DirectionsRenderer({markerOptions:{visible:false}});
					directionsDisplay[direction_index].setMap(map);
					directionsDisplay[direction_index].setDirections(response);
					direction_index++;
					//my_routes.push(response.routes);
					if (is_end) {
						response = null;
					}
				}
			}
		);
		//directionsDisplay.setMap(map);
		
		//directionsVisible = true;	
		
		
	}
	
	$("#clean").click(function(){
		clean_directions();
	});
	
	function clean_directions()
	{
		//alert('clean~~~~');
		for (var index in directionsDisplay){
			directionsDisplay[index].set('directions', null);
			directionsDisplay[index].setMap(null);
			//directionsDisplay[index].setMap(map);
		}
		
	}

});


//Well, it will be better if I have one more function()
$(function(){
	var availableTypes = ["accounting", "airport", "amusement_park", "aquarium", "art_gallery", "atm", "bakery",
		"bank", "bar", "beauty_salon", "bicycle_store", "book_store", "bowling_alley", "bus_station", "cafe",
		"campground", "car_dealer", "car_rental", "car_repair", "car_wash", "casino", "cemetery", "church",
		"city_hall", "clothing_store", "convenience_store", "courthouse", "dentist", "department_store", "doctor",
		"electrician", "electronics_store", "embassy", "establishment", "finance", "fire_station", "florist", "food",
		"funeral_home", "funiture_store", "gas_station", "general_contractor", "grocery_or_supermarket", "gym",
		"hair_care", "hardware_store", "health", "hindu_temple", "home_goods_store", "hospital", "insurance_agency",
		"jewelry_store", "laundry", "lawyer", "library", "liquor_sotre", "local_government_office", "locksmith", "lodging",
		"meal_delivery", "meal_takeaway", "mosque", "movie_rental", "movie_theater", "moving_company", "museum", "night_club",
		"painter", "park", "parking","pet_store", "pharmacy", "physiotherapist", "place_of_worship", "plumber", "police",
		"post_office", "real_estate_agency", "restaurant", "roofing_contractor", "rv_park", "school", "shoe_store",
		"shopping_mall", "spa", "stadium", "storage", "store", "subway_station", "synagogue", "taxi_stand", "train_station",
		"travel_agency", "university", "veterinary_care", "zoo"
		
	];
	$("#search-nearby_type").autocomplete({
		source : availableTypes
	});

	
	
});