import React from 'react';

const createRouteClass = (type) => {
  let types = type.split(", ");
  if (types.includes("Alpine")) {
    return "Alpine";
  } else if (types.includes("TR")) {
    const idx = types.indexOf("TR");
    types.splice(idx, 1);
    return types.join(", ");
  } else if(type === "Trad, Aid") {
    return "TradAid";
  } else if(type === "Trad, Sport") {
    return "Other";
  } else {
    return type;
  }
};

export default (props) => {
  const routes = props.data.map( (route, idx) => {
    let type = createRouteClass(route.type);
    return (
      <li key={`list_${idx}`} className={`li-${type}`}>
        {route.name}
      </li>
    );
  });
  return (
    <ul className="routes-list">
      {routes}
    </ul>
  );
};
