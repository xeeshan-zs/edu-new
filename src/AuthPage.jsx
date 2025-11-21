import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import './AuthPage.css';
import { FaGoogle, FaGithub, FaSignInAlt, FaUserPlus, FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa';
import { useAuth } from './context/AuthContext.jsx';

// --- MOCK CREDENTIALS FOR DEVELOPMENT ---
const ADMIN_EMAIL = 'admin@educonnect.com';
const ADMIN_PASSWORD = 'password123';
// ----------------------------------------

const AuthPage = ({ defaultView = 'login' }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login, isAuthenticated } = useAuth();
    const [isLoginView, setIsLoginView] = useState(defaultView !== 'signup');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [currentStep] = useState(1);
    const [role, setRole] = useState('admin'); // Default role

    // Redirect if already authenticated - prevents authenticated users from accessing login page
    useEffect(() => {
        if (isAuthenticated) {
            const from = location.state?.from?.pathname || '/dashboard';
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, location.state]);

    useEffect(() => {
        setIsLoginView(defaultView !== 'signup');
        setLoginError('');
    }, [defaultView]);

    const toggleView = (isLogin) => {
        setIsLoginView(isLogin);
        setLoginError('');
    };

    const handleLogin = (credentials) => {
        // API INTEGRATION PLACEHOLDER:
        // Replace this with actual API call to backend
        // e.g., axios.post('/api/auth/login', { email, password, role })

        // Authenticate user (mock)
        login({ email: credentials.email, role: role }); // Use selected role

        // Redirect to intended destination or default to '/dashboard'
        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        setLoginError('');

        // Trim whitespace from inputs
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        // Debug logging (remove in production)
        console.log('Login attempt:', {
            enteredEmail: trimmedEmail,
            expectedEmail: ADMIN_EMAIL,
            emailMatch: trimmedEmail === ADMIN_EMAIL,
            enteredPassword: trimmedPassword ? '***' : '(empty)',
            passwordMatch: trimmedPassword === ADMIN_PASSWORD,
            role: role
        });

        if (trimmedEmail === ADMIN_EMAIL && trimmedPassword === ADMIN_PASSWORD) {
            console.log("Login Successful! Redirecting to Dashboard...");
            handleLogin({ email: trimmedEmail, password: trimmedPassword });
        } else {
            setLoginError('Invalid email or password.');
        }
    };

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        // API INTEGRATION PLACEHOLDER:
        // Replace with actual signup API call
        // e.g., axios.post('/api/auth/signup', { ...formData })
        console.log("Signup submitted");
    };

    const renderLoginForm = () => (
        <div className="form-container login-form-container">
            <form className="login-form" onSubmit={handleLoginSubmit}>
                <h2>Welcome Back!</h2>
                <p className="form-subtitle">Log in to continue your journey with EduConnect.</p>

                <div className="social-login-container">
                    <button type="button" className="social-login-btn google">
                        <FaGoogle className="social-icon" /> Google
                    </button>
                    <button type="button" className="social-login-btn github">
                        <FaGithub className="social-icon" /> Github
                    </button>
                </div>

                <div className="or-divider">Or</div>

                {/* Role Selection */}
                <div className="role-selection-container" style={{ marginBottom: '15px', width: '100%' }}>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="role-select"
                    >
                        <option value="admin">Super Admin</option>
                        <option value="school">School Administrator</option>
                        <option value="teacher">Teacher</option>
                        <option value="parent">Parent</option>
                        <option value="vendor">Vendor</option>
                    </select>
                </div>

                <input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <div className="password-input-wrapper" style={{ position: 'relative', width: '100%' }}>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width: '100%' }}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                            position: 'absolute',
                            right: '15px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#999'
                        }}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>

                {loginError && <p className="login-error-message">{loginError}</p>}

                <div className="forgot-password-link">
                    <a href="#" onClick={(e) => e.preventDefault()}>Forgot Password?</a>
                </div>

                <button type="submit" className="login-submit-btn">
                    <FaSignInAlt className="submit-icon" /> Log In
                </button>

                <p className="signup-link-text">
                    Don't have an account?
                    <a href="#" onClick={(e) => { e.preventDefault(); toggleView(false); }}> Sign Up</a>
                </p>
            </form>
        </div>
    );

    const renderSignupForm = () => (
        <div className="form-container signup-form-container">
            <form className="signup-form" onSubmit={handleSignupSubmit}>
                <h2>Create Account</h2>
                <p className="form-subtitle">Enter your personal data to create your account.</p>

                <div className="social-login-container">
                    <button type="button" className="social-login-btn google">
                        <FaGoogle className="social-icon" /> Google
                    </button>
                    <button type="button" className="social-login-btn github">
                        <FaGithub className="social-icon" /> Github
                    </button>
                </div>

                <div className="or-divider">Or</div>

                {/* Role Selection for Signup */}
                <div className="role-selection-container" style={{ marginBottom: '15px', width: '100%' }}>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="role-select"
                    >
                        <option value="admin">Super Admin</option>
                        <option value="school">School Administrator</option>
                        <option value="teacher">Teacher</option>
                        <option value="parent">Parent</option>
                        <option value="vendor">Vendor</option>
                    </select>
                </div>

                <div className="name-fields">
                    <input type="text" placeholder="First Name" required />
                    <input type="text" placeholder="Last Name" required />
                </div>
                <input type="email" placeholder="Email" required />

                <div className="password-input-wrapper" style={{ position: 'relative', width: '100%' }}>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        required
                        style={{ width: '100%' }}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                            position: 'absolute',
                            right: '15px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#999'
                        }}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
                <small>Must be at least 8 characters.</small>

                <button type="submit" className="signup-submit-btn">
                    <FaUserPlus className="submit-icon" /> Sign Up
                </button>

                <p className="login-link-text">
                    Already have an account?
                    <a href="#" onClick={(e) => { e.preventDefault(); toggleView(true); }}> Log In</a>
                </p>
            </form>
        </div>
    );

    // 2. Left Panel Content (Steps/Text)
    const renderLeftPanelContent = () => {
        if (isLoginView) {
            return (
                <div className="panel-content login-panel-content">
                    <h1>Join Our Community</h1>
                    <p>Don't have an account yet? Sign up to access all the features of the EduConnect platform.</p>
                    <button className="auth-left-cta" onClick={() => toggleView(false)}>
                        Sign Up <FaUserPlus />
                    </button>
                </div>
            );
        } else {
            return (
                <div className="panel-content signup-panel-content">
                    <h1>Get Started with Us</h1>
                    <p>Complete these easy steps to register your account.</p>

                    <div className="auth-steps-container">
                        <div className={`auth-step-item ${currentStep === 1 ? 'active' : ''}`}>
                            <div className="auth-step-number">1</div>
                            <div className="auth-step-text">Sign up your account</div>
                        </div>
                        <div className={`auth-step-item ${currentStep === 2 ? 'active' : ''}`}>
                            <div className="auth-step-number">2</div>
                            <div className="auth-step-text">Set up your workspace</div>
                        </div>
                        <div className={`auth-step-item ${currentStep === 3 ? 'active' : ''}`}>
                            <div className="auth-step-number">3</div>
                            <div className="auth-step-text">Set up your profile</div>
                        </div>
                    </div>
                </div>
            );
        }
    };

    // If already authenticated, redirect to '/dashboard' (fallback for useEffect)
    if (isAuthenticated) {
        const from = location.state?.from?.pathname || '/dashboard';
        return <Navigate to={from} replace />;
    }

    return (
        <div className="auth-page-wrapper dark-theme">
            <button
                className="back-to-home-btn"
                onClick={() => navigate('/')}
                title="Back to Landing Page"
            >
                <FaArrowLeft size={20} />
            </button>

            <div className={`auth-card-container ${!isLoginView ? 'right-panel-active' : ''}`}>
                {/* Sign Up Form */}
                <div className={`form-section signup-active`}>
                    {renderSignupForm()}
                </div>

                {/* Login Form */}
                <div className={`form-section login-active`}>
                    {renderLoginForm()}
                </div>

                {/* Overlay Container */}
                <div className={`overlay-container ${!isLoginView ? 'overlay-active' : ''}`}>
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            {renderLeftPanelContent()}
                        </div>
                        <div className="overlay-panel overlay-right">
                            {renderLeftPanelContent()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;