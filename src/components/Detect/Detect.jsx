// import React, { useState, useRef, useEffect, useCallback } from "react";
// import "./Detect.css";
// import { v4 as uuidv4 } from "uuid";
// import { FilesetResolver, GestureRecognizer } from "@mediapipe/tasks-vision";
// import {
//   drawConnectors,
//   drawLandmarks,
//   // HAND_CONNECTIONS,
// } from "@mediapipe/drawing_utils";

// import { HAND_CONNECTIONS } from "@mediapipe/hands";

// import Webcam from "react-webcam";
// import { SignImageData } from "../../data/SignImageData";
// import { useDispatch, useSelector } from "react-redux";
// import { addSignData } from "../../redux/actions/signdataaction";
// import ProgressBar from "./ProgressBar/ProgressBar";

// import DisplayImg from "../../assests/displayGif.gif";

// let startTime = "";

// const Detect = () => {
//   const webcamRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [webcamRunning, setWebcamRunning] = useState(false);
//   const [gestureOutput, setGestureOutput] = useState("");
//   const [gestureRecognizer, setGestureRecognizer] = useState(null);
//   const [runningMode, setRunningMode] = useState("IMAGE");
//   const [progress, setProgress] = useState(0);

//   const requestRef = useRef();

//   const [detectedData, setDetectedData] = useState([]);

//   const user = useSelector((state) => state.auth?.user);

//   const { accessToken } = useSelector((state) => state.auth);

//   const dispatch = useDispatch();

//   const [currentImage, setCurrentImage] = useState(null);

//   useEffect(() => {
//     let intervalId;
//     if (webcamRunning) {
//       intervalId = setInterval(() => {
//         const randomIndex = Math.floor(Math.random() * SignImageData.length);
//         const randomImage = SignImageData[randomIndex];
//         setCurrentImage(randomImage);
//       }, 5000);
//     }
//     return () => clearInterval(intervalId);
//   }, [webcamRunning]);

//   if (
//     process.env.NODE_ENV === "development" ||
//     process.env.NODE_ENV === "production"
//   ) {
//     console.log = function () {};
//   }

//   const predictWebcam = useCallback(() => {
//     if (runningMode === "IMAGE") {
//       setRunningMode("VIDEO");
//       gestureRecognizer.setOptions({ runningMode: "VIDEO" });
//     }

//     let nowInMs = Date.now();
//     const results = gestureRecognizer.recognizeForVideo(
//       webcamRef.current.video,
//       nowInMs
//     );

//     const canvasCtx = canvasRef.current.getContext("2d");
//     canvasCtx.save();
//     canvasCtx.clearRect(
//       0,
//       0,
//       canvasRef.current.width,
//       canvasRef.current.height
//     );

//     const videoWidth = webcamRef.current.video.videoWidth;
//     const videoHeight = webcamRef.current.video.videoHeight;

//     // Set video width
//     webcamRef.current.video.width = videoWidth;
//     webcamRef.current.video.height = videoHeight;

//     // Set canvas height and width
//     canvasRef.current.width = videoWidth;
//     canvasRef.current.height = videoHeight;

//     // Draw the results on the canvas, if any.
//     if (results.landmarks) {
//       for (const landmarks of results.landmarks) {
//         drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
//           color: "#00FF00",
//           lineWidth: 5,
//         });

//         drawLandmarks(canvasCtx, landmarks, { color: "#FF0000", lineWidth: 2 });
//       }
//     }
//     if (results.gestures.length > 0) {
//       setDetectedData((prevData) => [
//         ...prevData,
//         {
//           SignDetected: results.gestures[0][0].categoryName,
//         },
//       ]);

//       setGestureOutput(results.gestures[0][0].categoryName);
//       setProgress(Math.round(parseFloat(results.gestures[0][0].score) * 100));
//     } else {
//       setGestureOutput("");
//       setProgress("");
//     }

//     if (webcamRunning === true) {
//       requestRef.current = requestAnimationFrame(predictWebcam);
//     }
//   }, [webcamRunning, runningMode, gestureRecognizer, setGestureOutput]);

//   const animate = useCallback(() => {
//     requestRef.current = requestAnimationFrame(animate);
//     predictWebcam();
//   }, [predictWebcam]);

//   const enableCam = useCallback(() => {
//     if (!gestureRecognizer) {
//       alert("Please wait for gestureRecognizer to load");
//       return;
//     }

//     if (webcamRunning === true) {
//       setWebcamRunning(false);
//       cancelAnimationFrame(requestRef.current);
//       setCurrentImage(null);

