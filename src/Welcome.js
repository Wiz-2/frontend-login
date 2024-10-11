// Importing essential libraries and components
import React from 'react'; // Import React to create functional components
import { Button } from 'react-bootstrap'; // Import Bootstrap Button component for styling
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation control
import './styles/Welcome.css'; // Import custom CSS for component-specific styling

// Welcome component: Displays a welcome message for authenticated users
function Welcome() {
    const navigate = useNavigate(); // Initialize useNavigate to programmatically control navigation

    // Function to handle user logout
    const handleLogout = () => {
        // Optional: Here you can add logout functionality, such as clearing authentication tokens, session data, or user state
        navigate('/'); // Redirect user back to the login page after logging out
    };

    // Rendering the component UI
    return (
        <div className="welcome-container">
            {/* Displaying a welcome message to the authenticated user */}
            <h2>Welcome, you have been authenticated!</h2>

            {/* Button to trigger the logout process */}
            <Button variant="primary" onClick={handleLogout}>
                Logout
            </Button>
        </div>
    );
}

// Exporting the Welcome component for use in other parts of the application
export default Welcome;

