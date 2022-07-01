import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/Navbar.css'

const Navbar = () => {
    const [phoneRoutes, setPhoneRoutes] = useState(false);

    return (
        <div >
            <nav className='navbar bg-blue-500 flex justify-between h-10 md:child:mx-10 child:mx-2 items-center '>
                <div>
                    <Link to='/'><p className='text-4xl text-white xs:text-3xl'>Task Manager</p></Link>
                </div>
                <div className='routes  '>
                    <div className='xs:hidden flex'>
                        <Link to="/" className='routeElem'><p>To Do</p></Link>
                        <Link to="/completed" className='routeElem'><p>Completed Task</p></Link>
                        <Link to="/calender" className='routeElem'><p>Calender</p></Link>
                    </div>
                    <div className='md:hidden'>
                        <FontAwesomeIcon onClick={() => setPhoneRoutes(!phoneRoutes)} icon={faBars} />
                    </div>

                </div>
            </nav >
            <div hidden={phoneRoutes} className={`md:hidden phoneRoutesSection `}>
                <div className='flex flex-col child:text-center child:text-xl bg-blue-400 child:text-black child:border-b child:border-white'>
                    <Link to="/home/todo" className='routeElem'><p>To Do</p></Link>
                    <Link to="/home/completed" className='routeElem'><p>Completed Task</p></Link>
                    <Link to="/home/calender" className='routeElem'><p>Calender</p></Link>
                </div>
            </div>
        </div >
    );
};

export default Navbar;