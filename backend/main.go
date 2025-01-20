package main

import (
	"encoding/json"
	"net/http"

	"github.com/rs/cors"
)

type AnswerRequest struct {
	Answer string `json:"answer"`
	Page   int    `json:"page"` // เพิ่ม field ระบุหน้าที่ส่งคำตอบมา
}

type AnswerResponse struct {
	Correct bool `json:"correct"`
}

// คำตอบที่ถูกต้องสำหรับแต่ละหน้า
var correctAnswers = map[int]string{
	1: "IQXOAYQFAEKYYQFUO",          // คำตอบสำหรับหน้าที่ 1
	2: "044224070",  // คำตอบสำหรับหน้าที่ 2
    3: "hackwords",
}

func checkAnswer(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req AnswerRequest
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// ตรวจสอบคำตอบตามหน้าที่ส่งมา
	correctAnswer, exists := correctAnswers[req.Page]
	isCorrect := exists && req.Answer == correctAnswer

	res := AnswerResponse{Correct: isCorrect}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(res)
}

//gift
const correctAnswer_p = "11"

func checkAnswer_p(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req AnswerRequest
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	isCorrect := req.Answer == correctAnswer_p
	res := AnswerResponse{Correct: isCorrect}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(res)
}
//

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/check-answer", checkAnswer)
    mux.HandleFunc("/check-answer-p", checkAnswer_p)   //gift


	// เปิดใช้งาน CORS
	handler := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"}, // อนุญาตเฉพาะ Frontend ของคุณ
		AllowCredentials: true,
		Debug:            true,
	}).Handler(mux)

	port := ":8080"
	println("Server is running on http://localhost" + port)
	http.ListenAndServe(port, handler)
}
