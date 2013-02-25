$(function(){	$("#plan-name-dialog").dialog({
		resizable: false,
		height:250,
		modal: true,
		autoOpen:false,
		buttons: {
			"Start Plan": function() {
				$( this ).dialog( "close" );
				location.href = "plan.php?name=" + $("#input-plan-name").val();
			},
			Cancel: function() {
				$( this ).dialog( "close" );
			}
		}
    });
	$("#start").click(function(){
		$("#plan-name-dialog").dialog("open");
		
	});
	});