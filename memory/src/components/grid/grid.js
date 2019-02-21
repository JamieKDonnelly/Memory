import React, { Component } from 'react';
import Tile from '../tile/tile';
import './grid.css';
import Loader from '../loader/loader'
let shuffle = require('shuffle-array');

class Grid extends Component {

  constructor(props){
    super(props)
    this.state = {
      tiles: props.data.tiles,
      completedTiles: 0,
      tileLength: 0,
      isGuessing: false,
      tileFirstGuess: {},
      tileSecondGuess: {},
      initialised: false
    }
    this.tileClick = this.tileClick.bind(this);
    this.calculateGuess = this.calculateGuess.bind(this);
    this.calculateWin = this.calculateWin.bind(this);
  }

  componentWillReceiveProps(props){    
    if(this.state.initialised === false){
      this.setState({
        initialised: true
      })

      this.style = {
        maxWidth: props.data.maxWidth * window.innerHeight
      }
      this.flipGridClass = `flipGrid ${props.data.gridSize}`
  
      this.setState({
        tiles: props.data.tiles
      }, ()=> {
        this.state.tiles.forEach((el, index)=>{
          el.tileIndex = index
        });
        this.setState({
          tileLength: props.data.tiles.length,
          tiles: props.data.tiles.concat(props.data.tiles),
        }, ()=> {
          this.setState({
            tiles: shuffle(this.state.tiles)
          })
        });
      })
    }    
  }

  tileClick(tile){
    console.log(tile.props.data.tileIndex)

    if(tile.state.classname !== "" ){
      return
    }
    if(this.state.isGuessing){
      tile.setState({
        classname: "active"
      })

      this.setState({
        tileSecondGuess: tile
      }, ()=> {
        setTimeout(()=>{
          this.calculateGuess()
        }, this.props.data.delayTime)
      })
      
    } else{
      tile.setState({
        classname: "active"
      })

      this.setState({
        tileFirstGuess: tile,
        isGuessing: true
      })
    }
  } 

  calculateGuess(){
    this.setState({
      isGuessing: false
    })
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
    }
    this.props.turnHandler(winner);
  }

  render() {
    if(this.state.tileLength === 0){
      return(
        < Loader />
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
              return <Tile data={item} level={this.props.data.level} key={key} onClick={this.tileClick} />
            })}
          </ul>
        </div>        
      </section>
    );
  }
}

export default Grid;

