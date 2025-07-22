import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// function Todo(props) {
const Todo = ({data, checkUpdate, deleteTodo, updateTodo})=> {
  const [isChecked, setIsChecked] = useState(data.checked);
  const [mode, setMode] = useState('read');
  const [title, setTitle] = useState(data.title);

  const handleCheckbox  = ()=>{
    let value = !isChecked;
    setIsChecked(value);
    checkUpdate(data.id, isChecked)
  }
  const deleteItem = ()=>{
    deleteTodo(data.id);
  }
  const changeToEdit = ()=>{
    setMode('edit');
  }
  const changeToRead = ()=>{
    setTitle(data.title);
    setMode('read');
  }
  const changeTitle = (e)=>{
    setTitle(e.target.value);
  }
  const todoUpdate = (e)=>{
    e.preventDefault();
    updateTodo(data.id, title);
    setMode('read');
  }
  return (
    <div className="d-flex gap-1 mb-3">


      { mode === 'edit' 
        ? 
        <>
          <Form className="d-flex gap-1" onSubmit={todoUpdate}>
            <Form.Control type="text" name="todo" value={title} onChange={changeTitle} />
            <Button type="submit" variant="primary" size="sm">입력</Button>
            <Button variant="secondary" size="sm" onClick={changeToRead}>취소</Button>
          </Form>
        </> 
      :
        <>
          <Form.Check // prettier-ignore
            type="checkbox"
            checked={data.checked ? true:false}
            id={`todo${data.id}`}
            label={data.title}
            onChange={handleCheckbox}
          />
          <Button variant="secondary" size="sm" onClick={changeToEdit}>수정</Button>
          <Button variant="danger" size="sm" onClick={deleteItem}>삭제</Button>
        </>
      }        
    </div>
  )
}
export default Todo;