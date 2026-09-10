# Gerador EAN-13 (Fullstack Monorepo)

Um gerador profissional de códigos de barras EAN-13, com foco em arquitetura limpa, performance e UX premium. Construído do zero como um monorepo contendo uma API em Go e um SPA em React.

## 🚀 Tecnologias

- **Backend:** Go (Golang) com Clean Architecture (Hexagonal/Ports & Adapters)
- **Frontend:** React + Vite, TypeScript, Canvas API para renderização de barras, CSS puro (Glassmorphism)
- **Infraestrutura:** Docker & Docker Compose (Multi-stage builds, redes isoladas)

## 🏗️ Arquitetura

O projeto adota a estrutura de Monorepo, separando as responsabilidades em dois grandes blocos que se comunicam via HTTP (REST):

```text
gerador-ean13/
├── ean13-generator-api/   # API Go (Core de negócio e algoritmos EAN)
│   ├── cmd/api/           # Entrypoint (Servidor HTTP)
│   └── internal/          # Lógica de Domínio
├── ean13-generator-spa/   # Frontend React (UI/UX e renderização via Canvas)
│   ├── src/components/    # Componentes modulares
│   └── src/utils/         # Lógica visual e formatação EAN
└── docker-compose.yaml    # Orquestração dos containers
```

## ⚙️ Como Rodar Localmente

O projeto está 100% conteinerizado para a melhor experiência de desenvolvimento (DX).

1. Certifique-se de ter o Docker e o Docker Compose instalados.
2. Clone este repositório.
3. Na raiz do projeto, execute:
   ```bash
   docker compose up --build
   ```
4. Acesse no seu navegador:
   - Frontend (SPA): `http://localhost:5173`
   - API (Go): `http://localhost:8080` (Acessível internamente via proxy reverso no Vite)

## ✨ Features de Destaque

- **Cálculo Preciso:** Algoritmo de geração do dígito verificador e paridade (L, G, R) aderente ao padrão GTIN.
- **Geração Dinâmica no Frontend:** Renderização nativa das barras (incluindo Zonas de Guarda estendidas) via HTML `<canvas>`.
- **Geração Aleatória:** Botão mágico para gerar códigos válidos com prefixo brasileiro (`789`).
- **Ações Rápidas:** Botões para copiar código e exportar o código de barras gerado como imagem PNG.
- **Proxy Reverso (Dev):** Comunicação sem problemas de CORS graças à configuração de proxy nativa do Vite.
