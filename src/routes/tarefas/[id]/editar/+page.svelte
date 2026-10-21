<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { atualizarTarefa } from '#lib/api.ts';
	import FormularioTarefa from '#lib/componentes/FormularioTarefa.svelte';
	import type { NovaTarefa } from '../../../../tipos';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const detalheHref = $derived(resolve('/tarefas/[id]', { id: data.tarefa.id }));
	const inicial: NovaTarefa = $derived.by(() => {
		const { id, ...dados } = data.tarefa;
		return dados;
	});

	async function salvar(dados: NovaTarefa) {
		await atualizarTarefa(data.tarefa.id, dados);
		await goto(detalheHref, { refreshAll: true });
	}
</script>

<svelte:head>
	<title>Editar {data.tarefa.titulo} · Rapazes do Dia</title>
	<meta name="description" content="Edite os dados da tarefa {data.tarefa.id}." />
</svelte:head>

<p><a href={detalheHref}>← Voltar para a tarefa</a></p>
<h1>Editar tarefa</h1>
{#key data}
	<FormularioTarefa {inicial} projetos={data.projetos} {salvar} cancelarHref={detalheHref} textoSalvar="Salvar alterações" />
{/key}
