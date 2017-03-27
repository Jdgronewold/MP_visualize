import React from 'react';

class Visual extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    debugger
    const routes = this.props.ticks.map( (tick, idx) => (
      <li key={idx}> { tick.name } </li>
    ));
    console.log(this.props);
    if (this.props.loading.routesLoading || this.props.loading.ticksLoading) {
      return (
        <div> Fetching data...</div>
      );
    } else {
      return (
        <ul>
          {routes}
        </ul>
      );
    }
  }
}

export default Visual;
