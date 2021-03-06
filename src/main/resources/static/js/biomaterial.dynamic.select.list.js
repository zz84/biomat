$(document).ready(function () {
	
	$("#selectedBioVariableId" ).on( "focus", function() {
	    console.log( "selectedBioVariableId got focus. now fetching selected Material" );
	    
	    $("#selectedBioVariableId").empty();
	    $("#selectedDependentBioVariableId").empty();
	    $("#selectedBioFormulaId").empty();
	    jQuery('#materialComposition').empty();
	    
	    var materialId = $("#selectedBioMaterialId").val();
	    
		if(materialId != '' ){
			console.log( "Got MaterialID " +  materialId + " Now fetching variables for the material");
			$.get( "getVariablesForBiMaterial?materialId="+materialId, function( response ) {
				$('#selectedBioVariableId').empty()
					var jsonValue = JSON.parse(response);
					var variableOptionsString="";
					for( var i=0;i<jsonValue.data.length;i++){
						variableOptionsString += "<OPTION value = "+jsonValue.data[i].id+">"+jsonValue.data[i].name+"</OPTION>";
						var o = new Option( jsonValue.data[i].name,jsonValue.data[i].id);
						$(o).html(jsonValue.data[i].name);
						$("#selectedBioVariableId").append(o);	
					}
					console.log( variableOptionsString );
			})
		}
		else{
			console.log( "Must select a material before selecting a variable.");
			$("#selectedBioMaterialId").focus();
			$.alert({
			    title: 'Alert!',
			    content: 'Must select a material before selecting a variable.!',
			});
		}
	});
	
	
	$("#selectedDependentBioVariableId" ).on( "focus", function() {
	    var materialId = $("#selectedBioMaterialId").val();
	    var variableId = $("#selectedBioVariableId").val();
	    console.log( "selectedBioDependentVariableId got focus selected materialId:variabledId " +  materialId + ":" + variableId );

	    $("#selectedDependentBioVariableId").empty();
	    $("#selectedBioFormulaId").empty();
	    jQuery('#materialComposition').empty();
	    
	    if(materialId == '' ){
			console.log( "Must select a material before selecting a variable.");
			$("#selectedBioMaterialId").focus();
			$.alert({
				title: 'Alert!',
				content: 'Must select a material and variable before selecting a dependent variable.!',
			});
			return;
	    }
	    
	    if(variableId == '' || variableId == null){
			console.log( "Must select a Variable efore selecting a Dependent Variable.");
			$("#selectedBioVariableId").focus();
			$.alert({
				title: 'Alert!',
				content: 'Must select a Variable before selecting a Dependent Variable.!',
			});
			return;
	    }
	    
	    
		
		$.get("getVariablesInFormula?materialId="+materialId + "&variableId=" +variableId, function( response ) {
			$('#selectedDependentBioVariableId').empty()
			
				var jsonValue = JSON.parse(response);
				console.log( jsonValue);
				var variableOptionsString="";
				for( var i=0;i<jsonValue.data.bioVariables.length;i++){
					variableOptionsString += "<OPTION value = "+jsonValue.data.bioVariables[i].id+">"+jsonValue.data.bioVariables[i].name+"</OPTION>";
					var o = new Option( jsonValue.data.bioVariables[i].name,jsonValue.data.bioVariables[i].id);
					$(o).html(jsonValue.data.bioVariables[i].name);
					$("#selectedDependentBioVariableId").append(o);	
				}
				for( var i=0;i<jsonValue.data.bioComposition.length;i++){
					variableOptionsString += "<OPTION value = "+jsonValue.data.bioComposition[i].id+">"+jsonValue.data.bioComposition[i].tagName+"</OPTION>";
					var o = new Option( jsonValue.data.bioComposition[i].tagName,jsonValue.data.bioComposition[i].id);
					$(o).html(jsonValue.data.bioComposition[i].tagName);
					$("#selectedDependentBioVariableId").append(o);	
				}

				console.log( variableOptionsString );
		})
	    
	    
	});
	
	
	$("#selectedBioFormulaId" ).on( "focus", function() {
	    var materialId = $("#selectedBioMaterialId").val();
	    var variableId = $("#selectedBioVariableId").val();
	    var dependentVariableId = $("#selectedDependentBioVariableId").val();
	    jQuery('#materialComposition').empty();
	    console.log( "selectedBioFormulaId   got focus selectedBioDependentVariableId selected materialId:variabledId:dependentVariableId " +  materialId + ":" + variableId  + ":"+ dependentVariableId);
	    $("#selectedBioFormulaId").empty();

	    if(materialId == '' ){
			console.log( "Must select a material before selecting a variable.");
			$("#selectedBioMaterialId").focus();
			$.alert({
				title: 'Alert!',
				content: 'Must select a material, variable  and dependent Variable before selecting a Formula.!',
			});
			return;
	    }
	    
	    if(variableId == '' || variableId == null){
			console.log( "Must select a Variable before selecting a Dependent Variable.");
			$("#selectedBioVariableId").focus();
			$.alert({
				title: 'Alert!',
				content: 'Must select a material, variable  and dependent Variable before selecting a Formula.!',
			});
			return;
	    }

	    if(dependentVariableId == '' || dependentVariableId == null){
			console.log( "Must select a material, variable  and dependent Variable before selecting a Formula.");
			$("#selectedDependentBioVariableId").focus();
			$.alert({
				title: 'Alert!',
				content: 'Must select a material, variable  and dependent Variable before selecting a Formula.!',
			});
			return;
	    }

	    
	
		$.get("getBioFormula?materialId="+materialId + "&variableId=" +variableId+ "&dependentVariableId=" +dependentVariableId, function( response ) {
			$('#selectedBioFormulaId').empty()
				var jsonValue = JSON.parse(response);
				var optionsString="";
				for( var i=0;i<jsonValue.data.length;i++){
					optionsString += "<OPTION value = "+jsonValue.data[i].id+">"+jsonValue.data[i].formulaAndName+"</OPTION>";
					var o = new Option( jsonValue.data[i].formulaAndName,jsonValue.data[i].id);
					$(o).html(jsonValue.data[i].formulaAndName);
					$("#selectedBioFormulaId").append(o);	
				}
				console.log( optionsString );
		})
	    
	
	});

/* Material Composition START**/

	
	$("#add-material-composition" ).on( "click", function() {
		var materialId = $("#selectedBioMaterialId").val();
		var formulaId = $("#selectedBioFormulaId").val();
		var dependentVariableId = $("#selectedDependentBioVariableId").val();
		jQuery('#materialComposition').empty();
		$.get("getBioMaterialCompositionForFormula?materialId="+materialId +"&formulaId="+formulaId +"&dependentVariableId="+dependentVariableId, function( response ) {
			
			var jsonValue = JSON.parse(response);
			
				if(jsonValue.data.length==0){
					$.alert({
						title: 'Alert!',
						content: 'No user input is needed. Please proceed to Chart Formula.!',
					});
					return;
				}
			
				var inptString= "		<div class='row' >\n" + 
				"			<div class='col-sm-1'>&nbsp;</div>\n" + 
				"			<div class='col-sm-2 text-info'><b>Material Composition </b></div>\n" + 
				"			<div class='col-sm-2 text-info'><b>Unit</b></div>\n" + 
				"			<div class='col-sm-2 text-info'><b>USDA Value</b> </div>\n" + 
				"			<div class='col-sm-2 text-info'><b>Change Value(Optional)</b></div>\n" + 
				"		</div>\n" + 
				"";
				for( var i=0;i<jsonValue.data.length;i++){
					//inptString+=jsonValue.data[i].nutrientName + "&nbsp;&nbsp;" +jsonValue.data[i].nutrientValue
					inptString+="<div class='form-group row'>\n" + 
					"			<input  type='hidden'   value = '" + jsonValue.data[i].bioMaterialId	+"' 	id='bioMaterialCompositionModelList["+i+"].bioMaterialId' name='bioMaterialNutrientModelList["+i+"].bioMaterialId'/>\n" + 
					"			<input type='hidden'  value = '" + jsonValue.data[i].bioNutrientId 	+"' 	id='bioMaterialCompositionModelList["+i+"].bioNutrientId' name='bioMaterialCompositionModelList["+i+"].bioNutrientId'/>			\n" + 
					"			<input  type='hidden'  value = '" + jsonValue.data[i].nutrientName	+"' 	id='bioMaterialCompositionModelList["+i+"].nutrientName' name='bioMaterialCompositionModelList["+i+"].nutrientName'/>			\n" + 
					"			<input  type='hidden' value = '" + jsonValue.data[i].nutrientUnit	+"' 	id='bioMaterialCompositionModelList["+i+"].nutrientUnit' name='bioMaterialCompositionModelList["+i+"].nutrientUnit'/>			\n" + 
					"			<input  type='hidden' value = '" + jsonValue.data[i].nutrientValue	+"' 	id='bioMaterialCompositionModelList["+i+"].nutrientValue' name='bioMaterialCompositionModelList["+i+"].nutrientValue'/>			\n" +
					"			<input  type='hidden' value = '" + jsonValue.data[i].nutrientSymbol	+"' 	id='bioMaterialCompositionModelList["+i+"].nutrientSymbol' name='bioMaterialCompositionModelList["+i+"].nutrientSymbol'/>			\n" + 
					"\n" + 
					"			<div class='col-sm-1'>&nbsp;</div>\n" + 
					"			<div class='col-sm-2 text-info'>"+jsonValue.data[i].nutrientName+"</div>  \n" + 
					"			<div class='col-sm-2 text-info'>"+jsonValue.data[i].nutrientUnit+"</div>\n" + 
					"			<div class='col-sm-2 text-info'>"+jsonValue.data[i].nutrientValue+"</div>\n" + 
					"			<div class='col-sm-2'>\n" + 
					"				<input class='form-control' id='bioMaterialCompositionModelList["+i+"].userValue' name='bioMaterialCompositionModelList["+i+"].userValue' value ="+jsonValue.data[i].nutrientValue+"  />\n" + 
					"			</div>\n" + 
					"			\n" + 
					"		</div>";
					
				}
				//input = jQuery(inptString);
				jQuery('#materialComposition').append(inptString);
				console.log( inptString );
		})
	    

    	
    	return;
	});
	
	$("#graph-bio-material" ).on( "click", function() {
		var formData = $("#graphForm").serialize();
		var labelText = $("#selectedBioFormulaId").text()
		var dependentVariableId = $("#selectedDependentBioVariableId").val();

		console.log( formData );
		$.post("getCalculatedDataPoints", formData,function( response ){
			var jsonValue = JSON.parse(response);
			
			var xAxisArray		= jsonValue.data.dataPointsX;
			var yAxisArray		= jsonValue.data.dataPointsY;
			var xObservedPoints		= jsonValue.data.observedPointsX;
			var yObservedPoints		= jsonValue.data.observedPointsY;
			var dataSet1 = [];
			for(var i = 0; i < xAxisArray.length; i++) {
				dataSet1.push(
				        {
				            x: xAxisArray[i],
				            y: yAxisArray[i]
				        }
				   );
				}
			var dataSet2 = [];
			for(var i = 0; i < xObservedPoints.length; i++) {
				dataSet2.push(
				        {
				            x: xObservedPoints[i],
				            y: yObservedPoints[i]
				        }
				   );
				}
			

			
			console.log( "dataSet1 " + dataSet1);
			var observedPointsArray = [{ x: -8, y: 3 }, { x: 2, y: 8 }, { x: 3, y: 9 }];
			
			//console.log( "dataArray " + dataArray );
			$( "#errorMessage" ).text("");
			var popCanvas = $("#popChart");
			var popCanvas = document.getElementById("popChart");
			var popCanvas = document.getElementById("popChart").getContext("2d");
			var barChart = new Chart(popCanvas, {
				  type: 'scatter',
				  data: {
				    datasets: [{
				      label: 'Predicted Line',
				      data : dataSet1,
				      borderColor: 'red',
                      borderWidth: 1,
                      pointBackgroundColor:'red',
                      pointBorderColor: 'blue',
                      pointRadius: 3,
                      pointHoverRadius: 3,
                      fill: false,
                      tension: 0,
                      showLine: true,
		              borderWidth: 1
				    },{

                        label: 'Observed Points',
                        data : dataSet2,
                        type : 'scatter',
                        pointBackgroundColor: 'blue',
                        pointBorderColor: 'orange',
                        pointRadius: 5,
                        pointHoverRadius: 5,
                        showLine: false
				    }]
				  },
				  options: {
		                responsive: false
		            }
				}); //END var barChart

		});
		
	});
});