import React, { useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import { BsPlusCircle } from "react-icons/bs";
import ProgressBar from "../ProgressBar";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const types = ["image/png", "image/jpeg"];

  const handleChange = async (e) => {
    const selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("Please select an image file (png or jpeg)");
    }
  };

  return (
    <div className="uploadForm-container">
      <Form>
        <Form.Label
          htmlFor="upload-post"
          style={{ fontSize: "2rem", cursor: "pointer" }}
        >
          <BsPlusCircle />
        </Form.Label>
        <FormControl
          type="file"
          onChange={handleChange}
          id="upload-post"
          style={{ display: "none" }}
        />
        <div className="uploadForm-output">
          {error && <div className="error">{error}</div>}
          {file && <div className="file">{file.name}</div>}
          {file && <ProgressBar file={file} setFile={setFile} />}
        </div>
      </Form>
    </div>
  );
};

export default UploadForm;
