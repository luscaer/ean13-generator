package http

type HealthResponse struct {
	Status  string `json:"status"`
	Message string `json:"message"`
}

type GerarEANRequest struct {
	Prefixo    string `json:"prefixo"`
	CodigoItem string `json:"codigo_item"`
}

type GerarEANResponse struct {
	GTIN13 string `json:"gtin13"`
}

type ErrorResponse struct {
	Erro string `json:"erro"`
}