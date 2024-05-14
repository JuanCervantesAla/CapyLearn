const svg = d3.select('svg');//Select the canva

const width = document.querySelector('#treeContainer').clientWidth;//Select sizes from id
const height = document.querySelector('#treeContainer').clientHeight;

const margin = {top:0 , right: 50, bottom:0, left: 0};//Set new sizes from borders
const innerWidth = width - margin.left - margin.right;
const innerHeigth= height - margin.top - margin.bottom;

const treeLayout = d3.tree().size([innerHeigth, innerWidth]);//Set the layout with the new sizes

const g = svg//Create the lienzo with the sizes attributes, beign lees than layout
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(${margin.left},${margin.top})');



d3.json('json/nodes.json')//Getting the data from the json file
    .then(data =>{

        const root = d3.hierarchy(data);//Set the layout horizontal
        const links = treeLayout(root).links();
        const linkPathGenerator = d3.linkHorizontal()
            .x(d => d.y)
            .y(d => d.x);

        g.selectAll('path').data(links)//Select the links from the css and adding it to the layout
            .enter().append('path')
            .attr('d', linkPathGenerator);
        
        g.selectAll('text').data(root.descendants())//Adding text to the nodes and some styles
            .enter().append('text')
            .attr('x', d => d.y)
            .attr('y', d => d.x)
            .attr('dy', '0.32em')
            .attr('text-anchor',d => d.children ? 'start' : 'end')
            .text(d => d.data.name);
});