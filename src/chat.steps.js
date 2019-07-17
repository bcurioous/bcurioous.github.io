import React from "react";

import DataMatcher from "./utils/data.matcher";
import ContactStepReview from "./Components/contact.step.review";

export default[
  {
    "id" : "start",
    "message" : "Hi...",
    "trigger" : "ask",
    // "delay" : 1000
  }, {
    "id" : "ask",
    "message" : "Something for me!",
    "trigger" : "name",
    // "delay" : 1000
  }, {
    "id" : "name",
    "message" : "What is your name?",
    "trigger" : "i_name",
    // "delay" : 1000
  }, {
    "id" : "i_name",
    "user" : true,
    "trigger" : "email",
    "placeholder" : "Your Name"
  }, {
    "id" : "email",
    "message" : "What is your email address?",
    "trigger" : "i_email",
    // "delay" : 1000
  }, {
    "id" : "i_email",
    "user" : true,
    "trigger" : "purpose",
    "placeholder" : "abc@domain.com",
    "validator" : (value) => {
      if (!DataMatcher.isValidEmail(value)) {
        return "Must be a valid email address"
      } else 
        return true;
      }
    }, {
    "id" : "purpose",
    "message" : "Message for me",
    "trigger" : "i_purpose",
    // "delay" : 1000
  }, {
    "id" : "i_purpose",
    "user" : true,
    "placeholder" : "Description",
    "trigger" : "purpose_append"
  }, {
    "id" : "purpose_append",
    "message" : "Continuing message ?",
    "trigger" : "review"
  },
  {
    id: 'review',
    component: <ContactStepReview />,
    asMessage: true,
    trigger: 'update_purpose',
  },
  {
    "id" : "update_purpose",
    options : [
      {
        value: 1,
        label: 'Yes',
        trigger: 'i_purpose'
      }, {
        value: 2,
        label: 'No, thats it',
        trigger: 'end'
      }
    ]
  },{
    "id" : "end",
    "message" : "Received your query, Contacting you soon.",
    "end" : true
  }
]
