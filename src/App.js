import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CompletedTask from './components/CompletedTask';
import ToDo from './components/ToDo';
import Calender from './components/Calender';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useState } from 'react';
import { createContext } from 'react';
import Loading from './components/Loading';

// https://arrogant-toque-48209.herokuapp.com/

const TaskContext = createContext();
function App() {
  const [fetchAgain, setFetchAgain] = useState(false);
  const [tasks, setTasks] = useState([])
  const { isLoading, refetch } = useQuery('tasks', async () => {
    await axios.get(`https://arrogant-toque-48209.herokuapp.com/task`)
      .then(data => setTasks(data.data));
  })
  if (isLoading) {
    return <Loading />
  }
  if (fetchAgain) {
    console.log('Yeeeeh !! Fetched At last')
    refetch();
    setFetchAgain(false);
  }
  return (
    <div >

      <Routes>
        <Route path='/' element={
          <TaskContext.Provider value={{ tasks, setFetchAgain }}>
            <Home />
          </TaskContext.Provider>

        } >
          <Route path='/completed' element={<CompletedTask />} />
          <Route index element={
            <ToDo />
          } />
          <Route path='/calender' element={
            <Calender />
          } />
        </Route>
      </Routes>
      <ToastContainer
        autoClose={1500}
      ></ToastContainer>
    </div>
  );
}

export default App;
export { TaskContext };