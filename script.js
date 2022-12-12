const a = '<button class="delete">Delete</button><button class="edit">Edit</button>';
const b = '<button class="confirm">Confirm</button>'
let taskNr = 0;
edtojDet = 0;

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
     
function postTask (){
    document.querySelector('form').onsubmit = () => {
        taskNr++;
        const taskValue = document.querySelector('#task').value;
        const post = document.createElement('p');
        post.className = `post post-${taskNr}`;
        post.innerHTML = taskNr +'.  ' + taskValue +  a + b;     
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
                //const element = event.target;
                element.parentElement.contentEditable = true;
               // element.parentElement.innerHTML = element.parentElement.innerHTML + a;
                element.parentElement.style = 'background-color: rgb(126, 169, 238);';              
        } else if (element.className === 'confirm') {
                element.parentElement.contentEditable = false;
                element.parentElement.style = ' ';
        }             
    })  