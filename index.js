var width = 700,
    height = 580;

    

var svg = d3.select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

var g = svg.append('g');
var arcGroup = g.append('g');

var albersProjection = d3.geoAlbers()
  .scale(190000)
  .rotate([71.057, 0])
  .center([0, 42.313])
  .translate([width/2, height/2]);

var geoPath = d3.geoPath()
    .projection(albersProjection);


g.selectAll('path')
  .data(neighborhoods_json.features)
  .enter()
  .append('path')
  .attr('fill', '#ccc')
  .attr('d', geoPath);

  var rodents = svg.append( "g" ).attr( "id", "rodents" );
rodents.selectAll( "path" )
  .data( points.features )
  .enter()
  .append( "path" )
  .attr( "d", geoPath )
.style("fill", "red")

var data = points["features"][0]["features"]

console.log(data);
var links = [];
var cord= {};
for(var i=0, len=data.length-1; i<len; i++){
    var start = albersProjection(data[i]["geometry"]["coordinates"]);
    var stop = albersProjection(data[i+1]["geometry"]["coordinates"]);
    links.push({
        type: "LineString",
        coordinates: [
            [ start[0], start[1] ],
            [ stop[0], stop[1] ]
        ]
    });
}
const lines = svg.append('g');
lines.selectAll('line')
    .data(links)
    .enter()
    .append('line')
        .attr("x1", d=>
            d.coordinates[0][0]
        )
        .attr("y1", d=>d.coordinates[0][1])
        .attr("x2", d=>d.coordinates[1][0])
        .attr("y2", d=>d.coordinates[1][1])
        .attr("id", function(d, i) { return "line" + i})
        .attr("stroke", "steelblue")

d3.selectAll("line").style("opacity", "1")
d3.selectAll("line").each(function(d, i) {
    let totalLength = d3.select("#line" + i).node().getTotalLength();
    d3.select("#line" + i).attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
        .duration(500)
        .delay(220*i)
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0)
        .style("stroke-width", 3)
})