package main

import (
	"encoding/json"
	"net/http"

	"github.com/rs/cors"
)

type AnswerRequest struct {
	Answer string `json:"answer"`
}

type AnswerResponse struct {
	Correct bool `json:"correct"`
}

const correctAnswer = "IQXOAYQFAEKYYQFUO"

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

	isCorrect := req.Answer == correctAnswer
	res := AnswerResponse{Correct: isCorrect}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(res)
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/check-answer", checkAnswer)

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
