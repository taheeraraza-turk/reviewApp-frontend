import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #6EE7B7 0%, #3B82F6 100%)',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0 20px',
      textAlign: 'center',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <h1 style={{
        fontSize: '3.5rem',
        fontWeight: '800',
        marginBottom: '0.5rem',
        textShadow: '2px 2px 10px rgba(0,0,0,0.3)',
        animation: 'fadeInDown 1s ease forwards'
      }}>
        Discover Products. Share Reviews.
      </h1>
      <p style={{
        fontSize: '1.25rem',
        maxWidth: '600px',
        marginBottom: '2rem',
        lineHeight: '1.6',
        textShadow: '1px 1px 6px rgba(0,0,0,0.3)',
        animation: 'fadeInUp 1.2s ease forwards'
      }}>
        Join our community to explore amazing products and write your honest reviews. 
        Your voice matters — help others make smart buying decisions!
      </p>

      <div style={{ display: 'flex', gap: '20px', animation: 'fadeInUp 1.4s ease forwards' }}>
        <Link to="/signup" style={buttonStyle}>
          Sign Up
        </Link>
        <Link to="/login" style={{ ...buttonStyle, backgroundColor: 'transparent', border: '2px solid white' }}>
          Login
        </Link>
      </div>

      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        a:hover {
          opacity: 0.85;
          transition: opacity 0.3s ease;
        }
      `}</style>
    </div>
  );
}

const buttonStyle = {
  backgroundColor: 'white',
  color: '#3B82F6',
  padding: '12px 30px',
  borderRadius: '30px',
  fontWeight: '700',
  fontSize: '1.1rem',
  cursor: 'pointer',
  textDecoration: 'none',
  boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
  transition: 'all 0.3s ease'
};
