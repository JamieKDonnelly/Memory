import React, { Component } from 'react';

class LevelModals extends Component {
  render() {
    return (
        <div id="levelCompleteModal" className="reveal-modal large" data-reveal>
            <div className="row">		
                <div id="nextModal" className="small-12 medium-12 medium-centered large-8 large-centered columns">
                    <div className="row">
                        <div className="small-12 columns">
                            <div className="levelNumber">
                                <h1 className="">Level <span></span></h1>
                            </div>				
                            <p className="finalScore">Completed in <span> </span> moves!</p>
                        </div>
                    </div>	
                    <div className="row">	
                        <div className="levelCompleteButtons nextLevel small-12 medium-6 medium-centered columns">
                                <button className="button nextLevelButton">Next level</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div id="finalModal" className="small-12 medium-12 medium-centered large-8 large-centered columns">
                    <div className="row">
                        <h1>Final scores:</h1>
                        <ul className="levelCompleteButtons small-block-grid-1 medium-block-grid-2">
                            <li>
                                <ul className="scoreList">
                                </ul>
                                <p className="total">Total = <span></span></p>					
                            </li>
                            <li>
                                <button className="button resetGame">Restart Game</button>					
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    );
  }
}

export default LevelModals;


