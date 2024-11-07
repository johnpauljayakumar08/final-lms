// // // import React, { useState, useEffect } from 'react';
// // // import 'bootstrap/dist/css/bootstrap.min.css';
// // // import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
// // // import 'react-circular-progressbar/dist/styles.css';
// // // import axios from 'axios';
// // // import { useParams } from 'react-router-dom';
// // // const Report = () => {
// // //   const { id } = useParams();
// // //   const [prosodicReport, setProsodicReport] = useState(null);
// // //   const [grammarReport, setGrammarReport] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [user, setUser] = useState({
// // //     first_name: "",
// // //     last_name: "",
// // //     completion_percentage: 0,
// // //   }); 

// // //   useEffect(() => {
// // //     // Fetching prosodic report data
// // //     fetch('http://127.0.0.1:5000/view_report')
// // //       .then(response => response.json())
// // //       .then(data => {
// // //         setProsodicReport(data);
// // //         setLoading(false);
// // //         console.log(prosodicReport)
// // //       })
// // //       .catch(error => {
// // //         console.error('Error fetching prosodic report:', error);
// // //         setLoading(false);
// // //       });

// // //     // Fetching grammar report data
// // //     fetch('http://127.0.0.1:5000/grammar_report')
// // //       .then(response => response.json())
// // //       .then(data => {
// // //         setGrammarReport(data);
// // //         setLoading(false);
// // //         console.log(grammarReport)
// // //       })
// // //       .catch(error => {
// // //         console.error('Error fetching grammar report:', error);
// // //         setLoading(false);
// // //       });
// // //       // axios
// // //       // .get(`${process.env.REACT_APP_API_URL}user/user/${id}`)
// // //       // .then((res) => {
// // //       //   const userData = res.data;
// // //       //   setUser({
// // //       //     first_name: userData.first_name.trim(),
// // //       //     last_name: userData.last_name.trim(),
// // //       //     // Default to "Student" if role is not provided
// // //       //   });
// // //       // })
// // //       // .catch((err) => {
// // //       //   console.log("Error fetching user data", err);
// // //       // });
// // //   }, []);

// // //   if (loading) {
// // //     return <div>Loading...</div>;
// // //   }

// // //   if (!prosodicReport || !grammarReport) {
// // //     return <div>No data available</div>;
// // //   }

// // //   // Calculate overall score by averaging prosodic and grammar scores
// // //   const totalProsodicScore = prosodicReport.Score.reduce((acc, score) => acc + score, 0);
// // //   const totalGrammarScore = grammarReport.Score.reduce((acc, score) => acc + score, 0);

// // //   const totalScore = (totalProsodicScore + totalGrammarScore) / 
// // //                       (prosodicReport.Score.length + grammarReport.Score.length);
// // //   const overallScorePercentage = (totalScore / 10) * 100; // Convert to percentage

// // //   // Function to determine color based on score
// // //   const getColorForScore = (score) => {
// // //     if (score >= 8) {
// // //       return '#4CAF50'; // Green for high scores
// // //     } else if (score >= 5) {
// // //       return '#FFC107'; // Yellow for moderate scores
// // //     } else {
// // //       return '#F44336'; // Red for low scores
// // //     }
// // //   };

// // //   return (
// // //     <div className="container mt-5">
// // //       <h1 className="text-center mb-4">Task Report  <span style={{ color: "#DC3545" }}>
// // //                       {user.first_name} {user.last_name}
// // //                     </span></h1>

// // //       {/* Overall Score */}
// // //       <div className="text-center mb-4">
// // //         <h2>Overall Score</h2>
// // //         <div style={{ width: 150, height: 150, margin: '0 auto' }}>
// // //           <CircularProgressbar
// // //             value={overallScorePercentage}
// // //             text={`${Math.round(overallScorePercentage)}%`}
// // //             styles={buildStyles({
// // //               textSize: '16px',
// // //               pathColor: getColorForScore(totalScore),
// // //               textColor: '#000',
// // //               trailColor: '#d6d6d6',
// // //             })}
// // //           />
// // //         </div>
// // //       </div>
// // //       <h3 className="mt-5">Grammar and Skills Report</h3>
// // //       <table className="table table-striped">
// // //         <thead>
// // //           <tr>
// // //             <th className='text-white'>Category</th>
// // //             <th className='text-white'>Score</th>
// // //           </tr>
// // //         </thead>
// // //         <tbody>
// // //           {grammarReport.Category.map((category, index) => (
// // //             <tr key={index}>
// // //               <td>{category}</td>
// // //               <td>
// // //                 <div style={{ width: 100, height: 100 }}>
// // //                   <CircularProgressbar
// // //                     value={grammarReport.Score[index] * 10} // Convert to percentage for 10-point scale
// // //                     text={`${grammarReport.Score[index]}/10`}
// // //                     styles={buildStyles({
// // //                       textSize: '16px',
// // //                       pathColor: getColorForScore(grammarReport.Score[index]),
// // //                       textColor: '#000',
// // //                       trailColor: '#d6d6d6',
// // //                     })}
// // //                   />
// // //                 </div>
// // //               </td>
// // //             </tr>
// // //           ))}
// // //         </tbody>
// // //       </table>
      
