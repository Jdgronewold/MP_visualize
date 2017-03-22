import React from 'react';
import { bindAll } from 'lodash';

import UserInputContainer from './user_input_container';

const Header = () => {
  return (
    <div className="header">
      <UserInputContainer />
    </div>
  );
};

export default Header;
