const svg = d3.select('svg');

const width = document.querySelector('#treeContainer').clientWidth;
const height = document.querySelector('#treeContainer').clientHeight;

const margin = {top:0 , right: 50, bottom:0, left: 0};
const innerWidth = width - margin.left - margin.right;
const innerHeigth= height - margin.top - margin.bottom;

const treeLayout = d3.tree().size([innerHeigth, innerWidth]);

const g = svg
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(${margin.left},${margin.top})');



d3.json('json/nodes.json')
    .then(data =>{

        const root = d3.hierarchy(data);
        const links = treeLayout(root).links();
        const linkPathGenerator = d3.linkHorizontal()
            .x(d => d.y)
            .y(d => d.x);

        g.selectAll('path').data(links)
            .enter().append('path')
            .attr('d', linkPathGenerator);
        
        g.selectAll('text').data(root.descendants())
            .enter().append('text')
            .attr('x', d => d.y)
            .attr('y', d => d.x)
            .attr('dy', '0.32em')
            .attr('text-anchor',d => d.children ? 'start' : 'end')
            .text(d => d.data.name);
});