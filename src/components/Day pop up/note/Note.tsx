import React from 'react';
import style from './note.module.css'

interface notePropsT {
    text: string
    date: string
}

const Note: React.FC<notePropsT> = ({text, date}) => {
    const dateFormatter = (date: string) => {
        return date.split(' ').map((e, i) => {
            if (i < 5 && i > 0){
                return e
            }
        }).join(' ')
    }
    dateFormatter(date)
    return (
        <div className={style.wrapper}>
            <div className={style.text}>
                {text}
            </div>
            <div className={style.date}>
                {dateFormatter(date)}
            </div>
        </div>
    );
};

export default Note;