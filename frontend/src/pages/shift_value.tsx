import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ShiftPage = () => {
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/check-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer: input, page: 4 }),
      });

      const result = await response.json();
      if (result.correct) {
        setMessage('คำตอบถูกต้อง! 🎉');
        setTimeout(() => {
            navigate("/hash"); // ใช้ navigate เปลี่ยนหน้าไปยัง "/hash"
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
    <div style={{ textAlign: 'center', marginTop: '50px',marginLeft: "250px", marginRight: "100px"}}>
      <h1>ตำแหน่งที่ 1 = สัญลักษณ์ของ มทส มีกี่สี</h1> 
      <h1>ตำแหน่งที่ 2 = อาคารเรียนรวม มีกี่อาคาร</h1>
      <h1>ตำแหน่งที่ 3 = ประตูทางเข้า-ออก มทส มีกี่ประตู</h1>
      <h1>ตำแหน่งที่ 4 = จำนวนหอพักชายใน มทส</h1>
      <h1>ตามลำดับ</h1>
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

export default ShiftPage;