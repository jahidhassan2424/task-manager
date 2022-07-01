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
            <div className='mx-10 h-1/2 '>
                <div class="overflow-x-auto">
                    <table class="table w-full">
                        {/* <!-- head --> */}
                        <thead>
                            <tr>
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
                                data?.tasks &&
                                data.tasks.map((task, index) => <ToDoTable
                                    key={task?._id}
                                    task={task}
                                    index={index}
                                    setFetchAgain={data.setFetchAgain}
                                ></ToDoTable>)
                            }

                        </tbody>
                    </table>
                </div>

            </div>
        </>
    );
};

export default memo(ToDo);