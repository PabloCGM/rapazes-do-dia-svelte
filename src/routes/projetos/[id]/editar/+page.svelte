<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { atualizarProjeto, type NovoProjeto } from '#lib/api.ts';
	import FormularioProjeto from '#lib/componentes/FormularioProjeto.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const projetoHref = $derived(resolve('/projetos/[id]', { id: data.projeto.id }));
	const inicial = $derived({ nome: data.projeto.nome, descricao: data.projeto.descricao, disciplina: data.projeto.disciplina });

	async function salvar(dados: Pick<NovoProjeto, 'nome' | 'descricao' | 'disciplina'>) {
		// PATCH só com os campos do formulário: `id` e `criadoEm` ficam como estão.
		await atualizarProjeto(data.projeto.id, dados);
		await goto(projetoHref, { refreshAll: true });
	}
</script>

<svelte:head>
	<title>Editar {data.projeto.nome} · Rapazes do Dia</title>
	<meta name="description" content="Edite os dados do projeto {data.projeto.nome}." />
</svelte:head>

<p><a href={projetoHref}>← Voltar para o projeto</a></p>
<h1>Editar projeto</h1>
{#key data}
	<FormularioProjeto {inicial} {salvar} cancelarHref={projetoHref} textoSalvar="Salvar alterações" />
{/key}
