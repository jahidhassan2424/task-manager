import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { memo, useContext, useState } from 'react';
import { TaskContext } from '../../App';
import CartContext from './Context';
import ToDoTable from './ToDoTable';

const ToDo = ({ setShowRightSidebar, showRightSidebar }) => {
    const [data, setData] = useState([])
    const { setShowRightSideBar, showRightSideBar } = useContext(CartContext);

    return (
        <>
            {/* https://arrogant-toque-48209.herokuapp.com/ */}
            <TaskContext.Consumer>
                {(data) => {
                    setData(data);
                }}
            </TaskContext.Consumer>
            <div onClick={() => {
                setShowRightSideBar(false);
            }} className=' h-1/2 w-full'>
                {/* This div will only be shown in tablet and mobile */}
                <div className='flex justify-end'>
                    <button className=' flex items-center gap-1 bg-green-600 md:mt-2 text-white px-5 py-1 rounded-lg  xl:hidden'
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowRightSideBar(!showRightSideBar)
                        }}>

                        <span>Add Task</span>
                        <FontAwesomeIcon className='text-2xl text-white ' icon={faCirclePlus} />
                    </button>
                </div>
                <h1 className='md:text-3xl text-2xl my-2 py-3 font-bold text-center bg-neutral text-white rounded-xl'>Your unfinished tasks</h1>
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