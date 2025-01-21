import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ShiftPage = () => {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [showHints, setShowHints] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/check-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer: input, page: 4 }),
      });

      const result = await response.json();
      if (result.correct) {
        setMessage("คำตอบถูกต้อง! 🎉");
        setTimeout(() => {
          navigate("/hash");
        }, 1000);
      } else {
        setMessage("คำตอบไม่ถูกต้อง ลองใหม่อีกครั้ง!");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("เกิดข้อผิดพลาด กรุณาลองใหม่");
    }
  };

  return (
    <div
      style={{
        fontFamily: '"Kanit", sans-serif',
        textAlign: "center",
        marginTop: "50px",
        marginLeft: "450px",
        marginRight: "100px",
      }}
    >
      <h1>โปรดระบุคำตอบตามตำแหน่ง</h1>
      <button
        onClick={() => setShowHints(!showHints)}
        style={{
          marginTop: "20px",
          marginBottom: "20px",
          padding: "10px 20px",
          fontSize: "1rem",
          cursor: "pointer",
          backgroundColor: "#f0f0f0",
          border: "1px solid #ccc",
        }}
      >
        {showHints ? "ซ่อนคำใบ้" : "แสดงคำใบ้"}
      </button>
      {showHints && (
        <div
          style={{
            marginTop: "5px",
            marginBottom: "10px",
            textAlign: "center",
            backgroundColor: "#f9f9f9",
            padding: "5px",
            borderRadius: "8px",
          }}
        >
          <p>ตำแหน่งที่ 1: สัญลักษณ์ของ มทส มีกี่สี?</p>
          <p>ตำแหน่งที่ 2: อาคารเรียนรวม มีกี่อาคาร?</p>
          <p>ตำแหน่งที่ 3: ประตูทางเข้า-ออก มทส มีกี่ประตู?</p>
          <p>ตำแหน่งที่ 4: จำนวนหอพักชายในมทส?</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="ใส่คำตอบ"
          style={{ padding: "10px", fontSize: "1rem", width: "300px" }}
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
      <div style={{ fontFamily: '"Kanit", sans-serif', position: "relative" }}>
        {/* มุมซ้ายบน */}
        <div
          style={{
            position: "fixed",
            top: "10px",
            left: "10px",
            color: "transparent",
            userSelect: "text",
            WebkitBackgroundClip: "text",
            fontSize: "1rem",
          }}
        >
          _Cyber
        </div>

        {/* มุมขวาบน */}
        <div
          style={{
            position: "fixed",
            top: "10px",
            right: "10px",
            color: "transparent",
            userSelect: "text",
            WebkitBackgroundClip: "text",
            fontSize: "1.3rem",
          }}
        >
          SUT
        </div>

        {/* มุมซ้ายล่าง */}
        <div
          style={{
            position: "fixed",
            bottom: "10px",
            left: "10px",
            color: "transparent",
            userSelect: "text",
            WebkitBackgroundClip: "text",
            fontSize: "1.5rem",
          }}
        >
          2567
        </div>

        {/* มุมขวาล่าง */}
        <div
          style={{
            position: "fixed",
            bottom: "10px",
            right: "10px",
            color: "transparent",
            userSelect: "text",
            WebkitBackgroundClip: "text",
            fontSize: "2rem",
          }}
        >
          _Security_
        </div>
      </div>
    </div>
  );
};

export default ShiftPage;
