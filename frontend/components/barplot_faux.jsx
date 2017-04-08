import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import * as d3 from 'd3';

import RoutesList from './routes_list';
import PieChart from './pie_chart';
import RouteDetail from './route_detail';

class BarPlot extends React.Component {
  constructor(props) {
    super(props);
    this.sortResults = this.sortResults.bind(this);
    this.showData = this.showData.bind(this);
    this.createScales = this.createScales.bind(this);
    this.addRects = this.addRects.bind(this);
    this.addLabels = this.addLabels.bind(this);
    this.calculateY = this.calculateY.bind(this);
    this.addAxis = this.addAxis.bind(this);
    this.updateFromChild = this.updateFromChild.bind(this);
    this.routeDetail = this.routeDetail.bind(this);

    this.state = { routes: [], routeDetail: {} };
  }

  updateFromChild(key, value) {
    this.setState({[key]: value});
  }


  sortResults(results) {
    const sorted = results.sort((a,b) => {
      let gradeA = a.key.match(/(5.)(\d+)([a-d]*)/);
      let gradeB = b.key.match(/(5.)(\d+)([a-d]*)/);

      if (gradeA === null && gradeB === null ) {
        gradeA = ["Other", "Other", "1", "a"];
        gradeB = ["Other", "Other", "1", "b"];
      } else if (gradeA === null) {
        gradeA = ["Other", "Other", "1", "a"];
      } else if (gradeB === null ){
        gradeB = ["Other", "Other", "1", "b"];
      }
      return d3.ascending(parseInt(gradeA[2]), parseInt(gradeB[2])) ||
        d3.ascending(gradeA[3], gradeB[3]);
    });
    return sorted;
  }

  showData(data) {
    this.setState({routes: data, routeDetail: {}});
  }

  createScales() {
    const xScale = d3.scaleBand()
      .domain(d3.range(this.props.gradesSum.length))
      .rangeRound([this.props.padding, this.props.width])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(this.props.gradesSum, (d) => d.values.length )])
      .range([this.props.height - 15, this.props.padding]);

      return {xScale: xScale, yScale: yScale};
  }

  addRects(svg, data, xScale, yScale) {
    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => {
        return xScale(i);
      })
      .attr('y', (d) => {
        return yScale(d.values.length);
      })
      .attr('width', d => xScale.bandwidth())
      .attr('height', d => {
         return ((this.props.height - 14) -
           yScale(d.values.length));
      })
      .attr('d', d => d.values)
      .on("click", (d) => this.showData(d.values))
      .on("mouseover", function() {
        d3.select(this)
          .transition()             // <-- New!
          .duration(1000)           // <-- New!
          .attr("fill", "white");
      });
  }

  addLabels(svg, data, xScale, yScale) {
    svg.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .attr('x', (d, i) => {
      return xScale(i) + xScale.bandwidth()/2 - 5;
    })
    .attr('y', (d) => {
      let y = this.calculateY(d, yScale);
      return y;
    })
    .attr('text-anchor', 'middle')
    .attr('fill', d => {
      let y = parseInt(`${yScale(d.values.length)}`);
      return y > 310 ? "black" : "white";
    })
    .attr('pointer-events', 'none')
    .text(d => d.key)
    .attr('transform', (d, i) => {
      let x = xScale(i) + xScale.bandwidth()/2 - 5;
      let y = this.calculateY(d, yScale);
      return `rotate(90,${x},${y})`;
    });
  }

  addAxis(svg, scale) {
    const axis = d3.axisLeft(scale);
    svg.append('g')
      .attr('transform', "translate(" + this.props.padding + ",0)")
      .call(axis);
  }

  calculateY(d, yScale) {
    let y = parseInt(`${yScale(d.values.length)}`);
    if (y > 310) { // 350 is about where text goes under x axis
      y -= 25;
    } else {
      y += 25;
    }
    return y;
  }

  routeDetail() {
    if (Object.keys(this.state.routeDetail).length === 0 ) {
      return <div className="route-detail"></div>;
    } else {
      return <RouteDetail data={this.state.routeDetail} />;
    }
  }

  render() {

    if (typeof this.props.gradesSum !== 'undefined') {
      const sortedGrades = this.sortResults(this.props.gradesSum);

      let { xScale, yScale } = this.createScales();

      let node = ReactFauxDOM.createElement('svg');
      var svg = d3.select(node)
        .attr("class", 'routes-grades')
        .attr('width', this.props.width)
        .attr('height', this.props.height);


      this.addRects(svg, sortedGrades, xScale, yScale);
      this.addLabels(svg, sortedGrades, xScale, yScale);
      this.addAxis(svg, yScale);

      svg.append('text')
      .attr('x', `${this.props.padding / 2}`)
      .attr('y', '20')
      .text('Click on a grade/route name to see more!');

      let svgReact =  node.toReact();

      return (
        <div className="visuals">
          <div className="visuals-main">
            { svgReact }
            <RoutesList
              data={this.state.routes}
              updateFromChild={this.updateFromChild}
            />
            <PieChart data={this.state.routes} />
          </div>
          <div className="visuals-detail">
            {this.routeDetail()}
          </div>
        </div>
      );

    } else {
      return (
        <div></div>
      );
    }

  }
}

export default BarPlot;
