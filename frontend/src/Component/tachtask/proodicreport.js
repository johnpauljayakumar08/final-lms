import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const Prosodicreport = () => {
  const { id } = useParams();
  const [prosodicReport, setProsodicReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    completion_percentage: 0,
  }); 

  useEffect(() => {
    // Fetching prosodic report data
    fetch('http://localhost:5000/view_report')
      .then(response => response.json())
      .then(data => {
        setProsodicReport(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching prosodic report:', error);
        setLoading(false);
      });

    // Fetching grammar report data
    
      axios
      .get(`${process.env.REACT_APP_API_URL}user/user/${id}`)
      .then((res) => {
        const userData = res.data;
        setUser({
          first_name: userData.first_name.trim(),
          last_name: userData.last_name.trim(),
          // Default to "Student" if role is not provided
        });
      })
      .catch((err) => {
        console.log("Error fetching user data", err);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!prosodicReport) {
    return <div>No data available</div>;
  }

  // Calculate overall score by averaging prosodic and grammar scores
  

  // Function to determine color based on score
  const getColorForScore = (score) => {
    if (score >= 8) {
      return '#4CAF50'; // Green for high scores
    } else if (score >= 5) {
      return '#FFC107'; // Yellow for moderate scores
    } else {
      return '#F44336'; // Red for low scores
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Prosodic Report  <span style={{ color: "#DC3545" }}>
                      {user.first_name} {user.last_name}
                    </span></h1>

      {/* Overall Score */}
      <div className="text-center mb-4">
        </div>
      {/* Prosodic Report */}
      <h3>Prosodic Report</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th className='text-white'>Category</th>
            <th className='text-white'>Score</th>
          </tr>
        </thead>
        <tbody>
          {prosodicReport.Category.map((category, index) => (
            <tr key={index}>
              <td >{category}</td>
              <td>
                <div style={{ width: 100, height: 100 }}>
                  <CircularProgressbar
                    value={prosodicReport.Score[index] * 20} // Convert to percentage for 5-point scale
                    text={`${prosodicReport.Score[index]}/5`}
                    styles={buildStyles({
                      textSize: '16px',
                      pathColor: getColorForScore(prosodicReport.Score[index]),
                      textColor: '#000',
                      trailColor: '#d6d6d6',
                    })}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Grammar Report */}
      

      <div className="text-center mt-4">
        <a href={`/task1/${id}`} className="btn btn-primary">Next Task</a>
      </div>
    </div>
  );
};

export default Prosodicreport;
