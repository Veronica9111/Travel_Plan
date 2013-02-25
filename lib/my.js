var map = null;
var geocoder = null;
var place = {};
var marker_number = 0;
var poly;
var draw_line = false;

$(function(){
	
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
	
		//$("#place-name").attr("val","");
		var place_name_html = "<input id='place-name' type='text-field' value=''></input>";
		$("#place-name").replaceWith(place_name_html);

		//$("#place-name").val() = "";
		$("#add-marker-dialog").dialog("open");
	});
	//Dialog of Add Marker's Name
	//var marker;
	//var place_name;
	$("#add-marker-dialog").dialog({
		resizable: false,
		height:220,
		modal: true,
		autoOpen: false,
		buttons: {
			"Add Marker": function() {
			//Get Place's Name
			var place_name = $("#place-name").val();
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
			var $li = $("<li class='ui-state-default' id='"+text.replace(/\s/g, "-")+"' value='"+text+"'/>").text(text);
			$("#sortable").append($li);
			
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
			
			//Drag Marker Listener
			google.maps.event.addListener(marker, 'dragend', function() {
			//##
			place_name = place_name.replace(/\s/g,"-");
			place[place_name]=marker.getPosition();
			if (draw_line == true) {
				poly.setMap(null);
			}
			
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
					//alert(index);
					poly_array.push(place[oList[index]]);
				}
		
				poly.setMap(null);
				poly.setMap(map);
				poly.setPath(poly_array);
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
		change:  function (event, ui) {
            //Re draw the lines
			/*if (draw_line == true) {

				var polyOptions = {
					strokeColor: '#000000',
					strokeOpacity: 1.0,
					strokeWeight: 3
				}
				poly_array = new Array();
		
				//Get the list
				oList = new Array();
				$('#place-list li').each(function(iIndex, oElement) {
					oList.push($(this).attr('id'));
				});
		
				for (var index in oList) {
					poly_array.push(place[oList[index]]);
				}
		
				poly.setMap(null);
				poly.setMap(map);
				poly.setPath(poly_array);
			}*/
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
	

});