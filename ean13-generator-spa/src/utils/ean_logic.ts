// Tabelas de Codificação Binária (0 = Branco, 1 = Preto)
const L_CODE = ["0001101", "0011001", "0010011", "0111101", "0100011", "0110001", "0101111", "0111011", "0110111", "0001011"];
const G_CODE = ["0100111", "0110011", "0011011", "0100001", "0011101", "0111001", "0000101", "0010001", "0001001", "0010111"];
const R_CODE = ["1110010", "1100110", "1101100", "1000010", "1011100", "1001110", "1010000", "1000100", "1001000", "1110100"];

// Padrão de Paridade ditado pelo PRIMEIRO DÍGITO
const PARITY_PATTERN = [
  "LLLLLL", "LLGLGG", "LLGGLG", "LLGGGL", "LGLLGG", 
  "LGGLLG", "LGGGLL", "LGLGLG", "LGLGGL", "LGGLGL"
];

export function calcularBarrasEAN(ean: string): string {
  if (ean.length !== 13) return "";

  const primeiroDigito = parseInt(ean[0]);
  const padrao = PARITY_PATTERN[primeiroDigito];

  let barras = "101";

  for (let i = 1; i <= 6; i++) {
    const digito = parseInt(ean[i]);
    const tipoParidade = padrao[i - 1];

    if (tipoParidade === 'L') {
        barras += L_CODE[digito];
    } else {
        barras += G_CODE[digito];
    }
  }

  barras += "01010";

  for (let i = 7; i <= 12; i++) {
    const digito = parseInt(ean[i]);
    barras += R_CODE[digito];
  }

  barras += "101";

  return barras;
}
