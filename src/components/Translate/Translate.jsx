import React, { useState, useRef, useEffect, useCallback } from "react";
import "./Translate.css";
import { v4 as uuidv4 } from "uuid";
import { FilesetResolver, GestureRecognizer } from "@mediapipe/tasks-vision";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { HAND_CONNECTIONS } from "@mediapipe/hands";
import Webcam from "react-webcam";
import { SignImageData } from "../../data/SignImageData";
import { useDispatch, useSelector } from "react-redux";
import { addSignData } from "../../redux/actions/signdataaction";
import ProgressBar from "./ProgressBar/ProgressBar";
import DisplayImg from "../../assests/displayGif.gif";

let startTime = "";

const Translate = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [webcamRunning, setWebcamRunning] = useState(false);
  const [gestureOutput, setGestureOutput] = useState("");
  const [gestureRecognizer, setGestureRecognizer] = useState(null);
  const [runningMode, setRunningMode] = useState("IMAGE");
  const [progress, setProgress] = useState(0);
  const requestRef = useRef();
  const [detectedData, setDetectedData] = useState([]);
  const [word, setWord] = useState("");
  const [latestGesture, setLatestGesture] = useState("");
  const [lastAddedGesture, setLastAddedGesture] = useState(null);
  const user = useSelector((state) => state.auth?.user);
  const dispatch = useDispatch();
  const [currentImage, setCurrentImage] = useState(null);
  const [inputText, setInputText] = useState("");
 const [letterImages, setLetterImages] = useState([]);

 const handleTextToSigns = () => {
    const normalizedText = inputText.trim().toUpperCase();
    const words = normalizedText.split(/\s+/); // розбиваємо на слова
    const result = [];
  
    for (let word of words) {
      const letterImages = [];
      for (let letter of word) {
        const match = SignImageData.find(
          (img) => img.name.toUpperCase() === letter
        );
        if (match) {
          letterImages.push(match);
        }
      }
      if (letterImages.length > 0) {
        result.push(letterImages); // одне слово → масив картинок
      }
    }
  
    setLetterImages(result); // результат — масив масивів
  };

  return (

    <div className="translate signlang_detection-container">

<div className="signlang_textarea-section">
  <h2 className="gradient__text">Введіть слово:</h2>
<div className="textarea_wrapper">
  <textarea
    rows={4}
    className="signlang_textarea"
    placeholder="Введіть слово або фразу"
    value={inputText}
    onChange={(e) => setInputText(e.target.value)}
  />

  <button className="convert-button" onClick={handleTextToSigns}>
    🔠 Показати жести
  </button>
</div>
</div>

<div className="signlang_letter-display">
  {letterImages.length > 0 ? (
    letterImages.map((wordImages, wordIndex) => {
      const isSingleWord = letterImages.length === 1;

      return (
        <div key={wordIndex} className="signlang_word-row">
          {wordImages.map((img, letterIndex) => (
            <div key={letterIndex} className="signlang_letter-item">
              <img src={img.url} alt={`letter ${img.name}`}
              />
            </div>
          ))}
        </div>
      );
    })
  ) : (
    <p className="gradient__text"></p>
  )}
</div>
    </div>
  );
};

export default Translate;