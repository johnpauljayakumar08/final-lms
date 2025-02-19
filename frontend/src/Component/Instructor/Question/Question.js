import React, { useState, useEffect, useRef } from "react";
import JoditEditor from "jodit-react";
import * as XLSX from "xlsx";
import axios from "axios"; // Make sure axios is imported
import "./Question.css";
import DropdownTreeSelect from "react-dropdown-tree-select";
import "react-dropdown-tree-select/dist/styles.css";
import { FaPlus, FaUpload } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

const Question = () => {
  const [content, setContent] = useState("");
  const [questionType, setQuestionType] = useState("multiple_choice");
  const [correctOption, setCorrectOption] = useState("");
  const [options, setOptions] = useState([
    { option: "", feedback: "" },
    { option: "", feedback: "" },
    { option: "", feedback: "" },
    { option: "", feedback: "" },
  ]);
  const [showFeedback, setShowFeedback] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [keywords, setKeywords] = useState([{ keyword: "", marks: "" }]);
  const [uploadedQuestions, setUploadedQuestions] = useState([]);
  const [selected, setSelected] = useState([]);
  const [moduleStructure, setModuleStructure] = useState([]); // State to store fetched data
  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const [parentModuleId, setParentModuleId] = useState(null);
  const [matchLeft, setMatchLeft] = useState([""]); // State for left side items
  const [matchRight, setMatchRight] = useState([""]); // State for right side items
  const editorRef = useRef(null);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}course/structured-data`)
      .then((res) => {
        console.log(res.data);
        setModuleStructure(res.data); // Set the fetched data to state
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to fetch courses!"); // Or use a toast if you prefer
      });
  }, []);

  const handleChange = (currentNode, selectedNodes) => {
    setSelected(selectedNodes);

    if (currentNode) {
      setSelectedModuleId(currentNode.value); // Use 'value' for module ID

      // Find the parent ID using the utility function
      const parentId = findParentNode(moduleStructure, currentNode.value);
      setParentModuleId(parentId);
    }

    if (currentNode && currentNode.label) {
      console.log(`Selected: ${currentNode.label}`);
    }

    console.log("Selected Nodes:", selectedNodes);
  };

  const handleOptionChange = (index, field, value) => {
    const newOptions = [...options];
    newOptions[index][field] = value;
    setOptions(newOptions);
  };

  const findParentNode = (data, childValue) => {
    for (let node of data) {
      if (node.children && node.children.length > 0) {
        if (node.children.some((child) => child.value === childValue)) {
          return node.value; // Found the parent
        }
        const parent = findParentNode(node.children, childValue);
        if (parent) {
          return parent;
        }
      }
    }
    return null; // No parent found
  };

  const handleEditorChange = (newContent) => {
    setContent(newContent);
  };

  const handleQuestionTypeChange = (event) => {
    setQuestionType(event.target.value);
    setCorrectOption("");
  };

  const handleCorrectOptionChange = (e) => {
    setCorrectOption(e.target.value);
  };

  const toggleFeedback = (index) => {
    const newShowFeedback = [...showFeedback];
    newShowFeedback[index] = !newShowFeedback[index];
    setShowFeedback(newShowFeedback);
  };

  const handleKeywordChange = (index, field, value) => {
    const newKeywords = [...keywords];
    newKeywords[index] = { ...newKeywords[index], [field]: value };
    setKeywords(newKeywords);
  };

  const addKeyword = () => {
    setKeywords([...keywords, { keyword: "", marks: "" }]);
  };

  const removeKeyword = (index) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        setUploadedQuestions(jsonData);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleMatchChange = (index, value, side) => {
    if (side === "left") {
      const newMatchLeft = [...matchLeft];
      newMatchLeft[index] = value;
      setMatchLeft(newMatchLeft);
    } else {
      const newMatchRight = [...matchRight];
      newMatchRight[index] = value;
      setMatchRight(newMatchRight);
    }
  };

  const addMatchPair = () => {
    setMatchLeft([...matchLeft, ""]);
    setMatchRight([...matchRight, ""]);
  };

  const removeMatchPair = (index) => {
    setMatchLeft(matchLeft.filter((_, i) => i !== index));
    setMatchRight(matchRight.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    // Create a new FormData object
    const formData = new FormData();

    // Append form fields to the FormData object
    formData.append("content", content);
    formData.append("questionType", questionType);
    formData.append("correctOption", correctOption);
    formData.append("selectedModuleId", selectedModuleId);
    formData.append("parentModuleId", parentModuleId);

    if (questionType === "multiple_choice" || questionType === "true/false") {
      formData.append("options", JSON.stringify(options)); // Append options
    }

    if (questionType === "description") {
      formData.append("keywords", JSON.stringify(keywords)); // Append keywords for descriptive questions
    }

    if (questionType === "match_following") {
      const matches = matchLeft.map((left, index) => ({
        leftItem: left,
        rightItem: matchRight[index],
      }));
      formData.append("matches", JSON.stringify(matches));  // Append the matches
    }    

    console.log(questionType);
    console.log(formData);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}quiz/addquestion`,
        formData
      );

      console.log(res.data);

      if (res.data.message === "quiz_added") {
        alert("Added successfully");

        // Clear all input and box values by resetting state
        setContent("");
        setQuestionType("multiple choice");
        setCorrectOption("");
        setOptions([
          { option: "", feedback: "" },
          { option: "", feedback: "" },
          { option: "", feedback: "" },
          { option: "", feedback: "" },
        ]);
        setShowFeedback([false, false, false, false]);
        setKeywords([{ keyword: "", marks: "" }]);
        setUploadedQuestions([]);
        setSelected([]);
        setSelectedModuleId(null);
        setParentModuleId(null);

        // Reset the JoditEditor content
        if (editorRef.current) {
          editorRef.current.editor.setValue(""); // Clear the editor content
        }
      } else if (res.data.error === "db_error") {
        console.log(res.data);
        // Handle DB error
      }
    } catch (error) {
      console.error("Error submitting form", error);
      // Handle error response
    }
  };

  const addOption = () => {
    setOptions([...options, { option: "", feedback: "" }]); // Add new empty option
    setShowFeedback([...showFeedback, false]); // Add corresponding feedback toggle for the new option
  };

  return (
    <div className="container ">
      <h3 className="text-center">Quiz</h3>
      <div className="entirequizpart p-5 rounded-3">
        <h5>Select the module</h5>
        <DropdownTreeSelect
          data={moduleStructure}
          onChange={handleChange}
          className="bootstrap-demo"
          texts={{ placeholder: "Select..." }}
        />
        <div
          className="question-type-dropdown d-flex justify-content-between my-3"
          style={{ marginBottom: "10px" }}
        >
          <div className="mx-2">
            <label htmlFor="questionType">
              <b>Select Question Type:</b>
            </label>
            <select
              id="questionType"
              value={questionType}
              onChange={handleQuestionTypeChange}
              style={{ marginLeft: "10px" }}
            >
              <option value="multiple choice">Multiple Choice</option>
              <option value="description">Description</option>
              <option value="true/false">True/False</option>
              <option value="match_following">match_following</option>
            </select>
          </div>
          {/* <div className="mx-2">
            <div
              style={{ display: "flex", alignItems: "center" }}
              className="border border-2"
            >
              <label
                htmlFor="file-upload"
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
              >
                <FaUpload className="iconclr" />
                <input
                  id="file-upload"
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                />
                <span className="fw-bold">Upload File</span>
              </label>
            </div>
          </div> */}
        </div>

        <JoditEditor
          ref={editorRef}
          value={content}
          config={{
            readonly: false,
            toolbar: true,
          }}
          onBlur={handleEditorChange}
        />

        {questionType === "true/false" && (
          <div className="true-false-options" style={{ marginTop: "10px" }}>
            <div className="d-flex justify-content-around">
              <div>
                <label>
                  <input
                    type="radio"
                    name="trueFalseOption"
                    value="true"
                    disabled
                  />
                  True
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="radio"
                    name="trueFalseOption"
                    value="false"
                    disabled
                  />
                  False
                </label>
              </div>
            </div>
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
              <label>Correct Option:</label>
              <select
                value={correctOption}
                onChange={handleCorrectOptionChange}
                style={{ marginLeft: "10px" }}
              >
                <option value="">Select Correct Option</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
          </div>
        )}

        {questionType === "match_following" && (
          <div style={{ marginTop: "10px" }}>
            <h5>Match the Following:</h5>
            {matchLeft.map((leftItem, index) => (
              <div
                key={index}
                style={{ display: "flex", marginBottom: "10px" }}
              >
                <input
                  type="text"
                  value={leftItem}
                  onChange={(e) =>
                    handleMatchChange(index, e.target.value, "left")
                  }
                  placeholder={`Left Item ${index + 1}`}
                  className="form-control mx-1"
                  style={{ width: "200px" }}
                />
                <input
                  type="text"
                  value={matchRight[index] || ""}
                  onChange={(e) =>
                    handleMatchChange(index, e.target.value, "right")
                  }
                  placeholder={`Right Item ${index + 1}`}
                  className="form-control mx-1"
                  style={{ width: "200px" }}
                />
                <button
                  onClick={() => removeMatchPair(index)}
                  className="btn btn-danger btn-sm mx-1"
                >
                  Remove
                </button>
              </div>
            ))}
            <button onClick={addMatchPair} className="btn btn-secondary">
              <FaPlus /> Add Pair
            </button>
          </div>
        )}

        {questionType === "multiple_choice" && (
          <div style={{ marginTop: "10px" }}>
            {options.map((optionObj, index) => (
              <div key={index} style={{ marginBottom: "20px" }}>
                <label htmlFor={`option${index + 1}`}>
                  Option {index + 1}:
                </label>
                <input
                  type="text"
                  placeholder={`Option ${String.fromCharCode(65 + index)}`} // A, B, C, D, etc.
                  value={optionObj.option}
                  onChange={(e) =>
                    handleOptionChange(index, "option", e.target.value)
                  }
                />
                <button
                  className="m-3 feedbackbtn rounded-2"
                  onClick={() => toggleFeedback(index)}
                >
                  {showFeedback[index] ? "Hide Feedback" : "Add Feedback"}
                </button>
                {showFeedback[index] && (
                  <div className="feedback" style={{ marginTop: "10px" }}>
                    <label>Feedback for Option {index + 1}:</label>
                    <JoditEditor
                      value={optionObj.feedback}
                      config={{
                        readonly: false,
                        toolbar: true,
                      }}
                      onBlur={(newContent) =>
                        handleOptionChange(index, "feedback", newContent)
                      }
                    />
                  </div>
                )}
              </div>
            ))}

            {/* Add the "+" button to add new options dynamically */}
            <div className="add-option-btn mt-3">
              <button className="btn btn-outline-danger" onClick={addOption}>
                <FaPlus /> Add Option
              </button>
            </div>

            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
              <label>Select Correct Option</label> &nbsp;
              <select
                value={correctOption}
                onChange={(e) => setCorrectOption(e.target.value)}
              >
                <option>Select Correct Option</option>
                {options.map(
                  (option, index) =>
                    option.option.trim() && (
                      <option key={index} value={option.option}>
                        {option.option}
                      </option>
                    )
                )}
              </select>
            </div>
          </div>
        )}

        {questionType === "description" && (
          <div style={{ marginTop: "20px" }}>
            <h5>Keywords</h5>
            {keywords.map((keyword, index) => (
              <div key={index}>
                <label>Keyword {index + 1}:</label>
                <input
                  type="text"
                  value={keyword.keyword}
                  onChange={(e) =>
                    handleKeywordChange(index, "keyword", e.target.value)
                  }
                  style={{ marginLeft: "10px" }}
                />
                <label style={{ marginLeft: "20px" }}>Marks:</label>
                <input
                  type="text"
                  value={keyword.marks}
                  onChange={(e) =>
                    handleKeywordChange(index, "marks", e.target.value)
                  }
                  style={{ marginLeft: "10px" }}
                />
                <button
                  className="btn btn-danger btn-sm ms-3"
                  onClick={() => removeKeyword(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="mt-3">
              <button className="btn btn-outline-primary" onClick={addKeyword}>
                <FaPlus /> Add Keyword
              </button>
            </div>
          </div>
        )}

        <div className="mt-4">
          <button
            className="btn"
            style={{ color: "white", backgroundColor: "#001040" }}
            onClick={handleSubmit}
          >
            Submit Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default Question;
