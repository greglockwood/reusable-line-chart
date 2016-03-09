


(function () {



	d3.PredictGraph = function() {
  
	  // OPTIONS 
	  // (manipulated with getters and setters below)


	  var margin = {top: 50, right: 20, bottom: 100, left: 60},
		  width = getWidth($(window).width()),
		  height = 450,
		  xValue = function(d) { return d.date; },
		  yValue = function(d) { return d.actualvalue; },
		  yValue2= function(d) { return d.predictedvalue;},  
		  xScale = d3.time.scale().range([0, width]),
		  yScale = d3.scale.linear().range([height, 0]),
		  xAxis = xAxis = d3.svg.axis().scale(xScale)
			.orient("bottom").ticks(10).tickFormat(d3.time.format("%Y-%m-%d")), //this is where the date is formatted for the axis,
		  yAxis = d3.svg.axis().scale(yScale)
			.orient("left").ticks(10),
		  line = d3.svg.line().x(X).y(Y),
		  line_before= d3.svg.line()
				.x(function(d) { return xScale(d.date);})
				.y(function(d) { return yScale(d.actualvalue);
							}),
		  line_after= d3.svg.line()
				.x(function(d) { return xScale(d.date);})
				.y(function(d) { return yScale(d.predictedvalue);})
		  today= moment()._d, //date object
		  formatDate = d3.time.format("%Y-%m-%d"),
		  todayFormatted = formatDate(moment()._d),
		  alreadyClicked=false;
		  


		


	  function chart(selection) {
		selection.each(function(data) {
		console.log(this);
		

		var max_actual = d3.max(data, function(d) { return d.actualvalue;} ); //before
		var max_predicted = d3.max(data, function(d) { return d.predictedvalue;} ); //after
		var max = Math.max(max_actual, max_predicted); //overall
		var min_actual = d3.min(data, function(d) { return d.actualvalue;} ); //before
		var min_predicted = d3.min(data, function(d) { return d.predictedvalue;} ); //after
		var min = Math.min(min_actual, min_predicted);	

		
		
		  
		  
		var parsedate = d3.time.format("%Y-%m-%d").parse;
		
		// to convert date from a formated string into a date object
			data.forEach(function(d) {
		 	
		 	d.date = parsedate(d.date);
		 	
	 	});  

			
			
		  // Update the x-scale.
		  xScale
			  .domain(d3.extent(data, function(d) { return d.date; }))
			  .range([0, width- margin.left - margin.right]);

		  // Update the y-scale.
		  yScale
			  .domain([min,max])
			  .range([height- margin.top - margin.bottom,0]);
			  
			  

		  // Select the svg element, if it exists.
		  var svg = d3.select(this).selectAll("svg").data([data]);
			
			

		//Otherwise, create the skeletal chart.
		  var gEnter = svg.enter().append("svg").append("g");
		     

		  // Update the outer dimensions.
		  svg.attr("width", width)
			  .attr("height", height);

		  // Update the inner dimensions.
		  var g = svg.select("g")
			  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		  

		
		 
				  
		  if(alreadyClicked==true){
		  	
		     svg.select("#clip-before rect")
		     .transition().duration(400)
		     .attr("width", xScale(parsedate(today)))
			 .attr("height", height- margin.top - margin.bottom);
			 
			 svg.select("#clip-after rect")
		     .transition().duration(400)
		     .attr("x", xScale(parsedate(today)))
		     .attr("width", width-xScale(parsedate(today)))
			 .attr("height", height- margin.top - margin.bottom);
		  	
		  	 svg.selectAll("path.line-after")
		  	 .data(data).transition()
             .duration(400).attr("d", line_after(data));
             
             svg.selectAll("path.line-before")
		  	 .data(data).transition()
             .duration(400).attr("d", line_before(data));
             
             svg.select("line.today")
		     .transition().duration(400)
		     .attr({
					'x1': xScale(parsedate(today)),
					'y1': 0,
					'x2': xScale(parsedate(today)),
					'y2': height- margin.top - margin.bottom
				})
				.style("stroke", "#FF7F66")
				.style("stroke-dasharray", ("3, 3")) 
				.style("fill", "none");	
             
             
		  }else{
		  	g.append("clipPath")
				  .attr("id", "clip-before")
				  .append("rect")
				  .attr("width", xScale(parsedate(today)))
				  .attr("height", height- margin.top - margin.bottom);
				  
			 g.append("clipPath")
				  .attr("id", "clip-after")
				  .append("rect")
				  .attr("x", xScale(parsedate(today)))
				  .attr("width", width-xScale(parsedate(today)))
				  .attr("height", height- margin.top - margin.bottom);
				  
		  	g.selectAll(".line")
				  .data(["after"])
				  .enter().append("path")
				  .attr("class", function(d) { return "line-" + d; })
				  .attr("clip-path", function(d) { return "url(#clip-" + d + ")"; })
				  .attr("d", line_after(data));
				  
			 g.selectAll(".line")
				  .data(["before"])
				  .enter().append("path")
				  .attr("class", function(d) { return "line-" + d; })
				  .attr("clip-path", function(d) { return "url(#clip-" + d + ")"; })
				  .attr("d", line_before(data));
				  
			g.append("line")
				.attr("class","today")
				.attr({
					'x1': xScale(parsedate(today)),
					'y1': 0,
					'x2': xScale(parsedate(today)),
					'y2': height- margin.top - margin.bottom
				})
				.style("stroke", "#FF7F66")
				.style("stroke-dasharray", ("3, 3")) 
				.style("fill", "none");	
				  
			
		  }
				  
		 
			  
	
		
		// Add the X Axis
		  g.append("g")
				.attr("class", "x axis");
				//.call(xAxis);
				
		  svg.select(".x.axis")
 				.attr("transform", "translate(0,300)").transition().duration(400).call(xAxis);
 		        
		  g.selectAll(".x.axis text")  // select all the text elements for the xaxis
			  .attr("transform", function(d) {
				 return "translate(" + this.getBBox().height*-2 + "," + this.getBBox().height + ")rotate(-45)";
			 });

		  // Add the Y Axis
		  g.append("g")
 				.attr("class", "y axis"); //.call(yAxis)
			
		  svg.select(".y.axis").transition().duration(400).call(yAxis);
		
		
	       alreadyClicked = true;
			
			
		
		});
	  }

	  // The x-accessor for the path generator; xScale ∘ xValue.
	  function X(d) {
		return xScale(formatDate.parse(d.date));
	  }

	  // The y-accessor for the path generator; yScale ∘ yValue.
	  function Y(d) {
		return yScale(d.actualvalue);
	  }
  
	  function Y2(d){
		return yScale(d.predictedvalue);
	  }

	  chart.margin = function(_) {
		if (!arguments.length) return margin;
		margin = _;
		return chart;
	  };

	  chart.width = function(_) {
		if (!arguments.length) return width;
		width = _;
		return chart;
	  };

	  chart.height = function(_) {
		if (!arguments.length) return height;
		height = _;
		return chart;
	  };

	  chart.x = function(_) {
		if (!arguments.length) return xValue;
		xValue = _;
		return chart;
	  };

	  chart.y = function(_) {
		if (!arguments.length) return yValue;
		yValue = _;
		return chart;
	  };




	  function getWidth(width){
	
			if (width > 1500 || width < 990) {
				return 800;
			}else if ( width > 1300 && width > 990){
				return 700;
			}else{
				return 650;
			}
		}

  
	   return chart;
  
	};





})();