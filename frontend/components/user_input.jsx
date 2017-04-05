import React from 'react';

class UserInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      inputType: 'email'
    };

    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDemo = this.handleDemo.bind(this);

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

  handleDemo(e) {
    e.preventDefault();

    this.props.fetchTicks('106049062', 'userId').then(response => {
      this.setState({input: ''});
    });
  }


  render() {
    return (
      <div className="search-component">
        <input
          type="text"
          value={this.state.input}
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
      <i className="fa fa-question-circle-o" aria-hidden="true">
        <span className="tooltip">
          An MP userId is found at the end of the url on a users page
         </span>
      </i>
      <button onClick={this.handleSubmit} >Submit</button>
      <button onClick={this.handleDemo}> Demo</button>
      </div>
    );
  }
}

export default UserInput;
