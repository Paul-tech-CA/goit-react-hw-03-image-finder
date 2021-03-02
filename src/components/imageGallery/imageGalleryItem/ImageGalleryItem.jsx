import React from 'react';
import style from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({
  id,
  webformatURL,
  largeImageURL,
  tags,
  bigImage,
}) => {
  return (
    <li className={style.imageGalleryItem}>
      <img
        //   data-id={id}
        src={webformatURL}
        alt={tags}
        className={style.imageGalleryItemImage}
        onClick={() => bigImage({ largeImageURL })}
      />
    </li>
  );
};

export default ImageGalleryItem;
