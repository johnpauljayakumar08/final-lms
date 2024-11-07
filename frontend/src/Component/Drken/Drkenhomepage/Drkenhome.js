import React, { useState, useEffect } from 'react';
import "./Drkenhome.css";
import { Link, useLocation } from 'react-router-dom';
import Overview from '../Overview/Overview';
import Lessons from '../Lessons/Lessons';
import Instructors from '../Instructors/Instructors';
import icon1 from "../../../Asset/tabler_book1.png";
import icon3 from "../../../Asset/gravity-ui_person.png";
import icon2 from "../../../Asset/mingcute_time-line.png";
import HeroSection from '../../landing/banner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

function Drkenhome() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Set activeTab based on the current URL
    if (location.pathname.includes('mycourses')) {
      setActiveTab('lessons');
    } else if (location.pathname.includes('instructor')) {
      setActiveTab('Instructor');
    } else {
      setActiveTab('overview');
    }
  }, [location.pathname]);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview />;
      case 'Instructor':
        return <Instructors />;
      case 'lessons':
        return <Lessons />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className='container-fluid'>
      
        <HeroSection/>
        {/* <iframe
          src="https://player.vimeo.com/video/984701898"
          // src="https://drive.google.com/file/d/1iiNc0K6e4LaqTf-5Rpr0V7099XrSDsMs/view?usp=sharing"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title="Vimeo Video"
        ></iframe> */}
      
      <div className='m-5'>
        <h5 className='my-5 text-center' style={{ fontWeight: "600" }}>Introduction of FINCATP</h5>
      </div>
      <div className='row storypart mx-1'>
        <div className='d-flex justify-content-center align-items-center lessontext'>
          <div className='col text-center'>
            <p className='iconpara fw-bold'>
              <FontAwesomeIcon icon={faCalendar} className='mx-2'/>
              {/* <img src={icon1} className='mx-2' alt='18 Lessons' style={{ height: '24px' }} /> */}
              11 November 2024
            </p>
          </div>
          <div className='col text-center'>
            <p className='fw-bold pt-2 iconpara'>
              <img src={icon2} className='mx-2' alt='15 Hours' style={{ height: '24px' }} />
              1 month (7 days/ week)
            </p>
          </div>
          <div className='col text-center'>
            <p className='fw-bold pt-2 iconpara'>
              <img src={icon2} className='mx-2' alt='15 Hours' style={{ height: '24px' }} />
              100 Hours
            </p>
          </div>
        </div>

        <div className='row my-3'>
          <div className='col-2 mx-4'>
            <Link
              to="#"
              style={{ color: 'black', fontWeight: "500" ,textDecoration:"none"}}
              onClick={() => setActiveTab('overview')}
              className={activeTab === 'overview' ? 'active-link' : ''}
            >
              Overview
            </Link>
          </div>

          {/* <div className='col-2 mx-4 '>
            <Link
              to="#"
              style={{ color: 'black', fontWeight: "500",textDecoration:"none" }}
              onClick={() => setActiveTab('Instructor')}
              className={activeTab === 'Instructor' ? 'active-link' : ''}
            >
              About Instructor
            </Link>
          </div> */}
          <div className='col-2 mx-4'>
            <Link
              to="#"
              style={{ color: 'black', fontWeight: "500",textDecoration:"none"}}
              onClick={() => setActiveTab('lessons')}
              className={activeTab === 'lessons' ? 'active-link' : ''}
            >
              Lessons
            </Link>
          </div>
        </div>
        <hr />
        <div className='content-area'>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default Drkenhome;