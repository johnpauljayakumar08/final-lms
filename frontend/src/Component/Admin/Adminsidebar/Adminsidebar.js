// import React from 'react';
// import { motion } from 'framer-motion';
// import './Adminsidebar.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHome, faUser,faBars,faFile,faPowerOff,faLaptopFile } from '@fortawesome/free-solid-svg-icons';
// import { Link } from 'react-router-dom';

// const sidebarVariants = {
//   open: { width: '200px' },
//   closed: { width: '50px' },
// };

// const linkVariants = {
//   open: { opacity: 1, display: 'block' },
//   closed: { opacity: 0, display: 'none' },
// };

// function Adminsidebar() {
//   const [isOpen, setIsOpen] = React.useState(false);

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <motion.div
//       className="sidebar"
//       initial={false}
//       animate={isOpen ? 'open' : 'closed'}
//       variants={sidebarVariants}>
//       <div className="toggle-btn" onClick={toggleSidebar}>
//         <FontAwesomeIcon icon={faBars} />
//       </div>
//       <ul>
//         <li>
//             <Link to={""}><FontAwesomeIcon icon={faHome} className='mx-1 text-light'/></Link>
//             <motion.span variants={linkVariants}>Home</motion.span>
//         </li>
//         <li>
//             <Link to="/"> <FontAwesomeIcon icon={faLaptopFile} className='mx-1 text-light'/></Link>
//             <motion.span variants={linkVariants} to={"/"}>Courses</motion.span>
//         </li>
//         <li>
//             <Link to="/"> <FontAwesomeIcon icon={faFile} className='mx-1 text-light'/></Link>
//             <motion.span variants={linkVariants} to={"/"}>Add Courses</motion.span>
//         </li>
//         <li>
//             <Link to=""><FontAwesomeIcon icon={faUser} className='mx-1 text-light'/></Link>
//             <motion.span variants={linkVariants} to={"/"}>Participants</motion.span>
//         </li>
//         <li>
//             <Link to="/"><FontAwesomeIcon icon={faPowerOff} className='mx-1 text-light'/></Link>
//             <motion.span variants={linkVariants} to={"/"}>Logout</motion.span>
//         </li>
//       </ul>
//     </motion.div>
//   );
// }

// export default Adminsidebar;

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import "./Adminsidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faBars,
  faFile,
  faPowerOff,
  faFileLines,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const sidebarVariants = {
  open: { width: "200px" },
  closed: { width: "50px" },
};

const linkVariants = {
  open: { opacity: 1, display: "inline-block" },
  closed: { opacity: 0, display: "none" },
};

function Adminsidebar({ isOpen, toggleSidebar }) {
  // const [isOpen, setIsOpen] = React.useState(false);

  const { id } = useParams();
  // console.log("adminside", id);
  // const toggleSidebar = () => {
  //   setIsOpen(!isOpen);
  // };

  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}auth/protected`,
          {
            withCredentials: true,
          }
        );
        console.log("Token is valid:", response.data);
      } catch (error) {
        console.error("Token verification error:", error);
        navigate("/login");
      }
    };

    verifyToken();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}auth/logout`,
        {},
        { withCredentials: true }
      );
      document.cookie =
        "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <motion.div
      className="sidebar"
      initial={false}
      animate={isOpen ? "open" : "closed"}
      variants={sidebarVariants}
    >
      <div className="toggle-btn" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <ul>
        <li>
          <Link to={`/admindashboard/${id}/coursedetail`}>
            <FontAwesomeIcon icon={faHome} className="mx-1 text-light " />
            <motion.span
              variants={linkVariants}
              className="text-white text-decoration-none "
            >
              Home
            </motion.span>
          </Link>
        </li>
        <li>
          <Link to={`/admindashboard/${id}/admincredential`}>
            <FontAwesomeIcon icon={faUser} className="mx-1 text-light" />
            <motion.span
              variants={linkVariants}
              className="text-white text-decoration-none ms-1"
            >
              User Registration
            </motion.span>
          </Link>
        </li>
        <li>
          <Link to={`/admindashboard/${id}/category`}>
            <FontAwesomeIcon icon={faLayerGroup} className="mx-1 text-light" />
            <motion.span
              variants={linkVariants}
              className="text-white text-decoration-none ms-1"
            >
              Add Category
            </motion.span>
          </Link>
        </li>
        <li>
          <Link to={`/admindashboard/${id}/coursedetail`}>
            <FontAwesomeIcon icon={faFileLines} className="mx-1 text-light" />
            <motion.span
              variants={linkVariants}
              className="text-white text-decoration-none ms-1"
            >
              Courses
            </motion.span>
          </Link>
        </li>
        <li>
          <Link to={`/admindashboard/${id}/courseupdate`}>
            <FontAwesomeIcon icon={faFile} className="mx-1 text-light" />
            <motion.span
              variants={linkVariants}
              className="text-white text-decoration-none ms-1"
            >
              Add Courses
            </motion.span>
          </Link>
        </li>
        <li>
          <Link onClick={handleLogout}>
            <FontAwesomeIcon icon={faPowerOff} className="mx-1 text-light" />
            <motion.span
              variants={linkVariants}
              className="text-white text-decoration-none ms-1"
            >
              Logout
            </motion.span>
          </Link>
        </li>
      </ul>
    </motion.div>
  );
}

export default Adminsidebar;
