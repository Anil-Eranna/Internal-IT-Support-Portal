import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteRequest, updateRequestStatus } from "../../redux/infraSlice";
import * as XLSX from "xlsx";
import "./Main.css";

function Main() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.infra.requests);
  const user = useSelector((state) => state.auth.user);

  const [selectedRequest, setSelectedRequest] = useState(null);

  const displayedRequests =
    user?.role === "admin"
      ? requests
      : requests.filter((request) => request.userEmail === user?.email);

  const handleRowClick = (request) => {
    if (selectedRequest?.id !== request.id) {
      setSelectedRequest(request);
    }
  };

  const handleClosePopup = () => {
    setSelectedRequest(null);
  };

  const handleDeleteRequest = (id) => {
    dispatch(deleteRequest({ id }));
    alert("Request deleted successfully!");
    setSelectedRequest(null);
  };

  const handleApproveReject = (newStatus) => {
    dispatch(
      updateRequestStatus({ id: selectedRequest.id, status: newStatus })
    );
    alert(`Request ${newStatus} Successfully!`);
    handleClosePopup();
  };

  const downloadAsExcel = () => {
    const data = requests.map((req) => ({
      "Request ID": req.id,
      "Request Type": req.requestType,
      Status: req.status,
      Email: req.userEmail,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Requests");

    XLSX.writeFile(workbook, "Requests.xlsx");
  };

  return (
    <div className="content">
      <div className="ticket-categories">
        <div className="top-content">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 document-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
            />
          </svg>

          <div className="text-content">
            <h4>Most frequent ticket categories</h4>
            <p className="para2">Top 15 most frequent Incidents/Requests</p>
          </div>
        </div>

        <hr></hr>

        <div className="list-items">
          <ul>
            <li onClick={() => navigate("/infra-approvals")}>
              {"> "} Infra Approvals
            </li>
            <li onClick={() => navigate("/network-page")}>
              {"> "} Network Vulnerability Reports
            </li>
            <li>{"> "} Nippon Services</li>
            <li>{"> "} Enable Bluetooth For Wireless Devices</li>
            <li>{"> "} Break-Fix Support</li>
          </ul>

          <ul>
            <li>{"> "} Claim approval</li>
            <li>{"> "} Medical Insurance Policy</li>
            <li>{"> "} Help Needed To Fill/Submit the Form</li>
            <li>{"> "} iTime Auto mailer not generating</li>
            <li>{"> "} iTime Portal not opening</li>
          </ul>

          <ul>
            <li>{"> "} Medical Claims</li>
            <li>{"> "} HR - Benefits & Policy Clarification</li>
            <li>{"> "} HR - Time sheet Management</li>
            <li>{"> "} HR - iLearn Compliance</li>
            <li>{"> "} HR - My Time Journal</li>
          </ul>
        </div>
      </div>

      <div className="open-requests">
        <div className="top-content">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 folder-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
            />
          </svg>

          <div className="text-content">
            <h4>Open request</h4>
            <p className="para2">Recent open request</p>
          </div>

          <div className="excel">
            <button onClick={downloadAsExcel} className="excel-button">Download All Requests</button>
          </div>
        </div>

        <hr></hr>

        {displayedRequests.length === 0 ? (
          <p>No open requests</p>
        ) : (
          <table className="requests-table">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Request type</th>
                <th>Status</th>
                {user?.role !== "admin" && (
                  <th>Delete</th>
                )}
              </tr>
            </thead>

            <tbody>
              {displayedRequests.map((request) => (
                <tr key={request.id} onClick={() => handleRowClick(request)}>
                  <td>{request.id}</td>
                  <td>{request.requestType}</td>
                  <td>{request.status}</td>
                  {user?.role !== "admin" && (
                    <td>
                    {user?.role !== "admin" || request.userEmail === user?.email ? (
                      <button onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteRequest(request.id);
                      }}
                      >
                        Delete
                      </button>
                    ) : null}
                  </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selectedRequest && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Request Details</h3>
            <form>
              <div className="form-group">
                <label htmlFor="requestType">Request Type: </label>
                <p> {selectedRequest.requestType} </p>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description: </label>
                <p> {selectedRequest.description} </p>
              </div>

              {user?.role === "admin" && (
                <div className="form-group">
                  <label htmlFor="email">Email: </label>
                  <p> {selectedRequest.userEmail} </p>
                </div>
              )}

              {user?.role === "admin" && (
                <div className="popup-actions">
                  <button
                    type="button"
                    onClick={() => handleApproveReject("Approved")}
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => handleApproveReject("Rejected")}
                  >
                    Reject
                  </button>
                </div>
              )}
              {user?.role !== "admin" && (
                <button onClick={() => setSelectedRequest(null)}>Close</button>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Main;
