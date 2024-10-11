// Importing essential libraries and components
import React, { useState } from 'react'; // Import React and useState hook for component state management
import axios from 'axios'; // Axios for making HTTP requests
import { Form, Button, Alert, Spinner } from 'react-bootstrap'; // Importing Bootstrap components for styling
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for programmatic navigation
import './styles/LoginForm.css'; // Import custom CSS for component-specific styling

// LoginForm component handles both user login and registration functionality
function LoginForm() {
    // State variables for managing form inputs, messages, and component behavior
    const [username, setUsername] = useState(''); // To store the username input
    const [password, setPassword] = useState(''); // To store the password input
    const [message, setMessage] = useState(''); // To store success or error messages
    const [loading, setLoading] = useState(false); // To manage loading state while awaiting server responses
    const [variant, setVariant] = useState(''); // To set the variant for the Alert component (success, danger, etc.)
    const [isRegisterMode, setIsRegisterMode] = useState(false); // Toggle between Login and Register modes
    const navigate = useNavigate(); // Initialize useNavigate for navigation after successful login

    // Function to handle login process
    const handleLogin = async (event) => {
        event.preventDefault(); // Prevent default form submission
        setLoading(true); // Start loading state
        setMessage(''); // Clear any previous messages

        try {
            // Send a POST request to the backend login endpoint
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, {
                username: username,
                password: password
            }, {
                headers: {
                    'Content-Type': 'application/json' // Specify request content type
                }
            });

            // On successful login, display a success message
            setVariant('success');
            setMessage(response.data.message);

            // Optional: Delay redirection to the Welcome page for user experience
            setTimeout(() => {
                navigate('/welcome'); // Navigate to the /welcome page
            }, 1000); // 1-second delay

        } catch (error) {
            // Handle errors received from the server or due to network issues
            if (error.response) {
                // Backend returned an error response
                if (error.response.status === 404) {
                    // User not found, suggest registration
                    setVariant('warning');
                    setMessage(error.response.data.message);
                    setIsRegisterMode(true); // Switch to registration mode
                } else if (error.response.status === 401) {
                    // Invalid credentials provided
                    setVariant('danger');
                    setMessage(error.response.data.message);
                } else {
                    // Handle other server-side errors
                    setVariant('danger');
                    setMessage('An error occurred. Please try again.');
                }
            } else {
                // Handle client-side or network errors
                setVariant('danger');
                setMessage('Unable to connect to the server. Please try again later.');
            }
        } finally {
            setLoading(false); // End loading state
        }
    };

    // Function to handle user registration
    const handleRegister = async (event) => {
        event.preventDefault(); // Prevent default form submission
        setLoading(true); // Start loading state
        setMessage(''); // Clear any previous messages

        try {
            // Send a POST request to the backend registration endpoint
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/register`, {
                username: username,
                password: password
            }, {
                headers: {
                    'Content-Type': 'application/json' // Specify request content type
                }
            });

            // On successful registration, display a success message
            setVariant('success');
            setMessage(response.data.message);
            setIsRegisterMode(false); // Switch back to login mode after registration
            setUsername(''); // Clear the username field
            setPassword(''); // Clear the password field

        } catch (error) {
            // Handle registration errors
            if (error.response) {
                // Backend returned an error response
                if (error.response.status === 409) {
                    // Username already taken
                    setVariant('danger');
                    setMessage(error.response.data.message);
                } else if (error.response.status === 400) {
                    // Validation or missing field errors
                    setVariant('warning');
                    setMessage(error.response.data.message);
                } else {
                    // Handle other server-side errors
                    setVariant('danger');
                    setMessage('An error occurred during registration. Please try again.');
                }
            } else {
                // Handle client-side or network errors
                setVariant('danger');
                setMessage('Unable to connect to the server. Please try again later.');
            }
        } finally {
            setLoading(false); // End loading state
        }
    };

    // Function to toggle between Login and Register modes
    const toggleMode = () => {
        setIsRegisterMode(!isRegisterMode); // Flip the boolean state
        setMessage(''); // Clear any messages
        setVariant(''); // Reset the Alert variant
        setUsername(''); // Clear the username field
        setPassword(''); // Clear the password field
    };

    // Rendering the form component with conditional Login/Register modes
    return (
        <div className="login-container">
            {/* Displaying the title based on the current mode */}
            <h2 className="login-title">{isRegisterMode ? 'Register' : 'User Login'}</h2>
            
            {/* Displaying an alert message if it exists */}
            {message && <Alert variant={variant}>{message}</Alert>}
            
            {/* Form submission is conditional based on the current mode */}
            <Form onSubmit={isRegisterMode ? handleRegister : handleLogin}>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter username" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} // Update username state
                        required 
                    />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Enter password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Update password state
                        required 
                    />
                </Form.Group>

                {/* Submit button displays a spinner while loading, and toggles text based on mode */}
                <Button variant="primary" type="submit" className="btn-custom" disabled={loading}>
                    {loading ? <Spinner animation="border" size="sm" /> : isRegisterMode ? 'Register' : 'Login'}
                </Button>
            </Form>

            {/* Toggle link to switch between Login and Register modes */}
            <div className="toggle-link">
                {isRegisterMode ? (
                    <p>
                        Already have an account?{' '}
                        <Button variant="link" onClick={toggleMode}>
                            Login here
                        </Button>
                    </p>
                ) : (
                    <p>
                        Don't have an account?{' '}
                        <Button variant="link" onClick={toggleMode}>
                            Register here
                        </Button>
                    </p>
                )}
            </div>
        </div>
    );
}

// Exporting the LoginForm component for use in other parts of the application
export default LoginForm;

