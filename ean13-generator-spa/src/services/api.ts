export async function gerarEanApi(prefixo: string, codigoItem: string): Promise<string> {
  const res = await fetch("/api/ean", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prefixo: prefixo,
      codigo_item: codigoItem,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.erro || "Erro desconhecido");
  }

  return data.gtin13;
}
