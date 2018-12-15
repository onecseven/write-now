import React, { Component } from 'react';
import {view} from "react-easy-state";
import store from "./store"
const About = () => {
  return (
    <div className="container is-rounded is-dark" style={{"display": store.vis.about}} >
    <p>
      Write Now is a simple text editor designed to let you get ideas out quickly.
      You pick a target word count. You may only save your work when you reach it. 
      Your work will be <b className={"error"}>deleted if you fail to type a word every seven seconds.</b>
    </p>
    </div>
  );
}
 
export default view(About);