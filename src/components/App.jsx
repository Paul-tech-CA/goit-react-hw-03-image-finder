import React, { Component } from 'react';
import style from './App.module.css';
// import { v4 as uuidv4 } from 'uuid';

import Searchbar from './searchbar/Searchbar';
import ImageGallery from './imageGallery/ImageGallery';
import searchApi from './servises/searchApi';

class App extends Component {
  state = {
    pictures: [],
    page: 1,
    query: '',
    largeImage: null,
    error: null,
    showModal: false,
    imgTags: null,
  };

  bigImage = ({ largeImageURL, tags }) => {
    this.setState({ largeImage: largeImageURL, imgTags: tags });
  };

  searchImages = () => {
    const { page, query } = this.state;
    searchApi({ page, query })
      .then(
        pictures => {
          this.setState(prevState => ({
            pictures: [...prevState.pictures, ...pictures],
            page: prevState.page + 1,
          }));
        },

        // this.setState(prevState => {
        //   return {
        //     pictures: [...prevState.pictures, ...data.hits],
        //     page: prevState.page + 1,
        //   };
        // }),
      )
      .catch(error => console.log(error));
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

  onSubmit = query => {
    this.setState({ query, page: 1, pictures: [] });
  };

  render() {
    return (
      <div className={style.mainContainer}>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery pictures={this.state.pictures} bigImage={this.bigImage} />

        {this.state.page !== 1 && (
          <button className={style.button} onClick={this.searchImages}>
            Load more
          </button>
        )}
      </div>
    );
  }
}

export default App;
