import "./ImageCrop.css";
import { useState, useRef } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { canvasPreview } from "./canvasPreview.jsx";

export default function ImageCrop({url} ) {
  const imgRef = useRef(null);
  const [crop, setCrop] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [completedCrop, setCompletedCrop] = useState();
  const [first, setFirst] = useState('');
  const imageUrl = url;

  const onZoom = (e) => {
    setScale(parseFloat(e));
  };

  const rotateRight = () => {
    let newRotation = rotation + 90;
    if (newRotation >= 360) {
      newRotation = -360;
    }
    setRotation(newRotation);
  };

  const download = async () => {
    let uri = await canvasPreview(
      imgRef.current,
      completedCrop,
      scale,
      rotation
    );
    console.log('Data',uri)
    setFirst(uri);
    
    // Send the Blob URL to the PHP backend
    fetch("http://localhost/vanillacrop/test.php", {
      method: "POST",
      body: JSON.stringify({'image_url': uri }), // Send the Blob URL as JSON data
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((data) => {
        console.log("Data sent to PHP backend:", data);
      })
      .catch((error) => {
       console.log("Data error:", error);
      });
  };
  const onImageLoad = (e) => {
    setHeight(e?.currentTarget?.height);
    setWidth(e?.currentTarget?.width);
    setCompletedCrop({
      x: 0,
      y: 0,
      height: e?.currentTarget?.height,
      width: e?.currentTarget?.width,
      unit: "px",
    });
  };
  return (
    <div
      className={"outerDiv"}
      onWheel={(e) => {
        if (e.deltaY > 0) {
          setScale(scale + 0.1);
        } else if (e.deltaY < 0 && scale > 0.1) {
          setScale(scale - 0.1);
        }
      }}
    >
      <ReactCrop
        src={imageUrl}
        crop={crop}
        onChange={(_, percentCrop) => {
          setCrop(percentCrop);
        }}
        onComplete={(e) => {
          if (e?.height == 0 || e?.width == 0) {
            setCompletedCrop({
              x: 0,
              y: 0,
              height: height,
              width: width,
              unit: "px",
            });
          } else {
            setCompletedCrop(e);
          }
        }}
      >
        <img
          ref={imgRef}
         
          alt="Error"
          src={imageUrl}
          style={{ transform: `scale(${scale}) rotate(${rotation}deg)` }}
          onLoad={onImageLoad}
        />
      </ReactCrop>
      <div className={"controls"}>
        <input
          type="range"
          min={0.1}
          max={3}
          step={0.05}
          value={scale}
          onInput={(e) => {
            onZoom(e.target.value);
          }}
          className={"slider"}
        ></input>
        <span className={"rangeText"}>Zoom In/Out</span>
      </div>
      <div className={"controlsIcon"}>
        <h5  onClick={download} >Download</h5>
        <h5 onClick={rotateRight}>Rotate</h5>
      </div>
      {/* {first && <p><b>{first}</b></p>} */}
    </div>
  );
}
