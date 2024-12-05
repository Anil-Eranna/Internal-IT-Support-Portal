import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";

function Search() {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const navigate = useNavigate();

  const suggestionsList = [
    { name: "Infra-approvals", route: "/infra-approvals" },
    { name: "Network Vulnerability Reports", route: "/network-page" },
    { name: "Nippon Services", route: "" },
    { name: "Enable Bluetooth For Wireless Devices", route: "" },
    { name: "Break-Fix Support", route: "" },
    { name: "Claim approval", route: "" },
    { name: "Medical Insurance Policy", route: "" },
    { name: "Help Needed To Fill/Submit the Form", route: "" },
    { name: "iTime Auto mailer not generating", route: "" },
    { name: "iTime Portal not opening", route: "" },
    { name: "Medical Claims", route: "" },
    { name: "HR - Benefits & Policy Clarification", route: "" },
    { name: "HR - Time sheet Management", route: "" },
    { name: "HR - iLearn Compliance", route: "" },
    { name: "HR - My Time Journal", route: "" },
  ];

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchText(value);

    if (value) {
      const filteredSuggestions = suggestionsList.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchText(suggestion.name);
    setShowSuggestions(false);
    navigate(suggestion.route);
  };

  const handleClear = () => {
    setSearchText("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="app-container">
      <div className="search-bar">
        <p className="para">Raise your requests</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6 search-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={handleInputChange}
        />
        {searchText && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6 remove-icon"
            onClick={handleClear}
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>

      {showSuggestions && (
        <ul className="suggestions-list">
          {suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion.name}
              </li>
            ))
          ) : (
            <li>No suggestions found</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default Search;
