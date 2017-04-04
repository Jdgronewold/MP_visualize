import React from 'react';
import * as d3 from 'd3';
import ReactFauxDOM from 'react-faux-dom';

const colors = {
  Trad: '#3366cc',
  Sport: '#dc3912',
  Alpine: '#ff9900',
  Ice: '#0099c6',
  Mixed: '#990099',
  TradAid: '#ffd700',
  Other: '#00ff7f'
};

class PieChart extends React.Component {
  constructor(props) {
    super(props);

    this.parseData = this.parseData.bind(this);
    this.determineColor = this.determineColor.bind(this);
    this.renderPie = this.renderPie.bind(this);
    this.renderTable = this.renderTable.bind(this);
  }

  parseData(data) {
    const climbType = d3.nest()
      .key( d => {
        let types = d.type.split(", ");
        if (types.includes("Alpine")) {
          return "Alpine";
        } else if (types.includes("TR")) {
          const idx = types.indexOf("TR");
          types.splice(idx, 1);
          return types.join(", ");
        } else {
          return d.type;
        }
      })
      .entries(data);

    return climbType;
  }

  determineColor(data) {
    const d = typeof data.data === 'undefined' ? data : data.data;
    switch(d.key) {
      case "Trad":
        return colors.Trad;
      case "Sport":
        return colors.Sport;
      case "Alpine":
        return colors.Alpine;
      case "Ice":
        return colors.Ice;
      case "Mixed":
        return colors.Mixed;
      case "Trad, Aid":
        return colors.TradAid;
      default:
        return colors.Other;
    }
  }

  renderPie(svg, data) {
    const arcs = d3.pie()
      .value(d => d.values.length)
      .padAngle(0.04)(data);

    const arcGenerator = d3.arc()
     .innerRadius(40)
     .outerRadius(130);

    svg.append('g')
      .attr('transform', 'translate(150, 150)')
      .selectAll('path')
      .data(arcs)
      .enter()
      .append('path')
      .attr('d', arcGenerator)
      .attr('fill', this.determineColor);
  }

  renderTable(div, data) {
    let legend = div.append('table')
      .attr('class', 'legend')
      .attr('transform', 'translate(150, 50)');
    let tr = legend.append("tbody").selectAll("tr").data(data).enter().append("tr");

    // first column
    tr.append("td").append("svg").attr("width", '16').attr("height", '16')
      .append("rect").attr("width", '16').attr("height", '16')
      .attr("fill", this.determineColor );

    //second column
    tr.append("td").text(d => d.key);

    //third column
    tr.append("td").text(d => d.values.length);
  }

  render() {

    if (this.props.data.length === 0) {
      return <div></div>;
    } else {
      this.tableNode = ReactFauxDOM.createElement('div');
      let div = d3.select(this.tableNode);

      this.pieNode = ReactFauxDOM.createElement("svg");
      let svg = d3.select(this.pieNode)
        .attr('width', '300')
        .attr('height', '300');

      const pieData = this.parseData(this.props.data);

      this.renderTable(div, pieData);
      this.renderPie(svg, pieData);

      return  (
        <div className="route-types">
          <div className="table">
            { this.tableNode.toReact() }
          </div>
          { this.pieNode.toReact() }
        </div>
      );

    }

  }
}

export default PieChart;
