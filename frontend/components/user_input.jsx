import React from 'react';
import { bindAll } from 'lodash';

import cheerio from 'cheerio';

class UserInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };

    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(property) {
    return (e) => this.setState({ [property]: e.currentTarget.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    // this.props.fetchTicks(this.state.email).then(
    //   this.setState({ email: ''})
    // );
    var key = "108453776-6b2fff6c580d3978b909f4ccaa856cb3";
    var url =
      'https://www.mountainproject.com/data?action=getTicks&userId=' +
      this.state.email + '&key=' + key;

  }


  render() {
    return (
      <div className="search-component">
        <input
          type="text"
          placeholder="Enter MP Email"
          onChange={this.update('email')}
        />
      <button onClick={this.handleSubmit} >Submit</button>
      </div>
    );
  }
}

export default UserInput;