// // //       {/* Prosodic Report */}
// // //       <h3>Prosodic Report</h3>
// // //       <table className="table table-striped">
// // //         <thead>
// // //           <tr>
// // //             <th className='text-white'>Category</th>
// // //             <th className='text-white'>Score</th>
// // //           </tr>
// // //         </thead>
// // //         <tbody>
// // //           {prosodicReport.Category.map((category, index) => (
// // //             <tr key={index}>
// // //               <td >{category}</td>
// // //               <td>
// // //                 <div style={{ width: 100, height: 100 }}>
// // //                   <CircularProgressbar
// // //                     value={prosodicReport.Score[index] * 20} // Convert to percentage for 5-point scale
// // //                     text={`${prosodicReport.Score[index]}/5`}
// // //                     styles={buildStyles({
// // //                       textSize: '16px',
// // //                       pathColor: getColorForScore(prosodicReport.Score[index]),
// // //                       textColor: '#000',
// // //                       trailColor: '#d6d6d6',
// // //                     })}
// // //                   />
// // //                 </div>
// // //               </td>
// // //             </tr>
// // //           ))}
// // //         </tbody>
// // //       </table>

// // //       {/* Grammar Report */}
      

// // //       <div className="text-center mt-4">
// // //         <a href="/" className="btn btn-primary">Go to Homepage</a>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Report;

// // import React, { useState, useEffect } from 'react';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
// // import 'react-circular-progressbar/dist/styles.css';
// // import axios from 'axios';
// // import { useParams } from 'react-router-dom';

// // const Report = () => {
// //   const { id } = useParams();
// //   const [prosodicReport, setProsodicReport] = useState(null)
// //   const [grammarReport, setGrammarReport] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [user, setUser] = useState({
// //     first_name: "",
// //     last_name: "",
// //     completion_percentage: 0,
// //   }); 

// //   useEffect(() => {
// //     fetch('http://127.0.0.1:5000/view_report')
// //       .then(response => response.json())
// //       .then(data => {
// //         console.log(data);
// //         setProsodicReport(data)
// //         console.log(prosodicReport);
        
// //         setLoading(false);
// //       })
// //       .catch(error => {
// //         console.error('Error fetching prosodic report:', error);
// //         setLoading(false);
// //       });

// //     fetch('http://127.0.0.1:5000/grammar_report')
// //       .then(response => response.json())
// //       .then(data => {
// //         console.log(data);
// //         setGrammarReport(data)
// //         console.log(grammarReport);
// //         setLoading(false);
// //       })
// //       .catch(error => {
// //         console.error('Error fetching grammar report:', error);
// //         setLoading(false);
// //       });
// //   }, []);

// //   if (loading) {
// //     return <div>Loading...</div>;
// //   }

// //   if (!prosodicReport || !grammarReport) {
// //     return <div>No data available</div>;
// //   }

// //   // const totalProsodicScore = prosodicReport.Score.reduce((acc, score) => acc + score, 0);
// //   // const totalGrammarScore = grammarReport.Score.reduce((acc, score) => acc + score, 0);
// //   // const totalScore = (totalProsodicScore + totalGrammarScore) / 
// //   //                     (prosodicReport.Score.length + grammarReport.Score.length);
// //   // const overallScorePercentage = (totalScore / 10) * 100;

// //   const getColorForScore = (score) => {
// //     if (score >= 8) {
// //       return '#4CAF50';
// //     } else if (score >= 5) {
// //       return '#FFC107';
// //     } else {
// //       return '#F44336';
// //     }
// //   };

// //   return (
// //     <div className="container mt-5">
// //       <h1 className="text-center mb-4">Task Report  <span style={{ color: "#DC3545" }}>
// //                       {user.first_name} {user.last_name}
// //                     </span></h1>

