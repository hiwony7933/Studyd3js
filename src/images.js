var width=600;
var height=500;
var imageW = width + "px";
var imageH = height + "px";
var spacing=60;
var image = 'images.png';
var radius = 5;
var data = [
            {'x':14.2, 'y':29, "category": "b", "ImageURL": "string"},
            {'x':16.2, 'y':39, "category": "a", "ImageURL": "string"},
            {'x':15.2, 'y':43, "category": "c", "ImageURL": "string"},
            {'x':21.2, 'y':12, "category": "c", "ImageURL": "string"},
            {'x':13.2, 'y':13, "category": "b", "ImageURL": "string"},
            {'x':30.2, 'y':35, "category": "b", "ImageURL": "string"}
          ];
var svg = d3.select('#svg-container') // dom 에서 id="svg-container" 찾기 
            .selectAll('svg')   // html에 생성되있으면 "svg" 태그 찾기, 안되있으면 .append('svg')
            .attr('width', width) // width 속성 추가
            .attr('height', height) // height 속성 추가
            .style('background-image', "url(" + image + ")")  // 백그라운드 이미지 스타일 설정
            .style('background-size', "cover")  // 백그라운드 이미지 사이즈 설정 cover는 꽉차게
            .append('g') // g 태그 추가
              .attr('transform','translate(' + spacing/2 + "," + spacing/2 + ")"); // 위치 조정

// g는 x축 y축 을 추가하고 그래프위에 dot 작업을 하기 위해 추가한다.

//.domain([min, max]) domain은 min, max 값 설정
//.domain([d3.min(data, function(d){return d.x},d3.max(data, function(d){return d.x})])

// X축 scale 정의
var xScale = d3.scaleLinear()
              .domain([
                0, 
                d3.max(data, function(d){return d.x;})
              ])
              .range([0, width-spacing]);

              //Y축 Scale 정의
var yScale = d3.scaleLinear() 
                .domain([
                  0, 
                  d3.max(data, function(d){return d.y;})
                ])
                .range([height-spacing, 0]);

var xAxis = d3.axisBottom(xScale); // X 축은 축아래 .axisBottom
var yAxis = d3.axisLeft(yScale);  // Y 축은 축왼쪽 .axisLeft

svg.append('g')
    .attr('transform', "translate(0," + (height-spacing) + ")").call(xAxis);
svg.append('g')
    .call(yAxis);

svg.append("g")
    .selectAll("circle")
    .data(data)
    .enter()
   .append('circle') // 서클 태그 추가
    .attr('cx', function(d){return xScale(d.x);}) // cx 좌표 속성 설정
    .attr('cy', function(d){return yScale(d.y);}) // cy 좌표 속성 설정
    .attr('r',5)  // 둥글기 크기는 5
    .style('fill','red') // 색상은 red
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut);

svg.on("click", function() {
  var coords = d3.pointer(this);
})
 // Create Event Handlers for mouse
 function handleMouseOver(d, i) {  
  d3.select(this).attr("fill", "orange").attr("r", radius * 2);
  svg.append("text")
      .attr('id', "t" + d.x + "-" + d.y + "-" + i)
      .attr('x', function() { return xScale(d.x)})
      .attr('y', function() { return yScale(d.y)})
      .text(function() {
          return [d.x, d.y];  // Value of the text
        });
}

function handleMouseOut(d, i) {
  d3.select(this).attr("fill", "red").attr("r", radius);
  svg.select('id').remove();  // Remove text location
}