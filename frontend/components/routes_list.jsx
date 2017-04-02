import React from 'react';

export default (props) => {
  const routes = props.data.map( (route, idx) => (
    <li key={`list_${idx}`}>
      {route.name}
    </li>
  ));
  return (
    <ul>
      {routes}
    </ul>
  );
};
