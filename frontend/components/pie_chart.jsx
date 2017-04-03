import React from 'react';
import * as d3 from 'd3';
import ReactFauxDOM from 'react-faux-dom';

class PieChart extends React.Component {
  constructor(props) {
    super(props);

    this.parseData = this.parseData.bind(this);
  }

  parseData(data) {
    const climbType = d3.nest()
      .key( d => {
        const types = d.type.split(", ");
        if (types.includes("Alpine")) {
          return "Alpine";
        } else if (types.includes("Aid")) {
          return "Aid";
        } else {
          return d.type;
        }
      })
      .entries(data);

    return climbType;
  }

  render() {

    if (this.props.data.length > 0) {
      let node = ReactFauxDOM.createElement("svg");
      let svg = d3.select(node)
        .attr('width', '300')
        .attr('height', '400');

      const data = this.parseData(this.props.data);
      const arcs = d3.pie()
      .value(d => d.values.length)
      .padAngle(0.04)(data);

      const arcGenerator = d3.arc()
       .innerRadius(20)
	     .outerRadius(100);

      svg.append('g')
        .attr('transform', 'translate(150, 200)')
        .selectAll('path')
        .data(arcs)
        .enter()
        .append('path')
        .attr('d', arcGenerator);

      return  node.toReact();

    } else {
      return <div></div>;
    }

  }
}

export default PieChart;
