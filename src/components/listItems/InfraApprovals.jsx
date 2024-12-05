import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addRequest } from "../../redux/infraSlice";
import Navbar from "../main/Navbar.jsx";
import "./infra.css";

function InfraApprovals() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const [requestType, setRequestType] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!requestType || !description) {
      alert("Please fill out all fields.");
      return;
    }

    if (!user) {
      alert("User is not logged in.");
      return;
    }

    const newRequest = {
      id: `REQ-${Date.now()}`,
      formType: "infra-approval",
      requestType,
      description,
      userEmail: user.email,
      status: "Pending",
    };

    dispatch(addRequest(newRequest));
    setSubmitted(true);

    console.log(newRequest);

    setTimeout(() => {
      navigate("/home");
    }, 1000);

    setRequestType("");
    setDescription("");
  };

  return (
    <div>
      <Navbar />
      <div className="infra-approvals">
        <h1>Infra Approvals</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="requestType">RequestType : </label>
            <input
              type="text"
              id="requestType"
              value={requestType}
              onChange={(e) => setRequestType(e.target.value)}
              placeholder="Enter the type of request"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description : </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a detailed description of the request"
            />
          </div>

          <button type="submit">Submit Request</button>
        </form>

        {submitted && (
          <p className="success-message">Request submitted successfully!</p>
        )}
      </div>
    </div>
  );
}

export default InfraApprovals;
