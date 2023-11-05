import {useState} from 'react';
import ImageCrop from "./components/ImageCrop/ImageCrop";

const Image = () => {
   const [src, setSrc] = useState(null);
   const selectImage = (file) => {
     setSrc(URL.createObjectURL(file));
   };
  return (
    <>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          selectImage(e.target.files[0]);
        }}
      />

      {src && <ImageCrop url={src} />}
    </>
  );
}

export default Image