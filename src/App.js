// Import necessary modules and components
import Index from "./components/index"; // Import the Index component from the specified path
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import necessary components from React Router
import PrimeComponent from "./components/database"; // Import the PrimeComponent component from the specified path

// Define the main App component
function App() {
  // Render method of the component
  return (
    // Router component provided by React Router
    <Router>
      {/* Routes component for defining routes */}
      <Routes>
        {/* Route for the home page */}
        <Route path='/' element={<Index />} /> {/* When the path is '/', render the Index component */}
        {/* Route for the database page */}
        <Route path='/database' element={<PrimeComponent />} /> {/* When the path is '/database', render the PrimeComponent component */}
      </Routes>
    </Router>
  );
}

// Export the App component to be used in other files
export default App;
