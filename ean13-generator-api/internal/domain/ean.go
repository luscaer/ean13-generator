package domain

import (
	"fmt"
	"unicode"
)

func GerarGTIN13(prefixo string, codigoItem string) (string, error) {
	if !isNumeric(prefixo) || !isNumeric(codigoItem) {
		return "", fmt.Errorf("prefixo e codigo_item devem conter apenas dígitos")
	}

	tamanhoCodigoRecebido := len(prefixo) + len(codigoItem)

	if tamanhoCodigoRecebido > 12 {
		return "", fmt.Errorf("código excede 12 dígitos")
	}
	
	if tamanhoCodigoRecebido == 0 {
		return "", fmt.Errorf("o código não pode estar vazio")
	}

	codigoBase := prefixo + fmt.Sprintf("%0*s", 12-len(prefixo), codigoItem)

	soma := 0
	for i, r := range codigoBase {
		digito := int(r - '0')

		if i%2 == 0 {
			soma += digito
		} else {
			soma += (digito * 3)
		}
	}

	digitoVerificador := (10 - (soma % 10)) % 10
	codigoGTIN13 := fmt.Sprintf("%s%d", codigoBase, digitoVerificador)

	return codigoGTIN13, nil
}

func isNumeric(s string) bool {
	if s == "" {
		return false
	}
	for _, r := range s {
		if !unicode.IsDigit(r) {
			return false
		}
	}
	return true
}