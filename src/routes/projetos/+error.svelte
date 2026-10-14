<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
</script>

<svelte:head><title>{page.status} | Rapazes do Dia</title></svelte:head>

<h1>{page.status === 404 ? 'Projeto não encontrado' : 'Não foi possível abrir a página'}</h1>
<p class="mensagem">{page.error?.message}</p>
<a href={resolve('/projetos')}>← Voltar para projetos</a>
