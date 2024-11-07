import React, { useState, useEffect, useRef } from "react";
import { Link,useParams } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import "./mainpage.css";
import imgview from "../../Asset/imgview.jpg"
// import sideicon1 from "../../../Asset/listicon.png";
// import sideicon2 from "../../../Asset/videoicon.png";
// import sideicon3 from "../../../Asset/Vector.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaAngleDown } from "react-icons/fa";

function Scoureviewbutton() {
   
    const { id } = useParams();
   

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
          {/* <div className="timer-container float-end" id="timer">
                    Time Remaining: {formatTime(timeRemaining)}
                </div> */}
                <div className="card quizpart p-4 d-flex flex-column justify-content-center align-items-center mx-2">
                        <h4 className="text-center">
                          Your assessment were submitted.
                        </h4>
                        <Link to={`/viewScoure/${id}`}><button
                          className="p-2 scbtn btn btn-success"
                          
                        >
                          View Score
                        </button></Link>
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
        
         

          
          
          
      </div>
    </div>
  );
}

export default Scoureviewbutton;
