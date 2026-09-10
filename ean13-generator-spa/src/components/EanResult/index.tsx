import { Barcode } from "../barcode/Barcode";
import "./EanResult.css";

interface EanResultProps {
  resultado: string;
  onCopiar: () => void;
}

export function EanResult({ resultado, onCopiar }: EanResultProps) {
  return (
    <div className="resultado">
      <h3>Seu GTIN-13</h3>
      <div className="ean-row">
        <code>{resultado}</code>
        <button className="btn-copy" onClick={onCopiar}>
          Copiar
        </button>
      </div>
      <Barcode ean={resultado} />
    </div>
  );
}
