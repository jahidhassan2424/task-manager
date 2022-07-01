import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import ToDoTable from './ToDoTable';
import Loading from './Loading';

const CompletedTask = () => {
    const [completedTasks, setCompletedTasks] = useState([]);
    console.log('completedTasks', completedTasks)
    const { isLoading, refetch } = useQuery('completed', () => {
        axios.get(`http://localhost:3001/task/completed`)
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
            <div className='mx-10 h-1/2 '>
                <div class="overflow-x-auto">
                    <table class="table w-full">
                        {/* <!-- head --> */}
                        <thead >
                            <tr className='child:text-lg'>

                                <th>Status</th>
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
                                    completedComponent={true}
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