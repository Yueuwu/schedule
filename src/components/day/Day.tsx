import React from 'react';
import Lesson from "../lesson/Lesson";
import style from './day.module.css'
import ChillDay from "../ChillDay/ChillDay";
import {objectT, scheduleSelector, valueI} from "../../features/schedule/scheduleSlice";
import {useAppSelector} from "../../app/hooks";
import {dayChanger} from "../../utils/dayChanger";

interface dayI extends valueI {
    showPopUp: () => void,
    setPickedDayPopUp: (day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday") => void
}

const Day: React.FC<dayI> = ({day, object, showPopUp, setPickedDayPopUp}) => {
    const {currentDay} = useAppSelector(scheduleSelector)

    const isCurrentDay = day === currentDay


    const showPopUpHandler = () => {
        showPopUp()
        setPickedDayPopUp(day)
    }


    const currDayStyle = () => {
        if (isCurrentDay){
            return {backgroundColor: '#7289d9'}
        }
    }


    return (
        <div onClick={showPopUpHandler} className={style.wrapper}>
            <div style={currDayStyle()} className={style.day}>
                <p>{dayChanger(day)}</p>
            </div>
            <div className={style.lessons}>
                {
                    object.length // lessons exists?
                        ?
                        object.map((lesson: objectT, index) => <Lesson key={index} lesson={lesson}
                                                                       isCurrentDay={isCurrentDay}/>)
                        :
                        <ChillDay/>
                }
            </div>
        </div>
    );
};

export default Day;