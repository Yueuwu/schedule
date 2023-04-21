import React, {useEffect, useRef, useState} from 'react';
import style from './popup.module.css'
import {valueI} from "../../features/schedule/scheduleSlice";

interface popUpI {
    changeVisibility: () => void
    pickedDay: valueI['day']
}

type dataT = {
    text: string,
    date: string
}
interface dataList {
    data: dataT[]
}

const PopUp: React.FC<popUpI> = ({changeVisibility, pickedDay}) => {

    const [noteText, setNoteText] = useState('')

    useEffect(() => {
        let rawData: string | null = localStorage.getItem(`${pickedDay}`)
        let data: dataT = rawData ? JSON.parse(rawData) : {text: ''}
        setNoteText(data.text)
    }, [])

    const saveNote = (text: any) => {
        const data: dataT = {
            text: text.target.value,
            date: Date()
        }
        const json = JSON.stringify(data)
        localStorage.setItem(`${pickedDay}`, json)
    }

    return (
        <div className={style.wrapper}>
            <div>
                {pickedDay} {noteText}
            </div>
            <div onClick={changeVisibility}>
                Закрыть
            </div>
            <div>
                <input onChange={event => saveNote(event)}>

                </input>
            </div>
        </div>
    );
};

export default PopUp;