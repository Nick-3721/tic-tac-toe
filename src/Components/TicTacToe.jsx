import React, { useRef, useState, useEffect  } from 'react'
import '../TicTacToe.css'
import circleIcon from '../Assets/circle.png'
import crossIcon from '../Assets/cross.png'
import { GameInfo } from './GameInfo';
import { ResetButton } from './ResetButton.styled'
import Confetti from "react-confetti"


const TicTacToe = () => {
  const boxRefs = useRef(Array.from({ length: 9 }, () => React.createRef()));
  
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
    [0, 4, 8], [2, 4, 6]              // Diagonals
  ];

  let [lock, setLock] = useState(false);  
  const [errorMessage, setErrorMessage] = useState(false)
  
  let [X_turn, setX_Turn] = useState(true)
  const [X_Positions, setX_Positions] = useState([])
  const [O_Positions, setO_Positions] = useState([])

  let [winner, setWinner] = useState(null)
  let [roundCounter, setRoundCounter] = useState(0)
  let [gameCounter, setGameCounter] = useState(0)
  let [scoreboard, setScoreboard] = useState({xScore: 0, oScore: 0})


  useEffect(() => {
    let timer
    if (errorMessage === true) {
      timer = setTimeout(() => {
        setErrorMessage(false)
      }, 2000)
    }
    return () => clearTimeout(timer)
  }, [errorMessage])

  
  const potentialPlacement = (position) => {
    if (lock || X_Positions.includes(position) || O_Positions.includes(position))  { return }

    boxRefs.current[position].current.innerHTML = `<img src='${X_turn ? crossIcon : circleIcon}' alt='${X_turn ? "X" : "O"}' class="potential-move" />`;
  }

  const removePotential = (position) => {
    if (lock || X_Positions.includes(position) || O_Positions.includes(position))  { return }

    boxRefs.current[position].current.innerHTML = ``
  }


  const handleTurn = (position) => {
    if (lock) { return }
    if (X_Positions.includes(position) || O_Positions.includes(position) ) { 
      setErrorMessage(true)
      return 
    }

    if (X_turn) {
      const newX_Positions = [...X_Positions]
      
      if (newX_Positions.length === 3) {
        const removedXPosition = newX_Positions.shift()
        newX_Positions.push(position);
        boxRefs.current[removedXPosition].current.innerHTML = ''
    } else {
        newX_Positions.push(position)
      }
      setX_Positions(newX_Positions)
      
      draw(newX_Positions, "X")
      setX_Turn(false)
      if (checkWin(newX_Positions, "X")) setLock(true);
      setRoundCounter(prevCount => prevCount +1)
    } 

    else {
      const newO_Positions = [...O_Positions]
      
      if (newO_Positions.length === 3) {
        const removedOPosition = newO_Positions.shift()
        newO_Positions.push(position)
        boxRefs.current[removedOPosition].current.innerHTML = ''
    } else { 
        newO_Positions.push(position)
      }
      setO_Positions(newO_Positions)

      draw(newO_Positions, "O")
      setX_Turn(true)
      if (checkWin(newO_Positions, "O")) setLock(true)
      setRoundCounter(prevCount => prevCount +1)
    }
  }
  

  function draw(gamePieces, side) {
    for (let i = 0; i < gamePieces.length; i++) {
      boxRefs.current[gamePieces[i]].current.classList.remove('vanishing')
      side === "X" 
        ? boxRefs.current[gamePieces[i]].current.innerHTML = `<img src='${crossIcon}' alt='X' />`
        : boxRefs.current[gamePieces[i]].current.innerHTML = `<img src='${circleIcon}' alt='O' />`;
    }
    if (gamePieces.length === 3) {
      const oldestXPosition = gamePieces[0];
      boxRefs.current[oldestXPosition].current.classList.add('vanishing')
    }
    if (gamePieces.length === 0) {
      for (let i = 0; i < 9; i++) {
        boxRefs.current[i].current.innerHTML = ''
      }
    }
  }

  useEffect(() => {
    console.log(`X positions are: ${X_Positions}`)
  }, [X_Positions])

  useEffect(() => {
    console.log(`Y positions are: ${O_Positions}`)
  }, [O_Positions])


 
  const checkWin = (positions, currentPlayer) => {
    const hasWon = winningCombinations.some(combination =>
      combination.every(index => positions.includes(index))
    )
  
    if(hasWon) {
      setLock(true);
      setWinner(currentPlayer)
      
      currentPlayer === "X" 
        ? setScoreboard((prevScore) => ({ ...prevScore, xScore: prevScore.xScore + 1 }))
        : setScoreboard((prevScore) => ({ ...prevScore, oScore: prevScore.oScore + 1 }))
        
        setGameCounter(prevCount => prevCount + 1)
    }
  
    return hasWon;
  };
 

   const resetHandleClick = () => {
    setLock(false)
    setX_Positions([])
    setO_Positions([])
    draw([], "X")
    draw([], "O")
    setRoundCounter(0)
    winner === "X" ? setX_Turn(true) : setX_Turn(false)

    setWinner(null)
   }
   console.log((`winner is: ${winner}`))
  return (
    <main>
      {winner && (
        <Confetti colors={winner === "X" ? ["#FFC226"] : ["#25FFCC"]} />
      )}


      <h1>
        {winner ? (
          <span className={`${winner}-colour`}>{winner} has won the game</span>
        ) : (
          "Tri-Tac-Toe"
        )}
      </h1>
    

      <GameInfo
        roundCounter={roundCounter}
        gameCounter={gameCounter}
        X_turn={X_turn}
        scoreboard={scoreboard}
      />
      <div className="board">
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            className="boxes"
            ref={boxRefs.current[index]}
            onClick={(e) => handleTurn(index)}
            onMouseEnter={(e) => potentialPlacement(index)}
            onMouseLeave={(e) => removePotential(index)}
          ></div>
        ))}
      </div>
      {errorMessage && (
        <p className="error-message">This position is already in use</p>
      )}
      <ResetButton
        onClick={() => {
          resetHandleClick();
        }}
        winner={winner}
      >
        {winner ? "New Game" : "Reset"}
      </ResetButton>
    </main>
  );
}

export default TicTacToe    