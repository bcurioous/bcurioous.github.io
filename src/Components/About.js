import React, {Component} from 'react';
import {get as _get} from 'lodash';

class About extends Component {
  render() {

    const profilepic = `images/${_get(this.props, "data.image", "")}`;
    const name = _get(this.props, "data.name", "");
    const bio = _get(this.props, "data.bio", "");
    const street = _get(this.props, "data.address.street", "");
    const city = _get(this.props, "data.address.city", "");
    const state = _get(this.props, "data.address.state", "");
    const zip = _get(this.props, "data.address.zip", "");
    const phone = _get(this.props, "data.phone", "");
    const email = _get(this.props, "data.email", "");
    const resumeDownload = _get(this.props, "data.resumedownload", "");

    return (
      <section id="about">
        <div className="row">
          <div className="three columns">
            <img
              className="profile-pic"
              src={profilepic}
              alt={`${_get(this.props, "data.name", "Owner")}`}/>
          </div>
          <div className="nine columns main-col">
            <h2>About Me</h2>

            <p>{bio}</p>
            <div className="row">
              <div className="columns contact-details">
                <h2>Contact Details</h2>
                <p className="address">
                  <span>{name}</span>
                  <span>{street}</span>
                  <span>{city}</span>
                  <span>{state}</span>
                  <span>{zip}</span>
                  <span>{phone}</span>
                  <span>{email}</span>
                </p>
              </div>
              <div className="columns download">
                <p>
                  <a href={resumeDownload} className="button">
                    <i className="fa fa-download"></i>Download Resume</a>
                </p>
              </div>
            </div>
          </div>
        </div>

      </section>
    );
  }
}

export default About;
