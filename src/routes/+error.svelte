<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status === 404 ? 'Página não encontrada' : 'Erro'} · Rapazes do Dia</title>
</svelte:head>

{#if page.status === 404}
	<h1>Página não encontrada</h1>
	<p>{page.error?.message === 'Not Found' ? 'O endereço não existe.' : page.error?.message}</p>
{:else}
	<h1>Algo deu errado</h1>
	<p>Não foi possível falar com a API ({page.error?.message}). Confira se o <code>npx json-server db.json</code> está rodando.</p>
{/if}

<p><a href={resolve('/')}>Voltar para as tarefas</a></p>
