import React, {useEffect, useState} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from "./app/hooks";
import {getSchedule, scheduleSelector, valueI} from "./features/schedule/scheduleSlice";
import Day from "./components/day/Day";
import PopUp from "./components/Day pop up/PopUp";

const App: React.FC = () => {

    const [showPopUp, setShowPopUp] = useState(false)
    const [pickedDayPopUp, setPickedDayPopUp] = useState<valueI['day']>('Monday')

    const popupVisibility = () => {
        setShowPopUp(!showPopUp)
    }

    const closePopUpOutside = (e: React.MouseEvent) => {
        if (showPopUp) {
            e.stopPropagation()
            setShowPopUp(false)
        }
    }

    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getSchedule())
    }, [])
    const {value, status} = useAppSelector(scheduleSelector)

    return (
        /*onClick={(e)=>closePopUpOutside(e)}*/
        <div  className="App">
            <div className="AppWrapper">
                {
                    status === 'success'
                        ?
                        value.map((day: valueI, index) => <Day setPickedDayPopUp={setPickedDayPopUp} showPopUp={popupVisibility} key={index} day={day['day']} object={day['object']}/>)
                        :
                        <div>
                            <p>Лоадинг</p>
                            <img style={{maxWidth: '50vmin', marginTop: '5vmin'}} src='https://get.wallhere.com/photo/illustration-long-hair-anime-anime-girls-animal-ears-fruit-apples-red-eyes-original-characters-violet-hair-mangaka-58378.jpg'/>
                        </div>
                }
                {
                    showPopUp && <PopUp pickedDay={pickedDayPopUp} changeVisibility={popupVisibility} />
                }
            </div>
        </div>
    );
}

export default App;
