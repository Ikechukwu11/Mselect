import { useState } from 'react'

//import './App.css'
import MultiSelect from './MultiSelect'
import Mselect from "./Mselect";
import FormComponent from './Form';

function App() {
  const options = [
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
    "Option 5",
    "Option 6",
    "Option 7",
    "Option 8",
    "Option 9",
    "Option 10",
  ];

  
  return (
    <>
      {/* <MultiSelect options={options} /> */}
      {/* <Mselect options={[]} /> */}
      <FormComponent />
    </>
  );
}

export default App
