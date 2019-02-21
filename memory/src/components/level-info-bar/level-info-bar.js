import React, { Component } from 'react';
import './level-info-bar.css';

class LevelInfoBar extends Component {
  render() {
    return (
      <div className="levelInfoBar">			
        <div className="levelInfoBar__levelNumber">
          <p>Level: <span>{this.props.level}</span></p>
        </div>		
        <div className="levelInfoBar__flipCounter">
          <p>Moves: <span>{this.props.moves}</span></p>
        </div>		
      </div>
    );
  }
}

export default LevelInfoBar;


