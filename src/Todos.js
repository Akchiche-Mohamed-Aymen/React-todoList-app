import { useContext } from "react"
import contextTodo from './cotext';
import Todo from './Todo';

export default function Todos({index}){
    const currentTodos = useContext(contextTodo)
    const searcheTodos = index === -1? [...currentTodos.todos] : currentTodos.todos.filter(task => task.isFinished === index)
    return(
        <div className="todos">
            {searcheTodos.map(todo => <Todo key = {todo.id} todo={todo}/>)}
        </div>
    )
}