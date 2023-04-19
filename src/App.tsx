import React, {useEffect, useState} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from "./app/hooks";
import {getSchedule, scheduleSelector, valueI} from "./features/schedule/scheduleSlice";
import Day from "./components/day/Day";
import PopUp from "./components/Day pop up/PopUp";

const App: React.FC = () => {

    const [showPopUp, setShowPopUp] = useState(false)

    const popupVisibility = () => {
        setShowPopUp(!showPopUp)
    }

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
                        value.map((day: valueI, index) => <Day showPopUp={popupVisibility} key={index} day={day['day']} object={day['object']}/>)
                        :
                        <div>Лоадинг</div>
                }
                {
                    showPopUp && <PopUp changeVisibility={popupVisibility} />
                }
            </div>
        </div>
    );
}

export default App;
