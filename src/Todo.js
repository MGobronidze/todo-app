import React, {useCallback, useState} from "react"
import './styles.css';

const TodoItem = React.memo(({task, onDelete, onDone, id})=> {
    console.log("re-render")
    return(
        <li>
            {task}
            <button onClick={() => onDelete(id)} className="add-btn">Delete</button>
            <button onClick={()=> onDone(task)} className="add-btn" >Done</button>
        </li>
    )
})

const DoneTask = React.memo(({task, onDelete, onReset, id})=>{
    console.log("re-rendered done")
    return(
        <li>
            {task}
            <button onClick={() => onDelete(id)} className="add-btn">Delete</button>
            <button onClick={()=> onReset(id)} className="add-btn">Reset</button>
        </li>
    )
})

const FuncTodo = (e) => {
    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState('');
    const [doneTasks, setDoneTasks] = useState([]);

    const handleChange = useCallback((event) => {
        setCurrentTask(event.target.value)
    },[])

    const handleSubmit = useCallback((event)=>{
        event.preventDefault()
        console.log('submit')
        const task =[...tasks, currentTask]
        setTasks(task)
        setCurrentTask('')
    },[currentTask, tasks]) //44

    const handleDelete = useCallback((id) => {
        console.log("delete")
        const updatedTasks = tasks.filter((_, index) => index !== id ) 
        setTasks(updatedTasks)
    }, [tasks])

    const handleDone = useCallback((task)=> {
        console.log("done")
        setTasks((tasks) => tasks.filter((t) => t !== task))
        setDoneTasks((dones) => [...dones, task])
    },[]) //71

    const handleDoneDelete = useCallback((id) => {
        console.log("Done delete")
        const updatedTasks= doneTasks.filter((_, index) => index !== id)
    },[doneTasks])

    const handleReset= useCallback((id) => {
        console.log("reset")
        const resetTask = doneTasks[id]
        const updatedTasks = [...tasks, resetTask]
        const updatedDoneTasks = doneTasks.filter((_,index) => index !==id)
        setTasks(updatedTasks)
        setDoneTasks(updatedDoneTasks)
    }, [doneTasks, tasks]) //99

    return(
        <div className="main-div">
            <h1 className="header header-name">Todo App</h1>

            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="enter a task"
                    onChange={handleChange}
                    value={currentTask}
                    className="input-field"
                />
                <button type="submit" className="add-btn">Add Task</button>
            </form>

            <ul>
                {
                    tasks.map((task, index) => (
                        <TodoItem 
                            key={index}
                            id={index}
                            task={task}
                            onDelete={handleDelete}
                            onDone ={handleDone}
                        />
                    ))
                }
            </ul>
                <h1 className="header-name header">Done Tasks</h1>
            <ul>
                {
                    doneTasks.map((task, index) => (
                        <DoneTask 
                            key={index}
                            id={index}
                            task={task}
                            onDelete={handleDelete}
                            onReset ={handleReset}
                        />
                    ))
                }
            </ul>
        </div>
    )

}

export default FuncTodo