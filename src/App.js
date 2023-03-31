import { Component } from 'react';

import { CharList } from './components/CharList/CharList';
import { CharInfo } from './components/CharInfo';

import './App.css';
import { Pagination } from './components/Pagination/Pagination';

export class App extends Component {

  state = {
    modalOpen: false,
    selectedId: null,
  };

  onModal = (id) => {
    this.setState({
      modalOpen: true,
      selectedId: id,
    });
  };

  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    const { modalOpen, selectedId } = this.state;

    return (
      <>
        <CharList onModal={this.onModal} />
        <CharInfo
          onModal={modalOpen}
          closeModal={this.closeModal}
          selectedId={selectedId}
        />
        <Pagination />
      </>
    );
  };
};