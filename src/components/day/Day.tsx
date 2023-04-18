import React from 'react';
import Lesson from "../lesson/Lesson";
import style from './day.module.css'
import ChillDay from "../ChillDay/ChillDay";
import {objectT, scheduleSelector, valueI} from "../../features/schedule/scheduleSlice";
import {useAppSelector} from "../../app/hooks";

const Day: React.FC<valueI> = ({day, object}) => {
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
        <div className={style.wrapper}>
            <div style={currDayStyle()} className={style.day}>
                <p>{dayChanger(day)}</p>
            </div>
            <div className={style.lessons}>
                {
                    object.length
                        ?
                        object.map((lesson: objectT, index) => <Lesson key={index} lesson={lesson}/>)
                        :
                        <ChillDay/>
                }
            </div>
        </div>
    );
};

export default Day;