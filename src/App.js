import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToDo from './pages/Utilities/ToDo';
import Calender from './pages/Utilities/Calender';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useState } from 'react';
import { createContext } from 'react';
import Loading from './pages/Shared/Loading';
import Login from './pages/Login/Login';
import CompletedTask from './pages/Utilities/CompletedTask';
import { CartProvider } from './pages/Utilities/Context';
import ReactTooltip from 'react-tooltip';

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
    refetch();
    setFetchAgain(false);
  }
  return (
    <CartProvider>

      <div className='App'>

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
            <Route path='/calender' element={<Calender />} />
          </Route>
          <Route path='/login' element={<Login />} />
        </Routes>
        <ToastContainer
          autoClose={1500}
        ></ToastContainer>
      </div>
      <ReactTooltip />
    </CartProvider>

  );
}

export default App;
export { TaskContext };