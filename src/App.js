import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, FloatingLabel1 } from 'react-bootstrap'
import './App.css';

function App() {

  const [probabilityA, setProbabilityA] = useState('');
  const [probabilityB, setProbabilityB] = useState('');
  const [selectedFunction, setSelectedFunction] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate input
    if (probabilityA < 0 || probabilityA > 1 || probabilityB < 0 || probabilityB > 1) {
      alert('Invalid probability range (must be between 0 and 1)');
      return;
    }

    try {
      // send request to backend API
      const response = await axios.get(`https://d7bwnghnskth4e46j5t5bh4k740uiowv.lambda-url.eu-north-1.on.aws/Calculator?probabilityA=${probabilityA}&probabilityB=${probabilityB}&selectedFunction=${selectedFunction}`);

      // update the result
      setResult(response.data.result);

      // log the calculation
      console.log(response.data.log);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='App'>
      <h1 className='Title'>Calculator</h1>
      <div className='gap-3 Body'>
        <Form onSubmit={handleSubmit}>
          <div>
            <label>Probability A:</label>
            <input type="number" step="0.01" value={probabilityA} onChange={(e) => setProbabilityA(e.target.value)} />
          </div>
          <div>
            <label>Probability B:</label>
            <input type="number" step="0.01" value={probabilityB} onChange={(e) => setProbabilityB(e.target.value)} />
          </div>
          <div>
            <label>Function:</label>
            <select value={selectedFunction} onChange={(e) => setSelectedFunction(e.target.value)}>
              <option value="">Select function</option>
              <option value="CombinedWith">CombinedWith</option>
              <option value="Either">Either</option>
            </select>
          </div>
          <Button variant="success" type="submit">Calculate</Button>
      </Form>
      {result && <div>Result: {result}</div>}
      </div>
    </div>
  );
}

export default App;
