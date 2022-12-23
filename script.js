"user strict";

let taskNr = 0;

const randomInteger = (min, max) =>
        Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
        `rgb(${randomInteger(0,255)}, ${randomInteger(0,255)},
        ${randomInteger(0,255)})`;

 
document.addEventListener('DOMContentLoaded', function() {
    //by defaultm submit button is disabled

    document.querySelector('#submit').disabled = true;
    document.querySelector('#task').onkeyup = () => {
        if (document.querySelector('#task').value.length > 0) {
            document.querySelector('#submit').disabled = false;
        } else {
            document.querySelector('#submit').disabled = true;
        }
    }
    postTask ();         
    });   
            
function editTask (){   
    const element = event.target;
    toEdit = element.parentElement.innerHTML;
    var newTask = toEdit.replace(b, '');
    document.querySelector('form').onsubmit , () => {
        element.parentElement.style = ' ';
        const taskValue = document.querySelector('#task').value;
        element.parentElement.innerHTML = taskValue + a; 
        document.querySelector('#task').value = '';
        document.querySelector('#submit').disabled = true;                       
        // stop form from submitting
        return false;                   
        }                       
    }      

const formatedDate = function () {
    const now = new Date();
    //const day = `${now.getDate()}`.padStart(2, 0);
    //const month = `${now.getMonth() + 1}`.padStart(2, 0);
    //const year = now.getFullYear();
    const hour = `${now.getHours()}`.padStart(2, 0);
    const min = `${now.getMinutes()}`.padStart(2, 0);
    return `${hour}:${min}`;
};

// creates the logics for the timer button
const startTimer = function (nr, time) {
    const labTimer = document.querySelector(`.timer-${nr}`);
    const labTimer2 = document.querySelector('.timer');
    const labelPost = document.querySelector(`.post-${nr}`);
    const timeSnap = function () {
      const min = String(Math.trunc(time / 60)).padStart(2, 0);
      const sec = String(time % 60).padStart(2, 0);
      labTimer.textContent = `${min}:${sec}`;
      if (time === 0) {
        clearInterval(timer);
        labelPost.style.backgroundColor = "red";
      }
      time--;
    };
    timeSnap();
    // labTimer.addEventListener('click', function () {
    //     alert(labTimer.textContent)
    // })
    labTimer.addEventListener('click', function (e) {
        this.style.backgroundColor = randomColor();
        console.log(randomColor());
    })
    const timer = setInterval(timeSnap, 1000);
    //labTimer.addEventListener('click', clearInterval(timer))
    return timer;
  };
  
  
function postTask (){
    document.querySelector('form').onsubmit = () => {
        taskNr++;
        
        // if (time = document.querySelector('#taskTime').value) {
        //     time;
        // } else {
        //     var time = 300;
        // }
         time =(time = document.querySelector('#taskTime').value) ? time : 600;
        const taskValue = document.querySelector('#task').value;
        const post = document.createElement('div');
        post.className = `post-${taskNr} post `;
        post.innerHTML = 
        `<div class="taskInput">${taskNr}. ${taskValue}</div>
        <div class="date">${formatedDate()}</div>
        <button class="edit">Edit</button>
        <button class="confirm">Confirm</button>
        <button class="delete">Delete</button>
        <button class="timer timer-${taskNr}">1:00</button>`;     
        document.querySelector('#posts').append(post);                       
        document.querySelector('#task').value = '';
        document.querySelector('#taskTime').value = '';
        document.querySelector('#submit').disabled = true;                      
        // stop form from submitting
        startTimer(taskNr, time);
        return false
    }   
}
           
 // If hide button is clicked, delete the post
document.addEventListener('click', event => {
    const element = event.target;                        
         if (element.className === 'delete') {
            element.parentElement.style.animationPlayState = 'running';
            element.parentElement.addEventListener('animationend', () =>  {
                element.parentElement.remove();
            });
        } else  if (element.className === 'edit'  ){ 
                element.parentElement.contentEditable = true;
                element.parentElement.style = 'background-color: #68a1b0;';              
        } else if (element.className === 'confirm') {
                element.parentElement.contentEditable = false;
                element.parentElement.style = ' ';
        }      else if (element.className === 'timer') {
            
            startTimer(taskNr, time); 
        }   
                
    });