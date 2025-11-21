import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import './AuthPage.css';
import { FaGoogle, FaGithub, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
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
    const [loginError, setLoginError] = useState('');
    const [currentStep] = useState(1);

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
        // Authenticate user
        login({ email: credentials.email, role: 'admin' });
        
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
            passwordMatch: trimmedPassword === ADMIN_PASSWORD
        });

        if (trimmedEmail === ADMIN_EMAIL && trimmedPassword === ADMIN_PASSWORD) {
            console.log("Login Successful! Redirecting to Dashboard...");
            handleLogin({ email: trimmedEmail, password: trimmedPassword });
        } else {
            setLoginError('Invalid email or password.');
        }
    };

    // 1. Right Panel Content (Form)
    const renderRightPanelContent = () => {
        if (isLoginView) {
            return (
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

                        <input
                            type="email"
                            placeholder="Email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {loginError && <p className="login-error-message">{loginError}</p>}

                        <div className="forgot-password-link">
                            <a href="#" onClick={(e) => e.preventDefault()}>Forgot Password?</a>
                        </div>

                        <button type="submit" className="login-submit-btn">
                            <FaSignInAlt className="submit-icon" /> Log In
                        </button>

                        <p className="signup-link-text">
                            Don't have an account?
                            <a href="#" onClick={() => toggleView(false)}> Sign Up</a>
                        </p>
                    </form>
                </div>
            );
        } else {
            return (
                <div className="form-container signup-form-container">
                    <form className="signup-form" onSubmit={(e) => e.preventDefault()}>
                        <h2>Sign Up Account</h2>
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

                        <div className="name-fields">
                            <input type="text" placeholder="First Name" required />
                            <input type="text" placeholder="Last Name" required />
                        </div>
                        <input type="email" placeholder="Email" required />
                        <input type="password" placeholder="Password" required />
                        <small>Must be at least 8 characters.</small>

                        <button type="submit" className="signup-submit-btn">
                            <FaUserPlus className="submit-icon" /> Sign Up
                        </button>

                        <p className="login-link-text">
                            Already have an account?
                            <a href="#" onClick={() => toggleView(true)}> Log In</a>
                        </p>
                    </form>
                </div>
            );
        }
    };

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
            <div className="auth-card-container">
                {/* Overlay Container */}
                <div className={`overlay-container ${isLoginView ? '' : 'overlay-active'}`}>
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            {renderLeftPanelContent()}
                        </div>
                        <div className="overlay-panel overlay-right">
                            {renderLeftPanelContent()}
                        </div>
                    </div>
                </div>

                {/* Form Sections */}
                <div className={`form-section ${isLoginView ? 'login-active' : 'signup-active'}`}>
                    {renderRightPanelContent()}
                </div>
            </div>
        </div>
    );
};

export default AuthPage;