import React, { Component } from 'react';
import loaderImg from './loader.svg';


class Loader extends Component {
  render() {
    return (
      <div className="loadingDiv">
        <div className="loader">
          <img src={loaderImg} alt="loader" />
          <h1>Loading</h1>
        </div>
      </div>
    );
  }
}

export default Loader;


