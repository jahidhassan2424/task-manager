import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';

const ToDoTable = ({ task, index, setFetchAgain, component }) => {
    const [completed, setCompleted] = useState(false);
    const handleComplete = async (id) => {
        setCompleted(!completed);
        await axios.post(`http://localhost:3001/task/${id}`)
            .then(data => {
                if (data.data.acknowledged) {
                    setFetchAgain(true);
                    toast.success('Task added to completed list.')
                }

            })

    }
    return (
        <tr className='border-b-2 '>
            {
                (component === 'todo' || component === 'sideBar')
                &&
                <td>
                    <input for="confirmModal" onChange={() => handleComplete(task._id)} type="checkbox" checked={completed} class="checkbox" />
                </td>
            }
            {
                component === 'completed' &&
                <td td > <FontAwesomeIcon className='text-green-500 text-2xl' icon={faSquareCheck} /></td>
            }
            {
                component === 'sideBar'
                    ?
                    <>
                        <td>{task.message}</td>
                        <td>{task.date}</td>
                        <td>{task.time}</td>
                    </>
                    :
                    <>
                        <th>{index + 1}</th>
                        <td>{task.date}</td>
                        <td>{task.time}</td>
                        <td>{task.message}</td>
                    </>
            }

        </tr >
    );
};

export default ToDoTable;