import React, {useEffect} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from "./app/hooks";
import {getSchedule, scheduleSelector, valueI} from "./features/schedule/scheduleSlice";
import Day from "./components/day/Day";

const App: React.FC = () => {

    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getSchedule())
    }, [])
    const {value, status} = useAppSelector(scheduleSelector)

    return (
        <div className="App">
            <div className="AppWrapper">
                {
                    status === 'success'
                        ?
                        value.map((day: valueI, index) => <Day key={index} day={day['day']} object={day['object']}/>)
                        :
                        <div>Лоадинг</div>
                }
            </div>
        </div>
    );
}

export default App;
