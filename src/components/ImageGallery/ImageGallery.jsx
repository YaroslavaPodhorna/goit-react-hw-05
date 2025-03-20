import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
export default function ImageGallery({ images, openModal }) {
  return (
    <>
      <ul className={css.list}>
        {images.map((image) => (
          <li key={image.id} onClick={() => openModal(image)}>
            <ImageCard image={image} />
          </li>
        ))}
      </ul>
    </>
  );
}
