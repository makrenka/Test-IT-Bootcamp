import { Component } from 'react';
import { HandySvg } from 'handy-svg';

import { RickService } from '../../services/RickService';
import { Spinner } from '../Spinner';
import { ErrorMessage } from '../ErrorMessage';

import upButton from '../../assets/img/up-arrow-button.svg';

import './CharList.scss';
import classNames from 'classnames';


export class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false,
        page: 1,
        scroll: 0,
        pagination: false,
    }

    rickService = new RickService();

    onCharListScroll = (newCharList) => {
        this.setState(({ charList }) => ({
            charList: [...charList, ...newCharList],
            loading: false,
        }));
    };

    onCharListPagination = (charList) => {
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

    updateCharListScroll = (page) => {
        this.setState({ loading: true });
        this.rickService
            .getAllCharacters(page)
            .then(this.onCharListScroll)
            .catch(this.onError);
    };

    updateCharListPagination = (page) => {
        this.setState({ loading: true });
        this.rickService
            .getAllCharacters(page)
            .then(this.onCharListPagination)
            .catch(this.onError);
    }

    onScroll = () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;

        if ((scrollTop + clientHeight >= scrollHeight) && !this.state.pagination) {
            this.setState(({ page }) => ({ page: page + 1 }));
        };
    };

    displayUpBtn = () => {
        this.setState({ scroll: window.scrollY });
    };

    togglePagination = () => {
        this.setState((state) => ({ pagination: !state.pagination }));
    };

    componentDidMount() {
        this.updateCharListPagination();
        window.addEventListener('scroll', this.onScroll);
        window.addEventListener('scroll', this.displayUpBtn);
    };

    componentDidUpdate(prevProps, prevState) {
        const { currentPage } = this.props;
        const { page, pagination } = this.state;
        if (currentPage !== prevProps.currentPage) {
            this.updateCharListPagination(currentPage);
        }
        if (page !== prevState.page) {
            this.updateCharListScroll(page);
        };
        if (pagination !== prevState.pagination) {
            this.props.togglePagination(this.state.pagination);
        };
    };

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
        window.removeEventListener('scroll', this.displayUpBtn);
    };

    render() {
        const { loading, error, charList, scroll, pagination } = this.state;
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
                <button
                    className={classNames('char-list__up-btn', { active: scroll > 400 })}
                    onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                >
                    <HandySvg
                        src={upButton}
                        className='char-list__up-btn-icon'
                        width='50'
                        height='50'
                    />
                </button>
                <button className='char-list__pagination-toggle' onClick={this.togglePagination}>
                    {pagination ? 'Without pagination' : 'Display pagination'}
                </button>
            </div>
        );
    };
};