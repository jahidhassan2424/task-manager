import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';

const Calender = () => {
    const [date, setDate] = useState(new Date());
    return (
        <>
            <h1 h1 className='md:text-3xl text-2xl my-5 py-3 font-bold text-center bg-neutral text-white md:rounded-xl'>Calender</h1>
            <div className='flex justify-center [height:100vh] items-start'>
                <div>

                    <DayPicker
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                    />
                </div>
            </div>
        </>
    );
};

export default Calender;