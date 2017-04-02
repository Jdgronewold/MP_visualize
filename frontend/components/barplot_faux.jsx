import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import * as d3 from 'd3';

import RoutesList from './routes_list';

class BarPlot extends React.Component {
  constructor(props) {
    super(props);
    this.sortResults = this.sortResults.bind(this);
    this.showData = this.showData.bind(this);
    this.createScales = this.createScales.bind(this);
    this.state = { routes: [] };
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

  showData(e, data) {
    this.setState({routes: data});
  }

  createScales() {
    const xScale = d3.scaleBand()
      .domain(d3.range(this.props.gradesSum.length))
      .rangeRound([0, this.props.width])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(this.props.gradesSum, (d) => d.values.length )])
      .range([0, this.props.height - this.props.padding]);

      return {xScale: xScale, yScale: yScale};
  }

  render() {

    if (typeof this.props.gradesSum !== 'undefined') {
      const sortedGrades = this.sortResults(this.props.gradesSum);

      let { xScale, yScale } = this.createScales();
      debugger

      var node = ReactFauxDOM.createElement('svg');
      var svg = d3.select(node)
        .attr('width', this.props.width)
        .attr('height', this.props.height);
    }

    return (
      <div className="visuals">
        <svg width={this.props.width} height={this.props.height}>
          {rectsAndTexts}
        </svg>
        <RoutesList data={this.state.routes} />
      </div>
    );
  }
}

export default BarPlot;
