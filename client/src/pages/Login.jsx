import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Github, Chrome } from 'lucide-react';
import '../styles/Login.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login form submitted:', formData);
    // Handle login form submission here
  };

  return (
    <div className="auth-container">
      {/* Animated background elements */}
      <div className="background-overlay">
        <div className="floating-circle circle-1"></div>
        <div className="floating-circle circle-2"></div>
        <div className="floating-circle circle-3"></div>
      </div>

      {/* Main container */}
      <div className="auth-wrapper">
        {/* Glass card */}
        <div className="auth-card">
          {/* Header */}
          <div className="auth-header">
            <div className="auth-icon">
              <User className="icon" />
            </div>
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Sign in to your account</p>
          </div>

          {/* Social buttons */}
          <div className="social-buttons">
            <button className="social-btn">
              <Github className="social-icon" />
              <span className="social-text">GitHub</span>
            </button>
            <button className="social-btn">
              <Chrome className="social-icon" />
              <span className="social-text">Google</span>
            </button>
          </div>

          {/* Divider */}
          <div className="divider">
            <div className="divider-line"></div>
            <span className="divider-text">or continue with email</span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="auth-form">
            {/* Email field */}
            <div className="input-group">
              <Mail className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="auth-input"
                required
              />
            </div>

            {/* Password field */}
            <div className="input-group">
              <Lock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="auth-input password-input"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
              >
                {showPassword ? <EyeOff className="toggle-icon" /> : <Eye className="toggle-icon" />}
              </button>
            </div>

            {/* Remember me / Forgot password */}
            <div className="login-options">
              <label className="remember-me">
                <input type="checkbox" className="checkbox" />
                <span className="checkbox-text">Remember me</span>
              </label>
              <a href="#" className="forgot-password">
                Forgot password?
              </a>
            </div>

            {/* Submit button */}
            <button type="submit" className="auth-submit">
              Sign In
              <ArrowRight className="submit-icon" />
            </button>
          </form>

          {/* Toggle mode */}
          <div className="auth-toggle">
            <p className="toggle-text">
              Don't have an account?
              <a href="/signup" className="toggle-link">Sign up</a>
            </p>
          </div>
        </div>

        {/* Floating elements */}
        <div className="floating-dot dot-1"></div>
        <div className="floating-dot dot-2"></div>
      </div>
    </div>
  );
};

export default Login;