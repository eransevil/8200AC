import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './cmps/Header.js'
import Tasks from './cmps/Tasks'
import AddTask from './cmps/AddTask'
import About from './cmps/About'

function App() {
  const [showForm, setShowForm] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }
    getTasks();
  }, [])


  //fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:3030/api/task/')
    const data = await res.json()
    return data
  }

  const fetchTask = async (id) => {
    console.log(id)
    const res = await fetch(`http://localhost:3030/api/task/${id}`)
    const data = await res.json()
    return data
  }


  //Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:3030/api/task/${id}`, {
      method: 'Delete'
    })
    setTasks(tasks.filter((task) => task._id !== id))
  }

  // ToggleDone
  const toggleDone = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updatedTask = { ...taskToToggle, done: !taskToToggle.done }
    const res = await fetch(`http://localhost:3030/api/task/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })

    const data = await res.json();
    console.log(data)


    setTasks(tasks.map((task) => task._id === id ? { ...task, done: data.done } : task))
  }

  // Add Task
  const addTask = async (task) => {
    const res = await fetch(`http://localhost:3030/api/task`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    const data = await res.json();
    setTasks([...tasks, data])
    // const id = Math.floor(Math.random() * 1000) + 1;
    // const newTask = { id, ...task };
    // setTasks([...tasks, newTask])

    console.log(task)
  }

  return (
    <Router>
      <div className="container">
        <Header onAdd={() => setShowForm(!showForm)} showAdd={showForm} title="" />

        <Route path="/" exact render={(props) => (
          <>

            {showForm && <AddTask onAddTask={addTask} />}
            {tasks.length > 0 ? <Tasks onDelete={deleteTask} onToggle={toggleDone} tasks={tasks}></Tasks> : 'No tasks to show'}

          </>
        )} />
        <Route path='/about' component={About} />
      </div>
    </Router>
  );
}

export default App;
