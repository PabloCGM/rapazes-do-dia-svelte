<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { criarTarefa } from '#lib/api.ts';
	import FormularioTarefa from '#lib/componentes/FormularioTarefa.svelte';
	import type { NovaTarefa } from '../../../tipos';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	type InicialTarefa = Omit<NovaTarefa, 'prioridade'> & { prioridade: '' };
	const inicial: InicialTarefa = $derived({
		projetoId: data.projetoId, titulo: '', descricao: '', status: 'a-fazer',
		prioridade: '', responsavel: '', prazo: ''
	});

	async function salvar(dados: NovaTarefa) {
		await criarTarefa(dados);
		await goto(resolve('/'), { refreshAll: true });
	}
</script>

<svelte:head>
	<title>Nova tarefa · Rapazes do Dia</title>
	<meta name="description" content="Cadastre uma tarefa e vincule-a a um projeto." />
</svelte:head>

<p><a href={resolve('/')}>← Voltar para as tarefas</a></p>
<h1>Nova tarefa</h1>
{#key data}
	<FormularioTarefa {inicial} projetos={data.projetos} {salvar} cancelarHref={resolve('/')} textoSalvar="Criar tarefa" />
{/key}
