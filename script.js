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
    const labelPost = document.querySelector(`.post-${nr}`);
    var timeSec = time*60;
    const timeSnap = function () {
      const hrs = String(Math.trunc(timeSec / 3600)).padStart(2, 0);
      const min = String(Math.trunc(timeSec / 60) % 60).padStart(2, 0);
      const sec = String(timeSec % 60).padStart(2, 0);
      if (timeSec >= 3600) {
        labTimer.textContent = `${hrs}:${min}:${sec}`;
      }  else if (timeSec < 3600) {
        labTimer.textContent = `${min}:${sec}`;
      }
      if (timeSec === 0) {
        clearInterval(timer);
        labelPost.style.backgroundColor = "red";
      };
      timeSec--;
    };
    timeSnap();
    labTimer.addEventListener('click', function (e) {
        this.style.backgroundColor = randomColor();
        console.log(randomColor());
    })
    const timer = setInterval(timeSnap, 1000);
    //labTimer.addEventListener('click', clearInterval(timer))
    return timer;
  };

const editPost = function (nr, elm) {
    const tskInp = document.querySelector(`.taskInput-${nr}`); 
    const editLabel = document.querySelector(`#editId-${nr}`); 
    console.log(editLabel) 
    if (editLabel.textContent === 'Edit'){
        console.log(tskInp.contentEditable + '1 here')
        tskInp.contentEditable = true;
        //element.parentElement.contentEditable = true;
        elm.parentElement.style = 'background-color: #68a1b0;'; 
        editLabel.textContent = 'Confirm';
        console.log(tskInp.contentEditable + '2 here')  
        } else {
            console.log(tskInp.contentEditable + '3 here')
            editLabel.textContent = 'Edit';
            tskInp.contentEditable = false;
            elm.parentElement.style = ' ';
            console.log(tskInp.contentEditable + '4 here')
        }   
}
  
function postTask (){
    document.querySelector('form').onsubmit = () => {
        taskNr++;
        // if (time = document.querySelector('#taskTime').value) {
        //     time;
        // } else {
        //     var time = 300;
        // }
        time =(time = document.querySelector('#taskTime').value) ? time : 30;
        const taskValue = document.querySelector('#task').value;
        const post = document.createElement('div');
        post.className = `post-${taskNr} post `;
        post.innerHTML = 
        `<div class="date">${formatedDate()}</div>
        <div class="taskInput-${taskNr}">${taskNr}. ${taskValue}</div>
        <button class="edit" id="editId-${taskNr}">Edit</button>
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
            editPost(taskNr, element);
        // } else if (element.className === 'confirm') {
        //     console.log(tskInp.contentEditable)
        //     tskInp.contentEditable = false;
        //     element.parentElement.style = ' ';
        } else if (element.className === 'timer') {
            startTimer(taskNr, time); 
        }   
    });