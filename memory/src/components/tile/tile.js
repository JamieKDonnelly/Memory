import React, { Component } from 'react';
import './tile.css';
import frontFaceBG from './frontFaceBG.png';

const frontFaceStyle = {
  backgroundImage: `url(${frontFaceBG})`
}

class Tile extends Component {
  constructor(props){
    super(props)
    this.state = {
      classname: "",
      initialised: false
    }
    this.imgBG = "";
  }

  componentWillReceiveProps(props){
    if(this.state.initialised === false){
      this.setState({
        initialised: true,
        imgBG: require(`./../../images/level-${this.props.level+1}/${this.props.data.tileIndex+1}.png`)
      })
    }
  }

  render() {
    return (
      <li className={this.state.classname} bg={`Tile Index: ${this.props.data.tileIndex+1}`} id={this.props.data.id} onClick={(e)=> {this.props.onClick(this)}}>
        <div className="flipContainer">
          <div className="flipContent">
            <div className="flipContainerRel">
              <div className="flipCard">
                <div className="front face" style={frontFaceStyle}></div>
                <div className="back face" style={{backgroundImage: `url(${this.state.imgBG})` }} ></div>
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

export default Tile;

