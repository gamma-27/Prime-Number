import React, { useState, useEffect } from 'react'; // Import React and necessary hooks
import axios from 'axios'; // Import Axios for making HTTP requests

// Component to display elapsed time
const TimeElapsed = () => {
  // Define state variables for start time and elapsed time
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(null);

  // Effect to update elapsed time every second
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      if (startTime) {
        // Calculate elapsed time if start time is set
        const elapsed = now - startTime;
        setElapsedTime(elapsed);
      }
    }, 1000); // Update every second

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, [startTime]); // Re-run effect when start time changes

  // Render elapsed time
  return <div>Elapsed Time: {elapsedTime ? (elapsedTime / 1000).toFixed(2) : 0} seconds</div>;
};

// Main component to display prime number records
const PrimeComponent = () => {
  // Define state variable for prime number records
  const [primeRecords, setPrimeRecords] = useState([]);

  // Fetch prime number records from the server when component mounts
  useEffect(() => {
    handleGetPrimeRecords();
  }, []);

  // Function to fetch prime number records from the server
  const handleGetPrimeRecords = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/data');
      setPrimeRecords(response.data); // Set prime number records in state
    } catch (error) {
      console.error('Error fetching data:', error); // Handle error if fetching data fails
    }
  };

  // Render prime number records
  return (
    <div>
      <div className='text-center justify-center bg-purple-100 '>
        <div className='text-purple-600 font-bold text-2xl hover:text-purple-900 p-6'> Prime Number Records</div>
        
        {/* Render prime number records */}
        <ul>
          {primeRecords.map((record, index) => (
            <li key={index}>
              {/* Display individual prime number record fields */}
              <p className='text-semibold text-purple-900 text-lg'>Date: {record.Date}</p>
              <p className='text-semibold text-purple-900 text-lg'>Start: {record.start}</p>
              <p className='text-semibold text-purple-900 text-lg'>End: {record.end}</p>
              <p className='text-semibold text-purple-900 text-lg'>Algorithm: {record.algorithm}</p>
              <p className='text-semibold text-purple-900 text-lg'>Num Primes: {record.numPrimes} </p>
              <p className='text-semibold text-purple-900 text-lg'>Primes: {record.primes.join(', ')}</p>
              {/* Display elapsed time component */}
              <p className='text-semibold  text-purple-900 text-lg'><TimeElapsed /></p> 
              {/* Divider */}
              <div className='h-[0.1rem] border my-2  bg-purple-400 border-purple-400'></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PrimeComponent; // Export PrimeComponent as default
