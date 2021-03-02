import React from 'react';
import ImageGalleryItem from './imageGalleryItem/ImageGalleryItem';
import style from './ImageGallery.module.css';

const ImageGallery = ({ pictures, bigImage }) => {
  return (
    <ul className={style.imageGallery}>
      {pictures.map(picture => (
        <ImageGalleryItem {...picture} key={picture.id} bigImage={bigImage} />
      ))}
    </ul>
  );
};

export default ImageGallery;
