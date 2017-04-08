import React from 'react';
import * as d3 from 'd3';

import BarPlot from './barplot_faux';

const styles = {
  width: 500,
  height: 400,
  padding: 40
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
    }
    if (this.props.loading.routesLoading || this.props.loading.ticksLoading) {
      return (
        <div className="fetching"> Fetching data...</div>
      );
    } else if (this.props.loading.userSearched && this.props.ticks.length === 0) {
      return (
        <div className="encouragement">
          You don't have any ticks - go climb something!
        </div>
      );
    } else {
      return (
          <BarPlot gradesSum={gradesSum} {...styles} />
      );
    }
  }
}

export default Visual;
