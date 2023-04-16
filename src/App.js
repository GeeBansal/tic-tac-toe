import { useState } from 'react';

function Square(props){
  
  return (
    <button className='square' onClick={props.onSqaureClick}>{props.value}</button>
  );
  
}

export default function App() {
  const [isnext,setisnext]=useState(true);
  const [square,setsquare]=useState(Array(9).fill(null));
  function handleClick(i){
    
    const nextSquare=square.slice();
    if(nextSquare[i] || winner){
      return;
    }
    if(isnext){
      nextSquare[i]="X";
    }
    else{
      nextSquare[i]="0";
    }
    setisnext(!isnext);
    setsquare(nextSquare);
  }
  function setAgain(){
    const nextSquare=square.slice();
    for(let i=0;i<=8;i++){
      nextSquare[i]=null;
    }
    setsquare(nextSquare);
    setisnext(isnext);
  }
  let status;
  const winner=checkWinner(square);
  if(winner){
    status="winner "+winner;
  }
  else{
    status="next chance "+(isnext?"X":"0");
  }


  return (
    <>
    <h1>{status}</h1>
    <div className='board-row'> 
    <Square value={square[0]} onSqaureClick={()=>handleClick(0)} />
    <Square value={square[1]} onSqaureClick={()=>handleClick(1)} />
    <Square value={square[2]} onSqaureClick={()=>handleClick(2)} />
    </div>
    <div className='board-row'> 
    <Square value={square[3]} onSqaureClick={()=>handleClick(3)} />
    <Square value={square[4]} onSqaureClick={()=>handleClick(4)} />
    <Square value={square[5]} onSqaureClick={()=>handleClick(5)} />
    </div>
    <div className='board-row'> 
    <Square value={square[6]} onSqaureClick={()=>handleClick(6)} />
    <Square value={square[7]} onSqaureClick={()=>handleClick(7)} />
    <Square value={square[8]} onSqaureClick={()=>handleClick(8)} />
     </div>

     <button onClick={setAgain} > Start Again</button>
     </>
  )
  
};

function checkWinner(square){
  const list=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  for(let i=0;i<list.length;i++){
      let [a,b,c]=list[i];
      if(square[a] && square[a]=== square[b] && square[b]===square[c]){
        return square[a];
      }
  }
  return null;
}