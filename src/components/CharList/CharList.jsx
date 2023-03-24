import { Component } from 'react';

import { RickService } from '../../services/RickService';
import { CharInfo } from '../CharInfo';
import { Spinner } from '../Spinner';
import { ErrorMessage } from '../ErrorMessage';

import './CharList.scss';

export class CharList extends Component {

    state = {
        charList: [],
        modalOpen: false,
        loading: true,
        error: false,
    }

    rickService = new RickService();

    onCharList = (charList) => {
        this.setState({
            charList,
            loading: false,
        });
    };

    onError = () => {
        this.setState({
            loading: false,
            error: true,
        });
    };

    updateCharList = () => {
        this.rickService
            .getAllCharacters()
            .then(this.onCharList)
            .catch(this.onError);
    };

    onModal = () => {
        this.setState({ modalOpen: true });
    };

    closeModal = () => {
        this.setState({ modalOpen: false });
    };

    componentDidMount() {
        this.updateCharList();
    };

    render() {
        const { modalOpen, loading, error, charList } = this.state;
        const spinner = loading ? <Spinner /> : null;
        const errorMessage = error ? <ErrorMessage /> : null;

        return (
            <>
                <div className="char-list">
                    {spinner}
                    {errorMessage}
                    <ul className="char-list__grid">
                        {charList.map(({ id, name, image }) =>
                            <li className="char-list__grid-item" onClick={this.onModal} key={id}>
                                <img src={image} alt={name} className='char-list__grid-item-img' />
                                <p className='char-list__grid-item-title'>{name}</p>
                            </li>
                        )}
                    </ul>
                </div>
                <CharInfo onModal={modalOpen} closeModal={this.closeModal} />
            </>
        );
    };
};