// //       {/* <div className="text-center mb-4">
// //         <h2>Overall Score</h2>
// //         <div style={{ width: 150, height: 150, margin: '0 auto' }}>
// //           <CircularProgressbar
// //             value={overallScorePercentage}
// //             text={`${Math.round(overallScorePercentage)}%`}
// //             styles={buildStyles({
// //               textSize: '16px',
// //               pathColor: getColorForScore(totalScore),
// //               textColor: '#000',
// //               trailColor: '#d6d6d6',
// //             })}
// //           />
// //         </div>
// //       </div> */}

// //       <div className="row mt-5">
// //         <div className="col-md-6">
// //           <h3 className="text-center">Grammar Report</h3>
// //           <table className="table table-striped">
// //             <thead>
// //               <tr>
// //                 <th className='col-lg-6 text-white'>Category</th>
// //                 <th className='col-lg-6 text-white'>Score</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {grammarReport.Category.map((category, index) => (
// //                 <tr key={index}>
// //                   <td>{category}</td>
// //                   <td>
// //                     <div style={{ width: 80, height: 80 }}>
// //                       <CircularProgressbar
// //                         value={grammarReport.Score[index] * 10}
// //                         text={`${grammarReport.Score[index]}/10`}
// //                         styles={buildStyles({
// //                           textSize: '12px',
// //                           pathColor: getColorForScore(grammarReport.Score[index]),
// //                           textColor: '#000',
// //                           trailColor: '#d6d6d6',
                          
// //                         })}
                        
// //                       />
// //                     </div>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>

// //         <div className="col-md-6">
// //           <h3 className="text-center">Prosodic Report</h3>
// //           <table className="table table-striped">
// //             <thead>
// //               <tr>
// //                 <th className='col-lg-6 text-white'>Category</th>
// //                 <th className='col-lg-6 text-white'>Score</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {prosodicReport.Category.map((category, index) => (
// //                 <tr key={index}>
// //                   <td>{category}</td>
// //                   <td>
// //                     <div style={{ width: 80, height: 80 }}>
// //                       <CircularProgressbar
// //                         value={prosodicReport.Score[index] * 20}
// //                         text={`${prosodicReport.Score[index]}/5`}
// //                         styles={buildStyles({
// //                           textSize: '12px',
// //                           pathColor: getColorForScore(prosodicReport.Score[index]),
// //                           textColor: '#000',
// //                           trailColor: '#d6d6d6',
// //                         })}
// //                       />
// //                     </div>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>

// //       <div className="text-center mt-4">
// //         <a href="/" className="btn btn-primary">Go to Homepage</a>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Report;

// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';
// import { useParams } from 'react-router-dom';

// const Report = () => {
//   const { id } = useParams();
//   const [prosodicReport, setProsodicReport] = useState("");
//   const [grammarReport, setGrammarReport] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState({
//     first_name: "",
//     last_name: "",
//     completion_percentage: 0,
//   });

//   useEffect(() => {
//     // Fetch Prosodic Report
//     fetch('http://127.0.0.1:5000/view_report')
//       .then(response => response.json())
//       .then(data => {
//         setProsodicReport(data);
//         console.log("Prosodic Report:", data);
//       })
//       .catch(error => console.error('Error fetching prosodic report:', error));

