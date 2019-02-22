import React, { Component } from 'react';
import Tile from '../tile/tile';
import './grid.css';
let shuffle = require('shuffle-array');

class Grid extends Component {
  constructor(props){
    super(props)
    this.state = {
      prevLevel: 0,
      loading: true,
      completedTiles: 0,
      isGuessing: false,
      tileFirstGuess: {},
      tileSecondGuess: {},
      firstGoNewLevel: true
    }
    this.tileClick = this.tileClick.bind(this);
    this.calculateGuess = this.calculateGuess.bind(this);
    this.calculateWin = this.calculateWin.bind(this);
  }

  componentDidMount(){
    this.setLevel();
  }

  componentWillReceiveProps(){
    if(this.state.firstGoNewLevel === true && this.state.prevLevel !== this.props.level){
      this.setLevel();
    }
  }

  setLevel(){
    this.style = {
      maxWidth: this.props.levelData.maxWidth * window.innerHeight
    }
    this.flipGridClass = `flipGrid ${this.props.levelData.gridSize}`

    this.setState({
      tiles: this.props.levelData.tiles,
      prevLevel: this.props.level
    }, ()=> {
      this.setState({
        tileLength: this.state.tiles.length,
        tiles: this.state.tiles.concat(this.state.tiles)        
      }, ()=> {
        this.setState({
          tiles: shuffle(this.state.tiles),
          loading: false
        })
      });
    }) 
  }

  tileClick(e){
    let tile = e // this.state.tiles.tileIndex[e.props.data.tileIndex];

    if(this.state.isGuessing){
      tile.setState({
        classname: "active"
      })

      this.setState({
        tileSecondGuess: tile
      }, ()=> {
        setTimeout(()=>{
          this.calculateGuess(tile)
        }, this.props.levelData.delayTime)
      })
      
    } else{
      tile.setState({
        classname: "active"  
      })

      this.setState({
        tileFirstGuess: tile,
        firstGoNewLevel: false,
        isGuessing: true
      })
    }
  } 

  calculateGuess(){
    if(this.state.tileFirstGuess.props.data.id === this.state.tileSecondGuess.props.data.id){
      this.state.tileFirstGuess.setState({
        classname: "matched"
      })
      this.state.tileSecondGuess.setState({
        classname: "matched"
      })
      this.setState({
        completedTiles: this.state.completedTiles + 1
      })
    } else{
      this.state.tileFirstGuess.setState({
        classname: ""
      }, ()=>{
        this.setState({
          tileFirstGuess: {}
        })
      })
      this.state.tileSecondGuess.setState({
        classname: ""
      }, ()=>{
        this.setState({
          tileSecondGuess: {}
        })
      })
    }
    this.calculateWin()
  }

  calculateWin(){
    let winner = false;
    if(this.state.completedTiles === (this.state.tileLength)){
      winner = true;
      this.setState({
        firstGoNewLevel: true
      })
      this.state.tiles.forEach((el, index)=>{
        let tileItem = this.state.tiles[index];
        tileItem.classname = "";
        this.setState({tileItem})
      })
    }    
    this.setState({
      isGuessing: false
    })
    this.props.turnHandler(winner);
  }

  render() {
    if(this.state.loading === true){
      return(
        <div></div>
      )
    }
    
    return (
      <section className="gridWrapper">
        <div className="gridHelper"></div>
        <div className="gridContainer" style={this.style}>
          <div className="gridContentCover">
          </div>
          <ul className={this.flipGridClass}>
            {this.state.tiles.map((item, key) =>{
              return <Tile classname={item.classname} data={item} level={this.props.level} key={key} onClick={this.tileClick} />
            })}
          </ul>
        </div>        
      </section>
    );
  }
}

export default Grid;

