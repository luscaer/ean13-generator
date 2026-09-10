package main

import (
	delivery "ean13-generator-api/internal/delivery/http"
	"log"
	"net/http"
	"time"
)

func main() {
	http.HandleFunc("GET /health", delivery.HealthHandler)
	http.HandleFunc("POST /ean", delivery.GerarEANHandler)

	port := ":8080"
	log.Printf("Servidor rodando com sucesso na porta %s...\n", port)

	srv := &http.Server{
		Addr:         port,
		Handler:      nil, 
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
		IdleTimeout:  15 * time.Second,
	}
	
	err := srv.ListenAndServe()
	if err != nil {
		log.Fatalf("Erro crítico ao iniciar o servidor: %v", err)
	}
}
