import Container from '@mui/material/Container';
import './App.css';
import Button from '@mui/material/Button';
import { useState , useEffect } from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import contextTodo from './cotext';
import Todos from "./Todos"
import Swal from 'sweetalert2'
import { v4 as uuidv4 } from 'uuid';

function App() {
  
  const [todo, setTodo] = useState("");
  const [current, setCurrent] = useState(-1);
  const [todos, setTodos] = useState([]);
  useEffect(_ => setTodos(JSON.parse(localStorage.getItem("todos")) || []) , [])
  
  function updateTodo(id , newTodo){
    const savedTodos = todos.map(t => t.id !== id ? t : { ...t, isFinished: 0, title: newTodo })
    setTodos(savedTodos)
    localStorage.setItem("todos",JSON.stringify(savedTodos))

  }
 
  function addTodo(newTodo) {
    if (newTodo){ 
      const savedTodos =  [...todos, { title: newTodo, isFinished: 0, id: uuidv4() }] 
      setTodos(savedTodos)
      localStorage.setItem("todos",JSON.stringify(savedTodos))
    }
     
    setTodo("")
  }
  function deleteTodo(id) {
    Swal.fire({
      title: "DELETE TODO",
      text: `Are you sure that you want to delete task [${todos.find(task => task.id === id).title} ]`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "red",
      cancelButtonColor: "gray",
      confirmButtonText: "Delete "
    }).then((result) => {
      if (result.isConfirmed) {
        let i = null;
        i = todos.findIndex(task => task.id === id)
        if (i !== null){
          const savedTodos = todos.filter(task => task.id !== id)
          setTodos(savedTodos)
          localStorage.setItem("todos",JSON.stringify(savedTodos))
        }
          
        Swal.fire({
          title: i !== null ? "Deleted!" : "",
          text: i !== null ? "Your Task has been deleted." : "No task found",
          icon: "success"
        });
      }
    });
  }
  function toogleFinishTodo(id) {
    const savedTodos = todos.map(task => {
      return task.id !== id ? task : { ...task, isFinished: 1 - task.isFinished }
    })
    setTodos(savedTodos)
    localStorage.setItem("todos",JSON.stringify(savedTodos))
  }
  return (
    <>
      <Container maxWidth="sm">
        <contextTodo.Provider value={{ todos, deleteTodo, toogleFinishTodo,updateTodo }}>
          <div className="App">
            <h1> My Todos</h1>
            <hr />
            <ButtonGroup variant="contained" aria-label="Basic button group">
              <Button color={current === -1 ? "success" : "primary"} onClick={() => setCurrent(-1)}>All</Button>
              <Button color={current === 1 ? "success" : "primary"} onClick={() => setCurrent(1)}>Finished</Button>
              <Button color={current === 0 ? "error" : "primary"} onClick={() => setCurrent(0)}>UnFinished</Button>
            </ButtonGroup>
            <Todos index={current} />
            <div className='addNew'>
              <Button onClick={() => addTodo(todo)} variant="contained" color="error" disabled ={todo.length ===0} startIcon={<AddIcon />}>
                Add
              </Button>
              <input type="text" placeholder='add new todo' value={todo} onChange={event => setTodo(event.target.value)} />
            </div>
          </div>
        </contextTodo.Provider>
      </Container>
      
    </>
  );
}

export default App;
