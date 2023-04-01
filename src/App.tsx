import React, {useEffect} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from "./app/hooks";
import {getSchedule, scheduleSelector} from "./features/schedule/scheduleSlice";
import Day from "./components/day/Day";

function App() {
  const dispatch = useAppDispatch()
  useEffect(()=>{
    dispatch(getSchedule())
  }, [])
  const {value, status} = useAppSelector(scheduleSelector)
  return (
    <div className="App">
      {
        value["Понедельник "] && <Day props={value["Понедельник "]}/>
      }
    </div>
  );
}

export default App;
