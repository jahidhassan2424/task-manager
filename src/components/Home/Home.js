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
            <Navbar />

            <div className='relative '>
                <div className='grid grid-col-1 md:grid-cols-[4fr,1fr] xs:gap-10'>
                    <div className='md:p-10 overflow-x-auto xs:mt-10'>
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