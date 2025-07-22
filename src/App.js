import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Todo from './Todo';

function App() {
  const [todo, setTodo] = useState([
    {id:1, title:'Learn web', checked:true},
    {id:2, title:'Get a job', checked:false}
  ]);
  const checkUpdate = (id, value)=>{
    let newtodos = todo.map(item=>{
      return item.id === id ?  {...item, checked:value} : item
    });
    setTodo(newtodos);
  }
  const updateTodo = (id, value)=>{
    console.log(id,value);
    let newtodos = todo.map(item=>{
      return item.id === id ?  {...item, title:value} : item
    });
    setTodo(newtodos);
  }
  const deleteTodo = (id)=>{
    setTodo(prev=>prev.filter(item=>item.id !== id));
  }

  const todos = todo.map(item=>
    <Todo 
      key={item.id} 
      data={item} 
      checkUpdate={checkUpdate}
      deleteTodo={deleteTodo}
      updateTodo={updateTodo}
    />
  );

  const addTodo = (value) => {
    setTodo(prev => [
      ...prev,
      { id: prev[prev.length - 1].id + 1 || 1, title: value, checked: false }
    ]);
  };  


  return (
    <Container>
      <h1>To Do List</h1>
      <Form onSubmit={(e)=>{
        e.preventDefault();
        const value = e.target.todo.value.trim();
        if (value) {
          addTodo(value);
          e.target.reset();
        }

      }}>
        <Form.Group className="mb-3" controlId="todo">
          <Form.Label>할일 입력</Form.Label>
          <Form.Control type="text" name="todo" placeholder="할일을 입력해주세요" />
        </Form.Group>
        <Button type="submit" variant="primary">입력</Button>
      </Form>
      <hr/>
      {todos}

    </Container>
  );
}

export default App;
