import { useState } from "react";
import { EanForm } from "./components/EanForm";
import { EanResult } from "./components/EanResult";
import { gerarEanApi } from "./services/api";
import "./index.css";

function App() {
  const [prefixo, setPrefixo] = useState("");
  const [codigoItem, setCodigoItem] = useState("");
  const [resultadoEan, setResultadoEan] = useState("");

  const handleGerar = async (pref = prefixo, item = codigoItem) => {
    try {
      const gtin13 = await gerarEanApi(pref, item);
      setResultadoEan(gtin13);
    } catch (e) {
      alert("Falha na comunicação com o servidor!");
    }
  };

  const handleGerarAleatorio = () => {
    const prefixoBr = "789";
    const numeroAleatorio = Math.floor(100000000 + Math.random() * 900000000);
    const codigo = String(numeroAleatorio);

    setPrefixo(prefixoBr);
    setCodigoItem(codigo);

    handleGerar(prefixoBr, codigo);
  };

  const handleCopiar = () => {
    navigator.clipboard.writeText(resultadoEan);
    alert("Número copiado com sucesso!");
  };

  return (
    <main>
      <h1>Gerador de EAN-13</h1>
      <p className="subtitle">
        Gere códigos de barras EAN-13 válidos rapidamente
      </p>

      <EanForm
        prefixo={prefixo}
        setPrefixo={setPrefixo}
        codigoItem={codigoItem}
        setCodigoItem={setCodigoItem}
        onGerar={() => handleGerar()}
        onGerarAleatorio={handleGerarAleatorio}
      />

      {resultadoEan && (
        <EanResult
          resultado={resultadoEan}
          onCopiar={handleCopiar}
        />
      )}
    </main>
  );
}

export default App;
