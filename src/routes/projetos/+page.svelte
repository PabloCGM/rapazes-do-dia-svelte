<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { formatarData } from '#lib/formatarData.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head><title>Projetos | Rapazes do Dia</title></svelte:head>

<h1>Projetos</h1>
<p>Conheça os projetos da equipe e acompanhe suas tarefas.</p>

{#if data.erro}
	<div class="mensagem erro" role="alert">
		<p>{data.erro}</p>
		<button onclick={() => invalidateAll()}>Tentar novamente</button>
	</div>
{:else if data.projetos.length === 0}
	<p class="mensagem">Nenhum projeto cadastrado.</p>
{:else}
	<ul class="grade">
		{#each data.projetos as projeto (projeto.id)}
			<li>
				<article>
					<p class="disciplina">{projeto.disciplina}</p>
					<h2><a href={resolve('/projetos/[id]', { id: projeto.id })}>{projeto.nome}</a></h2>
					<p>{projeto.descricao}</p>
					<p class="data">Criado em <time datetime={projeto.criadoEm}>{formatarData(projeto.criadoEm)}</time></p>
				</article>
			</li>
		{/each}
	</ul>
{/if}

<style>
	article {
		height: 100%;
		box-sizing: border-box;
		padding: 1.5rem;
		border: 1px solid #d1d5db;
		border-radius: 0.75rem;
		background: white;
		overflow-wrap: anywhere;
	}
	article h2 {
		margin: 0.75rem 0;
		font-size: 1.25rem;
	}
	article p {
		line-height: 1.6;
	}
	.disciplina {
		margin: 0;
		color: #4b5563;
		font-size: 0.875rem;
	}
	.data {
		margin-bottom: 0;
		color: #4b5563;
		font-size: 0.875rem;
	}
</style>
