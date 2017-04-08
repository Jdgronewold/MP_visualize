import React from 'react';
import ReactDOM from 'react-dom';


class RouteDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.detail)
      .scrollIntoView({behavior: 'smooth', block: 'end'});
  }

  componentDidUpdate() {
    ReactDOM.findDOMNode(this.refs.detail)
      .scrollIntoView({behavior: 'smooth', block: 'end'});
  }

  render() {
    let grade;
    let gear = this.props.data.gear || "";

    if (this.props.data.grade === "Other") {
      grade = this.props.data.gear;
      gear = "";
    } else {
      grade = this.props.data.grade;
    }

    return (
      <div className='route-detail' ref="detail">
        <img
          src={this.props.data.imgMed}
          alt={'mp_img'}
          className="route-image"
          height='250px'
          width='auto'
        />
        <ul>
          <li key="Name">
            <b>Name: </b>
            <a href={this.props.data.url}
              target="_blank"
            >{this.props.data.name}</a>
          </li>
          <li key="type"> <b>Type: </b> {this.props.data.type}</li>
          <li key="grade">
            <b>Grade: </b>
            {grade + " " + gear}
          </li>
          <li key="pitches"> <b>Pitches: </b> {this.props.data.pitches}</li>
          <li key="location"> <b>Location: </b> {this.props.data.location.join(" > ")}</li>
          <li key="date"> <b>Date Climbed: </b> {this.props.data.date}</li>
          <li key="notes"> <b>Notes: </b> {this.props.data.notes}</li>
        </ul>
      </div>
    );
  }
}

export default RouteDetail;
