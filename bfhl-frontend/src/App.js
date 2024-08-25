import React, { useState } from 'react';
import axios from 'axios'; // For making API calls
import { useEffect } from 'react';
import './App.css';



function App() {

  useEffect(() => {
    document.title = '21BCE11656';
  }, []);

  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  
  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const parsedJson = JSON.parse(jsonInput);
        if (!parsedJson.data) throw new Error('Invalid JSON structure');
        const response = await axios.post('http://localhost:5000/bfhl', parsedJson);
        setResponseData(response.data);
        setError('');
    } catch (err) {
        console.error('Error:', err); // Log the actual error for debugging
        setError('Invalid JSON format or API error');
    }
};


  const handleOptionChange = (e) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(options);
  };

  return (
    <div>
      <h1>BFHL Frontend</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder='Enter your JSON here'
          value={jsonInput}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {responseData && (
        <>
          <label htmlFor="filter">Select Data to Display:</label>
          <select multiple onChange={handleOptionChange}>
            <option value="numbers">Numbers</option>
            <option value="alphabets">Alphabets</option>
            <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
          </select>

          <div>
            {selectedOptions.includes('numbers') && <p>Numbers: {responseData.numbers.join(', ')}</p>}
            {selectedOptions.includes('alphabets') && <p>Alphabets: {responseData.alphabets.join(', ')}</p>}
            {selectedOptions.includes('highest_lowercase_alphabet') && <p>Highest Lowercase Alphabet: {responseData.highest_alphabet.join(', ')}</p>}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
