// Importing necessary libraries and components
import React from 'react'; // React library for building user interfaces
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
// Importing Router components from 'react-router-dom' for handling client-side routing

import LoginForm from './LoginForm'; // Importing the LoginForm component for user login functionality
import Welcome from './Welcome'; // Importing the Welcome component to greet authenticated users
import './App.css'; // Importing general styling for the App component

// The main App component that defines the application's routing structure
function App() {
    return (
        // Wrapping the application in the Router component to enable navigation
        <Router>
            <div className="App">
                {/* 
                    Defining the Routes component which serves as a container for all Route definitions.
                    This determines which component to render based on the current URL path.
                */}
                <Routes>
                    {/* 
                        The Route component maps the "/" path to the LoginForm component.
                        This serves as the default route, showing the login form on the homepage.
                    */}
                    <Route path="/" element={<LoginForm />} />

                    {/* 
                        The "/welcome" route maps to the Welcome component.
                        This route is displayed after successful authentication, welcoming the user.
                    */}
                    <Route path="/welcome" element={<Welcome />} />
                </Routes>
            </div>
        </Router>
    );
}

// Exporting the App component as the default export, making it available for import in other modules
export default App;

