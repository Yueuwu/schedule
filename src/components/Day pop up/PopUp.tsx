import React, {useEffect, useRef, useState} from 'react';
import style from './popup.module.css'
import {valueI} from "../../features/schedule/scheduleSlice";

interface popUpI {
    changeVisibility: () => void
    pickedDay: valueI['day']
}

type noteT = {
    text: string,
    date: string
}
type dataList = noteT[]


const PopUp: React.FC<popUpI> = ({changeVisibility, pickedDay}) => {

    const [notes, setNotes] = useState<dataList>([{text: '', date: ''}])
    const [noteForSaving, setNoteForSaving] = useState<noteT>({text: '', date: ''})

    const readLocalStorage = () => {
        let rawData: string | null = localStorage.getItem(`${pickedDay}`)
        return rawData ? JSON.parse(rawData) : []
    }

    useEffect(() => {
        let data = readLocalStorage()
        if (!data.length){
            data = [{text: '', date: ''}]
        }
        setNotes(data)
    }, [noteForSaving])

    const createNote = (text: any) => {
        const note: noteT = {
            text: text.target.value,
            date: Date()
        }
        setNoteForSaving(note)
    }

    const saveNote = () => {
        let data = readLocalStorage()
        if (noteForSaving.text){
            data.push(noteForSaving)
        }
        if (data.length > 5){
            data.shift()
        }
        const json = JSON.stringify(data)
        localStorage.setItem(`${pickedDay}`, json)
        setNoteForSaving({text: '', date: ''})
    }

    return (
        <div className={style.wrapper}>
            <div className={style.dayName}>
                {pickedDay}
            </div>
            <div className={style.close} onClick={changeVisibility}>
            </div>
            <div>
                <input onChange={event => createNote(event)} value={noteForSaving.text}>
                </input>
            </div>
            <div>
                <button onClick={saveNote}>Сохранить</button>
            </div>
            <div>
                {
                    notes.map(e => <div>{e.text}{e.date}</div>)
                }
            </div>
        </div>
    );
};

export default PopUp;