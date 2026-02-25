import React, { useState } from 'react';
import './Login.css';

const Login = () => {
    const [role, setRole] = useState('customer'); // 'customer' or 'manufacturer'
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});

    const handleRoleChange = (selectedRole) => {
        setRole(selectedRole);
        setErrors({});
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validate = () => {
        let newErrors = {};
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';

        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            console.log('Logging in as:', role, formData);
            alert(`Login Successful as ${role.charAt(0).toUpperCase() + role.slice(1)}!`);
            // Redirect or handle login here
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h1>Welcome to WeaveConnect</h1>
                    <p>Support local weavers, directly.</p>
                </div>

                <div className="role-selector">
                    <button
                        className={`role-btn ${role === 'customer' ? 'active' : ''}`}
                        onClick={() => handleRoleChange('customer')}
                    >
                        Customer
                    </button>
                    <button
                        className={`role-btn ${role === 'manufacturer' ? 'active' : ''}`}
                        onClick={() => handleRoleChange('manufacturer')}
                    >
                        Manufacturer
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? 'error-input' : ''}
                        />
                        {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            className={errors.password ? 'error-input' : ''}
                        />
                        {errors.password && <span className="error-text">{errors.password}</span>}
                    </div>

                    <button type="submit" className="submit-btn">
                        Login as {role.charAt(0).toUpperCase() + role.slice(1)}
                    </button>
                </form>

                <div className="login-footer">
                    <p>Don't have an account? <a href="#signup">Join the community</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
