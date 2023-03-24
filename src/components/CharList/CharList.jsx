import abyss from '../../assets/img/abyss.jpg';
import { CharInfo } from '../CharInfo/CharInfo';

import './CharList.scss';

export const CharList = () => (
    <>
        <div className="char-list">
            <ul className="char-list__grid">
                <li className="char-list__grid-item">
                    <img src={abyss} alt="abyss" className='char-list__grid-item-img' />
                    <p className='char-list__grid-item-title'>Abyss</p>
                </li>
                <li className="char-list__grid-item">
                    <img src={abyss} alt="abyss" className='char-list__grid-item-img' />
                    <p className='char-list__grid-item-title'>Abyss</p>
                </li>
                <li className="char-list__grid-item">
                    <img src={abyss} alt="abyss" className='char-list__grid-item-img' />
                    <p className='char-list__grid-item-title'>Abyss</p>
                </li>
                <li className="char-list__grid-item">
                    <img src={abyss} alt="abyss" className='char-list__grid-item-img' />
                    <p className='char-list__grid-item-title'>Abyss</p>
                </li>
                <li className="char-list__grid-item">
                    <img src={abyss} alt="abyss" className='char-list__grid-item-img' />
                    <p className='char-list__grid-item-title'>Abyss</p>
                </li>
                <li className="char-list__grid-item">
                    <img src={abyss} alt="abyss" className='char-list__grid-item-img' />
                    <p className='char-list__grid-item-title'>Abyss</p>
                </li>
            </ul>
        </div>
        <CharInfo />
    </>
)