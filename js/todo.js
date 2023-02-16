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
    const savedTodos = localStorage.getItem("todo") || "[]";
    return JSON.parse(savedTodos);
}

/*save Todos*/

let arrayTodos = getTodos();

function setTodos(arrayTodos) {
    const todosJSON = JSON.stringify(arrayTodos);
    localStorage.setItem("todo", todosJSON);
}

/*adding new Todo*/

function addTodo() {
    arrayTodos.unshift({
        description: "new",
        completed: false,
    })

    setTodos(arrayTodos);
    refreshTodoList();
}

function updateTodos(todo, key, value) {
    todo[key] = value;
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
    for (const todo in arrayTodos) {
        const todoElement = TodoTemplate.content.cloneNode(true);
        const descriptionInput = todoElement.querySelector('.item_description');
        const completedInput = todoElement.querySelector('.item_completed');
        const deleteBtn = todoElement.querySelector('.delete_button');

        descriptionInput.value = todo.description;
        completedInput.checked = todo.completed;

        descriptionInput.addEventListener('change', () => {updateTodos(todo, 'description', descriptionInput.value)});
        completedInput.addEventListener("change", () => {updateTodos(todo, 'completed', completedInput.checked)})


        Todos.appendChild(todoElement)
    }
}

refreshTodoList();

/*add todo btn*/

btnAddTodo.addEventListener('click', addTodo)

