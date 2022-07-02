import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck, faTrash } from '@fortawesome/free-solid-svg-icons';

const ToDoTable = ({ task, index, setFetchAgain, component, refetch }) => {
    const [completed, setCompleted] = useState(false);
    const handleComplete = async (id) => {
        setCompleted(!completed);
        await axios.post(`https://arrogant-toque-48209.herokuapp.com/task/${id}`)
            .then(data => {
                if (data.data.acknowledged) {
                    toast.success('Task added to completed list.');
                }
                setFetchAgain(true);

            })
    }
    //https://arrogant-toque-48209.herokuapp.com
    const handleDelete = async (id) => {
        await axios.delete(`https://arrogant-toque-48209.herokuapp.com/task/${id}`)
            .then(data => {
                if (data.data.acknowledged) {
                    toast.success('Task added to completed list.');
                    refetch();
                }

            })
    }




    return (
        <tr className='border-b-2 border-zinc-300 w-full'>
            {
                (component === 'todo')
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
                        <td>
                            <input for="confirmModal" onChange={() => handleComplete(task._id)} type="checkbox" checked={completed} class="checkbox" />
                        </td>
                        <td>{task.message}</td>
                    </>
                    :
                    component === 'completed'
                        ?
                        <>
                            <td>{index + 1}</td>
                            <td>{task.date}</td>
                            <td>{task.time}</td>
                            <td>{task.message}</td>
                            <td className='text-center'><FontAwesomeIcon className='text-2xl hover:text-red-600' onClick={() => handleDelete(task._id)} icon={faTrash} /></td>
                        </>
                        :
                        <>
                            <td>{index + 1}</td>
                            <td>{task.date}</td>
                            <td>{task.time}</td>
                            <td>{task.message}</td>
                        </>
            }

        </tr >
    );
};

export default ToDoTable;