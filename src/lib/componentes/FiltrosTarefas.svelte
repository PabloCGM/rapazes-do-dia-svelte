<script lang="ts">
	import { filtros, limparFiltros } from '../filtros.svelte';
	import { rotuloPrioridade, rotuloStatus } from '../rotulos';
</script>

<fieldset class="filtros">
	<legend>Buscar e filtrar tarefas</legend>
	<div class="campos-filtros">
		<div class="campo busca">
			<label for="busca-titulo">Buscar por título</label>
			<input id="busca-titulo" type="search" placeholder="Digite parte do título" bind:value={filtros.busca} />
		</div>
		<div class="campo">
			<label for="filtro-status">Status</label>
			<select id="filtro-status" bind:value={filtros.status}>
				<option value="">Todos os status</option>
				{#each Object.entries(rotuloStatus) as [valor, rotulo]}
					<option value={valor}>{rotulo}</option>
				{/each}
			</select>
		</div>
		<div class="campo">
			<label for="filtro-prioridade">Prioridade</label>
			<select id="filtro-prioridade" bind:value={filtros.prioridade}>
				<option value="">Todas as prioridades</option>
				{#each Object.entries(rotuloPrioridade) as [valor, rotulo]}
					<option value={valor}>{rotulo}</option>
				{/each}
			</select>
		</div>
		<button type="button" onclick={limparFiltros}>Limpar filtros</button>
	</div>
</fieldset>

<style>
	.filtros { min-width: 0; margin: 0 0 1.5rem; padding: 1rem; border: 1px solid #e2e8f0; border-radius: .75rem; background: #fff; }
	legend { padding: 0 .35rem; color: #334155; font-weight: 650; }
	.campos-filtros { display: flex; align-items: flex-end; flex-wrap: wrap; gap: 1rem; }
	.campo { display: flex; flex: 1 1 10rem; flex-direction: column; gap: .4rem; min-width: 0; }
	.campo.busca { flex: 2 1 15rem; }
	label { color: #334155; font-size: .9rem; font-weight: 650; }
	input, select, button { box-sizing: border-box; min-height: 2.75rem; padding: .6rem .75rem; border: 1px solid #94a3b8; border-radius: .5rem; background: #fff; color: #0f172a; font: inherit; }
	input, select { width: 100%; }
	button { cursor: pointer; }
	button:hover { background: #f1f5f9; }
	input:focus-visible, select:focus-visible, button:focus-visible { outline: 3px solid #1d4ed8; outline-offset: 3px; }
</style>
