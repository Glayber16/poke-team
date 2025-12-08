# 🚀 Poke Teams API (Backend)

API REST desenvolvida em Node.js e TypeScript para gerenciamento de times Pokémon. O projeto utiliza uma arquitetura em camadas (MVC) e destaca-se pela implementação de **Content Negotiation**, servindo dados em múltiplos formatos (JSON, XML e Protocol Buffers) para alta performance.

🔗 **Frontend Repository:** [Acesse aqui](https://github.com/Glayber16/front-poke-team)  
🎥 **Demo de Funcionamento (Explicando para o professor):** [Assistir Vídeo](https://drive.google.com/file/d/1LzhdIVtUhiaV63K-WMMjM2_JJyny9OL9/view)

## 🛠️ Tecnologias Utilizadas

- **Runtime:** Node.js
- **Framework:** Express.js
- **Linguagem:** TypeScript
- **Arquitetura:** MSC (Model-Service-Controller)
- **Serialização:** `protobufjs` (Protocol Buffers) e `js2xmlparser` (XML)
- **Integração:** Fetch API (Consumo da PokeAPI)
- **Documentação:** OpenAPI 3.0 / Swagger

## ✨ Funcionalidades Principais

- **CRUD de Times:** Criação, leitura e remoção de times.
- **Gerenciamento de Membros:** Adicionar e remover Pokémons de um time (com validação de limite de 6 membros).
- **Proxy & Cache:** Rota de listagem de Pokémons que atua como gateway para a PokeAPI externa.
- **Multi-formato (Content Negotiation):**
  - A rota `/pokemons` aceita o parâmetro `?format=` para retornar:
    - `json` 
    - `xml` 
    - `proto` (Binário/Protobuf)

Embora o projeto atenda aos requisitos iniciais, as seguintes melhorias foram identificadas para evoluir a aplicação para um cenário de produção:
- [ ] **Persistencia de Dados** Adicionar persistencia com PostegreSQL
- [ ] **Testes:** Adicionar cobertura de testes unitários (Jest) no Backend.
- [ ] **Infraestrutura:** Criar setup com Docker Compose para facilitar o ambiente de desenvolvimento.
- [ ] **Performance:** Implementar paginação infinita (Infinite Scroll) na listagem de Pokémons no Frontend.

## 📂 Estrutura do Projeto

```bash
src/
├── controllers/  # Lógica de entrada/saída e tratamento HTTP
├── services/     # Regras de negócio e comunicação com PokeAPI
├── routes/       # Definição dos endpoints
├── proto/        # Schemas para o Protocol Buffers
├── app.ts        # Configuração do Express e Middlewares (CORS)
└── server.ts     # Ponto de entrada (Listen port)
