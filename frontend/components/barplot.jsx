import React from 'react';
import * as d3 from 'd3';

// const xScale = (props) => {
//   return d3.scaleBand()
//     			.domain(d3.range(props.length))
// 					.rangeRound([0, props.width])
//           .padding(0.1);
// };
// const yScale = (props) => {
//   return d3.scale.linear()
//     .domain([0, d3.max(props.gradesSum, (d) => d.values.length )])
//     .range([props.height - props.padding, props.padding]);
// };

class BarPlot extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let rects;
    let texts;
    if (typeof this.props.gradesSum !== 'undefined') {
      const xScale = d3.scaleBand()
      .domain(d3.range(this.props.gradesSum.length))
      .rangeRound([0, this.props.width])
      .padding(0.1);

      const yScale = d3.scaleLinear()
      .domain([0, d3.max(this.props.gradesSum, (d) => d.values.length )])
      .range([0, this.props.height]);

      rects = this.props.gradesSum.map( (grade, idx) => {
        return (
          <rect
            x={`${xScale(idx)}`}
            y={`${this.props.height - yScale(grade.values.length)}`}
            width={`${xScale.bandwidth()}`}
            height={`${yScale(grade.values.length)}`}
            key={idx}
            />
        );
      });
      texts = this.props.gradesSum.map( (grade, idx) => {
        return (
          <text
            x={`${xScale(idx) + xScale.bandwidth()/2}`}
            y={`${this.props.height - yScale(grade.values.length) + 20}`}
            textAnchor="middle"
            key={idx}
          >{grade.key}</text>
        );
      });
    }
    debugger
    return (
      <svg width={this.props.width} height={this.props.height}>
        {rects}
        {texts}
      </svg>
    );
  }
}

export default BarPlot;
