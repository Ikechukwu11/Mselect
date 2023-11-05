import React, { useState } from "react";
import TagInput from "./Mselect";

const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tags: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTagChange = (newTags) => {
    setFormData({
      ...formData,
      tags: newTags,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission with formData
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Tags</label>
        <TagInput
          tags={formData.tags}
          options={["apple", "banana", "cherry", "date", "fig", "grape"]}
          onTagChange={handleTagChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormComponent;
