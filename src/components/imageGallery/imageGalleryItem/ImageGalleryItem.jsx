import React from 'react';
import style from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, largeImageURL, tags, bigImage }) => {
  return (
    <li className={style.imageGalleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        className={style.imageGalleryItemImage}
        data-lgimg={largeImageURL}
        data-tag={tags}
        onClick={bigImage}
      />
    </li>
  );
};

export default ImageGalleryItem;
