import React from 'react';
import * as d3 from 'd3';

import BarPlot from './barplot';

const styles = {
  width: 500,
  height: 300,
  padding: 30
};

class Visual extends React.Component {
  constructor(props) {
    super(props);
  }

  tableize(ticks) {
    const sum = d3.nest()
      .key((d) => d.grade )
      .entries(ticks);
    return sum;
  }

  render() {
    const routes = this.props.ticks.map( (tick, idx) => (
      <li key={idx}> { tick.name } </li>
    ));
    let gradesSum;
    if (this.props.ticks.length > 0 ) {
      gradesSum = this.tableize(this.props.ticks);
      console.log(gradesSum);
    }
    if (this.props.loading.routesLoading || this.props.loading.ticksLoading) {
      return (
        <div> Fetching data...</div>
      );
    } else {
      debugger
      return (
        <div>
          <BarPlot gradesSum={gradesSum} {...styles} />
        </div>
      );
    }
  }
}

export default Visual;
