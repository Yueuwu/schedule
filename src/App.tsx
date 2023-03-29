import React, {useEffect} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from "./app/hooks";
import {getSchedule, scheduleSelector} from "./features/schedule/scheduleSlice";

function App() {
  const dispatch = useAppDispatch()
  useEffect(()=>{
    dispatch(getSchedule())
  }, [])
  const {value, status} = useAppSelector(scheduleSelector)
  console.log('status',status)
  console.log(value);
  return (
    <div className="App">

    </div>
  );
}

export default App;
