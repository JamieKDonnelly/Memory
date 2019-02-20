import React, { Component } from 'react';
import Grid from './components/grid/grid';
import LevelInfoBar from './components/level-info-bar/level-info-bar';
import Loader from './components/loader/loader';
import LevelModals from './components/level-modals/level-modals';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      level: 0,
      moves: 0,
      gridSize: "",
      maxWidth: 0,
      delayTime: 0,
      background: "", 
      tiles: []
    }
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
    let tilesData = [];

    document.body.style.background = this.state.background

    data[this.state.level].tiles.forEach((el)=>{
      tilesData.push(el);  
    });

    this.setState({
      loading: false,
      gridSize: data[this.state.level].gridSize,
      maxWidth: data[this.state.level].maxWidth,
      delayTime: data[this.state.level].delayTime,
      background: data[this.state.level].background,
      tiles: tilesData
    });
  }

  incrementMoves = ()=>{
    this.setState({
      moves: this.state.moves + 1
    })
  }

  render() {
    return (
      <div>

        <button id="test" onClick={this.incrementMoves}>+ MOVES</button>

        < Grid 
            maxWidth={this.state.maxWidth} 
            tiles={this.state.tiles} 
            gridSize={this.state.gridSize}
            background={this.state.background}
            delayTime={this.state.delayTime}
        />

        < LevelInfoBar 
            level={this.state.level + 1} 
            moves={this.state.moves}
        />

        < LevelModals />      

        {!this.state.loading 
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
