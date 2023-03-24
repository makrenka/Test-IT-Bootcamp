import { HandySvg } from 'handy-svg';

import closeBtn from '../../assets/img/close-button.svg';
import abyss from '../../assets/img/abyss.jpg';

import './CharInfo.scss';

export const CharInfo = () => (
    <div className="char-info">
        <div className="char-info__wrapper">
            <img src={abyss} alt="abyss" className='char-info__img' />
            <div className='char-info__description'>
                <table className='char-info__description-table'>
                    <tbody>
                        <tr>
                            <th>Name:</th>
                            <th>Origin:</th>
                        </tr>
                        <tr>
                            <td>Rick Sanchez</td>
                            <td>Earth (C-137)</td>
                        </tr>
                        <tr>
                            <th>Status:</th>
                            <th>Location:</th>
                        </tr>
                        <tr>
                            <td>Alive</td>
                            <td>Citadel of Ricks</td>
                        </tr>
                        <tr>
                            <th>Species:</th>
                            <th>Gender:</th>
                        </tr>
                        <tr>
                            <td>Human</td>
                            <td>Male</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <HandySvg
                src={closeBtn}
                className='char-info__close-btn'
                width='30'
                heught='30'
            />
        </div>
    </div>
)