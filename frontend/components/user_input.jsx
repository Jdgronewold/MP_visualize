import React from 'react';
import { bindAll } from 'lodash';

import cheerio from 'cheerio';

class UserInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '106049062',
      inputType: 'email'
    };

    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(property) {
    return (e) => this.setState({ [property]: e.currentTarget.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.fetchTicks(this.state.input, this.state.inputType).then(response => {
      this.setState({input: ''});
    });
  }


  render() {
    return (
      <div className="search-component">
        <input
          type="text"
          placeholder="Enter MP info here"
          onChange={this.update('input')}
        />
      <label>
        <input
          type="radio"
          value="email"
          checked={this.state.inputType === "email"}
          onChange={this.update('inputType')}
          />
        Email
      </label>
      <label>
        <input
          type="radio"
          value="userId"
          checked={this.state.inputType === "userId"}
          onChange={this.update('inputType')}
          />
        userId
      </label>
      <button onClick={this.handleSubmit} >Submit</button>
      </div>
    );
  }
}

export default UserInput;
