import React from 'react';

const createRouteClass = (type) => {
  let types = type.split(", ");
  if (types.includes("Alpine")) {
    return "Alpine";
  } else if (types.includes("TR")) {
    const idx = types.indexOf("TR");
    types.splice(idx, 1);
    console.log(types);
    if (!types.length) {
      return "TR";
    }  else if (types.join(", ") === "Trad, Aid") {
      return "TradAid";
    }
    return types.join(", ");
  } else if(type === "Trad, Aid") {
    return "TradAid";
  } else if(type === "Trad, Sport" || type === "Trad, Sport, Aid") {
    return "Other";
  } else {
    return type;
  }
};

export default (props) => {
  if (!props.data.length) return <div></div>;

  const routes = props.data.map( (route, idx) => {
    let type = createRouteClass(route.type);
    return (
      <li
        key={`list_${idx}`}
        className={`li-${type}`}
        data={route}
        onClick={e => props.updateFromChild('routeDetail', route)}>
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