//       const endTime = new Date();

//       const timeElapsed = (
//         (endTime.getTime() - startTime.getTime()) /
//         1000
//       ).toFixed(2);

//       // Remove empty values
//       const nonEmptyData = detectedData.filter(
//         (data) => data.SignDetected !== "" && data.DetectedScore !== ""
//       );

//       //to filter continous same signs in an array
//       const resultArray = [];
//       let current = nonEmptyData[0];

//       for (let i = 1; i < nonEmptyData.length; i++) {
//         if (nonEmptyData[i].SignDetected !== current.SignDetected) {
//           resultArray.push(current);
//           current = nonEmptyData[i];
//         }
//       }

//       resultArray.push(current);

//       //calculate count for each repeated sign
//       const countMap = new Map();

//       for (const item of resultArray) {
//         const count = countMap.get(item.SignDetected) || 0;
//         countMap.set(item.SignDetected, count + 1);
//       }

//       const sortedArray = Array.from(countMap.entries()).sort(
//         (a, b) => b[1] - a[1]
//       );

//       const outputArray = sortedArray
//         .slice(0, 5)
//         .map(([sign, count]) => ({ SignDetected: sign, count }));

//       // object to send to action creator
//       const data = {
//         signsPerformed: outputArray,
//         id: uuidv4(),
//         username: user?.name,
//         userId: user?.userId,
//         createdAt: String(endTime),
//         secondsSpent: Number(timeElapsed),
//       };

//       dispatch(addSignData(data));
//       setDetectedData([]);
//     } else {
//       setWebcamRunning(true);
//       startTime = new Date();
//       requestRef.current = requestAnimationFrame(animate);
//     }
//   }, [
//     webcamRunning,
//     gestureRecognizer,
//     animate,
//     detectedData,
//     user?.name,
//     user?.userId,
//     dispatch,
//   ]);

//   useEffect(() => {
//     async function loadGestureRecognizer() {
//       const vision = await FilesetResolver.forVisionTasks(
//         "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
//       );
//       const recognizer = await GestureRecognizer.createFromOptions(vision, {
//         baseOptions: {
//           modelAssetPath:
//             process.env.REACT_APP_FIREBASE_STORAGE_TRAINED_MODEL_25_04_2023,
//         },
//         numHands: 2,
//         runningMode: runningMode,
//       });
//       setGestureRecognizer(recognizer);
//     }
//     loadGestureRecognizer();
//   }, [runningMode]);

//   return (
//     <>
//       <div className="signlang_detection-container">
//         {accessToken ? (
//           <>
//             <div style={{ position: "relative" }}>
//               <Webcam
//                 audio={false}
//                 ref={webcamRef}
//                 // screenshotFormat="image/jpeg"
//                 className="signlang_webcam"
//               />

//               <canvas ref={canvasRef} className="signlang_canvas" />

//               <div className="signlang_data-container">
//                 <button onClick={enableCam}>
//                   {webcamRunning ? "Stop" : "Start"}
//                 </button>

//                 <div className="signlang_data">
//                   <p className="gesture_output">{gestureOutput}</p>

//                   {progress ? <ProgressBar progress={progress} /> : null}
//                 </div>
//               </div>
//             </div>

//             <div className="signlang_imagelist-container">
//               <h2 className="gradient__text">Image</h2>

//               <div className="signlang_image-div">
//                 {currentImage ? (
//                   <img src={currentImage.url} alt={`img ${currentImage.id}`} />
//                 ) : (
//                   <h3 className="gradient__text">
//                     Click on the Start Button <br /> to practice with Images
//                   </h3>
//                 )}
//               </div>
//             </div>
//           </>
//         ) : 
//         (
//           <div className="signlang_detection_notLoggedIn">

//              <h1 className="gradient__text">Please Login !</h1>
//              <img src={DisplayImg} alt="diplay-img"/>
//              <p>
//               We Save Your Detection Data to show your progress and learning in dashboard, So please Login to Test this Detection Feature.
//              </p>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Detect;

import React, { useState, useRef, useEffect, useCallback } from "react";
import "./Detect.css";
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

