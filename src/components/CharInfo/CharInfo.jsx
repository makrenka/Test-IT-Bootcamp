import { HandySvg } from 'handy-svg';

import closeBtn from '../../assets/img/close-button.svg';
import abyss from '../../assets/img/abyss.jpg';

import './CharInfo.scss';
import classNames from 'classnames';

export const CharInfo = ({ onModal, closeModal }) => (
    <div className={classNames("overlay", { active: onModal })} onClick={closeModal}>
        <div className={classNames("char-info", { active: onModal })}>
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
                <button className='char-info__close-btn' onClick={closeModal}>
                    <HandySvg
                        src={closeBtn}
                        className='char-info__close-btn-icon'
                        width='30'
                        heught='30'
                    />
                </button >
            </div>
        </div>
    </div>

)