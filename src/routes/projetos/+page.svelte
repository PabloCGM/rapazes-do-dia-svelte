<script lang="ts">
	import { resolve } from '$app/paths';
	import { formatarData } from '#lib/rotulos.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Projetos · Rapazes do Dia</title>
</svelte:head>

<h1>Projetos</h1>

<ul>
	{#each data.projetos as projeto (projeto.id)}
		<li>
			<h2><a href={resolve('/projetos/[id]', { id: projeto.id })}>{projeto.nome}</a></h2>
			<p>{projeto.descricao}</p>
			<p class="meta">{projeto.disciplina} · criado em {formatarData(projeto.criadoEm)}</p>
		</li>
	{/each}
</ul>

<style>
	ul {
		list-style: none;
		padding: 0;
		display: grid;
		gap: 1rem;
	}
	li {
		border: 1px solid #d4d4d8;
		border-radius: 0.5rem;
		padding: 1rem;
		background: #fff;
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
</style>