const Detect = () => {
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
    let intervalId;
    if (webcamRunning) {
      intervalId = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * SignImageData.length);
        const randomImage = SignImageData[randomIndex];
        setCurrentImage(randomImage);
      }, 2000);
    }
    return () => clearInterval(intervalId);
  }, [webcamRunning]);

  useEffect(() => {
    if (!webcamRunning) return;

    const interval = setInterval(() => {
      if (latestGesture && latestGesture !== lastAddedGesture) {
        setWord((prevWord) => prevWord + latestGesture);
        setGestureOutput(latestGesture);
        setLastAddedGesture(latestGesture);
      }
    }, 1900);

    return () => clearInterval(interval);
  }, [webcamRunning, latestGesture, lastAddedGesture]);

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
      setWebcamRunning(false);
      cancelAnimationFrame(requestRef.current);
      const endTime = new Date();
      const timeElapsed = (
        (endTime.getTime() - startTime.getTime()) / 1000
      ).toFixed(2);

      const nonEmptyData = detectedData.filter(
        (data) => data.SignDetected !== "" && data.DetectedScore !== ""
      );

      const resultArray = [];
      let current = nonEmptyData[0];

      for (let i = 1; i < nonEmptyData.length; i++) {
        if (nonEmptyData[i].SignDetected !== current.SignDetected) {
          resultArray.push(current);
          current = nonEmptyData[i];
        }
      }

      resultArray.push(current);

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

    } else {
      setWebcamRunning(true);
      startTime = new Date();
      requestRef.current = requestAnimationFrame(animate);
    }
  }, [webcamRunning, gestureRecognizer, animate, detectedData]);

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
    <div className="signlang_detection-container">
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
            <div className="progress-bar-wrapper bar-wrapper">
                <ProgressBar progress={progress || 0} />
            </div>
          </div>
        </div>
      </div>

      <div className="signlang_word-display-wrapper">
        <div className="signlang_word-display">
          <h3>Зчитане слово:</h3>
          <textarea
            value={word}
            onChange={(e) => setWord(e.target.value)}
            className="detected_word-input"
            rows={1}
            style={{ resize: "none" }}
          />
        </div>

        <div className="signlang_data-container buttons-wrapper">
          <button onClick={() => setWord((prev) => prev + " ")}>Додати пробіл</button>
          <button onClick={() => setWord("")}>Очистити</button>
          <button onClick={speakText}>🔊 Озвучити</button>
        </div>
      </div>
    </div>
  );
};

export default Detect;


// import React, { useState, useRef, useEffect, useCallback } from "react";
// import "./Detect.css";
// import { v4 as uuidv4 } from "uuid";
// import * as tf from "@tensorflow/tfjs";
// import Webcam from "react-webcam";
// import { SignImageData } from "../../data/SignImageData";
// import { useDispatch, useSelector } from "react-redux";
// import { addSignData } from "../../redux/actions/signdataaction";
// import ProgressBar from "./ProgressBar/ProgressBar";
// import DisplayImg from "../../assests/displayGif.gif";

// let startTime = "";

// const Detect = () => {
//   const webcamRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [webcamRunning, setWebcamRunning] = useState(false);
//   const [gestureOutput, setGestureOutput] = useState("");
//   const [model, setModel] = useState(null);
//   const [progress, setProgress] = useState(0);
//   const requestRef = useRef();
//   const [detectedData, setDetectedData] = useState([]);
//   const user = useSelector((state) => state.auth?.user);
//   const dispatch = useDispatch();
//   const [currentImage, setCurrentImage] = useState(null);

//   // Preprocessing function for the input image
//   const preprocessImage = (image) => {
//     // Assuming model expects 224x224 RGB images
//     const tensor = tf.browser.fromPixels(image)
//       .resizeNearestNeighbor([224, 224])
//       .toFloat()
//       .div(tf.scalar(255.0))
//       .expandDims();
//     return tensor;
//   };

//   useEffect(() => {
//     async function loadModel() {
//       console.log("Loading model from:", process.env.REACT_APP_MODEL_PATH);
//       try {
//         const modelPath = process.env.REACT_APP_MODEL_PATH || "http://localhost:3000/models/dynamic_gesture_model.h5";
//         const loadedModel = await tf.loadLayersModel(modelPath);
//         setModel(loadedModel);
//         console.log("Model loaded successfully!");
//       } catch (error) {
//         console.error("Error loading model:", error);
//       }
//     }
//     loadModel();
//   }, []);

//   const predictWebcam = useCallback(async () => {
//     if (!model || !webcamRef.current) return;

//     const video = webcamRef.current.video;
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;

//     // Draw video frame to canvas
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//     // Preprocess the image and make prediction
//     const tensor = preprocessImage(video);
//     const prediction = await model.predict(tensor);
//     const scores = await prediction.data();
    
//     // Assuming the model outputs an array of probabilities
//     const maxScore = Math.max(...scores);
//     const maxIndex = scores.indexOf(maxScore);
    
