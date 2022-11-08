import React from 'react';
import Navbar from '../Shared/Navbar';
import '../styles/Login.css'

const Login = () => {
    return (
        <div className=''>
            <Navbar />
            {/* Login Form  */}
            <div className='loginCard  shadow-lg mx-2 p-2 rounded-xl h-[100vh] flex justify-center'>
                <div className=' flex flex-col shadow-lg md:w-[30%] w-full h-fit child:p-4 rounded-xl border-t border-block  '>
                    <h1 class='text-4xl text-center font-bold my-5'>Login</h1>
                    <div className='w-full'>


                        {/* Input Email  */}
                        <label htmlFor="emailInput">
                            Enter your email
                        </label>
                        <input className='border border-black input block w-full ' type="text" id='emailInput' />
                    </div>


                    {/* Input password  */}
                    <div className='mt-5 xl:mt-0 w-full'>
                        <label htmlFor="passwordInput">
                            Enter your Password
                        </label>
                        <input className='border border-black input block w-full ' type="password" id='passwordInput' />

                        {/* Login Button  */}
                        <div>
                            <button type="submit" className='btn-primary px-10 py-5 w-full mt-5 rounded-xl text-xl text-white font-bold' >LOGIN</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;