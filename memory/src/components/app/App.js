import React, { Component } from 'react';
import Grid from '../grid/grid';
import LevelInfoBar from '../level-info-bar/level-info-bar';
import Loader from '../loader/loader';
import LevelModals from '../level-modals/level-modals';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: {},
      loading: true,
      level: 0,
      moves: 0,
      gridSize: "",
      maxWidth: 0,
      delayTime: 0,
      background: "", 
      tiles: []
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
    //document.body.style.background = this.state.background
    this.setState({
      data: data,
      loading: false,
      gridSize: data[this.state.level].gridSize,
      maxWidth: data[this.state.level].maxWidth,
      delayTime: data[this.state.level].delayTime,
      background: data[this.state.level].background,
      tiles: data[this.state.level].tiles
    });
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
      moves: 0,
      level: this.state.level + 1,
      gridSize: this.state.data[this.state.level + 1].gridSize,
      maxWidth: this.state.data[this.state.level + 1].maxWidth,
      delayTime: this.state.data[this.state.level + 1].delayTime,
      background: this.state.data[this.state.level + 1].background,
      tiles: this.state.data[this.state.level + 1].tiles
    });
  }

  render() {
    return (
      <div>

        <button id="test" onClick={this.changeLevel}>+ MOVES</button>

        < Grid 
            data={this.state}
            turnHandler={this.turnHandler}
        />

        < LevelInfoBar 
            level={this.state.level + 1} 
            moves={this.state.moves}
        />

         < LevelModals />

        {this.state.loading 
          ?
          <Loader/>
          :
          null
        }

        <div className="bottomBar">		
          <p><a href="http://www.jamiekdonnelly.co.uk">www.jamiekdonnelly.co.uk</a></p>		
        </div>

      </div>
    );
  }
}

export default App;
