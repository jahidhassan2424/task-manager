import React, { useContext } from 'react';
import './Home.css'
import Navbar from '../Shared/Navbar';
import { Outlet } from 'react-router-dom';
import RightSidebar from '../Utilities/RightSidebar';
import auth from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import CartContext from '../Utilities/Context';


const Home = () => {
    const { showRightSideBar, setShowRightSideBar } = useContext(CartContext);
    const [user] = useAuthState(auth);
    return (
        <div >
            <Navbar />
            {/*  */}
            <div className='relative '>
                <div className='grid grid-col-1 md:grid-cols-1 xl:grid-cols-[4fr,1fr] px-2 xl:px-10 gap-10 '>
                    <div className=' overflow-x-auto xs:mt-2 ' onClick={() => setShowRightSideBar(false)}>
                        <Outlet
                        />
                    </div>
                    <div className={` ${!showRightSideBar && 'hidden'} xl:block`}>
                        <RightSidebar />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Home;