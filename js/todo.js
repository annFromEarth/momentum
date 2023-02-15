const btnTodo = document.querySelector('.todo_btn')
const divTodo = document.querySelector('.todo_conatiner')

/*show todo menu*/

btnTodo.addEventListener('click', showTodo);

function showTodo() {
    console.log(divTodo)
    divTodo.classList.toggle('active')
}
