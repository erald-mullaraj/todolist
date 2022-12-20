let taskNr = 0;

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
    const day = `${now.getDate()}`.padStart(2, 0);
    const month = `${now.getMonth() + 1}`.padStart(2, 0);
    const year = now.getFullYear();
    const hour = `${now.getHours()}`.padStart(2, 0);
    const min = `${now.getMinutes()}`.padStart(2, 0);
    return `${day}/${month}/${year} - ${hour}:${min}`;
};

     
function postTask (){
    document.querySelector('form').onsubmit = () => {
        taskNr++;
        const taskValue = document.querySelector('#task').value;
        const post = document.createElement('div');
        post.className = `post post-${taskNr}`;
        post.innerHTML = 
        `<div class="taskInput">${taskNr}. ${taskValue}</div>
        <div class="date">${formatedDate()}</div>
        <button class="edit">Edit</button>
        <button class="confirm">Confirm</button>
        <button class="delete">Delete</button> `;     
        document.querySelector('#posts').append(post);                       
        document.querySelector('#task').value = '';
        document.querySelector('#submit').disabled = true;                       
        // stop form from submitting
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
        }             
    })  