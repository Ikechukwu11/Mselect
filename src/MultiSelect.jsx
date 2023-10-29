import React, { useState, useEffect, useRef } from "react";

const CustomSelect = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const selectRef = useRef(null);

  const handleSearch = (e) => {
    const searchText = e.target.value;
    setSearchTerm(searchText);

    // Filter the options based on the search text, ignoring selected options
    const filteredOptions = options.filter(
      (option) =>
        !selectedOptions.includes(option) &&
        option.toLowerCase().includes(searchText.toLowerCase())
    );

    // Set the filtered options to be displayed
    setFilteredOptions(filteredOptions);
  };

  const handleOptionClick = (option) => {
    if (!selectedOptions.includes(option)) {
      setSelectedOptions([...selectedOptions, option]);
      setSearchTerm("");

      // Remove the selected option from the filtered options
      setFilteredOptions((filteredOptions) =>
        filteredOptions.filter((o) => o !== option)
      );
    }
  };

  const handleClear = () => {
    setSelectedOptions([]);
  };

  const handleClickOutside = (e) => {
    if (selectRef.current && !selectRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [filteredOptions, setFilteredOptions] = useState(options);

  return (
    <div className="custom-select" ref={selectRef}>
      <div
        className={`select-toggle ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOptions.length > 0 ? (
          selectedOptions.map((option, index) => (
            <span key={index} className="selected-option">
              {option}{" "}
              <button
                className="delete-option"
                onClick={() =>
                  setSelectedOptions((options) =>
                    options.filter((o) => o !== option)
                  )
                }
              >
                X
              </button>
            </span>
          ))
        ) : ""}
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
          />
        
      </div>
      {isOpen && (
        <div className="options">
          {filteredOptions.map((option, index) => (
            <div
              key={index}
              className="option"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
          <div className="clear-button">
            <button onClick={handleClear}>Clear</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
