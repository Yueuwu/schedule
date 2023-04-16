import React from 'react';
import style from './lesson.module.css'

const Lesson: React.FC<{lesson: any}> = ({lesson}) => {
    const textHandler = (text: string, max?: number): string => {
        let maxLength = 53
        if (max){
            maxLength = max
        }
        if (text.length > maxLength){
            let x = text.length - maxLength
            return text.slice(0,text.length - x).trim() + '...'
        }
        return text
    }
    const goTo = (link: string) => {
        window.location.assign('https://' + link)
    }
    return (
        <div className={style.wrapper}>
            <div className={style.time}>
                <p>{lesson.time}</p>
            </div>
            <div className={style.subject}>
                <p>{textHandler(lesson.subject)}</p>
                <div className={style.sub}>
                    <p className={style.teacher} onClick={() => goTo(lesson.teacherLink)}>{lesson.teacher}</p>
                    <p>{lesson.format}</p>
                </div>
            </div>
            <div onClick={() => goTo(lesson.classroomLink)} className={style.auditorium}>
                <p>{lesson['building '] !== 'NULL' ? textHandler(lesson['building '], 10) : ''}</p>
                <p>{lesson.classroom}</p>
            </div>
        </div>
    );
};

export default Lesson;