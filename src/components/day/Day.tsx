import React from 'react';
import Lesson from "../lesson/Lesson";
import style from './day.module.css'

const Day: React.FC<{day: any}> = ({day}) => {
    const dayChanger = (day: any) => {
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
            <div className={style.day}>
                <p>{dayChanger(day.day)}</p>
            </div>
            <div className={style.lessons}>
                {day.object.map((lesson: any) => <Lesson lesson={lesson}/>)}
            </div>
        </div>
    );
};

export default Day;