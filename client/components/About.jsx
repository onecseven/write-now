import React, { Component } from 'react';
import {view} from "react-easy-state";

const About = () => {
  return (
    <div className="container is-rounded is-dark">
    <p>
      Write Now is a simple text editor designed to let you get ideas out quickly.
      The rules are simple. You pick pick a target word count and get ready to start writing. Write.
      You can only save your work when you reach the word count. Your work is <b className={"error"}>deleted if you fail to type a word every seven seconds. </b>
    </p>
    </div>
  );
}
 
export default About;