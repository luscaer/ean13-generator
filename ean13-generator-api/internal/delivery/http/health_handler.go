package http

import (
	"encoding/json"
	"net/http"
	"log"
)

func HealthHandler(w http.ResponseWriter, r *http.Request) {
	log.Printf("Requisição recebida: %s %s", r.Method, r.URL.Path)

	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(http.StatusOK)

	response := HealthResponse{
		Status:  "up",
		Message: "A fundação da API está de pé!",
	}
	
	json.NewEncoder(w).Encode(response)
}