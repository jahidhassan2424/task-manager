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
import RightSidebar from './components/RightSidebar';

const TaskContext = createContext();
function App() {
  const [tasks, setTasks] = useState([])
  const { isLoading, refetch } = useQuery('tasks', async () => {
    await axios.get(`http://localhost:3001/task`)
      .then(data => setTasks(data.data));
  })
  return (
    <div >

      <Routes>
        <Route path='/' element={
          <TaskContext.Provider value={{ tasks, refetch }}>
            <Home />
          </TaskContext.Provider>

        } >
          <Route path='/completed' element={<CompletedTask />} />
          <Route index element={
            <TaskContext.Provider value={{ tasks, refetch }}>
              <ToDo />
            </TaskContext.Provider>
          } />
          <Route path='/calender' element={
            <TaskContext.Provider value={{ tasks, refetch }}>
              <Calender />
            </TaskContext.Provider>
          } />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
export { TaskContext };