//     // Fetch Grammar Report
//     fetch('http://127.0.0.1:5000/grammar_report')
//       .then(response => response.json())
//       .then(data => {
//         setGrammarReport(data);
//         console.log("Grammar Report:", data);
//       })
//       .catch(error => console.error('Error fetching grammar report:', error))
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!prosodicReport || !grammarReport) {
//     return <div>No data available</div>;
//   }

//   const getColorForScore = (score) => {
//     if (score >= 8) {
//       return '#4CAF50';
//     } else if (score >= 5) {
//       return '#FFC107';
//     } else {
//       return '#F44336';
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h1 className="text-center mb-4">Task Report <span style={{ color: "#DC3545" }}>{user.first_name} {user.last_name}</span></h1>

//       <div className="row mt-5">
//         {/* Grammar Report */}
//         <div className="col-md-6">
//           <h3 className="text-center">Grammar Report</h3>
//           <table className="table table-striped">
//             <thead>
//               <tr>
//                 <th className='col-lg-6 text-white'>Category</th>
//                 <th className='col-lg-6 text-white'>Score</th>
//               </tr>
//             </thead>
//             <tbody>
//               {grammarReport.Category.map((category, index) => (
//                 <tr key={index}>
//                   <td>{category}</td>
//                   <td>
//                     <div style={{ width: 80, height: 80 }}>
//                       <CircularProgressbar
//                         value={grammarReport.Score[index] * 10}
//                         text={`${grammarReport.Score[index]}/10`}
//                         styles={buildStyles({
//                           textSize: '12px',
//                           pathColor: getColorForScore(grammarReport.Score[index]),
//                           textColor: '#000',
//                           trailColor: '#d6d6d6',
//                         })}
//                       />
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Prosodic Report */}
//         <div className="col-md-6">
//           <h3 className="text-center">Prosodic Report</h3>
//           <table className="table table-striped">
//             <thead>
//               <tr>
//                 <th className='col-lg-6 text-white'>Category</th>
//                 <th className='col-lg-6 text-white'>Score</th>
//               </tr>
//             </thead>
//             <tbody>
//               {prosodicReport.Category.map((category, index) => (
//                 <tr key={index}>
//                   <td>{category}</td>
//                   <td>
//                     <div style={{ width: 80, height: 80 }}>
//                       <CircularProgressbar
//                         value={prosodicReport.Score[index] * 20}
//                         text={`${prosodicReport.Score[index]}/5`}
//                         styles={buildStyles({
//                           textSize: '12px',
//                           pathColor: getColorForScore(prosodicReport.Score[index]),
//                           textColor: '#000',
//                           trailColor: '#d6d6d6',
//                         })}
//                       />
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <div className="text-center mt-4">
//         <a href="/" className="btn btn-primary">Go to Homepage</a>
//       </div>
//     </div>
//   );
// };

// export default Report;







import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Report = () => {
  const { id } = useParams();
  const [prosodicReport, setProsodicReport] = useState(null);
  const [grammarReport, setGrammarReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    completion_percentage: 0,
  });

  useEffect(() => {
    fetch('http://127.0.0.1:5000/view_report')
      .then(response => response.json())
      .then(data => {
        setProsodicReport(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching prosodic report:', error);
        setLoading(false);
      });

    fetch('http://127.0.0.1:5000/grammar_report')
      .then(response => response.json())
      .then(data => {
        setGrammarReport(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching grammar report:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!prosodicReport || !grammarReport) {
    return <div>No data available</div>;
  }

  const getColorForScore = (score) => {
    if (score >= 8) {
      return '#4CAF50';
    } else if (score >= 5) {
      return '#FFC107';
    } else {
      return '#F44336';
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Task Report <span style={{ color: "#DC3545" }}>{user.first_name} {user.last_name}</span></h1>

      <div className="row mt-5">
        <div className="col-md-12">
          <h3 className="text-center">Grammar Report</h3>
          <table className="table table-striped">
  <thead>
    <tr>
      <th className="text-white col-6" style={{ width: '50%' }}>Category</th>
      <th className="text-white col-6" style={{ width: '50%' }}>Score</th>
    </tr>
  </thead>
  <tbody>
    {Object.entries(grammarReport).map(([category, score], index) => (
      <tr key={index}>
        <td style={{ width: '50%' }}>{category.replace(/_/g, " ")}</td>
        <td style={{ width: '50%' }}>
          <div style={{ width: 80, height: 80 }}>
            <CircularProgressbar
              value={score * 10}
              text={`${score}/10`}
              styles={buildStyles({
                textSize: '12px',
                pathColor: getColorForScore(score),
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
        </div>

        <div className="col-md-12">
          <h3 className="text-center">Prosodic Report</h3>
          <table className="table table-striped">
  <thead>
    <tr>
      <th className="text-white" style={{ width: '50%' }}>Category</th>
      <th className="text-white" style={{ width: '50%' }}>Score</th>
    </tr>
  </thead>
  <tbody>
    {prosodicReport.Category.map((category, index) => (
      <tr key={index}>
        <td style={{ width: '50%' }}>{category}</td>
        <td style={{ width: '50%' }}>
          <div style={{ width: 80, height: 80 }}>
            <CircularProgressbar
              value={prosodicReport.Score[index] * 20}
              text={`${prosodicReport.Score[index]}/5`}
              styles={buildStyles({
                textSize: '12px',
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

        </div>
      </div>

      <div className="text-center mt-4">
        <a href="/" className="btn btn-primary">Go to Homepage</a>
      </div>
    </div>
  );
};

export default Report;
