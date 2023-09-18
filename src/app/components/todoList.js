import React, { useEffect, useState } from 'react'
import { FaTrash  } from 'react-icons/fa'
import supabase from '../supabase';

export default function TodoList () {
    
    // fetch data
    async function fetchData() {
    let { data: todos, error } = await supabase.from('todos').select('*');
    setTodo(todos);
    console.log(todos)
    }
    // create state
    const [todoss, setTodo] = useState([]);
    console.log(todoss);

    // delete todos
    async function handleDelete(id) {
    const { error } = await supabase.from('todos').delete().eq('id', id);
    console.log(error);
    if (!error) {
        alert("todo deleted, refresh page for changes.")
    } else {
        alert(error)
    }
    }
    // delete all todos
    async function handleDeleteAll() {
      
    
    const { error } = await supabase.from('todos').delete().not('todos', 'eq', "do not delete me");
    if (!error) {
      alert("deleted all successfully,refresh for changes.")
    } else (
      alert(error),
      console.log(error)
    )
    }

    useEffect(() => {
        fetchData();
    }, []);

    // // if there are no tasks return this
    if (!todoss.length) {
        return (
        <div className='w-[90%] md:w-[70%] m-auto mt-[1rem]'>
            <p className='font-semibold text-white text-[1,4rem]'>No todos yet</p>
        </div>
        )
    }
    
  return (
    <div >
    <ul className='md:w-[70%] w-[90%] m-auto mt-[1rem] p-[.6rem] border-[.2rem] border-blue-500 rounded-[1rem] cursor-pointer'>

        {/* <li className='flex justify-between p-[.6rem] text-[#fff] font-semibold'>Wash the dishes <FaTrash className='hover:cursor-pointer hover:text-[red] hover:scale-[150%] transition'/></li> */}

       {todoss.map((todo) => (
          <li key={todo.id} className='flex justify-between p-[.6rem] text-[#fff] font-semibold'>
            {todo.todos}
            <FaTrash className='hover:cursor-pointer hover:text-[red] hover:scale-[150%] transition' onClick={() => {handleDelete(todo.id)}}/>
          </li>
        ))}
    </ul>

    <button className='bg-[#E2DFD2] text-[#fff] p-[.6rem] ml-[.6rem] font-semibold hover:scale-[115%] hover:bg-[#DC143C] transition rounded-[1rem] mt-[1rem]' onClick={handleDeleteAll}>Clear todos</button>
    </div>

  )
}