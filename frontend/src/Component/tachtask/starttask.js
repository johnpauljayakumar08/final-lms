// import React, { useState, useEffect, useRef } from "react";
// import { Link,useParams } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { FaAngleDown } from "react-icons/fa";
// function Chatbot() {
//     const { id } = useParams();
//     const [messages, setMessages] = useState([]);
//   const [messageInput, setMessageInput] = useState('');

//   useEffect(() => {
//     const interval = setInterval(checkTimeoutStatus, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const sendMessage = () => {
//     if (messageInput.trim() === '') return;

//     // Add user's message to chat
//     addMessageToChat(messageInput, 'user');

//     fetch('http://localhost:5000/api', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ message: messageInput })
//     })
//       .then(response => response.json())
//       .then(data => {
//         if (data.error) {
//           addMessageToChat(data.error, 'response');
//         } else {
//           addMessageToChat(data.response, 'response');

//           if (data.end) {
//             window.location.href = `/scoureview/${id}`;
//           }

//           playAudioResponse(data.audio_file);
//         }
//       })
//       .catch(error => {
//         console.error('Error:', error);
//         addMessageToChat('Error: Could not send message.', 'response');
//       });

//     setMessageInput(''); // Clear the input
//   };

//   const addMessageToChat = (message, messageType) => {
//     setMessages(prevMessages => [...prevMessages, { text: message, type: messageType }]);
//   };

//   const playAudioResponse = (audioUrl) => {
//     const audio = new Audio(audioUrl);
//     audio.play();
//   };

//   const checkTimeoutStatus = () => {
//     fetch('http://localhost:5000/check_timeout')
//       .then(response => response.json())
//       .then(data => {
//         if (data.end) {
//           window.location.href = '/end';
//         }
//       })
//       .catch(error => console.error('Error checking timeout status:', error));
//   };

//   const handleSpeechRecognition = () => {
//     if ('webkitSpeechRecognition' in window) {
//       const recognition = new window.webkitSpeechRecognition();
//       recognition.lang = 'en-US';
//       recognition.interimResults = false;
//       recognition.maxAlternatives = 1;

//       recognition.onstart = () => {
//         console.log('Voice recognition started. Speak into the microphone.');
//       };

//       recognition.onresult = (event) => {
//         const transcript = event.results[0][0].transcript;
//         console.log(`Transcribed text: ${transcript}`);
//         setMessageInput(transcript); // Set the recognized speech to the input field
//         addMessageToChat(transcript, 'user');
//         sendMessage();  // Automatically send the message
//       };

//       recognition.onerror = (event) => {
//         console.error('Speech recognition error: ', event.error);
//         addMessageToChat('Error recognizing speech.', 'response');
//       };

//       recognition.start();
//     } else {
//       alert("Speech Recognition is not supported in this browser. Try using Chrome.");
//     }
//   };

//     return (
//         <div className="container-fluid">
//         <div className="row mt-4">
//           <div className="col-2">
//             <p className="my-4 sidetext p-2">
//               <b>Tech Task</b>
//             </p>
//             <div className="card text-dark my-2 p-2 border-0 sideshadow">
//               <Link className="sidebartext">
//                 {/* <img src={sideicon1} className="mx-1" /> */}
//                 Task1-Selfintro
//               </Link>
              
//             </div>
//             <div className="card text-dark my-2 p-2 border-0 sideshadow">
//               <Link className="sidebartext">
//                 {/* <img src={sideicon2} className="mx-1" /> */}
//                 Task2-scenario Based 
//               </Link>
//             </div>
            
            
//           </div>
//           <div className="col-8">
//                 <div className="chat-container">
//             <h3 className="text-center">Chatbot Application with Speech-to-Text</h3>
//             <div className="chat-box">
//                 {messages.map((message, index) => (
//                 <div key={index} className={`message ${message.type}`}>
//                     {message.text}
//                 </div>
//                 ))}
//             </div>
//             <textarea
//                 className="form-control"
//                 value={messageInput}
//                 onChange={(e) => setMessageInput(e.target.value)}
//                 rows="3"
//                 placeholder="Type your message..."
//             ></textarea>
//             <button className="btn btn-primary" onClick={sendMessage}>Send</button>
//             <button className="btn btn-secondary" onClick={handleSpeechRecognition}>🎤 Speak</button>
//             </div>
//           </div>
//           <div className="col-2">
//             <div className="card d-flex justify-content-center">
//               {/* <ProgressBar
//                 now={now}
//                 label={`${now}%`}
//                 className="m-2 custom-progress-bar"
//               /> */}
//               {/* <div className="d-flex justify-content-around">
//                 <p>Overall Progress</p>
//                 <p>{now}%</p>
//               </div> */}
//             </div>
  
