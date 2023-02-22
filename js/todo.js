const btnTodo = document.querySelector('.todo_btn');
const divTodo = document.querySelector('.todo_conatiner');
const Todos = document.querySelector('.todos');
const TodoTemplate = document.getElementById("todo_template");
const btnAddTodo = document.querySelector('.add_todo_btn');

/*show todo menu*/

btnTodo.addEventListener('click', showTodo);

function showTodo() {
    divTodo.classList.toggle('active')
}

/*get Todos from Local Storage*/

function getTodos() {
    const savedTodos = localStorage.getItem("todo") || '[]';
    return JSON.parse(savedTodos);
}
getTodos() 

/*save Todos*/

let arrayTodos = getTodos();

function setTodos(arrayTodos) {
    const todosJSON = JSON.stringify(arrayTodos);
    localStorage.setItem("todo", todosJSON);
}
setTodos(arrayTodos)

/*adding new Todo*/

function addTodo() {
    arrayTodos.unshift({
        description: "",
        completed: false,
    })

    setTodos(arrayTodos);
    refreshTodoList();
}

function updateTodos(y, key, value) {
    y[key] = value;
    setTodos(arrayTodos);
    refreshTodoList();

}

function refreshTodoList() {
    //TODO sort items
    arrayTodos.sort((a,b) => {
        if (a.completed) {
            return 1;
        }

        if (b.completed) {
            return -1;
        }

        return a.description < b.description ? -1 : 1;
    } )

    Todos.innerHTML = "";

    for (const x in arrayTodos) {
        const todoElement = TodoTemplate.content.cloneNode(true);
        const descriptionInput = todoElement.querySelector('.item_description');
        const completedInput = todoElement.querySelector('.item_completed');

        descriptionInput.value = arrayTodos[x].description;
        completedInput.checked = arrayTodos[x].completed;

        descriptionInput.addEventListener('change', () => {updateTodos(arrayTodos[x], 'description', descriptionInput.value)});
        completedInput.addEventListener("change", () => {updateTodos(arrayTodos[x], 'completed', completedInput.checked)})


        Todos.appendChild(todoElement)
        deleteActivate()
    }
}

refreshTodoList();

/*add todo btn*/

btnAddTodo.addEventListener('click', addTodo)

/***delete Todos */

function deleteActivate() {
    const deleteBtns = document.querySelectorAll('.delete_button');
    deleteBtns.forEach( b => b.addEventListener("click", todoDelete))
}

deleteActivate()



function todoDelete() {
    arrayTodos = arrayTodos.filter(x => x.description !== this.previousElementSibling.value)
    refreshTodoList();
    setTodos(arrayTodos);
    deleteActivate()

 
    
}





