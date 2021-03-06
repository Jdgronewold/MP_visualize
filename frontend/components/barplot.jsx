import React from 'react';
import * as d3 from 'd3';

import RoutesList from './routes_list';

class BarPlot extends React.Component {
  constructor(props) {
    super(props);
    this.sortResults = this.sortResults.bind(this);
    this.showData = this.showData.bind(this);
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

  render() {
    let rectsAndTexts;
    let texts;
    if (typeof this.props.gradesSum !== 'undefined') {
      const sortedGrades = this.sortResults(this.props.gradesSum);
      const xScale = d3.scaleBand()
      .domain(d3.range(this.props.gradesSum.length))
      .rangeRound([0, this.props.width])
      .padding(0.1);

      const yScale = d3.scaleLinear()
      .domain([0, d3.max(this.props.gradesSum, (d) => d.values.length )])
      .range([0, this.props.height - this.props.padding]);

      rectsAndTexts = this.props.gradesSum.map( (grade, idx) => {
        let x = `${xScale(idx) + xScale.bandwidth()/2 - 5}`;
        let y = parseInt(`${this.props.height - yScale(grade.values.length)}`);
        let textColor = "white";
        if (y > 350) { // 350 is about where text goes under x axis
          y -= 25;
          textColor = "black";
        } else {
          y += 25;
        }
        return (
          <g key={`group_${idx}`}>
            <rect
              onMouseEnter={ (event) => this.showData(event, grade.values)}
              x={`${xScale(idx)}`}
              y={`${this.props.height - yScale(grade.values.length)}`}
              width={`${xScale.bandwidth()}`}
              height={`${yScale(grade.values.length)}`}
              key={`rect_${idx}`}
              data={grade.values}
              />
            <text
              x={x}
              y={y}
              textAnchor="middle"
              key={`text_${idx}`}
              fill={textColor}
              transform={`rotate(90
                ${x}
                ${y})`}
                >{grade.key}</text>
          </g>
        );
      });
      texts = this.props.gradesSum.map( (grade, idx) => {

      });
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
