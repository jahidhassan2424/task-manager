import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import ToDoTable from './ToDoTable';
import Loading from './Loading';
import './styles/CompletedTask.css'

const CompletedTask = () => {
    const [completedTasks, setCompletedTasks] = useState([]);
    console.log('completedTasks', completedTasks)
    const { isLoading, refetch } = useQuery('completed', () => {
        axios.get(`https://arrogant-toque-48209.herokuapp.com/task/completed`)
            .then(data => {

                // console.log(data.data)
                setCompletedTasks(data.data)
            }
            )
    })
    if (isLoading) {
        return <Loading />
    }
    return (
        <div>
            <div className='md:mx-10 h-1/2  '>
                <h1 h1 className='md:text-3xl text-2xl my-5 py-3 font-bold text-center bg-neutral text-white  md:rounded-xl'>Your Completed Tasks</h1>

                <div class="overflow-x-auto">
                    <table class="table w-full">
                        {/* <!-- head --> */}
                        <thead >
                            <tr className='child:text-lg'>

                                <th style={{ position: 'inherit' }}>Status</th>
                                <th>No</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Task</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* <!-- row 1 --> */}

                            {
                                completedTasks &&
                                completedTasks.map((task, index) => <ToDoTable
                                    key={task._id}
                                    task={task}
                                    index={index}
                                    component={'completed'}
                                >

                                </ToDoTable>)
                            }

                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default CompletedTask;