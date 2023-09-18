"use client"
import React, { useState } from 'react'
import supabase from '../supabase';
import TodoList from './todoList'

const Profiles = () => {
const [todos , setTodo] = useState("");

// add a todo
async function handleSubmit(e) {
  e.preventDefault();
  if (todos === "") {
    alert("kindly input your todo")
  } else {
    const { data, error } = await supabase.from('todos').insert([
      { todos },
    ])
    if (!error) {
      alert("todo added to database, refresh page for changes.");
      setTodo("");
    } else {
      alert(error)
    }
  }
  
}

  return (
    <div className='container text-center' >

      <h2 className='mt-[2rem] text-[2rem] font-bold text-center text-[#fff]'>Todo List</h2>



      <form className='mt-[.8rem]' onSubmit={handleSubmit}>
        <input placeholder='type your todo here...' className='p-[.6rem] outline-none border-[.2rem] border-blue-500 active:border-red-500 rounded' value={todos} onChange={(e) => setTodo(e.target.value)}/>
        <button type="submit" className='bg-[blue] text-[#fff] p-[.6rem] font-semibold ml-[.6rem] hover:scale-[115%] transition rounded-[1rem]'>Add Todo</button>
      </form>

      <TodoList />

      
    </div>
    
  )
}

export default Profiles