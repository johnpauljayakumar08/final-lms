import React, { useState, useEffect, useRef } from "react";
import { Link,useParams } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import "./mainpage.css";
// import sideicon1 from "../../../Asset/listicon.png";
// import sideicon2 from "../../../Asset/videoicon.png";
// import sideicon3 from "../../../Asset/Vector.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaAngleDown } from "react-icons/fa";

function Taskone() {
    // const [mediaRecorder, setMediaRecorder] = useState(null);
    // const [audioChunks, setAudioChunks] = useState([]);
    // const [timeRemaining, setTimeRemaining] = useState(120);
    // const chatBoxRef = useRef(null);
    // const [isRecording, setIsRecording] = useState(false);
    const { id } = useParams();
    // useEffect(() => {
    //   // Display the initial prompt and speak it out
    //   const message = "Hello.. Tell me about yourself. You have 2 minutes.";
    //   addMessageToChat(message, "response");
    //   playTextToSpeech(message);
    // }, []);
  
    // useEffect(() => {
    //   let countdownTimer;
    //   if (isRecording && timeRemaining > 0) {
    //     countdownTimer = setInterval(() => {
    //       setTimeRemaining((prevTime) => prevTime - 1);
    //     }, 1000);
    //   } else if (timeRemaining === 0) {
    //     stopRecording();
    //     navigateTo(`/task1/${id}`);
    //   }
    //   return () => clearInterval(countdownTimer);
    // }, [isRecording, timeRemaining]);
  
    // const addMessageToChat = (message, messageType) => {
    //   const chatBox = chatBoxRef.current;
    //   const messageContainer = document.createElement("div");
    //   messageContainer.classList.add("message", messageType);
    //   messageContainer.textContent = message;
    //   chatBox.appendChild(messageContainer);
    //   chatBox.scrollTop = chatBox.scrollHeight;
    // };
  
    // const playTextToSpeech = (text) => {
    //   const speech = new SpeechSynthesisUtterance(text);
    //   speech.lang = "en-US";
    //   window.speechSynthesis.speak(speech);
    // };
  
    // const startRecording = async () => {
    //   try {
    //     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    //     const recorder = new MediaRecorder(stream);
    //     setMediaRecorder(recorder);
    //     setAudioChunks([]);
  
    //     setIsRecording(true);
  
    //     recorder.ondataavailable = (event) => {
    //       setAudioChunks((prev) => [...prev, event.data]);
    //     };
  
    //     recorder.onstop = () => {
    //       const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
    //       sendAudioToServer(audioBlob);
    //     };
  
    //     recorder.start();
    //   } catch (error) {
    //     console.error("Error accessing the microphone:", error);
    //     alert("Microphone access is required for recording.");
    //   }
    // };
  
    // const stopRecording = () => {
    //   if (mediaRecorder && mediaRecorder.state !== "inactive") {
    //     mediaRecorder.stop();
    //     setIsRecording(false);
    //   }
    // };
  
    // const sendAudioToServer = (audioBlob) => {
    //   const formData = new FormData();
    //   formData.append("audio", audioBlob, "candidate_audio.wav");
  
    //   fetch("/save_audio", {
    //     method: "POST",
    //     body: formData,
    //   })
    //     .then((response) => response.json())
    //     .then(() => {
    //       console.log("Audio uploaded successfully");
    //     })
    //     .catch((error) => {
    //       console.error("Error uploading audio:", error);
    //     });
    // };
  
    // const navigateTo = (path) => {
    //   window.location.href = path;
    // };
  
    // const formatTime = (time) => {
    //   const minutes = Math.floor(time / 60);
    //   const seconds = time % 60;
    //   return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    // };
    const [timeLeft, setTimeLeft] = useState(120); // 2 minutes countdown
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  
    // Effect to handle the countdown timer
    // useEffect(() => {
    //   if (timeLeft > 0) {
    //     const timer = setTimeout(() => {
    //       setTimeLeft(timeLeft - 1);
    //     }, 1000);
    //     return () => clearTimeout(timer); // Cleanup timeout
    //   } else {
    //     setIsButtonDisabled(false); // Enable the button after 2 minutes
    //   }
    // }, [timeLeft]);
  
    // Function to display the timer in MM:SS format
    // const formatTime = (seconds) => {
    //   const minutes = Math.floor(seconds / 60);
    //   const remainingSeconds = seconds % 60;
    //   return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    // };

  return (
    <div className="container-fluid">
      <div className="row mt-4">
        <div className="col-2">
          <p className="my-4 sidetext p-2">
            <b>Tech Task</b>
          </p>
          <div className="card text-dark my-2 p-2 border-0 sideshadow">
            <Link className="sidebartext">
              {/* <img src={sideicon1} className="mx-1" /> */}
              Task1-Self-Intro
            </Link>
            
          </div>
          <div className="card text-dark my-2 p-2 border-0 sideshadow">
            <Link className="sidebartext">
              {/* <img src={sideicon2} className="mx-1" /> */}
              Task2-scenario Based
            </Link>
          </div>
          
          
        </div>
        <div className="col-8">
          {/* <div className="timer-container float-end" id="timer">
                    Time Remaining: {formatTime(timeRemaining)}
                </div> */}
                <div className="container">
      <h4>Next Question:</h4>
      <p className="question">
        Hi, Learner today you’ll pitch the personal loan for the customer
        “Raj” through a telephone conversation. The details of the personal loan
        from XYZ Bank are as follows:
      </p>
      <div className="section-title">Product:</div>
      <ul>
        <li>Loan type: Personal loan</li>
        <li>Maximum limit: Rs. 5,00,000</li>
        <li>Interest rate: 12% - 10%</li>
      </ul>
      <div className="section-title">Customer details:</div>
      <ul>
        <li>Age: 28</li>
        <li>CIBIL score: 890</li>
        <li>Type of customer: Self-employed</li>
        <li>Income per month: Rs. 30,000</li>
        <li>Existing loan: NO</li>
      </ul>

      {/* Display countdown timer */}
      {/* {isButtonDisabled && (
        <div className="timer">
          Please wait for {formatTime(timeLeft)} before starting the interview.
        </div>
      )} */}

      {/* Start Interview button (disabled until the timer reaches 0) */}
      <Link
        to={`/starttask/${id}`}
        className="btn btn-success"
        
      >
        Start Interview
      </Link>
    </div>
          {/* <div className="card quizpart p-2">
            <h4 className="sidetext">QUIZ :</h4>
            {questionData ? (
              <p>1. {questionData.question}</p>
            ) : (
              <p>Loading question...</p>
            )}
          </div>
          <div className="d-flex justify-content-between mt-3">
            <button className="rounded-2">
              <b>Previous</b>
            </button>
            <button className="rounded-2">
              <b>Next</b>
            </button>
          </div> */}
        </div>
        <div className="col-2">
          <div className="card d-flex justify-content-center">
            {/* <ProgressBar
              now={now}
              label={`${now}%`}
              className="m-2 custom-progress-bar"
            /> */}
            {/* <div className="d-flex justify-content-around">
              <p>Overall Progress</p>
              <p>{now}%</p>
            </div> */}
          </div>

          {/* <h5>Modules</h5>
          <p>0/4 Completed</p>
          <div className="d-flex">
            <div className="orangecircle d-flex flex-column justify-content-center align-items-center">
              <p className="m-2 numberclr">3</p>
            </div>
            <div className="card px-2 mx-3 rightcards border-0">
              Who Suffers?{" "}
              <FontAwesomeIcon icon={FaAngleDown} className="text-dark" />{" "}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Taskone;
