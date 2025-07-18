📚 Boardcamp - Sistema de Locadora de Jogos de Tabuleiro

🎲 Um projeto prático de CRUD para gerenciar uma locadora de jogos de tabuleiro, usando Node.js, Express, PostgreSQL e SQL puro.

✅ Descrição
O Boardcamp é um sistema de backend desenvolvido para gerenciar o aluguel de jogos de tabuleiro.
Nele é possível cadastrar jogos, clientes, registrar e devolver aluguéis e controlar estoque, multas por atraso e muito mais.

Este projeto foi desenvolvido como prática dos fundamentos de:

Banco de Dados Relacional (PostgreSQL)

Conexão Node.js + SQL

Arquitetura MVC (Controllers, Services, Repositories)

Middlewares, validações e tratamento de erros

Variáveis de ambiente (.env)

🚦 Funcionalidades

✔️ CRUD de Jogos

Listar todos os jogos disponíveis

Cadastrar novos jogos (sem permitir nomes duplicados)

✔️ CRUD de Clientes

Listar todos os clientes

Buscar cliente por ID

Cadastrar novos clientes (CPF único)

✔️ CRUD de Aluguéis

Listar todos os aluguéis, incluindo dados do cliente e do jogo

Registrar novo aluguel (validações de estoque, cliente e jogo)

Finalizar aluguel (cálculo automático de multa por atraso)

Excluir aluguel (apenas se estiver finalizado)

⚙️ Tecnologias

Node.js

Express

PostgreSQL

dotenv

pg (PostgreSQL driver)


🔑 Principais Regras de Negócio

🚫 Jogos: nomes não podem ser duplicados.

🚫 Clientes: CPF único, telefone válido.

🚫 Aluguéis: não permite alugar jogo indisponível, calcula multa se houver atraso.

✅ Datas: datas de aluguel e devolução gerenciadas automaticamente.


📫 Rotas Principais

GET	/games	Lista todos os jogos

POST	/games	Cria novo jogo

GET	/customers	Lista todos os clientes

GET	/customers/:id	Busca cliente por ID

POST	/customers	Cria novo cliente

GET	/rentals	Lista todos os aluguéis

POST	/rentals	Cria novo aluguel

POST	/rentals/:id/return	Finaliza aluguel

DELETE	/rentals/:id	Deleta aluguel (se finalizado)


🚀 Autor
Desenvolvido por Alyson Felipe Ozório
