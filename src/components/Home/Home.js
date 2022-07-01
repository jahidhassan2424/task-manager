import React from 'react';
import './Home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import ToDo from './../ToDo';
import CompletedTask from './../CompletedTask';
import Calender from './../Calender';
import Navbar from './../Navbar';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import RightSidebar from '../RightSidebar';
import { TaskContext } from '../../App';

const Home = () => {
    const [data, setData] = useState([])
    return (
        <div >
            <TaskContext.Consumer>
                {(data) => {
                    setData(data);
                }}
            </TaskContext.Consumer>
            <Navbar />

            <div className='relative '>
                <div className='grid grid-cols-[4fr,1fr]'>
                    <div className='p-10 '>
                        <Outlet />
                    </div>
                    <div>
                        <RightSidebar />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Home;