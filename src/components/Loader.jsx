// src/components/Loader.jsx
import React from 'react';

export default function Loader() {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <div className="spinner" />
      <p>Loading...</p>

      <style>{`
        .spinner {
          margin: 0 auto 10px;
          width: 40px;
          height: 40px;
          border: 4px solid #0ea5e9;
          border-top: 4px solid transparent;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% {transform: rotate(0deg);}
          100% {transform: rotate(360deg);}
        }
      `}</style>
    </div>
  );
}
