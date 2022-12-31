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
        };
    };
    postTask ();         
    });        

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
      };
      if (timeSec === 0) {
        clearInterval(timer);
        labelPost.style.backgroundColor = "red";
      };
      timeSec--;
    };
    timeSnap();
    labTimer.addEventListener('dblclick', function (e) {
        this.style.backgroundColor = randomColor();
    });
    labTimer.addEventListener('mouseover', function (e) {
        this.style.opacity = '0.75';
        // this.style.backgroundColor = '#a3b9bf';
       
    });
    labTimer.addEventListener('mouseout', function (e) {
        this.style.opacity = '1';
    });
    
    

    var timer = null;
    function start() {
        timer = setInterval(timeSnap, 1000);
    }
    function stop() {
        clearInterval(timer);
    }
    var state = 1;
    labTimer.addEventListener('click', function (e) {
        if (state%2 ===1) {
           start();
        } else {
            stop();
        };
        state ++;
    });
  };

function postTask (){
    document.querySelector('form').onsubmit = () => {
        taskNr++;
        time =(time = document.querySelector('#taskTime').value) ? time : 30;
        const taskValue = document.querySelector('#task').value;
        const post = document.createElement('div');
        post.className = `post-${taskNr} post `;
        post.innerHTML = 
        `<div class="date">${formatedDate()}</div>
        <div class="taskTxt">${taskNr}. ${taskValue}</div>
        <button class="edit" id="editId-${taskNr}">Edit</button>
        <button class="delete">Delete</button>
        <button class="timer timer-${taskNr}">1:00</button>`;     
        document.querySelector('#posts').append(post);                       
        document.querySelector('#task').value = '';
        document.querySelector('#taskTime').value = '';
        document.querySelector('#submit').disabled = true;                      
        // stop form from submitting
        startTimer(taskNr, time);
        return false;
    }; 
};
           
 // If hide button is clicked, delete the post
document.addEventListener('click', event => {
    const element = event.target;       
         if (element.className === 'delete') {
            element.parentElement.style.animationPlayState = 'running';
            element.parentElement.addEventListener('animationend', () =>  {
            element.parentElement.remove();
            });
        } else  if (element.className === 'edit'  ){ 
            if (element.textContent === 'Edit'){
                element.previousElementSibling.contentEditable = true;
                element.parentElement.style = 'background-color: #3c4670;'; 
                element.textContent = 'Confirm'; 
            } else {
                element.textContent = 'Edit';
                element.previousElementSibling.contentEditable = false;
                element.parentElement.style = ' ';
            };
        } else if (element.className === 'timer') {
            startTimer(taskNr, time); 
        };   
    });

// sticky scoll
const body = document.body;
let scrollValue = 0; 
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > scrollValue) {
        body.classList.add('scroll-down');
    };
    if (currentScroll < scrollValue) {
        body.classList.remove('scroll-down');
    };
    scrollValue = currentScroll;
});

