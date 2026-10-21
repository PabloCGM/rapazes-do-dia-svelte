<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { criarProjeto } from '#lib/api.ts';
	import FormularioProjeto from '#lib/componentes/FormularioProjeto.svelte';

	const inicial = { nome: '', descricao: '', disciplina: '' };

	/** Data local no formato AAAA-MM-DD, o mesmo do `criadoEm` do db.json. */
	function hoje() {
		const agora = new Date();
		return new Date(agora.getTime() - agora.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
	}

	async function salvar(dados: typeof inicial) {
		const projeto = await criarProjeto({ ...dados, criadoEm: hoje() });
		await goto(resolve('/projetos/[id]', { id: projeto.id }), { refreshAll: true });
	}
</script>

<svelte:head>
	<title>Novo projeto · Rapazes do Dia</title>
	<meta name="description" content="Cadastre um projeto para organizar suas tarefas." />
</svelte:head>

<p><a href={resolve('/projetos')}>← Voltar para os projetos</a></p>
<h1>Novo projeto</h1>
<FormularioProjeto {inicial} {salvar} cancelarHref={resolve('/projetos')} textoSalvar="Criar projeto" />
