import React, { Component } from 'react';
import './tile.css';
import frontFaceBG from './frontFaceBG.png';

const frontFaceStyle = {
  backgroundImage: `url(${frontFaceBG})`
}

class Tile extends Component {
  render() {
    return (
      <li className={this.props.data.classname} onClick={(e)=> {this.props.onClick(this)}}>
        <div className="flipContainer">
          <div className="flipContent">
            <div className="flipContainerRel">
              <div className="flipCard">
                <div className="front face" style={frontFaceStyle}></div>
                <div className="back face" style={{backgroundImage: "url(" + require(`./../../images/level-${this.props.level}/${this.props.data.tileIndex}.png`) + ")" }} ></div>
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

export default Tile;

