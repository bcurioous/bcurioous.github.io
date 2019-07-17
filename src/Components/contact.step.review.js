import React from 'react';
// import PropTypes from 'prop-types';
import {
  get as _get
} from "lodash";

const Pair = ({label, value}) => (
  <dl className="pair">
    <dt>{label}</dt>
    <dd>{value}</dd>
  </dl>
);

const ContactStepReview = props => {
  const name = _get(props,"steps.i_name.value","");
  const email = _get(props,"steps.i_email.value","");
  const purpose = _get(props,"steps.i_purpose.value","");
  
  return (
    <div style={{
      width: '100%'
    }}>
      <strong>Details</strong>
      <Pair label="Name" value={name} />
      <Pair label="Email" value={email} />
      <Pair label="Purpose" value={purpose} />
    </div>
  );

}

ContactStepReview.propTypes = {};

export default ContactStepReview;