//             {/* <h5>Modules</h5>
//             <p>0/4 Completed</p>
//             <div className="d-flex">
//               <div className="orangecircle d-flex flex-column justify-content-center align-items-center">
//                 <p className="m-2 numberclr">3</p>
//               </div>
//               <div className="card px-2 mx-3 rightcards border-0">
//                 Who Suffers?{" "}
//                 <FontAwesomeIcon icon={FaAngleDown} className="text-dark" />{" "}
//               </div>
//             </div> */}
//           </div>
//         </div>
//       </div>
//     );
// }

// export default Chatbot;
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function Chatbot() {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    const interval = setInterval(checkTimeoutStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const newRecognition = new window.webkitSpeechRecognition();
      newRecognition.lang = 'en-US';
      newRecognition.interimResults = false;
      newRecognition.maxAlternatives = 1;

      newRecognition.onstart = () => {
        console.log('Voice recognition started.');
      };

      newRecognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log(`Transcribed text: ${transcript}`);
        setMessageInput(transcript); // Set the recognized speech to the input field
        addMessageToChat(transcript, 'user');
      };

      newRecognition.onerror = (event) => {
        console.error('Speech recognition error: ', event.error);
        addMessageToChat('Error recognizing speech.', 'response');
      };

      setRecognition(newRecognition);
    } else {
      alert("Speech Recognition is not supported in this browser. Try using Chrome.");
    }
  }, []);

  const sendMessage = () => {
    if (messageInput.trim() === '') return;

    // Add user's message to chat
    addMessageToChat(messageInput, 'user');

    fetch('http://127.0.0.1:5000/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: messageInput })
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          addMessageToChat(data.error, 'response');
        } else {
          addMessageToChat(data.response, 'response');

          if (data.end) {
            window.location.href = `/scoureview/${id}`;
          }

          playAudioResponse(data.audio_file);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        addMessageToChat('Error: Could not send message.', 'response');
      });

    setMessageInput(''); // Clear the input
  };

  const addMessageToChat = (message, messageType) => {
    setMessages(prevMessages => [...prevMessages, { text: message, type: messageType }]);
  };

  const playAudioResponse = (audioUrl) => {
    const audio = new Audio(audioUrl);
    audio.play();
  };

  const checkTimeoutStatus = () => {
    fetch('http://127.0.0.1:5000/check_timeout')
      .then(response => response.json())
      .then(data => {
        if (data.end) {
          window.location.href = '/end';
        }
      })
      .catch(error => console.error('Error checking timeout status:', error));
  };

  const startSpeechRecognition = () => {
    if (recognition) {
      recognition.start();
      setIsSpeaking(true); // Hide "Start Speak" button and show "Stop Speak"
    }
  };

  const stopSpeechRecognition = () => {
    if (recognition) {
      recognition.stop();
      setIsSpeaking(false); // Show "Start Speak" button again
      sendMessage(); // Automatically send the transcribed message after stopping
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
            <Link className="sidebartext">Task1-Selfintro</Link>
          </div>
          <div className="card text-dark my-2 p-2 border-0 sideshadow">
            <Link className="sidebartext">Task2-scenario Based</Link>
          </div>
        </div>
        <div className="col-8">
          <div className="chat-container">
            <h3 className="text-center">Chatbot Application with Speech-to-Text</h3>
            <div className="chat-box">
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.type}`}>
                  {message.text}
                </div>
              ))}
            </div>
            <textarea
              className="form-control"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              rows="3"
              placeholder="Type your message..."
            ></textarea>
            <button className="btn btn-primary" onClick={sendMessage}>
              Send
            </button>

            {/* Show "Start Speak" button when not speaking */}
            {!isSpeaking && (
              <button className="btn btn-secondary" onClick={startSpeechRecognition}>
                🎤 Start Speak
              </button>
            )}

            {/* Show "Stop Speak" button when speech recognition is active */}
            {isSpeaking && (
              <button className="btn btn-danger" onClick={stopSpeechRecognition}>
                🛑 Stop Speak
              </button>
            )}
          </div>
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );
}

export default Chatbot;

