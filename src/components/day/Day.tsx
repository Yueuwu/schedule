import React from 'react';
import Lesson from "../lesson/Lesson";
import style from './day.module.css'
import ChillDay from "../ChillDay/ChillDay";
import {objectT, scheduleSelector, valueI} from "../../features/schedule/scheduleSlice";
import {useAppSelector} from "../../app/hooks";

interface dayI extends valueI {
    showPopUp: () => void
}

const Day: React.FC<dayI> = ({day, object, showPopUp}) => {
    const {currentDay} = useAppSelector(scheduleSelector)

    const currDayStyle = () => {
        if (day === currentDay){
            return {backgroundColor: '#7289d9'}
        }
    }

    const dayChanger = (day: valueI['day']) => {
        switch (day) {
            case "Monday": return "Понедельник";
            case "Tuesday": return "Вторник";
            case "Wednesday": return "Среда";
            case "Thursday": return "Четверг";
            case "Friday": return "Пятница";
            case "Saturday": return "Суббота";
        }
    }

    return (
        <div onClick={(e) => {showPopUp()} } className={style.wrapper}>
            <div style={currDayStyle()} className={style.day}>
                <p>{dayChanger(day)}</p>
            </div>
            <div className={style.lessons}>
                {
                    object.length // lessons exists?
                        ?
                        day === currentDay // lessons in current day?
                            ?
                            object.map((lesson: objectT, index) => <Lesson key={index} lesson={lesson} isCurrentDay={true}/>)
                            :
                            object.map((lesson: objectT, index) => <Lesson key={index} lesson={lesson} isCurrentDay={false}/>)
                        :
                        <ChillDay/>
                }
            </div>
        </div>
    );
};

export default Day;