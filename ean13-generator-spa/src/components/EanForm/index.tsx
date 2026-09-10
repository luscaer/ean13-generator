import "./EanForm.css";

interface EanFormProps {
  prefixo: string;
  setPrefixo: (valor: string) => void;
  codigoItem: string;
  setCodigoItem: (valor: string) => void;
  onGerar: () => void;
  onGerarAleatorio: () => void;
}

export function EanForm({
  prefixo,
  setPrefixo,
  codigoItem,
  setCodigoItem,
  onGerar,
  onGerarAleatorio,
}: EanFormProps) {
  return (
    <div className="input-group">
      <div className="input-field">
        <label htmlFor="prefixo">Prefixo</label>
        <input
          id="prefixo"
          type="text"
          value={prefixo}
          onChange={(e) => setPrefixo(e.target.value)}
          placeholder="Ex: 789"
        />
      </div>

      <div className="input-field">
        <label htmlFor="codigoItem">Código do Item</label>
        <input
          id="codigoItem"
          type="text"
          value={codigoItem}
          onChange={(e) => setCodigoItem(e.target.value)}
          placeholder="Ex: 538000001"
        />
      </div>

      <div className="button-row">
        <button className="btn-primary" onClick={onGerar}>
          Gerar Código
        </button>
        <button className="btn-secondary" onClick={onGerarAleatorio}>
          Aleatório
        </button>
      </div>
    </div>
  );
}
