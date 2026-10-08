# Rapazes do Dia

Projeto em equipe da disciplina de Desenvolvimento Frontend (ULBRA, 2026.2), com a Profª Marianne Lacerda Dutra Theodoro.

**Equipe:** Rapazes do Dia
**Framework:** Svelte 5 (SvelteKit), com TypeScript

## Integrantes

- Pablo Caldeira Gomes Monteiro
- Gabriel Messias Freire Garrido 
- Yuri Soares de Oliveira
- Márcio Ribeiro

## Como rodar

Pré-requisito: Node.js 24 LTS (`node -v` deve começar com `v24` ou mais).

```sh
npm install
npm run dev               # app em http://localhost:5173
npx json-server db.json   # API em http://localhost:3000 (em outro terminal)
```

`npm run api` é um atalho para o mesmo comando do json-server.

A página inicial mostra se a API está no ar e quantos projetos e tarefas ela devolve.

## Estrutura

| Arquivo | O que tem |
| --- | --- |
| `db.json` | Dados da API local (`projetos` e `tarefas`), do guia da Aula 09 |
| `db.seed.json` | Cópia intacta do `db.json`, para voltar aos dados originais |
| `src/tipos.ts` | Contrato da disciplina: `Status`, `Prioridade`, `Projeto`, `Tarefa`, `NovaTarefa` |
| `src/lib/api.ts` | Funções `fetch` tipadas para a API |
| `src/routes/` | Páginas do SvelteKit |

## Rotas da API

| Requisição | Resultado |
| --- | --- |
| `GET /tarefas?status=a-fazer` | Filtra por igualdade |
| `GET /tarefas?_sort=-prazo` | Ordena; o `-` inverte |
| `GET /projetos/1?_embed=tarefas` | Projeto com as tarefas dentro |
| `POST /tarefas` | Devolve a tarefa com `id` gerado |
| `GET /tarefas/999` | 404 |

Cada `POST`, `PUT`, `PATCH` e `DELETE` grava direto no `db.json`. Para voltar aos dados originais:

```sh
cp db.seed.json db.json
```

O contrato (`db.json` e `src/tipos.ts`) é o mesmo para a turma inteira: não renomeiem campos nem alterem os ids.

## Outros comandos

```sh
npm run check    # confere os tipos (svelte-check)
npm run build    # gera o build de produção
npm run preview  # serve o build
```
