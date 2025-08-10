import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import PasswordInput from '../components/PasswordInput';
import '../styles/Forms.css'; // Assuming you have a CSS file for styling

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Login failed');

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setLoading(false);
      navigate('/products');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className='form-container' style={{ padding: '20px' }}>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>

        <label>Email</label><br />
        <input name="email" type="email" value={form.email} onChange={handleChange} required /><br /><br />

        <label>Password</label><br />
        <PasswordInput name="password" value={form.password} onChange={handleChange} required /><br /><br />

        <button type="submit">Login</button>
      </form>

      {/* Footer with signup link */}
      <p style={{ marginTop: '20px', fontSize: '0.9rem', textAlign: 'center', color: '#555' }}>
        New user?{' '}
        <Link to="/signup" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: '600' }}>
          Signup here
        </Link>
      </p>
    </div>
  );
}
