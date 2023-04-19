import React from 'react';
import style from './lesson.module.css'
import {objectT} from "../../features/schedule/scheduleSlice";

interface lessonI {
    lesson: objectT,
    isCurrentDay: boolean
}

const Lesson: React.FC<lessonI> = ({lesson, isCurrentDay}) => {

    const currDayStyle = () => {
        if (isCurrentDay){
            return {backgroundColor: '#7289d9'}
        }
    }

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
    const goTo = (link: string, e: any) => {
        e.stopPropagation()
        window.location.assign('https://' + link)
    }
    return (
        <div className={style.wrapper}>
            <div style={currDayStyle()} className={style.time}>
                <p>{lesson.time}</p>
            </div>
            <div style={currDayStyle()} className={style.subject}>
                <p>{textHandler(lesson.subject)}</p>
                <div className={style.sub}>
                    <p className={style.teacher} onClick={(e) => goTo(lesson.teacherLink, e)}>{lesson.teacher}</p>
                    <p>{lesson.format}</p>
                </div>
            </div>
            <div style={currDayStyle()} onClick={(e) => goTo(lesson.classroomLink, e)} className={style.auditorium}>
                <p>{lesson['building '] !== 'NULL' ? textHandler(lesson['building '], 10) : ''}</p>
                <p>{lesson.classroom}</p>
            </div>
        </div>
    );
};

export default Lesson;