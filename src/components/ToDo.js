import React, { useState } from 'react';
import { TaskContext } from '../App';

const ToDo = () => {
    const [data, setData] = useState([])
    return (
        <div className='w-1/2 h-1/2 border-2'>
            <TaskContext.Consumer>
                {(data) => {
                    setData(data);
                }}
            </TaskContext.Consumer>


        </div>
    );
};

export default ToDo;