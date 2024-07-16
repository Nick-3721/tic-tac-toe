import React, { useRef, useState } from 'react'
import './TicTacToe.css'
import circleIcon from '../Assets/circle.png'
import crossIcon from '../Assets/cross.png'

let data = ["","","","","","","","",""];

const TicTacToe = () => {
  let [count, setCount] = useState(0);
  let [lock, setLock] = useState(false);
  let titleRef = useRef(null)



  let box1 = useRef(null);
  let box2 = useRef(null);
  let box3 = useRef(null);
  let box4 = useRef(null);
  let box5 = useRef(null);
  let box6 = useRef(null);
  let box7 = useRef(null);
  let box8 = useRef(null);
  let box9 = useRef(null);

 let boxArray = [box1, box2, box3, box4, box5, box6, box7, box8, box9];

  const handleClick = (e, num) => {
    if(lock) {
      return 0
    }
    if(count%2===0){
      e.target.innerHTML = `<img src='${crossIcon}'>`
      data[num]="x";
      setCount(++count);
    }
    else {
      e.target.innerHTML = `<img src='${circleIcon}'>`
      data[num]="o";
      setCount(++count);
    }
    checkWin();
  }
 
  const checkWin = () => {
    if(data[0]===data[1] && data[1]===data[2] && data[2]!== "") {
      gameWon(data[2])
    }
    else if(data[3]===data[4] && data[4]===data[5] && data[5]!== "") {
      gameWon(data[5])
    }
    else if(data[6]===data[7] && data[7]===data[8] && data[8]!== "") {
      gameWon(data[8])
    }
    else if(data[0]===data[3] && data[3]===data[6] && data[6]!== "") {
      gameWon(data[6])
    }
    else if(data[1]===data[4] && data[4]===data[7] && data[7]!== "") {
      gameWon(data)
    }
    else if(data[2]===data[5] && data[5]===data[8] && data[8]!== "") {
      gameWon(data[8])
    }
    else if(data[0]===data[4] && data[4]===data[8] && data[8]!== "") {
      gameWon(data[8])
    }
    else if(data[2]===data[4] && data[4]===data[6] && data[6]!== "") {
      gameWon(data[6])
    }
  } 
  
  const gameWon = (winner) => {
    console.log("game won by:", winner)
    setLock(true);
    if(winner==='x') {
      titleRef.current.innerHTML = `Congratulations: <img src='${crossIcon}'> wins`
    }
    else if (winner=== 'o') {
      titleRef.current.innerHTML = `Congratulations: <img src='${circleIcon}'> wins`
    }
  }



  const resetHandleClick = () => {
    setLock(false)
    data = ["","","","","","","","",""];
    titleRef.current.innerHTML = 'Tic tac Toe Game in <span>&nbsp;React</span>'

    boxArray.map((e) => {
      e.current.innerHTML = ''
    })
  }


  return (
    <div className='container'>
      <h1 className="title" ref={titleRef}>Tic tac Toe Game in <span>&nbsp;React</span></h1>
      <div className="board">
        <div className="row1">
          <div className="boxes" ref={box1} onClick={(e)=>{handleClick(e,0)}}></div>
          <div className="boxes" ref={box2} onClick={(e)=>{handleClick(e,1)}}></div>
          <div className="boxes" ref={box3} onClick={(e)=>{handleClick(e,2)}}></div>
        </div>
        <div className="row2">
          <div className="boxes" ref={box4} onClick={(e)=>{handleClick(e,3)}}></div>
          <div className="boxes" ref={box5} onClick={(e)=>{handleClick(e,4)}}></div>
          <div className="boxes" ref={box6} onClick={(e)=>{handleClick(e,5)}}></div>
        </div>
        <div className="row3">
          <div className="boxes" ref={box7} onClick={(e)=>{handleClick(e,6)}}></div>
          <div className="boxes" ref={box8} onClick={(e)=>{handleClick(e,7)}}></div>
          <div className="boxes" ref={box9} onClick={(e)=>{handleClick(e,8)}}></div>
        </div>
      </div>
      <button className='reset' onClick={()=>{resetHandleClick()}}>Reset</button>
    </div>
  )
}

export default TicTacToe    