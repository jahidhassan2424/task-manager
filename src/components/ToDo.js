import React, { memo, useState } from 'react';
import { TaskContext } from '../App';
import ToDoTable from './ToDoTable';

const ToDo = () => {
    const [data, setData] = useState([])
    if (data?.tasks) {
        console.log('data in todo', data?.tasks[0])
    }
    return (
        <>
            <TaskContext.Consumer>
                {(data) => {
                    setData(data);
                }}
            </TaskContext.Consumer>
            <div className='md:mx-10 h-1/2 '>
                <h1 h1 className='md:text-3xl text-2xl my-5 py-3 font-bold text-center bg-neutral text-white md:rounded-xl'>Your unfinished tasks</h1>
                {
                    data?.tasks &&
                        data.tasks.length > 0
                        ?
                        <div>
                            <div className="overflow-x-auto">
                                <table class="table w-full">
                                    {/* <!-- head --> */}
                                    <thead className=''>
                                        <tr>
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

                                            data.tasks.map((task, index) => <ToDoTable
                                                key={task?._id}
                                                task={task}
                                                index={index}
                                                setFetchAgain={data.setFetchAgain}
                                                component={'todo'}
                                            ></ToDoTable>)
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        :
                        <h1 className='text-3xl'>You have no remaining task</h1>
                }

            </div>
        </>
    );
};

export default memo(ToDo);