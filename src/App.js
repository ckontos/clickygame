import React, { Component } from 'react';
import './App.css';
import Cards from "./components/Cards";
import Title from "./components/Title";
import Wrapper from "./components/Wrapper";
import pictures from "./pictures.json";

let correctGuesses = 0;
let bestScore = 0;
let message = "Click on a minion to begin!";

class App extends Component {

  state = {
    pictures,
    correctGuesses,
    bestScore,
    message
  };

  setClicked = id => {
    //variable for the picture clicked so manipulate functionality
    const pictures = this.state.pictures;
    const clickedPicture = pictures.filter(match => match.id === id);

    //if the clicked picture has been clicked before
    if (clickedPicture[0].clicked === false) {

      clickedPicture[0].clicked = true;
      correctGuesses++;
      console.log(correctGuesses);
      message = "You guessed correctly!";

      if (correctGuesses > bestScore) {
        bestScore = correctGuesses;
        this.setState({ bestScore });
      }
      pictures.sort(function(a, b) { return 0.5 - Math.random() });

      this.setState({ pictures });
      this.setState({ correctGuesses });
      this.setState({ message });

    }
    //otherwise(if the picture has not been clicked)
    else {
      console.log("Correct Guesses: " + correctGuesses);
      console.log("Best Score: " + bestScore);

      correctGuesses = 0;
      message = "You already chose that minion! You have to start over.";

      for (let i = 0; i < pictures.length; i++) {
        pictures[i].clicked = false;
      }

      this.setState({ message });
      this.setState({ correctGuesses });
      this.setState({ pictures });
    }
  }

  render() {
    return (
      <Wrapper>
          
          <div className="heading">
            <Title>
              Minion Madness!
            </Title>
          
          
            <div className= "scoreBoard">
                <h2 className="scoreSummary">
                    Click on an image to earn points, but don't click on any of them more than once!
                </h2>
                
                <h3 className="scoreSummary">
                    {this.state.message}
                </h3>
                
                <h3 className="scoreSummary">
                    Correct Guesses: {this.state.correctGuesses}   ︱   Best Score: {this.state.bestScore}
                </h3>
                
            </div>
          </div>
          
          {this.state.pictures.map(match => (
            <Cards 
              setClicked= {this.setClicked}
              id= {match.id}
              key= {match.id}
              image= {match.image}
            />
          ))}
          
          <h3 className="scoreSummary">
              {this.state.message} ︱  Correct Guesses: {this.state.correctGuesses}   ︱   Best Score: {this.state.bestScore}
          </h3>
               
        </Wrapper>
    );
  }
}

export default App;
