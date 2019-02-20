import React, { Component } from 'react';
import './tile.css';
import frontFaceBG from './frontFaceBG.png';

const frontFaceStyle = {
  backgroundImage: `url(${frontFaceBG})`
}

class Tile extends Component {
  render() {
    return (
      <li id={this.props.data.id} onClick={()=> {this.props.onClick(this)}}>
        <div className="flipContainer">
          <div className="flipContent">
            <div className="flipContainerRel">
              <div className="flipCard">
                <div className="front face" style={frontFaceStyle}></div>
                <div className="back face" style={{backgroundImage: "url(" + this.props.data.background + ")"}} ></div>
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

export default Tile;

