<script lang="ts">
	import { resolve } from '$app/paths';
	import { invalidateAll } from '$app/navigation';
	import { formatarData } from '#lib/rotulos.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Projetos · Rapazes do Dia</title>
</svelte:head>

<h1>Projetos</h1>
<p>Escolha um projeto para consultar seus dados e acompanhar suas tarefas.</p>

{#if data.erro}
	<div class="mensagem erro" role="alert">
		<p>{data.erro}</p>
		<button onclick={() => invalidateAll()}>Tentar novamente</button>
	</div>
{:else if data.projetos.length === 0}
	<p class="mensagem">Nenhum projeto cadastrado.</p>
{:else}
	<ul aria-label="Projetos">
		{#each data.projetos as projeto (projeto.id)}
			<li>
				<h2><a href={resolve('/projetos/[id]', { id: projeto.id })}>{projeto.nome}</a></h2>
				<p>{projeto.descricao}</p>
				<p class="meta">{projeto.disciplina} · criado em {formatarData(projeto.criadoEm)}</p>
			</li>
		{/each}
	</ul>
{/if}

<style>
	ul {
		list-style: none;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 19rem), 1fr));
		gap: 1rem;
	}
	li {
		border: 1px solid #d4d4d8;
		border-radius: 0.5rem;
		padding: 1rem;
		background: #fff;
		overflow-wrap: anywhere;
	}
	h2 {
		margin: 0 0 0.25rem;
		font-size: 1.15rem;
	}
	p {
		margin: 0.25rem 0;
	}
	.meta {
		color: #52525b;
		font-size: 0.9rem;
	}
	.mensagem {
		padding: 1rem;
		border: 1px solid #d4d4d8;
		border-radius: 0.5rem;
		background: #fff;
	}
	.erro {
		color: #991b1b;
		border-color: #fecaca;
		background: #fef2f2;
	}
	button {
		margin-top: 0.75rem;
		padding: 0.5rem 0.75rem;
		border: 1px solid currentColor;
		border-radius: 0.375rem;
		background: #fff;
		color: #18181b;
		font: inherit;
		cursor: pointer;
	}
	a:focus-visible, button:focus-visible {
		outline: 3px solid #1d4ed8;
		outline-offset: 3px;
	}
</style>
