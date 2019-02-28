import React, { Component } from 'react';
import Grid from '../grid/grid';
import LevelInfoBar from '../level-info-bar/level-info-bar';
import Loader from '../loader/loader';
import LevelModals from '../level-modals/level-modals';
import './App.css';
let shuffle = require('shuffle-array');

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      tilesLength: 0,
      level: 0,
      moves: 0,
      totalMoves: 0
    }
    this.nextLevel = this.nextLevel.bind(this);
  }

  componentDidMount(){
      fetch('https://raw.githubusercontent.com/JamieKDonnelly/MemoryJSONData/master/data.json')
      .then((response) => {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' + response.status);
              return;
            }
            response.json().then((data)=>{
              this.setInitialState(data);
            });
        }
      )
      .catch((err) => {
          console.log('Fetch Error :-S', err);
      });
  }

  setInitialState(data){
    data.forEach((el, index)=>{
      let length = el.tiles
      el.tiles = []
      for(let i = 0; i < length; i++){
        let tile = {
          classname: "",
          tileIndex: i + 1
        }
        el.tiles.push(tile)
      } 
      for(let i = 0; i < length; i++){
        let tile = {
          classname: "",
          tileIndex: i + 1
        }
        el.tiles.push(tile)
      } 
      shuffle(el.tiles)
    })
    this.setState({
      gameData: data,
      level: this.state.level + 1,
      loading: false
    })
  }

  turnHandler = (winner)=>{    
    this.setState({
      moves: this.state.moves + 1
    })
    if(winner === true){
      alert('COMPLETE');
      this.nextLevel();
    }
  }

  nextLevel(){
    this.setState({
      totalMoves: this.state.totalMoves + this.state.moves,
      level: this.state.level + 1
    }, ()=>{
      this.setState({
        moves: 0
      });
    })
  }

  render() {
    if(this.state.loading === true){
      return(
        < Loader />
      )
    }
    return (
      <div>
        <button onClick={this.nextLevel}>Next Level</button>
        < Grid 
            level={this.state.level}
            levelData={this.state.gameData[this.state.level-1]}            
            turnHandler={this.turnHandler}
        />
        < LevelInfoBar 
            level={this.state.level} 
            moves={this.state.moves}
        />
        < LevelModals />
        <div className="bottomBar">		
          <p><a href="http://www.jamiekdonnelly.co.uk">www.jamiekdonnelly.co.uk</a></p>		
        </div>

      </div>      
    );
  }
}

export default App;
