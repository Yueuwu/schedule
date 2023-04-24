import React, {useEffect, useState} from 'react';
import style from './popup.module.css'
import {valueI} from "../../features/schedule/scheduleSlice";
import Note from "./note/Note";
import {dayChanger} from "../../utils/dayChanger";

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
                {dayChanger(pickedDay)}
            </div>
            <div className={style.close} onClick={changeVisibility}>
            </div>
            <div className={style.inputWrap}>
                <textarea
                    placeholder='Введите заметку'
                    className={style.input}
                    onChange={event => createNote(event)}
                    value={noteForSaving.text}>
                </textarea>
            </div>
            <div className={style.inputWrap}>
                <button className={style.btn} onClick={saveNote}>Сохранить</button>
            </div>
            <div className={style.notesWrap}>
                {
                    notes.map((note, index) => <Note key={index} text={note.text} date={note.date}/>)
                }
            </div>
        </div>
    );
};

export default PopUp;