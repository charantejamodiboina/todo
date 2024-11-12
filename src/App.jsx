import  { useState, useEffect } from 'react';
import './App.css'
function Todo(){
  const [InputVal, setInputVal] = useState(' ');
  const [addTask, setaddTask]  = useState(()=>{
    return JSON.parse(localStorage.getItem('addTask')) || [ ];
  })
  const [completedTask, setcompletedTask] = useState(()=>{
    return JSON.parse(localStorage.getItem('completedTask')) || [ ];
  });
  useEffect(()=>{
   localStorage.setItem('addTask', JSON.stringify(addTask));
  }, [addTask]);
  useEffect(()=>{
    localStorage.setItem('completedTask', JSON.stringify(completedTask));
  }, [completedTask]);

  const handleinput = (event) => {
    setInputVal(event.target.value);
  };
  const handlesubmt =(event) => {
    event.preventDefault();
    if(InputVal.trim() !== ''){
      const new_Task ={
        text:InputVal,
        createdAt:new Date().toISOString()
      }
      setaddTask([...addTask, new_Task]);
      setInputVal('');
    }
  }
  const handleselect =(data) =>{
    const taskcompleted ={
      ...data,
      completedAt:new Date().toISOString(),
    }
    setaddTask(addTask.filter((item) => item!==data));
    setcompletedTask([...completedTask, taskcompleted])
  }
  const handleunselect =(data) =>{
    setcompletedTask(completedTask.filter((item) => item!==data));
    setaddTask([...addTask, data])
  }
  const handledelete =(data, listtype) =>{
    if (listtype === 'addTask'){
      setaddTask(addTask.filter((item) => item!==data));
    }else if (listtype === 'completedTask'){
      setcompletedTask(completedTask.filter((item) => item!==data));
    }
  }
  return <div className='todo'>
    <h1>My Tasks</h1>
    <form className='form' onSubmit={handlesubmt}>
    <input
    type='text'
    className='taskpad'
    value={InputVal}
    onChange={handleinput}
    placeholder ="Type your task"
    />
    <button title='click to add tasks' className='submit-btn' type='submit'>&#x2935;</button>
    </form>
    <div className='taskmanager'>
      <div className='tasks'>
        <h3>Todo Tasks</h3>
        <ul>
          {addTask.map((data, index) => (
            <li key={index}>
              <label>
              <div>
                <input
                title='checked to completed tasks'
                type='checkbox'
                name='addTask'
                checked={false}
                onChange={()=> handleselect(data)}/>
                {data.text}
                </div>
                <em>Created at: {new Date(data.createdAt).toLocaleString()}</em>
              </label>
              <button className='delete-btn' onClick={()=> handledelete(data, 'addTask')}>&#x274C;</button>
            </li>
          ))}
        </ul>
      </div>
      <div className='complete'>
      <h3>Completed Tasks</h3>
        <ul>
        {completedTask.map((item, index) =>
          (<li key={index}>
            <label><div>
                <input
                title='uncheck back to todo tasks '
                type='checkbox'
                name='completedTask'
                checked={true}
                onChange={()=> handleunselect(item)}
                />
                {item.text}
                </div>
                <em>Created at: {new Date(item.createdAt).toLocaleString()}  ||  Completed at: {new Date(item.completedAt).toLocaleString()}</em>
              </label>
              <button className='delete-btn' onClick={()=> handledelete(item, 'completedTask')}>&#x274C;</button>
          </li>))}
        </ul>
      </div>
    </div>
    
  </div>
}
export default Todo