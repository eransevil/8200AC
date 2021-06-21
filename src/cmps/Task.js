import { FaTimes } from 'react-icons/fa'

const Task = ({ task, onDelete, onToggle }) => {
    return (
        <div className={`task ${task.done ? `done` : `incomplete`}` } onDoubleClick={() => onToggle(task._id)}>
            <h3> {task.text} <FaTimes style={{ color: 'red', curser: 'pointer' }} onClick={() => onDelete(task._id)} /></h3>
            <p>{task.day}</p>
        </div>
    )
}

export default Task
