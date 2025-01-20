import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ใช้ useNavigate แทน Navigate

function PAsym() {
    const [answer, setAnswer] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); // ใช้ useNavigate เพื่อให้สามารถใช้งาน navigate ได้

    const checkAnswer_p = async () => {
        try {
            const response = await fetch("http://localhost:8080/check-answer-p", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ answer }),
            });
            const result = await response.json();
            if (result.correct) {
                setMessage("ถูกต้อง! ไปหน้าถัดไปได้เลย 🎉");
                setTimeout(() => {
                    navigate("/Home"); // ใช้ navigate แทน
                }, 1000); // รอ 1 วินาที
            } else {
                setMessage("คำตอบไม่ถูกต้อง ลองใหม่อีกครั้ง!");
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("เกิดข้อผิดพลาด! กรุณาลองใหม่.");
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px",marginLeft: "450px" }}>
            <h1>WELCOMETOSYMMETIC_P</h1>
            <input
                type="text"
                placeholder="กรอกคำตอบ"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                style={{ padding: "10px", fontSize: "16px" }}
            />
            <button
                onClick={checkAnswer_p}
                style={{ marginLeft: "10px", padding: "10px", fontSize: "16px" }}
            >
                ส่งคำตอบ
            </button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default PAsym;