import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NextPage = () => {
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/check-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer: input, page: 3 }),
      });

      const result = await response.json();
      if (result.correct) {
        setMessage('คำตอบถูกต้อง! 🎉');
        setTimeout(() => {
            navigate("/"); // ใช้ navigate เปลี่ยนหน้าไปยัง "/phone"
        }, 1000); // รอ 1 วินาที
      } else {
        setMessage('คำตอบไม่ถูกต้อง ลองใหม่อีกครั้ง!');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('เกิดข้อผิดพลาด กรุณาลองใหม่');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px',marginLeft: "580px"}}>
      <h1>hegmysrks</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="ใส่คำตอบ"
          style={{ padding: '10px', fontSize: '1rem', width: '300px' }}
        />
        <br />
        <button
          type="submit"
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          ยืนยัน
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default NextPage;
