import React, { useState } from 'react';

const PhonePage = () => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    alert(`คำตอบของคุณคือ: ${input}`); // ตรงนี้ปรับเปลี่ยนฟังก์ชันตามโจทย์
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px",marginLeft: "580px" }}>
      <h1>🤙🧪</h1>
      <h1>ฆ๊ธ</h1>
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
    </div>
  );
};

export default PhonePage;
