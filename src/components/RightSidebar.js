import React, { useState } from 'react';
import './styles/RightSidebar.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import { toast } from 'react-toastify';

const RightSidebar = () => {

    const [date, setDate] = useState(new Date());
    const { register, handleSubmit } = useForm();
    const onSubmit = async data => {
        let hour = data.hour;
        let minute = data.minute;
        if (data.hour.length === 1) {
            hour = '0' + data.hour;
        }
        if (data.hour.length === 1) {
            minute = '0' + data.minute;
        }
        if ((data.hour) === '') {
            toast.error('Select valid hour')
            return;
        }
        if ((data.minute) === '') {
            toast.error('Select valid minute')
            return;
        }
        const task = {
            date: format(date, 'PP'),
            time: `${hour}:${minute}:${data.ampm}`,
            message: data.message,

        }
        const res = await axios.post(`http://localhost:3001/task`, task)
        console.log(res);
    }

    const hourArray = [];
    const minuteArray = [];
    for (let i = 1; i <= 12; i++) {
        hourArray.push(i)
    }
    for (let i = 1; i <= 59; i++) {
        minuteArray.push(i)
    }


    //React Day picker

    let footer = <p>Please pick a day.</p>;
    if (date) {
        footer = <p className='font-bold text-blue-500 text-lg'>You picked {format(date, 'PP')}.</p>;
    }
    return (
        <div className='flex justify-end absolute top-0 right-0'>
            <div id='right-side-bar' className='bg-blue-50 '>
                <h1 className='text-3xl text-center'>Tasks</h1>
                <div className='mx-5 mt-5'>
                    <div className='flex justify-between '>
                        <button className='btn bg-gray-900 border-0 text-white'>View Tasks</button>
                        <button className='btn bg-gray-900 border-0 text-white'>Add Tasks</button>
                    </div>
                    <div>
                        <div className='mt-10'>
                            <div >
                                {/* <Calendar onChange={setDate} value={date} /> */}
                                <DayPicker
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    footer={footer}
                                />

                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    {/* <input type="text" className='input border-1 text-lg border-black w-full mt-5' placeholder='Set time'  {...register('time', { required: true })} /> */}
                                    <div className='border border-black rounded-lg mt-5 p-2'>
                                        <p className='mt-5 mb-2 text-2xl'>Selected Time:  <br /> </p>
                                        <div className='flex flex-row justify-between items-center '>
                                            <div>
                                                <select name="time" id="" className='select'
                                                    {...register('hour')}
                                                >
                                                    <option selected value="">Hour</option>
                                                    {
                                                        hourArray.map(h => <option>{h}</option>)
                                                    }
                                                </select>
                                            </div>

                                            <div>
                                                <select name="Shour" id="" className='select'
                                                    {...register('minute')}

                                                >
                                                    <option selected value="">Minute</option>
                                                    {
                                                        minuteArray.map(h => <option >{h}</option>)
                                                    }
                                                </select>
                                            </div>
                                            <div>
                                                <select name="ampm" id=""
                                                    {...register('ampm', { required: true })}
                                                >
                                                    <option selected value="am">am</option>
                                                    <option value="pm">pm</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className='text-center mt-5'>
                                    <input type="text" className='input border-1 border-black w-full text-lg p-1' placeholder='Tasn Message' {...register('message', { required: true })} />
                                </div>
                                <div className='text-center'>
                                    <button type="submit" className='btn mt-3 w-full text-white'>Add Task</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default RightSidebar;