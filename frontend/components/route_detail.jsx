import React from 'react';


class RouteDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={'route-detail'}>
        <img
          src={this.props.data.imgMed}
          alt={'mp_img'}
          className="route-image"
          height='200px'
          width='200px'
        />
        <ul>
          <li key="Name">
            <b>Name: </b>
            <a href={this.props.data.url}
              target="_blank"
            >{this.props.data.name}</a>
          </li>
          <li key="type"> <b>Type: </b> {this.props.data.type}</li>
          <li key="grade"> <b>Grade: </b> {this.props.data.grade}</li>
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
