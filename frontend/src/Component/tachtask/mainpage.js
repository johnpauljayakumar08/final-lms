import React, { useState, useEffect, useRef } from "react";
import { Link,useParams } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import "./mainpage.css";
// import sideicon1 from "../../../Asset/listicon.png";
// import sideicon2 from "../../../Asset/videoicon.png";
// import sideicon3 from "../../../Asset/Vector.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaAngleDown } from "react-icons/fa"; // Import useNavigate

function Mainpage() {
  const { id } = useParams();
  // const [recording, setRecording] = useState(false);
  // const [timeRemaining, setTimeRemaining] = useState(120); // 2 minutes in seconds
  // const [mediaRecorder, setMediaRecorder] = useState(null);
  // const [audioChunks, setAudioChunks] = useState([]);
  // const chatBoxRef = useRef(null);
  // const countdownInterval = useRef(null);
  // const navigate = useNavigate(); // Initialize useNavigate

  // useEffect(() => {
  //   const message = "Hello.. Tell me about yourself. You have 2 minutes.";
  //   addMessageToChat(message, 'response');
  //   playTextToSpeech(message);
  // }, []);

  // const addMessageToChat = (message, messageType) => {
  //   const chatBox = chatBoxRef.current;
  //   const messageContainer = document.createElement('div');
  //   messageContainer.classList.add('message', messageType);
  //   messageContainer.textContent = message;
  //   chatBox.appendChild(messageContainer);
  //   chatBox.scrollTop = chatBox.scrollHeight;
  // };

  // const playTextToSpeech = (text) => {
  //   const speech = new SpeechSynthesisUtterance(text);
  //   speech.lang = 'en-US';
  //   window.speechSynthesis.speak(speech);
  // };

  // const startRecording = async () => {
  //   try {
  //     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  //     const recorder = new MediaRecorder(stream);
  //     setMediaRecorder(recorder);
  //     recorder.start();
  //     setAudioChunks([]);

  //     recorder.ondataavailable = (event) => {
  //       setAudioChunks((prev) => [...prev, event.data]);
  //     };

  //     recorder.onstop = () => {
  //       const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
  //       sendAudioToServer(audioBlob);
  //     };

  //     setRecording(true);
  //     startCountdown();
  //   } catch (error) {
  //     alert('Microphone access is required for recording.');
  //   }
  // };

  // const stopRecording = () => {
  //   if (mediaRecorder) {
  //     mediaRecorder.stop();
  //     setRecording(false);
  //     clearInterval(countdownInterval.current);
  //     navigate(`/task1/${id}`);
  //   }
  // };

  // const sendAudioToServer = (audioBlob) => {
  //   const formData = new FormData();
  //   formData.append('audio', audioBlob, 'candidate_audio.wav');

  //   fetch('http://127.0.0.1:5000/save_audio', {
  //     method: 'POST',
  //     body: formData,
  //   })
  //     .then((response) => response.json())
  //     .then(() => {
  //       console.log('Audio uploaded successfully');
  //       navigate(`/task1/${id}`); // Redirect to next route after successful upload
  //     })
  //     .catch((error) => {
  //       console.error('Error uploading audio:', error);
  //     });
  // };

  // const startCountdown = () => {
  //   countdownInterval.current = setInterval(() => {
  //     setTimeRemaining((prev) => {
  //       if (prev <= 1) {
  //         clearInterval(countdownInterval.current);
  //         stopRecording();
  //         navigate(`/task1/${id}`);
  //         return 0;
  //       }
  //       return prev - 1;
  //     });
  //   }, 1000);
  // };
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(120);  // 2 minutes countdown
  const [recordedBlob, setRecordedBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const timerRef = useRef(null);
//   const videoRef = useRef(null);
//   useEffect(() => {
//     async function getMedia() {
//         try {
//             const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//             videoRef.current.srcObject = stream;
//         } catch (error) {
//             console.error("Error accessing media devices.", error);
//         }
//     }
//     getMedia();
// }, []);
  // Function to start recording
  const startRecording = async () => {
      try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          mediaRecorderRef.current = new MediaRecorder(stream);
          const audioChunks = [];

          mediaRecorderRef.current.ondataavailable = event => {
              audioChunks.push(event.data);
          };

          mediaRecorderRef.current.onstop = () => {
              const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
              setRecordedBlob(audioBlob);  // Save the recorded blob to the state
          };

          mediaRecorderRef.current.start();
          setIsRecording(true);
          startTimer();
      } catch (error) {
          console.error("Error accessing microphone:", error);
          alert('Error accessing microphone');
      }
  };

  // Function to stop recording
  const stopRecording = () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
          mediaRecorderRef.current.stop();
          setIsRecording(false);
          clearInterval(timerRef.current);  // Stop the countdown timer
      }
  };

  // Countdown timer logic
  const startTimer = () => {
      let timeLeft = 120; // 2 minutes countdown
      setRecordingTime(timeLeft);
      timerRef.current = setInterval(() => {
          timeLeft -= 1;
          setRecordingTime(timeLeft);
          if (timeLeft <= 0) {
              stopRecording();
              clearInterval(timerRef.current);
          }
      }, 1000);
  };

  // Function to handle the form submission to Flask backend
  const handleAudioSubmission = async () => {
    if (!recordedBlob) {
        console.error("No recording available to submit.");
        alert("No recording available to submit.");
        return;
    }

    console.log("Audio Blob available:", recordedBlob);

    const formData = new FormData();
    formData.append('audio', recordedBlob, 'candidate_audio.wav');

    try {
        console.log("Starting fetch request...");
        
        const response = await fetch('http://127.0.0.1:5000/save_audio', {
            method: 'POST',
            body: formData
        });

        console.log("Fetch completed, checking response...");

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error details:', errorData);
            throw new Error(errorData.error || 'Failed to generate report');
            window.location.href=`/task1/${id}`

        }

        const result = await response.json();
        console.log('Prosodic Report:', result.prosodic_report);
        alert('Self-intro task is completed moving to Report');
        window.location.href=`/task1/${id}`

    } catch (error) {
        console.error('Error generating report:', error);
        alert('Self-intro task is completed moving to Report');
        window.location.href=`/task1/${id}`

    }
};

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
              Task1-Selfintro
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
        <div className="container">
            <h3 className="text-center">Self-Into Task</h3>
            {/* <div className="chat-box">
                <p>Hello.. Tell me about yourself. You have 2 minutes.</p>
            </div> */}
            {/* <div className="live-video-chat">
            <video ref={videoRef} autoPlay playsInline style={{ width: '100%', height: '200' }} />
        </div> */}

            {/* Timer */}
            <div className="timer-container">
                <p>Time Remaining: {Math.floor(recordingTime / 60)}:{recordingTime % 60 < 10 ? `0${recordingTime % 60}` : recordingTime % 60}</p>
            </div>

            {/* Start/Stop buttons */}
            <div className="button-container">
                {isRecording ? (
                    <button className="btn btn-danger btn-block" onClick={stopRecording}>🛑 Stop Recording</button>
                ) : (
                    <button className="btn btn-secondary btn-block" onClick={startRecording}>🎤 Start Recording</button>
                )}
                {recordedBlob && (
                   <button className="btn btn-primary btn-block ms-5" onClick={handleAudioSubmission}>Submit Audio</button>
                // <button className="btn btn-primary btn-block mt-3 ms-5 p-5" onClick={handleAudioSubmission}>Submit Audio</button>
            )}
            </div>

            {/* Submit button */}
            
        </div>
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

export default Mainpage;

