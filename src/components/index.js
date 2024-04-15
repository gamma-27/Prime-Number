import React, { useState, useEffect } from 'react'; // Import React and necessary hooks
import axios from 'axios'; // Import Axios for making HTTP requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation

// Define Index component
const Index = () => {
  // Define state variables using useState hook
  const [startRange, setStartRange] = useState(null); // State for start range input
  const [endRange, setEndRange] = useState(null); // State for end range input
  const [algorithmType, setAlgorithmType] = useState(''); // State for algorithm type input
  const [primeCount, setPrimeCount] = useState(0); // State for the count of prime numbers found
  const [primeRecords, setPrimeRecords] = useState([]); // State for storing prime numbers found
  const [loading, setLoading] = useState(false); // State to manage loading state

  const navigate = useNavigate(); // Initialize navigate from useNavigate hook to handle navigation

  useEffect(() => {
    setStartRange(0);
    setEndRange(0);
  }, []); // Set initial values for start and end range when the component mounts

  // Function to fetch prime numbers from the backend
  const fetchPrimeNumbers = async () => {
    if (!startRange || !endRange || !algorithmType) {
      console.error('Please fill in all fields'); // Error message if any input field is empty
      return;
    }

    try {
      setLoading(true); // Set loading to true while fetching
      const response = await axios.post('http://localhost:3001/api/data', {
        start: parseInt(startRange),
        end: parseInt(endRange),
        algorithm: algorithmType,
      });
      setLoading(false); // Set loading to false after fetching
      setPrimeCount(response.data.numPrimes); // Update prime count
      setPrimeRecords(response.data.primes); // Update prime records
    } catch (error) {
      console.error('Error fetching prime numbers:', error); // Log error if fetching fails
      setLoading(false); // Set loading to false in case of error
    }
  };

  // Function to handle navigation to prime number records page
  const handleRedirect = () => {
    navigate('/database'); // Redirect to '/database' route
  };

  // JSX for rendering UI
  return (
    <div>
      <div className="container bg-purple-50 mx-auto">
        <form className="mb-8">
          <div className='text-black shadow-xs font-bold py-5  text-2xl text-center'>Prime Number Generator</div>
          {/* Input fields for start and end range, and algorithm type */}
          <div className="mb-4 mr-4 text-center">
            <label className='font-semibold mr-5'>Enter the starting range:</label>
            <input type="number" name="start" value={startRange} onChange={(e) => setStartRange(e.target.value)} className="border border-gray-300 rounded-md p-2 ml-2" />
          </div>
          <div className="mb-4 mr-4 text-center">
            <label className='font-semibold mr-7'>Enter the ending range:</label>
            <input type="number" name="end" value={endRange} onChange={(e) => setEndRange(e.target.value)} className="border border-gray-300 rounded-md p-2 ml-2" />
          </div>
          <div className="mb-4 mr-4 text-center">
            <label className='font-semibold mr-5'>Enter the algorithm type:</label>
            <input type="text" name="algorithm" value={algorithmType} onChange={(e) => setAlgorithmType(e.target.value)} className="border border-gray-300 rounded-md p-2 ml-2" />
          </div>
          {/* Button to trigger prime number generation */}
          <div className="flex justify-center mt-5 items-center">
            <button type="button" onClick={fetchPrimeNumbers} className="bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded">
              {loading ? 'Loading...' : 'Generate'}
            </button>
          </div>
        </form>
        {/* Display prime numbers, algorithm type, and count */}
        <div className='border text-center font-normal text-white pl-1 pb-2 justify-center bg-purple-500'>
          <h2 className="text-xl font-semibold text-white pt-5">Prime numbers between {startRange} and {endRange} are</h2>
          <div className='flex justify-center items-center text-center mx-10'>
            {/* Display prime numbers in a list */}
            {primeRecords.length > 0 && (
              <ul style={{ display: 'flex', listStyleType: 'none', padding: 0, flexWrap: 'wrap' }} className="mb-2">
                {primeRecords.map((prime, index) => (
                  <li key={index} style={{ marginRight: '10px' }} className="text-xl font-semibold text-white">
                    {index !== 0 && ','} {prime}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Display algorithm type and count of prime numbers */}
          <p className=" text-xl font-semibold text-white">Algorithm used: {algorithmType} </p>
          <p className="mb-2 text-xl font-semibold text-white">Count of prime numbers: {primeCount}</p>
        </div>
        <div className='flex justify-center items-center my-5'>
          {/* Button to navigate to prime number records page */}
          <button type="button" className=' bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded' onClick={handleRedirect}>
            Prime Number Records
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index; // Export Index component as default
