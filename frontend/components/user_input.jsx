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

    this.props.fetchTicks(this.state.email).then(response => {
      this.setState({email: ''});
    });
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
