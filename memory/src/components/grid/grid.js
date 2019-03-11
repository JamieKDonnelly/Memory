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
      calculatingGuess: false,  
      takingSecondGuess: false,
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
    this.pageStyle = {
      backgroundImage: "url(" + require(`./../../images/level-${this.props.level}/level-${this.props.level}-bg.jpg`) + ")"
    }
    this.gridStyle = {
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

  tileClick(tile){
    if(this.state.calculatingGuess === true){
      return;
    }
    if(this.state.takingSecondGuess){
      let newTileState = this.state.tiles
      newTileState[tile.props.dataIndex].classname = "active"
      this.setState({
        tiles: newTileState,
        calculatingGuess: true
      })
      this.setState({
        secondGuessTile: tile.props
      },()=>{
        setTimeout(()=>{
          this.calculateGuesses();
        }, this.props.levelData.delayTime)
      })
    } else{
      let newTileState = this.state.tiles
      newTileState[tile.props.dataIndex].classname = "active"
      this.setState({
        tiles: newTileState
      })
      this.setState({
        firstGoOnLevel: false,
        takingSecondGuess: true,
        firstGuessTile: tile.props
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
      this.setState({
        firstGoOnLevel: true,
        completedTiles: 0
      });
    }
    this.setState({
      takingSecondGuess: false,
      calculatingGuess: false
    })
    this.props.levelHandler(winner);
  }

  render() {
    if(this.state.loading === true){
      return(
        <div></div>
      )
    }    
    return (
      <section className="gridWrapper" style={this.pageStyle} >
        <div className="gridHelper"></div>
        <div className="gridContainer" style={this.gridStyle} >
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

