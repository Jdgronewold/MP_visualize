import React from 'react';

class Visual extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const routes = this.props.routes.routes.map( (route, idx) => (
      <li key={idx}> { route.name } </li>
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
