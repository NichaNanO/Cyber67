import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const [answer, setAnswer] = useState(""); // แก้ไขตัวแปร answer ให้ถูกต้อง
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const checkAnswer = async () => {
        try {
            const response = await fetch("http://localhost:8080/check-answer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ answer: answer, page: 1 }), // ใช้ answer แทน input
            });

            const result = await response.json();
            if (result.correct) {
                setMessage("ถูกต้อง! ไปหน้าถัดไปได้เลย 🎉");
                setTimeout(() => {
                    navigate("/phone"); // ใช้ navigate เปลี่ยนหน้าไปยัง "/phone"
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
        <div style={{ textAlign: "center", marginTop: "50px", marginLeft: "450px" }}>
            <h1>WELCOMETOSYMMETIC</h1>
            <input
                type="text"
                placeholder="กรอกคำตอบ"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)} // อัปเดต answer
                style={{ padding: "10px", fontSize: "16px" }}
            />
            <button
                onClick={checkAnswer}
                style={{ marginLeft: "10px", padding: "10px", fontSize: "16px" }}
            >
                ส่งคำตอบ
            </button>
            {message && <p>{message}</p>} {/* แสดงข้อความผลลัพธ์ */}
        </div>
    );
}

export default Home;
