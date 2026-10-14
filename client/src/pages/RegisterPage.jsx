import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    locality: 'Andheri West, Mumbai',
    password: '',
    confirm_password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    const { full_name, email, phone, locality, password, confirm_password } = formData;

    if (!full_name.trim() || !email.trim() || !phone.trim() || !password || !confirm_password) {
      setError('Please fill in all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    if (password !== confirm_password) {
      setError('Passwords do not match. Please re-enter carefully.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.auth.register({
        full_name: full_name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        locality: locality.trim(),
        password,
        confirm_password,
      });

      if (res.success && res.token && res.user) {
        login(res.token, res.user);
        navigate('/customer-dashboard');
      } else {
        setError(res.message || 'Registration failed.');
      }
    } catch (err) {
      setError(err.message || 'An error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="container">
        <div className="auth-card card">
          <div className="auth-header">
            <div className="auth-icon">📝</div>
            <h2>Customer Registration</h2>
            <p className="auth-subtitle">Create an account to book household repair services in Mumbai.</p>
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="reg-name" className="form-label">
                Full Name
              </label>
              <input
                id="reg-name"
                name="full_name"
                type="text"
                className="form-input"
                placeholder="e.g. Rohan Mehta"
                value={formData.full_name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email Address */}
            <div className="form-group">
              <label htmlFor="reg-email" className="form-label">
                Email Address
              </label>
              <input
                id="reg-email"
                name="email"
                type="email"
                className="form-input"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Phone Number */}
            <div className="form-group">
              <label htmlFor="reg-phone" className="form-label">
                Phone Number
              </label>
              <input
                id="reg-phone"
                name="phone"
                type="tel"
                className="form-input"
                placeholder="+91 98200 00000"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            {/* Mumbai Locality */}
            <div className="form-group">
              <label htmlFor="reg-locality" className="form-label">
                Mumbai Locality / Area
              </label>
              <select
                id="reg-locality"
                name="locality"
                className="form-select"
                value={formData.locality}
                onChange={handleChange}
                required
              >
                <option value="Andheri West, Mumbai">Andheri West, Mumbai</option>
                <option value="Dadar, Mumbai">Dadar, Mumbai</option>
                <option value="Bandra West, Mumbai">Bandra West, Mumbai</option>
                <option value="Powai, Mumbai">Powai, Mumbai</option>
                <option value="Borivali West, Mumbai">Borivali West, Mumbai</option>
                <option value="Kurla, Mumbai">Kurla, Mumbai</option>
                <option value="Malad West, Mumbai">Malad West, Mumbai</option>
              </select>
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="reg-password" className="form-label">
                Password
              </label>
              <input
                id="reg-password"
                name="password"
                type="password"
                className="form-input"
                placeholder="Minimum 6 characters"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label htmlFor="reg-confirm" className="form-label">
                Confirm Password
              </label>
              <input
                id="reg-confirm"
                name="confirm_password"
                type="password"
                className="form-input"
                placeholder="Re-enter password"
                value={formData.confirm_password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? 'Creating Account...' : 'Register Customer Account'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Already registered?{' '}
              <Link to="/login" className="auth-link">
                Sign In to NearFix
              </Link>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .register-page {
          padding: 50px 0 80px;
        }

        .auth-card {
          max-width: 500px;
          margin: 0 auto;
          padding: 36px;
        }

        .auth-header {
          text-align: center;
          margin-bottom: 24px;
        }

        .auth-icon {
          font-size: 2.2rem;
          margin-bottom: 8px;
        }

        .auth-header h2 {
          font-size: 1.6rem;
          margin-bottom: 6px;
        }

        .auth-subtitle {
          font-size: 0.92rem;
          color: var(--text-muted);
          margin-bottom: 0;
        }

        .auth-form {
          margin-bottom: 20px;
        }

        .auth-footer {
          text-align: center;
          padding-top: 18px;
          border-top: 1px solid var(--border-color);
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        .auth-link {
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
