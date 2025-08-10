import React from 'react';

export default function About() {
  return (
    <div style={{ padding: '20px', maxWidth: '700px', margin: 'auto' }}>
      <h1>About Our Product Review App</h1>
      <p>
        Welcome to our Product Review App! This platform allows users to browse products, 
        read and write reviews after logging in, and interact with our community. 
      </p>
      <p>
        We built this app using React for the frontend, Node.js and Express for the backend, 
        and MongoDB as the database. Our goal is to provide a smooth and reliable experience for users who want to share their opinions.
      </p>
      <p>
        Feel free to explore, sign up, and add your own reviews for the products listed.
      </p>
      <p style={{ marginTop: '40px', fontStyle: 'italic', color: '#555' }}>
        &copy; 2025 Product Review App. All rights reserved.
      </p>
    </div>
  );
}
