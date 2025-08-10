import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export default function PasswordInput({ value, onChange, name, placeholder }) {
  const [show, setShow] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <input
        type={show ? 'text' : 'password'}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        minLength={6}
        style={{ paddingRight: '35px', width: '100%', boxSizing: 'border-box' }}
      />
      <span
        onClick={() => setShow(!show)}
        style={{
          position: 'absolute',
          right: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          cursor: 'pointer',
          color: '#0ea5e9',
          fontSize: '20px',
          userSelect: 'none',
        }}
        aria-label={show ? 'Hide password' : 'Show password'}
      >
        {show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
      </span>
    </div>
  );
}