//     // You need to define your own class names array matching your model's training
//     const classNames = ["class1", "class2", "class3"]; // Replace with your actual sign classes
    
//     if (maxScore > 0.7) { // Threshold can be adjusted
//       const detectedSign = classNames[maxIndex];
//       setDetectedData((prevData) => [
//         ...prevData,
//         { SignDetected: detectedSign },
//       ]);
//       setGestureOutput(detectedSign);
//       setProgress(Math.round(maxScore * 100));
//     } else {
//       setGestureOutput("");
//       setProgress("");
//     }

//     tensor.dispose();
//     prediction.dispose();

//     if (webcamRunning) {
//       requestRef.current = requestAnimationFrame(predictWebcam);
//     }
//   }, [webcamRunning, model]);

//   const animate = useCallback(() => {
//     requestRef.current = requestAnimationFrame(predictWebcam);
//   }, [predictWebcam]);

//   const enableCam = useCallback(() => {
//     if (!model) {
//       alert("Please wait for model to load");
//       return;
//     }

//     if (webcamRunning) {
//       setWebcamRunning(false);
//       cancelAnimationFrame(requestRef.current);
//       setCurrentImage(null);

//       const endTime = new Date();
//       const timeElapsed = ((endTime.getTime() - startTime.getTime()) / 1000).toFixed(2);

//       const nonEmptyData = detectedData.filter(
//         (data) => data.SignDetected !== ""
//       );

//       const resultArray = [];
//       let current = nonEmptyData[0];
//       for (let i = 1; i < nonEmptyData.length; i++) {
//         if (nonEmptyData[i].SignDetected !== current.SignDetected) {
//           resultArray.push(current);
//           current = nonEmptyData[i];
//         }
//       }
//       resultArray.push(current);

//       const countMap = new Map();
//       for (const item of resultArray) {
//         const count = countMap.get(item.SignDetected) || 0;
//         countMap.set(item.SignDetected, count + 1);
//       }

//       const sortedArray = Array.from(countMap.entries()).sort(
//         (a, b) => b[1] - a[1]
//       );

//       const outputArray = sortedArray
//         .slice(0, 5)
//         .map(([sign, count]) => ({ SignDetected: sign, count }));

//       const data = {
//         signsPerformed: outputArray,
//         id: uuidv4(),
//         username: user?.name,
//         userId: user?.userId,
//         createdAt: String(endTime),
//         secondsSpent: Number(timeElapsed),
//       };

//       dispatch(addSignData(data));
//       setDetectedData([]);
//     } else {
//       setWebcamRunning(true);
//       startTime = new Date();
//       requestRef.current = requestAnimationFrame(animate);
//     }
//   }, [webcamRunning, model, animate, detectedData, user?.name, user?.userId, dispatch]);

//   useEffect(() => {
//     async function loadModel() {
//       console.log("Loading model...");
//       try {
//         const loadedModel = await tf.loadLayersModel(
//           process.env.REACT_APP_MODEL_PATH // Should point to your .h5 model file
//         );
//         setModel(loadedModel);
//         console.log("Model loaded successfully!");
//       } catch (error) {
//         console.error("Error loading model:", error);
//       }
//     }
//     loadModel();
//   }, []);

//   return (
//     <div className="signlang_detection-container">
//       <div style={{ position: "relative" }}>
//         <Webcam
//           audio={false}
//           ref={webcamRef}
//           className="signlang_webcam"
//         />
//         <canvas ref={canvasRef} className="signlang_canvas" />
//         <div className="signlang_data-container">
//           <button onClick={enableCam}>
//             {webcamRunning ? "Stop" : "Start"}
//           </button>
//           <div className="signlang_data">
//             <p className="gesture_output">{gestureOutput}</p>
//             {progress ? <ProgressBar progress={progress} /> : null}
//           </div>
//         </div>
//       </div>

//       <div className="signlang_imagelist-container">
//         <h2 className="gradient__text">Image</h2>
//         <div className="signlang_image-div">
//           {currentImage ? (
//             <img src={currentImage.url} alt={`img ${currentImage.id}`} />
//           ) : (
//             <h3 className="gradient__text">
//               Click on the Start Button <br /> to practice with Images
//             </h3>
//           )}
//         </div>
//       </div>

//       <div className="signlang_detection_notLoggedIn">
//         <h1 className="gradient__text">Please Login!</h1>
//         <img src={DisplayImg} alt="diplay-img" />
//         <p>
//           We save your detection data to show your progress and learning on the
//           dashboard. So please log in to test this detection feature.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Detect;