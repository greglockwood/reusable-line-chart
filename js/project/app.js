//////////////////////////////////////////////////////////////////////////
// Entry point of application
//////////////////////////////////////////////////////////////////////////	
		

		
		
		var chart = d3.PredictGraph();

		
		//Global Variables
		
		var formatDate = d3.time.format("%Y-%m-%d");
		
		var today = formatDate(moment()._d) || "2016-01-01";

		var first_day = formatDate(getFirstDay()) || "2015-01-01";
		
		var numMonths = "three";  //one, three, six, twelve
		
		var last_day = formatDate(getLastDay(numMonths)) || "2016-04-01";

		var product = "product1";
		
		var loaded = false;
		
		

		// called everytime a user clicks on a month button or select a dropdown menu item
		// input params: the firstDay (today minus 12 months), lastDay (pass value retrieved from numMonths into getLastDay)
		// 				 productSelected (selected product based on dropdown menu value)
		function updateResults(firstDay, lastDay, productSelected){
		
			//get data... will get from Django eventually instead of json file
			d3.json("data/data.json",function(data){
		
				
				// get data between first and last day and for the selected product
				// draw a single line as a test
				var test_data = data.filter(function(el){
					return el.date < lastDay && el.date > firstDay && el.productname == productSelected
				});
			
			
				d3.select("#graph1").datum(test_data).call(chart);
				
				
			});
		}
		
		function updateResults2(firstDay, lastDay, productSelected){
		
			//get data... will get from Django eventually instead of json file
			d3.json("data/data.json",function(data){
		
				
				// get data between first and last day and for the selected product
				// draw a single line as a test
				var test_data = data.filter(function(el){
					return el.date < lastDay && el.date > firstDay && el.productname == productSelected
				});
			
			
				d3.select("#graph2").datum(test_data).call(chart);
				
				
			});
		}


		$(document).ready(function(){

		
			$("#button30").click( function(){
				$(".buttons1").removeClass("selected-button");
				$("#button30").addClass("selected-button");
				numMonths= $("#button30").data('months'); //or .data()
				first_day=formatDate(getFirstDay());
				last_day=formatDate(getLastDay(numMonths));  // to set last day
				updateResults(first_day,last_day,product);
			});
			
			$("#button90").click( function(){
				$(".buttons1").removeClass("selected-button");
				$("#button90").addClass("selected-button");
				numMonths= $("#button90").data('months'); //or .data()
				first_day=formatDate(getFirstDay());
				last_day=formatDate(getLastDay(numMonths));  // to set last day
				updateResults(first_day,last_day,product);
			});
			
			$("#button180").click( function(){
				$(".buttons1").removeClass("selected-button");
				$("#button180").addClass("selected-button");
				numMonths= $("#button180").data('months'); //or .data()
				first_day=formatDate(getFirstDay());
				last_day=formatDate(getLastDay(numMonths));  // to set last day
				updateResults(first_day,last_day,product);
			});
			
			$("#button360").click( function(){
				$(".buttons1").removeClass("selected-button");
				$("#button360").addClass("selected-button");
				numMonths= $("#button360").data('months'); //or .data()
				first_day=formatDate(getFirstDay());
				last_day=formatDate(getLastDay(numMonths));  // to set last day
				updateResults(first_day,last_day,product);
			});
			
			updateResults(first_day,last_day,product);
			

			
		
			$("#button30-2").click( function(){
				$(".buttons2").removeClass("selected-button");
				$("#button30-2").addClass("selected-button");
				numMonths= $("#button30-2").data('months'); //or .data()
				first_day=formatDate(getFirstDay());
				last_day=formatDate(getLastDay(numMonths));  // to set last day
				updateResults2(first_day,last_day,product);
			});
			
			$("#button90-2").click( function(){
				$(".buttons2").removeClass("selected-button");
				$("#button90-2").addClass("selected-button");
				numMonths= $("#button90-2").data('months'); //or .data()
				first_day=formatDate(getFirstDay());
				last_day=formatDate(getLastDay(numMonths));  // to set last day
				updateResults2(first_day,last_day,product);
			});
			
			$("#button180-2").click( function(){
				$(".buttons2").removeClass("selected-button");
				$("#button180-2").addClass("selected-button");
				numMonths= $("#button180-2").data('months'); //or .data()
				first_day=formatDate(getFirstDay());
				last_day=formatDate(getLastDay(numMonths));  // to set last day
				updateResults2(first_day,last_day,product);
			});
			
			$("#button360-2").click( function(){
				$(".buttons2").removeClass("selected-button");
				$("#button360-2").addClass("selected-button");
				numMonths= $("#button360-2").data('months'); //or .data()
				first_day=formatDate(getFirstDay());
				last_day=formatDate(getLastDay(numMonths));  // to set last day
				updateResults2(first_day,last_day,product);
			});
			
			updateResults2(first_day,last_day,product);

   		});
   		
   		
   		


			// function to set last day date... basically today + 1, 3, 6, or 12 months, default is 3
			function getLastDay(months){ 

				switch(months){
					case "one": 
				
						return moment().add(1, 'months')._d; 
					break;
					case"six": 
				
						return moment().add(6, 'months')._d; 
					break;
					case"twelve":  
					
						return moment().add(12, 'months')._d; 
					break; 
					default: 
						return moment().add(3, 'months')._d; 
				};

			}
			
			// function to set first day date... basically today - 12
			function getFirstDay(){
				return moment().subtract(12,'months')._d;
			}
			
			
