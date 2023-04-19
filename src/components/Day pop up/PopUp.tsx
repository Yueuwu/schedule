import React from 'react';
import style from './popup.module.css'

interface popUpI {
    changeVisibility: () => void
}

const PopUp: React.FC<popUpI> = ({changeVisibility}) => {
    return (
        <div className={style.wrapper}>
            <div>
                POPUP
            </div>
            <div onClick={changeVisibility}>
                Закрыть
            </div>
        </div>
    );
};

export default PopUp;