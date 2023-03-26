import { Component } from 'react';

import { RickService } from '../../services/RickService';
import { Spinner } from '../Spinner';
import { ErrorMessage } from '../ErrorMessage';

import './CharList.scss';

export class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false,
        page: 1,
    }

    rickService = new RickService();

    onCharList = (newCharList) => {
        this.setState(({ page, charList }) => ({
            charList: [...charList, ...newCharList],
            loading: false,
        }));
    };

    onError = () => {
        this.setState({
            loading: false,
            error: true,
        });
    };

    updateCharList = (page) => {
        this.setState({ loading: true })
        this.rickService
            .getAllCharacters(page)
            .then(this.onCharList)
            .catch(this.onError);
    };

    onScroll = () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;

        if (scrollTop + clientHeight >= scrollHeight) {
            this.setState(({ page }) => ({ page: page + 1 }));
        };
    };

    componentDidMount() {
        this.updateCharList();
        window.addEventListener('scroll', this.onScroll);
    };

    componentDidUpdate(prevProps, prevState) {
        const { page } = this.state;
        if (page !== prevState.page) {
            this.updateCharList(page);
        };

    };

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    };

    render() {
        const { loading, error, charList } = this.state;
        const { onModal } = this.props;
        const spinner = loading ? <Spinner /> : null;
        const errorMessage = error ? <ErrorMessage /> : null;

        return (
            <div className="char-list">
                {spinner}
                {errorMessage}
                <ul className="char-list__grid">
                    {charList.map(({ id, name, image }) =>
                        <li
                            className="char-list__grid-item"
                            onClick={() => { onModal(id) }}
                            key={id}
                        >
                            <img src={image} alt={name} className='char-list__grid-item-img' />
                            <p className='char-list__grid-item-title'>{name}</p>
                        </li>
                    )}
                </ul>
            </div>
        );
    };
};