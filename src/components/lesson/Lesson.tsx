import React from 'react';
import style from './lesson.module.css'

const Lesson: React.FC<{lesson: any}> = ({lesson}) => {
    return (
        <div className={style.wrapper}>
            <div className={style.time}>
                {lesson.time}
            </div>
            <div className={style.subject}>
                <div>Урок {lesson.subject}</div>
                <div>Препод {lesson.teacher}</div>
            </div>
            <div className={style.auditorium}>
                <p>{lesson.classroom}</p>
            </div>
        </div>
    );
};

export default Lesson;