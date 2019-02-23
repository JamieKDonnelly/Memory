import React, { Component } from 'react';
import Tile from '../tile/tile';
import './grid.css';

class Grid extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentLevel: 0,
      completedTiles: 0,
      loading: true,      
      isGuessing: false,
      firstGoOnLevel: true,
      firstGuess: "",
      secondGuess: ""
    }
    this.tileClick = this.tileClick.bind(this);
    this.calculateGuesses = this.calculateGuesses.bind(this);
    this.calculateWin = this.calculateWin.bind(this);
  }

  componentDidMount(){
    this.setLevel();
  }

  componentWillReceiveProps(){
    if(this.state.firstGoOnLevel === true && this.state.currentLevel !== this.props.level){
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
      currentLevel: this.props.level,
      tilesLength: this.props.levelData.tiles.length / 2, 
      loading: false
    }) 
  }

  resetGrid(){
    this.setState({
      firstGoOnLevel: true
    })
    this.state.tiles.forEach((el, index)=>{
      // Reset active classes
    })
  }

  tileClick(tile){
    if(!this.state.isGuessing){
      let newTileState = this.state.tiles
      newTileState[tile.props.dataIndex].classname = "active"
      this.setState({
        tiles: newTileState
      })
      this.setState({
        firstGoOnLevel: false,
        isGuessing: true,
        firstGuessTile: tile.props
      })
    } else{
      let newTileState = this.state.tiles
      newTileState[tile.props.dataIndex].classname = "active"
      this.setState({
        tiles: newTileState
      })
      this.setState({
        secondGuessTile: tile.props
      },()=>{
        setTimeout(()=>{
          this.calculateGuesses();
        }, this.props.levelData.delayTime)
      })
    }
  } 

  calculateGuesses(){
    if(this.state.firstGuessTile.data.tileIndex === this.state.secondGuessTile.data.tileIndex){
      this.setState({
        completedTiles: this.state.completedTiles + 1
      })
      let newTileState = this.state.tiles
      newTileState.forEach((index)=>{
        newTileState[this.state.firstGuessTile.dataIndex].classname = "matched"
        newTileState[this.state.secondGuessTile.dataIndex].classname = "matched"
      })
      this.setState({
        tiles: newTileState
      })
    } 
    else{
      let newTileState = this.state.tiles
      newTileState.forEach((index)=>{
        newTileState[this.state.firstGuessTile.dataIndex].classname = ""
        newTileState[this.state.secondGuessTile.dataIndex].classname = ""
      })
      this.setState({
        tiles: newTileState
      })
    }   
    this.calculateWin() 
  }

  calculateWin(){
    let winner = false;
    if(this.state.completedTiles === (this.state.tilesLength)){
      winner = true;
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
            {this.state.tiles.map((item, index) =>{
              let keyValue = `${this.props.level}-${index}`;
              return <Tile data={item} dataIndex={index} level={this.props.level} key={keyValue} onClick={this.tileClick} />
            })}
          </ul>
        </div>        
      </section>
    );
  }
}

export default Grid;

