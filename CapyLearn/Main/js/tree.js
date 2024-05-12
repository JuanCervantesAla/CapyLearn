var container = d3.select("#tree");

var margin = { top: 20, right: 20, bottom: 20, left: 20 };
var width = container.node().getBoundingClientRect().width;
var height = container.node().getBoundingClientRect().height;

var svgWidth = width * 0.99  - margin.left - margin.right; 
var svgHeight = height * 0.99 - margin.top - margin.bottom;

var svg = container.append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .style("border", "1px solid black");

    svg.attr("viewBox", "0 0 " + (svgWidth + margin.left + margin.right) + " " + (svgHeight + margin.top + margin.bottom));

var treeLayout = d3.tree()
    .size([height, width]);

d3.json("json/nodes.json").then(function(data) {
    var root = d3.hierarchy(data);
    var tree = treeLayout(root);

    // Dibujar las conexiones
    svg.selectAll(".link")
        .data(tree.links())
        .enter().append("path")
        .attr("class", "link")
        .attr("d", d3.linkHorizontal()
            .x(function(d) { return d.y; })
            .y(function(d) { return d.x; })
    );

    var nodes = svg.selectAll(".node")
        .data(tree.descendants())
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) {
            return "translate(" + d.y + "," + d.x + ")";
    });

    nodes.append("text")
    .attr("dy", ".35em")
    .attr("x", function(d) { 
        return d.children ? -13 : 13; // Ajusta el desplazamiento del texto
    })
    .attr("y", function(d) {
        return d.children ? -6 : 6; // Ajusta la posición vertical del texto
    })
    .style("text-anchor", function(d) { 
        return d.children ? "end" : "start"; // Alinea el texto a la derecha o a la izquierda
    })
    .style("fill", "blue")
    .text(function(d) { return d.data.name; });

    nodeText
    .style("cursor", "pointer")
        .on("click", function(d) {
        // Verificar si el nodo tiene una URL asociada
        if (d.data.url) {
            // Redirigir al usuario a la URL correspondiente
            window.open(d.data.url, "_blank");
        }
    });

});