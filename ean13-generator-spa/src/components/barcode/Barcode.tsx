import { useEffect, useRef, useState } from "react";
import { calcularBarrasEAN } from "../../utils/ean_logic";
import "./Barcode.css";

const QUIET_ZONE = 24;

export function Barcode({ ean }: { ean: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    if (!ean || ean.length !== 13) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const barras = calcularBarrasEAN(ean);

    const barWidth = 3;
    const height = 120;
    const larguraBarras = barras.length * barWidth;

    canvas.width = larguraBarras + QUIET_ZONE * 2;
    canvas.height = height + 40 + QUIET_ZONE;

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#000000";

    for (let i = 0; i < barras.length; i++) {
      if (barras[i] === "1") {
        const x = QUIET_ZONE + i * barWidth;
        let alturaBarra = height - 15;

        const ehGuardaEsquerda = i < 3;
        const ehGuardaMeio = i >= 45 && i < 50;
        const ehGuardaDireita = i >= barras.length - 3;

        if (ehGuardaEsquerda || ehGuardaMeio || ehGuardaDireita) {
          alturaBarra = height + 15;
        }

        ctx.fillRect(x, QUIET_ZONE / 2, barWidth, alturaBarra);
      }
    }

    ctx.font = "20px monospace";
    ctx.fillStyle = "#000000";
    ctx.textAlign = "center";

    const textoY = height + QUIET_ZONE + 5;

    ctx.fillText(ean[0], QUIET_ZONE / 2, textoY);

    ctx.fillText(ean.substring(1, 7), QUIET_ZONE + 72, textoY);

    ctx.fillText(ean.substring(7, 13), QUIET_ZONE + 213, textoY);

    setPronto(true);
  }, [ean]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const imageUrl = canvasRef.current.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `ean13_${ean}.png`;
    link.click();
  };

  return (
    <div className="barcode-wrapper">
      <div className="barcode-card">
        <canvas ref={canvasRef} />
      </div>
      <button
        className="btn-primary btn-download"
        onClick={handleDownload}
        disabled={!pronto}
      >
        Baixar PNG
      </button>
    </div>
  );
}
