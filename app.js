const addBtn = document.getElementById("btn");
let addTitle = document.getElementById("input");
let addNote = document.getElementById("desc");

let currentDate = new Date();
let day = currentDate.getDate()
let month = currentDate.getMonth()+1
let year = currentDate.getFullYear()

addBtn.addEventListener('click',function(){
    if(addTitle.value == ""){
        return alert("Please add title");
    }
    
    let notes = localStorage.getItem("notes")
    if(notes == null){
        notesObj = [];
    }else{
        notesObj = JSON.parse(notes);
    }

    let newObj = {
        title: addTitle.value,
        text : addNote.value,
        date: `${day}-${month}-${year}`
    }
    notesObj.push(newObj);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    addTitle.value = "";
    addNote.value = "";
    
    showNotes();
})
function showNotes(){
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }else{
        notesObj = JSON.parse(notes);
    }
    let notEle = document.querySelector(".notes");
    let mynote = '';
    notesObj.forEach(function(element, index){
        mynote += `
        <div class="note">
        <h3>${element.title}</h3>
        <p>${element.text}</p>
        <button class="dlBtn" id="${index}" onclick="delNote(this.id)">Delete Note</button>
        <button class="edBtn" id="${index}" onclick="editNote(this.id)">Edit Note</button>
        <p>${element.date}</p>
        </div>
        `
        }); 
    
    if(notesObj.length != 0){
        notEle.innerHTML = mynote;
    }else{
        notEle.innerHTML = "No Notes Yet";
    }

    mynote =''
}

function delNote(index){
    let delConfirm = confirm("Do you want to delete this note");
    
    if(delConfirm == true){
        let notes = localStorage.getItem("notes");
        if(notes == null){
            notesObj = [];
        }else{
            notesObj = JSON.parse(notes);
        }
        notesObj.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        showNotes();
    }
}

function editNote(index){
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }else{
        notesObj = JSON.parse(notes);
    }
    notesObj.findIndex((element)=>{
        addTitle.value = element.title;
        addNote.value = element.text;
    })
    addTitle.title="";
    addNote.text="";
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

showNotes();