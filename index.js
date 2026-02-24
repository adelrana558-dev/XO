function loadFromStorage() {
  const saved = localStorage.getItem('xoState');
  if (saved) {
    const state = JSON.parse(saved); // convert string back to array
    const buttons = document.querySelectorAll('.game-border button');
    buttons.forEach((btn, i) => {
      btn.textContent = state[i]; // restore each button’s text
    });
  }
  
}
const text=document.querySelector('.text');

function xo()
{
  const button=document.querySelectorAll('.game-border button');
  let turn=true;
  button.forEach((btn)=>{
    
   btn.addEventListener('click',()=>{
   if(turn)
    {
     btn.textContent="X";
     turn=false;

    }
    else{
      btn.textContent="O";
      turn=true;

    }  
  saveToStorage();
   const tie=checkTie();
   const winner=checkWin();
   if(winner)
   {
   
    text.innerHTML=`${winner} won &#127881`;
    
   }
  
  else if(tie)
   {
   text.innerHTML='Its a tie &#128540';
   }
   
   })
  })
};

xo();

loadFromStorage();


function saveToStorage() {
  const buttons = document.querySelectorAll('.game-border button');
  const state = [];
  buttons.forEach(btn => {
    state.push(btn.textContent);
  });
  localStorage.setItem('xoState', JSON.stringify(state));
}
function reset(){
const reset=document.querySelector('.reset-score');
reset.addEventListener('click',()=>{
   const buttons=document.querySelectorAll('.game-border button');
   buttons.forEach((btn)=>{
   btn.textContent='';
   })
   text.innerHTML=`Play &#128568`;
  localStorage.removeItem('xoState');
})
}
reset();
function checkWin()
{
  const buttons=document.querySelectorAll('.game-border button');
  const xoGrids=[
    [0,1,2],//rows array
    [3,4,5],
    [6,7,8],
    [0,3,6],//colomns
    [1,4,7],
    [2,5,8],
    [0,4,8],//diagonal
    [2,4,6]
  ]
  for( let combo of xoGrids){
   const [a,b,c]=combo;
   const val1=buttons[a].textContent;
   const val2=buttons[b].textContent;
   const val3=buttons[c].textContent;
   if(val1===val2&&val2===val3)
   { 
    return val1;
    
   }
  }
  return null;
 

}

function checkTie()
{
 const buttons= document.querySelectorAll('.game-border button');
  return Array.from(buttons).every((btn)=>{
   return btn.textContent!='';
  })
}