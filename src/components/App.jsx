import React, { Component } from 'react';
import style from './App.module.css';
import Searchbar from './searchbar/Searchbar';
import ImageGallery from './imageGallery/ImageGallery';
import searchApi from './servises/searchApi';
import Modal from './modal/Modal';

class App extends Component {
  state = {
    pictures: [],
    page: 1,
    query: '',
    largeImage: null,
    error: null,
    showModal: false,
    imgTags: null,
    isLoading: false,
  };

  componentDidUpdate(_, prevState) {
    if (prevState.query !== this.state.query) {
      this.searchImages();
    }
    if (this.state.page !== 1 && prevState.page !== this.state.page) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  bigImage = ({ target }) => {
    const { lgimg, tag } = target.dataset;
    this.setState({
      largeImage: lgimg,
      imgTags: tag,
    });
    this.toggleModal();
  };

  searchImages = () => {
    const { page, query } = this.state;
    this.setState({ isLoading: true });
    searchApi({ page, query })
      .then(pictures => {
        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...pictures],
          page: prevState.page + 1,
        }));
      })
      .catch(error => console.log(error))
      .finally(() => this.setState({ isLoading: false }));
  };

  onSubmit = query => {
    this.setState({ query, page: 1, pictures: [] });
  };

  render() {
    const { showModal, largeImage, imgTags, isLoading } = this.state;
    return (
      <div className={style.mainContainer}>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery pictures={this.state.pictures} bigImage={this.bigImage} />

        {isLoading ? (
          <h1>Downloading...</h1>
        ) : (
          this.state.page !== 1 && (
            <button className={style.button} onClick={this.searchImages}>
              Load more
            </button>
          )
        )}

        {showModal && (
          <Modal showModal={this.toggleModal}>
            <img src={largeImage} alt={imgTags} />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
