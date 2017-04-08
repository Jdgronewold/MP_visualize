import React from 'react';

import UserInputContainer from './user_input_container';

const Header = () => {
  return (
    <div className="header">
      <div className="header-vis"> Mountain Project Tick Visualizer </div>
      <UserInputContainer />
    </div>
  );
};

export default Header;
