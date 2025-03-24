let taskInput = document.querySelector('input');
let taskList = document.querySelector("ul");

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function renderTasks() {
    taskList.innerHTML = "";

    todos.forEach((task, index) => {
        let li = document.createElement("li");
        
        let editBtn = document.createElement("img");
        editBtn.src = 'https://media.istockphoto.com/id/1309236787/photo/3d-simple-pencil-with-docunent-icon-on-pastel-background-hight-quality-3d-illustration-edit.jpg?s=1024x1024&w=is&k=20&c=GqI3hnvKcGI_qUio9ijXVloXVXmJzfpfSuEjzFXmRq8=';
        li.appendChild(editBtn);

        let delBtn = document.createElement("button");
        delBtn.textContent = "X";
        li.appendChild(delBtn);

        let completeBtn = document.createElement("i");
        completeBtn.textContent = '✓';
        li.appendChild(completeBtn);
        
        let taskSpan = document.createElement("span");
        taskSpan.textContent = task.text;
        li.appendChild(taskSpan);
        
        if (task.completed) {
            taskSpan.style.textDecoration = "line-through";
            taskSpan.style.color = "gray";
        }

        delBtn.onclick = function () {
            todos.splice(index, 1); 
            updateLocalStorage();
            renderTasks();
        };

        editBtn.onclick = function () {
            let input = document.createElement("input");
            input.type = "text";
            input.value = task.text;
            li.replaceChild(input, taskSpan);
            input.focus();

            input.addEventListener("keypress", function (event) {
                if (event.key === 'Enter') {
                    task.text = input.value; 
                    updateLocalStorage();
                    renderTasks();
                }
            });
        };

        completeBtn.onclick = function () {
            task.completed = !task.completed;
            updateLocalStorage();
            renderTasks();
        };

        taskList.appendChild(li);
    });
}

function addTask() {
    let taskText = taskInput.value;
    if (taskText === "") return;

    todos.push({ text: taskText, completed: false });
    updateLocalStorage();
    renderTasks();
    taskInput.value = "";
}

function updateLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

taskInput.addEventListener("keypress", function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        addTask();
    }
});

renderTasks();
