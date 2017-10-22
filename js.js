$(window).on("resize", function () {
    
    resizeCanvas();
    
  });

/* var h1 =  $("#canv-wrap").clientWidth */
console.log(document.getElementById("canv-wrap").clientWidth)
console.log(document.getElementById("canv-wrap").clientHeight)

document.ondbclick = function(){return false}

var w = document.getElementById("canv-wrap").clientWidth ;
var h = window.innerHeight -6;
var width = w,
    height = h;

var aaa = window.innerHeight;
$(".part").css("height", aaa+25)

if(h<500){alert("MALO")}
var titleHeight = aaa/2 - $('.name-line').height()/2 -25;
$('.name-line').css('top', titleHeight).css('opacity', 1);


var nodes = d3.range(300).map(function() { return {radius: Math.random() * 12 + 4}; }),
    root = nodes[0],
    color = [" #f9cac0","#878682", "#f5f4f4"];

root.radius = 0;
root.fixed = true;
root.px = width/2;
root.py = height/2;

var force = d3.layout.force()
    .gravity(0.015)
    .charge(function(d, i) { return i ? 0 : -2000; })
    .nodes(nodes)
    .size([width, height]);

force.start();

var canvas = d3.select("#canv-wrap").append("canvas")
    .attr("width", width)
    .attr("height", height);
    canvas.attr("id", "cnv");


var context = canvas.node().getContext("2d");

force.on("tick", function(e) {
  var q = d3.geom.quadtree(nodes),
      i,
      d,
      n = nodes.length;

  for (i = 1; i < n; ++i) q.visit(collide(nodes[i]));

  context.clearRect(0, 0, width, height);
  
 
  context.beginPath();
  for (i = 1; i < n; ++i) {
    context.fillStyle = color[i % color.length];
    d = nodes[i];
    context.moveTo(d.x, d.y);
    context.beginPath();
    context.arc(d.x, d.y, d.radius, 0, 2 * Math.PI);
     context.fill();
  }
 
});

canvas.on("mousemove", function() {
  var p1 = d3.mouse(this);
  root.px = p1[0];
  root.py = p1[1];
  force.resume();
});

function collide(node) {

  var r = node.radius + 16,
      nx1 = node.x - r,
      nx2 = node.x + r,
      ny1 = node.y - r,
      ny2 = node.y + r;
  return function(quad, x1, y1, x2, y2) {
    if (quad.point && (quad.point !== node)) {
      var x = node.x - quad.point.x,
          y = node.y - quad.point.y,
          l = Math.sqrt(x * x + y * y),
          r = node.radius + quad.point.radius + 7;
      if (l < r) {
        l = (l - r) / l * .5;
        node.x -= x *= l;
        node.y -= y *= l;
        quad.point.x += x;
        quad.point.y += y;
      }
    }
    return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
  };
}
 
/* function resizeCanvas() {
    width = d3.select("#cover").node().clientWidth,
    height = d3.select("#intro").node().clientHeight;
  
    titleHeight = height/2 - $('#title').height()/2;
    $('#title').css('top', titleHeight).css('width',width);
  
    canvas.attr("width", width).attr("height", height);
    force.tick();
  } */

$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("nav-move");
        $(".navbar").css("padding-top", "0")
        $(".nav li a").css("color", "black")
        $(".transp").css("opacity", "0.3")

        
    } else {
        $(".navbar-fixed-top").removeClass("nav-move navbar-default");
        $(".navbar").css("padding-top", "10px")
        $(".transp").css("opacity", "0")
    }
});


function resizeCanvas() {
  w = document.getElementById("canv-wrap").clientWidth,
  /* height = d3.select("#intro").node().clientHeight; */
  /* h = document.getElementById("canv-wrap").clientHeight */
  console.log(w)

/*   titleHeight = height/2 - $('#title').height()/2;
  $('#title').css('top', titleHeight).css('width',width); */
  canvas.attr("width", w).attr("height", h);
  force.tick();
}



 $(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
}); 