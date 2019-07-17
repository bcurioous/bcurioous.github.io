import React, { Component } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";

import ReactGA from "react-ga";
import { get as _get, eq as _eq, isEmpty as _isEmpty } from "lodash";
import $ from "jquery";
import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import About from "./Components/About";
import Medium from "./Components/Medium";
import Resume from "./Components/Resume";
import Contact from "./Components/Contact";
import Testimonials from "./Components/Testimonials";
import Portfolio from "./Components/Portfolio";

import CHAT_STEPS from "./chat.steps";

const otherFontTheme = {
  background: "#f5f8fb",
  fontSize: "10pt",
  fontFamily: "opensans-bold, sans-serif",
  headerBgColor: "#16A085",
  headerFontColor: "#fff !important",
  headerFontSize: "16px",
  botBubbleColor: "#16A085",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#4a4a4a"
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foo: "bar",
      resumeData: {}
    };

    if (!_eq(_get(process.env, "NODE_ENV"), "development")) {
      ReactGA.initialize("UA-123797952-1");
      ReactGA.pageview(window.location.pathname);
    }
  }

  getResumeData() {
    $.ajax({
      url: "/resumeData.json",
      dataType: "json",
      cache: false,
      success: function(data) {
        console.log("resume data json", data);
        this.setState({ resumeData: data });
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err);
        alert(err);
      }
    });
  }

  componentDidMount() {
    this.getResumeData();
  }

  render() {
    const profilePic = _get(this.state, "resumeData.main.image");
    const mediumRssToJsonUrl = _get(
      this.state,
      "resumeData.main.mediumRssToJsonUrl"
    );
    return (
      <div className="App">
        <Header data={this.state.resumeData.main} />
        <About data={this.state.resumeData.main} />
        <Medium mediumRssToJsonUrl={mediumRssToJsonUrl} />
        <Resume data={this.state.resumeData.resume} />
        <Portfolio data={this.state.resumeData.portfolio} />
        <Testimonials data={this.state.resumeData.testimonials} />
        <Contact data={this.state.resumeData.main} />
        <Footer data={this.state.resumeData.main} />
        {!_isEmpty(profilePic) && (
          <ThemeProvider theme={otherFontTheme}>
            <ChatBot
              headerTitle="Talk To Me"
              recognitionEnable={true}
              botAvatar={`/images/${profilePic}`}
              floating
              // style={{background: "green"}}
              // floatingStyle={{background:'#16A085'}}
              submitButtonStyle={{ marginBottom: "0" }}
              steps={CHAT_STEPS}
            />
          </ThemeProvider>
        )}
      </div>
    );
  }
}

export default App;
