import React, { Component } from 'react';
import Tile from '../tile/tile';
import './grid.css';
let shuffle = require('shuffle-array');

class Grid extends Component {

  constructor(props){
    super(props)
    this.state = {     
      tiles: [],
      activeTile: ""
    }
  }

  componentWillReceiveProps(props){
    this.style = {
      maxWidth: props.maxWidth * window.innerHeight
    }
    this.flipGridClass = `flipGrid ${props.gridSize}`
    this.setState({
      tiles: props.tiles
    }, ()=> {
      this.jumbleTiles()
    });
  }

  jumbleTiles(){
    this.setState({
      tiles: shuffle(this.state.tiles)
    })
  }

  tileClick(tile){
    console.log(this);
    tile.setState({
      className: "active"
    })
    // if(this.state.activeTile === ""){
    //   tile.setState({
    //     className: "active"
    //   })
    //   // this.setState({
    //   //   activeTile: tile
    //   // })
    // } else if(this.state.activeTile.id === tile.props.id){
    //   tile.setState({
    //     className: "matching"
    //   })
    //   // this.state.activeTile.setState({
    //   //   className: "matching"
    //   // })
    // }
  }

  render() {
    return (
      <section className="gridWrapper">
        <div className="gridHelper"></div>
        <div className="gridContainer" style={this.style}>
          <div className="gridContentCover">
          </div>
          <ul className={this.flipGridClass}>
              {this.state.tiles.map((item, key) =>{
                return <Tile data={item} key={key} onClick={this.tileClick} />
              })}
              {this.state.tiles.map((item, key) =>{
                return <Tile data={item} key={key} onClick={this.tileClick} />
              })}
          </ul>
        </div>        
      </section>
    );
  }
}

export default Grid;

