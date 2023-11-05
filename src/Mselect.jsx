import { useEffect, useRef, useState } from "react";
import "./Mselect.css"

const TagInput = ({ tags, onTagChange, options }) => {
  //const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState(options);
  const [isInputFocused, setInputFocused] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState(options);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    // Simulate suggestions based on user input (you can fetch suggestions from an API or other data source)
    const userEnteredText = e.target.value.toLowerCase();
    const suggestedTags = suggestions //["apple", "banana", "cherry", "date", "fig", "grape"]
      .filter((tag) => tag.toLowerCase().includes(userEnteredText))
      .filter((tag) => !tags.includes(tag));
    setFilteredSuggestions(suggestedTags);
  };

  const handleInputKeydown = (e) => {
    const trimmedValue = inputValue.trim();
    if (
      (e.key === "Enter" || e.key === "," || e.key === "Tab") &&
      trimmedValue.length &&
      !tags.includes(trimmedValue)
    ) {
      e.preventDefault();
      //setTags([...tags, inputValue.trim()]);
      const newTags = [...tags, trimmedValue];
      onTagChange(newTags);
      setInputValue("");
      //setFilteredSuggestions([]); // Clear suggestions when a tag is added
      setFilteredSuggestions((prevSuggestions) =>
        prevSuggestions.filter((suggestion) => suggestion !== trimmedValue)
      );
    }

    if (e.key === "Backspace" && !trimmedValue.length && tags.length) {
      e.preventDefault();
      const tagsCopy = [...tags];
      const lastTag = tagsCopy.pop();
      //setTags(tagsCopy);
       onTagChange(tagsCopy);
      setInputValue(lastTag);
      //setFilteredSuggestions([]); // Clear suggestions when a tag is added
      setFilteredSuggestions((prevSuggestions) =>
        prevSuggestions.filter((suggestion) => suggestion !== trimmedValue)
      );
    }
  };

  const handleTagRemove = (tag) => {
    const updatedTags = tags.filter((t) => t !== tag);
    //setTags(updatedTags);
    onTagChange(updatedTags);
    setFilteredSuggestions((prevSuggestions) => [...prevSuggestions, tag]);
  };

  const handleSuggestionClick = (e, suggestion) => {
    e.preventDefault();
    console.log(e, suggestion);
    //setTags([...tags, suggestion]);
    
     const newTags = [...tags, suggestion];
     onTagChange(newTags);
    setInputValue("");

    setFilteredSuggestions((prevSuggestions) =>
      prevSuggestions.filter((sug) => sug !== suggestion)
    );
    handleInputBlur()
  };

  const handleInputFocus = () => {
    setInputFocused(true);
  };

  const handleInputBlur = () => {
    setInputFocused(false);
  };

  // useEffect(() => {
  //   console.log(tags);
  //   console.log(filteredSuggestions);
  // }, [tags, filteredSuggestions]);
  const tagRef = useRef(null);
   useEffect(() => {
     // Add a click event listener to the document to handle clicks outside the input and suggestions
     const handleDocumentClick = (e) => {
       if (tagRef.current && !tagRef.current.contains(e.target)) {
         setInputFocused(false);
       }
     };

     document.addEventListener("click", handleDocumentClick);

     return () => {
       // Remove the click event listener when the component unmounts
       document.removeEventListener("click", handleDocumentClick);
     };
   }, []);

  return (
    <div ref={tagRef} className="tag-input-container">
      <div className="tag-input">
        {tags.map((tag, index) => (
          <span key={index} className="tag">
            <span className="tag-name">{tag}</span>
            <span className="tag-remove" onClick={() => handleTagRemove(tag)}>
              &times;
            </span>
          </span>
        ))}
        <input
          type="text"
          className="tag-input-text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeydown}
          onFocus={handleInputFocus}
          // onBlur={handleInputBlur}
          placeholder="Add tags"
        />
      </div>
      {isInputFocused && suggestions.length > 0 && (
        <ul className="suggestions">
          {filteredSuggestions.map((suggestion) => (
            <li
              key={suggestion}
              onClick={(e) => handleSuggestionClick(e, suggestion)}
            >
              <span onClick={(e) => handleSuggestionClick(e, suggestion)}>
                {suggestion}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagInput;
