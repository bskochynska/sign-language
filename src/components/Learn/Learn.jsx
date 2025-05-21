import React, { useState, useRef, useEffect, useCallback } from "react";
import "./Learn.css";
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

const Learn = () => {
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

  useEffect(() => {
    if (webcamRunning && !currentImage) {
      const randomIndex = Math.floor(Math.random() * SignImageData.length);
      const randomImage = SignImageData[randomIndex];
      setCurrentImage(randomImage);
    }
  }, [webcamRunning, currentImage]);


  const [praiseMessage, setPraiseMessage] = useState("");

const matchCountRef = useRef(0);
const previousMatchRef = useRef("");
const matchIntervalRef = useRef(null);

const normalize = (text) => text?.normalize("NFC").trim().toUpperCase();
const speakImageName = () => {
    if (currentImage?.name) {
      const utterance = new SpeechSynthesisUtterance(currentImage.name);
      speechSynthesis.speak(utterance);
    }
  };

  const handleNextImage = () => {
    const randomIndex = Math.floor(Math.random() * SignImageData.length);
    const randomImage = SignImageData[randomIndex];
    setCurrentImage(randomImage);
    setPraiseMessage(""); // прибрати похвалу при переході
    matchCountRef.current = 0; // скинути рахунок
    previousMatchRef.current = "";
};

useEffect(() => {
  if (webcamRunning) {
    matchIntervalRef.current = setInterval(() => {
      const normalizedGesture = normalize(gestureOutput);
      const normalizedTarget = normalize(currentImage?.name);

      console.log("🧩 currentImage.name:", currentImage?.name, currentImage?.name?.charCodeAt?.(0));
      console.log("🎯 gestureOutput:", gestureOutput, gestureOutput?.charCodeAt?.(0));
      console.log("✅ normalizedGesture:", normalizedGesture);
      console.log("✅ normalizedTarget:", normalizedTarget);
      console.log("🔍 comparison result:", normalizedGesture === normalizedTarget);

      if (normalizedGesture && normalizedTarget && normalizedGesture === normalizedTarget) {
        if (previousMatchRef.current === normalizedGesture) {
          matchCountRef.current += 1;
        } else {
          matchCountRef.current = 1;
          previousMatchRef.current = normalizedGesture;
        }

        console.log(
          `%c✅ Match detected! Count: ${matchCountRef.current}`,
          'color: green; font-weight: bold'
        );

        if (matchCountRef.current >= 10) {
          console.log('%c🎉 Gesture confirmed, changing image...', 'color: blue');
          const praiseList = ["Чудово!", "Так тримати!", "Супер!", "Молодець!"];
          const randomPraise = praiseList[Math.floor(Math.random() * praiseList.length)];
          setPraiseMessage(randomPraise);
          setTimeout(() => setPraiseMessage(""), 2000); // ← зникає через 2 секунди

          const randomIndex = Math.floor(Math.random() * SignImageData.length);
          const randomImage = SignImageData[randomIndex];
          setCurrentImage(randomImage);
          setLastAddedGesture(null);
          matchCountRef.current = 0;
          previousMatchRef.current = "";
        }
      } else {
        if (matchCountRef.current !== 0) {
          console.log(
            `%c❌ Resetting count. Current: ${gestureOutput}, Expected: ${currentImage?.name}`,
            'color: red'
          );
        }
        matchCountRef.current = 0;
        previousMatchRef.current = "";
      }
    }, 100); // кожні 50 мс

    return () => clearInterval(matchIntervalRef.current);
  }

}, [webcamRunning, gestureOutput, currentImage,]);

  const predictWebcam = useCallback(() => {
    if (runningMode === "IMAGE") {
      setRunningMode("VIDEO");
      gestureRecognizer.setOptions({ runningMode: "VIDEO" });
    }

    let nowInMs = Date.now();
    const results = gestureRecognizer.recognizeForVideo(
      webcamRef.current.video,
      nowInMs
    );

    const canvasCtx = canvasRef.current.getContext("2d");
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    webcamRef.current.video.width = videoWidth;
    webcamRef.current.video.height = videoHeight;

    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    if (results.landmarks) {
      for (const landmarks of results.landmarks) {
        drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
          color: "#00FF00",
          lineWidth: 5,
        });
        drawLandmarks(canvasCtx, landmarks, { color: "#FF0000", lineWidth: 2 });
      }
    }

    if (results.gestures.length > 0) {
      const detectedSign = results.gestures[0][0].categoryName;

      setLatestGesture(detectedSign);

      setDetectedData((prevData) => [
        ...prevData,
        {
          SignDetected: detectedSign,
        },
      ]);

      setGestureOutput(detectedSign);
      setProgress(Math.round(parseFloat(results.gestures[0][0].score) * 100));
    } else {
      setGestureOutput("");
      setProgress("");
    }

    if (webcamRunning === true) {
      requestRef.current = requestAnimationFrame(predictWebcam);
    }
  }, [webcamRunning, runningMode, gestureRecognizer]);

  const animate = useCallback(() => {
    requestRef.current = requestAnimationFrame(animate);
    predictWebcam();
  }, [predictWebcam]);

  const enableCam = useCallback(() => {
    if (!gestureRecognizer) {
      alert("Please wait for gestureRecognizer to load");
      return;
    }
  
    if (webcamRunning === true) {
      clearInterval(matchIntervalRef.current);
      setWebcamRunning(false);
      cancelAnimationFrame(requestRef.current);
      setCurrentImage(null);
      setLatestGesture("");
  
      const endTime = new Date();
      const timeElapsed = (
        (endTime.getTime() - startTime.getTime()) / 1000
      ).toFixed(2);
  
      // Захищене фільтрування
      const nonEmptyData = detectedData.filter(
        (data) => data?.SignDetected && data.SignDetected !== ""
      );
  
      const resultArray = [];
      if (nonEmptyData.length > 0) {
        let current = nonEmptyData[0];
  
        for (let i = 1; i < nonEmptyData.length; i++) {
          if (nonEmptyData[i].SignDetected !== current.SignDetected) {
            resultArray.push(current);
            current = nonEmptyData[i];
          }
        }
  
        resultArray.push(current);
      }
  
      const countMap = new Map();
      for (const item of resultArray) {
        const count = countMap.get(item.SignDetected) || 0;
        countMap.set(item.SignDetected, count + 1);
      }
  
      const sortedArray = Array.from(countMap.entries()).sort(
        (a, b) => b[1] - a[1]
      );
  
      const outputArray = sortedArray
        .slice(0, 5)
        .map(([sign, count]) => ({ SignDetected: sign, count }));
  
      const data = {
        signsPerformed: outputArray,
        id: uuidv4(),
        username: user?.name,
        userId: user?.userId,
        createdAt: String(endTime),
        secondsSpent: Number(timeElapsed),
      };

      console.log("🚀 FINAL DATA TO BE DISPATCHED:", data);
      
      dispatch(addSignData(data));
      setDetectedData([]);
      setWord("");
    } else {
      setWebcamRunning(true);
      startTime = new Date();
      requestRef.current = requestAnimationFrame(animate);
    }
  }, [webcamRunning, gestureRecognizer, animate, detectedData, user?.name, user?.userId, dispatch]);

  useEffect(() => {
    async function loadGestureRecognizer() {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );
      const recognizer = await GestureRecognizer.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: process.env.REACT_APP_MODEL_PATH,
        },
        numHands: 2,
        runningMode: runningMode,
      });
      setGestureRecognizer(recognizer);
    }
    loadGestureRecognizer();
  }, [runningMode]);

  const speakText = () => {
    const utterance = new SpeechSynthesisUtterance(word);
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="learn signlang_detection-container">
      <div style={{ position: "relative" }}>
        <Webcam
          audio={false}
          ref={webcamRef}
          className="signlang_webcam"
        />
        <canvas ref={canvasRef} className="signlang_canvas" />

        <div className="signlang_data-container">
          <button onClick={enableCam}>{webcamRunning ? "Стоп" : "Старт"}</button>
          <div className="signlang_data">
            <p className="gesture_output">{gestureOutput}</p>
            <div className="progress-bar-wrapper">
                <ProgressBar progress={progress || 0} />
            </div>
          </div>
        </div>
      </div>
      <div className="signlang_imagelist-container">
        <h2 className="gradient__text">Зображення</h2>
        <div className="signlang_image-div">
        {currentImage ? (
  <>
    <img src={currentImage.url} alt={`img ${currentImage.id}`} /> 
    <div class="learn-buttons-wrapper">
    <button className="speak-button" onClick={speakImageName}>🔊 Озвучити</button>
    <button className="next-button" onClick={handleNextImage}>🔁 Наступний жест</button>
    </div>
  </>
) : (
  <h3 className="gradient__text">
    Натисність на кнопку "Старт", <br /> щоб практикуватися із зображеннями
  </h3>
)}
        </div>
        <div className="signlang_praise-message">
  <h3 className={`gradient__text ${praiseMessage ? 'visible' : 'hidden'}`}>
    {praiseMessage || " " }
  </h3>
</div>
      </div>

    </div>
  );
};

export default Learn;


