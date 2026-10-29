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

Na lista principal, **Buscar por título** filtra enquanto você digita, sem diferenciar maiúsculas ou acentos e ignorando espaços nas extremidades. Os seletores de **Status** e **Prioridade** se combinam entre si e com a busca: uma tarefa só aparece quando atende aos três critérios. A contagem acompanha os resultados, e **Limpar filtros** restaura a lista completa. A filtragem acontece na interface, sem alterar os dados da API.

A busca e os filtros ficam num estado único (`src/lib/filtros.svelte.ts`), usado pela lista e pelo quadro. O alternador **Lista | Quadro**, no topo das duas telas, troca de visão mantendo a busca e os filtros aplicados; no quadro, as colunas mostram só as tarefas que passam neles.

Rotas do app: `/` (lista de tarefas), `/quadro` (tarefas agrupadas por status), `/tarefas/nova` (cadastro), `/tarefas/:id` (detalhe), `/tarefas/:id/editar` (edição), `/projetos`, `/projetos/novo` (cadastro), `/projetos/:id` (projeto com suas tarefas) e `/projetos/:id/editar` (edição). Endereços inexistentes mostram a tela de página não encontrada.

Nos cartões da lista, do quadro e dos projetos, o status pode ser alterado pelo seletor; a mudança é salva na API. No quadro, o cartão aparece imediatamente na coluna do novo status.

Use **Nova tarefa** na lista ou **Nova tarefa neste projeto** na página de um projeto. Nesse segundo caso, `/tarefas/nova?projetoId=2`, por exemplo, já seleciona o projeto correspondente. O cadastro grava na API e retorna à lista atualizada. Use **Editar tarefa** no detalhe para carregar os dados atuais; salvar retorna ao detalhe atualizado e cancelar descarta as alterações do formulário. Projetos seguem o mesmo fluxo: **Novo projeto** na lista de projetos e **Editar projeto** na página de cada um.

Os formulários validam os campos obrigatórios (tarefa: título e projeto; projeto: nome e disciplina) ao enviar, mostram o erro junto ao campo, levam o foco ao primeiro campo inválido e bloqueiam o botão durante o envio. A API precisa estar rodando para carregar e salvar os dados.

## Estrutura

| Arquivo | O que tem |
| --- | --- |
| `db.json` | Dados da API local (`projetos` e `tarefas`), do guia da Aula 09 |
| `db.seed.json` | Cópia intacta do `db.json`, para voltar aos dados originais |
| `src/tipos.ts` | Contrato da disciplina: `Status`, `Prioridade`, `Projeto`, `Tarefa`, `NovaTarefa` |
| `src/lib/api.ts` | Funções `fetch` tipadas para ler, criar e atualizar tarefas e projetos |
| `src/lib/componentes/FormularioTarefa.svelte` | Formulário compartilhado de cadastro e edição de tarefa, com validação, erros por campo e estado de salvamento |
| `src/lib/componentes/FormularioProjeto.svelte` | O mesmo para projeto (nome, disciplina e descrição) |
| `src/lib/componentes/CartaoTarefa.svelte` | Cartão com título, status, prioridade, responsável e prazo |
| `src/lib/rotulos.ts` | Rótulos de status/prioridade e formatação de data |
| `src/routes/` | Páginas do SvelteKit |

## Rotas da API

| Requisição | Resultado |
| --- | --- |
| `GET /tarefas?status=a-fazer` | Filtra por igualdade |
| `GET /tarefas?_sort=-prazo` | Ordena; o `-` inverte |
| `GET /projetos/1?_embed=tarefas` | Projeto com as tarefas dentro |
| `POST /tarefas` | Devolve a tarefa com `id` gerado |
| `PATCH /tarefas/:id` | Salva os campos editados sem substituir o identificador |
| `POST /projetos` e `PATCH /projetos/:id` | O mesmo para projetos |
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
