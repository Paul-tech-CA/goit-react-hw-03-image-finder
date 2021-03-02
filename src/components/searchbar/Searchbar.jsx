import React, { Component } from 'react';
import Button from './button/Button';
import style from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    query: '',
  };

  onHandleChange = event => {
    this.setState({ query: event.target.value });
  };

  onInputSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };
  render() {
    return (
      <header className={style.searchbar}>
        <form className={style.searchForm} onSubmit={this.onInputSubmit}>
          <Button />

          <input
            className={style.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="input"
            onChange={this.onHandleChange}
            value={this.state.query}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
