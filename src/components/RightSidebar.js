import React, { memo, useState } from 'react';
import './styles/RightSidebar.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { TaskContext } from '../App';
import ToDoTable from './ToDoTable';

const RightSidebar = () => {

    const [date, setDate] = useState(new Date());
    const [viewTodo, setViewTodo] = useState(true);
    const [viewTasks, setViewTasks] = useState(false);
    //Context api data
    const [data, setData] = useState([])
    const { setFetchAgain, tasks } = data;

    const { register, handleSubmit, reset } = useForm();
    const resetForm = {
        hour: 'Hour',
        minute: 'Minute',
        ampm: 'am',
        date: '',
        message: ''
    }
    const onSubmit = async data => {
        let hour = data.hour;
        let minute = data.minute;
        if (data.hour.length === 1) {
            hour = '0' + data.hour;
        }
        if (data.minute.length === 1) {
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
            time: `${hour}:${minute} ${data.ampm}`,
            message: data.message,
            isCompleted: false,

        }
        const res = await axios.post(`https://arrogant-toque-48209.herokuapp.com/task`, task)
        console.log(res.data.acknowledged)
        if (res.data.acknowledged) {
            setFetchAgain(true);
            toast.success('Task added successfully!')
            reset(resetForm);
        }
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
    const [completed, setCompleted] = useState(false);
    const handleComplete = async (id) => {
        setCompleted(!completed);
        await axios.post(`https://arrogant-toque-48209.herokuapp.com/task/${id}`)
            .then(data => {
                if (data.data.acknowledged) {
                    setFetchAgain(true);
                    toast.success('Task added to completed list.')
                }

            })

    }

    return (
        <div className='flex md:justify-end md:absolute md:top-0 md:right-0 overflow-x-scroll'>
            <TaskContext.Consumer>
                {(data) => {
                    setData(data);
                }}
            </TaskContext.Consumer>
            <div id='right-side-bar' className='bg-blue-50 '>
                <h1 className='text-3xl text-center'>Tasks</h1>
                <div>
                    <div className='mx-5 mt-5'>
                        <div className='flex justify-between '>
                            {
                                viewTasks
                                    ?
                                    <button onClick={() => {
                                        setViewTasks(true)
                                        setViewTodo(false)
                                    }} className='btn bg-blue-500 hover:bg-blue-700  border-0 text-white'>View Tasks</button>
                                    :
                                    <button onClick={() => {
                                        setViewTasks(true)
                                        setViewTodo(false)
                                    }} className='btn  border-0 text-white'>View Tasks</button>
                            }
                            {
                                viewTodo
                                    ?
                                    <button
                                        onClick={() => {
                                            setViewTasks(false)
                                            setViewTodo(true)
                                        }}
                                        className=' btn bg-blue-500 hover:bg-blue-700  border-0 text-white' > Add Tasks</button>
                                    :
                                    <button
                                        onClick={() => {
                                            setViewTasks(false)
                                            setViewTodo(true)
                                        }}
                                        className='btn  border-0 text-white' > Add Tasks</button>
                            }
                        </div>
                        <div hidden={!viewTodo}>
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
                                        <div className='border border-black rounded-lg mt-5 p-2 '>
                                            <p className='mt-5 mb-2 text-2xl'>Selected Time:  <br /> </p>
                                            <div className='flex flex-row justify-between items-center '>
                                                <div>
                                                    <select name="hour" id="" className='select'
                                                        {...register('hour')}
                                                    >
                                                        <option selected value={resetForm.hour}>{resetForm.hour}</option>
                                                        {
                                                            hourArray.map(h => <option className='text-lg'>{h}</option>)
                                                        }
                                                    </select>
                                                </div>

                                                <div>
                                                    <select name="minute" id="" className='select'
                                                        {...register('minute')}

                                                    >
                                                        <option selected value={resetForm.minute}>{resetForm.minute}</option>
                                                        {
                                                            minuteArray.map(h => <option className='text-lg'>{h}</option>)
                                                        }
                                                    </select>
                                                </div>
                                                <div>
                                                    <select name="ampm" id=""
                                                        {...register('ampm', { required: true })}
                                                    >
                                                        <option selected value="am" className='text-lg'>am</option>
                                                        <option value="pm" className='text-lg'>pm</option>
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

                    {/* View Task button */}
                    <div hidden={!viewTasks}>
                        <div className='md:mx-10 h-1/2 mt-5 xs:px-2 '>
                            {
                                tasks?.length > 0
                                    ?
                                    <div div class="overflow-x-scroll">

                                        {/* <!-- row 1 --> */}

                                        {

                                            tasks &&

                                            tasks.map((task) => <div className='flex gap-5 border-b border-zinc-400 w-full py-2'
                                                key={task._id}
                                            >
                                                <input for="confirmModal" onChange={() => handleComplete(task._id)} type="checkbox" checked={!completed} class="checkbox" />

                                                <span>{task.message}</span>
                                            </div>

                                            )

                                        }


                                    </div>
                                    :
                                    <h1 className='md:text-2xl text-lg mt-10'>You have no task remaining!!</h1>
                            }
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default memo(RightSidebar);