<script lang="ts">
	import { untrack } from 'svelte';
	import { rotuloPrioridade, rotuloStatus } from '#lib/rotulos.ts';
	import type { NovaTarefa, Prioridade, Projeto, Status } from '../../tipos';

	let { inicial, projetos, salvar, cancelarHref, textoSalvar }: {
		inicial: NovaTarefa;
		projetos: Projeto[];
		salvar: (dados: NovaTarefa) => Promise<void>;
		cancelarHref: string;
		textoSalvar: string;
	} = $props();

	type CampoObrigatorio = 'titulo' | 'projetoId';

	let dados = $state(untrack(() => ({ ...inicial })));
	let salvando = $state(false);
	let erro = $state('');
	let tentouEnviar = $state(false);
	const status = Object.entries(rotuloStatus) as [Status, string][];
	const prioridades = Object.entries(rotuloPrioridade) as [Prioridade, string][];

	/** Mensagem de cada campo inválido; só aparece depois da primeira tentativa de envio. */
	const erros = $derived.by(() => {
		const lista: Partial<Record<CampoObrigatorio, string>> = {};
		if (!dados.titulo.trim()) lista.titulo = 'Informe o título da tarefa.';
		else if (dados.titulo.trim().length > 120) lista.titulo = 'Use no máximo 120 caracteres no título.';
		if (!projetos.some((projeto) => projeto.id === dados.projetoId)) lista.projetoId = 'Selecione o projeto da tarefa.';
		return lista;
	});
	const visiveis = $derived(tentouEnviar ? erros : {});
	const quantidadeErros = $derived(Object.keys(visiveis).length);

	const idCampo: Record<CampoObrigatorio, string> = { titulo: 'titulo', projetoId: 'projeto' };

	async function enviar(evento: SubmitEvent) {
		evento.preventDefault();
		if (salvando) return;
		erro = '';
		tentouEnviar = true;
		const primeiro = (Object.keys(erros) as CampoObrigatorio[])[0];
		if (primeiro) {
			document.getElementById(idCampo[primeiro])?.focus();
			return;
		}
		salvando = true;
		try {
			await salvar({ ...dados, titulo: dados.titulo.trim(), descricao: dados.descricao.trim(), responsavel: dados.responsavel.trim() });
		} catch {
			erro = 'Não foi possível salvar a tarefa. Confira se a API está disponível e tente novamente.';
		} finally {
			salvando = false;
		}
	}
</script>

<form onsubmit={enviar} aria-busy={salvando} novalidate>
	<p class="orientacao">Os campos com <abbr title="obrigatório">*</abbr> são obrigatórios.</p>
	{#if projetos.length === 0}
		<p class="mensagem" role="alert">É necessário ter um projeto cadastrado para salvar uma tarefa.</p>
	{/if}
	<div role="alert">
		{#if quantidadeErros > 0}
			<p class="mensagem"><strong>Erro:</strong> corrija {quantidadeErros === 1 ? 'o campo indicado' : `os ${quantidadeErros} campos indicados`} antes de salvar.</p>
		{:else if erro}
			<p class="mensagem"><strong>Erro:</strong> {erro}</p>
		{/if}
	</div>
	<p class="sr-only" role="status">{salvando ? 'Salvando a tarefa…' : ''}</p>
	<fieldset disabled={salvando}>
		<legend class="sr-only">Dados da tarefa</legend>
		<div class="campo" class:invalido={visiveis.titulo}>
			<label for="titulo">Título *</label>
			<input id="titulo" name="titulo" bind:value={dados.titulo} required maxlength="120" autocomplete="off"
				aria-invalid={visiveis.titulo ? 'true' : undefined} aria-describedby={visiveis.titulo ? 'titulo-erro' : undefined} />
			{#if visiveis.titulo}<p id="titulo-erro" class="erro-campo"><span aria-hidden="true">⚠</span> {visiveis.titulo}</p>{/if}
		</div>
		<div class="campo" class:invalido={visiveis.projetoId}>
			<label for="projeto">Projeto *</label>
			<select id="projeto" name="projetoId" bind:value={dados.projetoId} required
				aria-invalid={visiveis.projetoId ? 'true' : undefined} aria-describedby={visiveis.projetoId ? 'projeto-erro' : undefined}>
				<option value="" disabled>Selecione um projeto</option>
				{#each projetos as projeto (projeto.id)}
					<option value={projeto.id}>{projeto.nome}</option>
				{/each}
			</select>
			{#if visiveis.projetoId}<p id="projeto-erro" class="erro-campo"><span aria-hidden="true">⚠</span> {visiveis.projetoId}</p>{/if}
		</div>
		<div class="campo">
			<label for="descricao">Descrição</label>
			<textarea id="descricao" name="descricao" rows="4" bind:value={dados.descricao}></textarea>
		</div>
		<div class="colunas">
			<div class="campo">
				<label for="status">Status</label>
				<select id="status" name="status" bind:value={dados.status}>
					{#each status as [valor, rotulo]}<option value={valor}>{rotulo}</option>{/each}
				</select>
			</div>
			<div class="campo">
				<label for="prioridade">Prioridade</label>
				<select id="prioridade" name="prioridade" bind:value={dados.prioridade}>
					{#each prioridades as [valor, rotulo]}<option value={valor}>{rotulo}</option>{/each}
				</select>
			</div>
			<div class="campo">
				<label for="responsavel">Responsável</label>
				<input id="responsavel" name="responsavel" bind:value={dados.responsavel} />
			</div>
			<div class="campo">
				<label for="prazo">Prazo</label>
				<input id="prazo" name="prazo" type="date" bind:value={dados.prazo} />
			</div>
		</div>
		<div class="acoes">
			<button type="submit" disabled={projetos.length === 0}>{salvando ? 'Salvando…' : textoSalvar}</button>
			{#if !salvando}<a href={cancelarHref}>Cancelar</a>{/if}
		</div>
	</fieldset>
</form>

<style>
	form { max-width: 44rem; padding: clamp(1rem, 4vw, 2rem); border: 1px solid #e2e8f0; border-radius: 1rem; background: #fff; box-shadow: 0 4px 16px rgb(15 23 42 / 5%); }
	.orientacao { margin: 0 0 1.5rem; color: #64748b; font-size: .9rem; }
	fieldset { display: grid; gap: 1.25rem; min-width: 0; margin: 0; padding: 0; border: 0; }
	.campo { display: grid; gap: .45rem; min-width: 0; }
	label { color: #334155; font-weight: 650; }
	input, select, textarea { box-sizing: border-box; width: 100%; min-width: 0; padding: .7rem .8rem; border: 1px solid #cbd5e1; border-radius: .5rem; background: #fff; color: #0f172a; font: inherit; }
	textarea { resize: vertical; }
	.colunas { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.25rem; }
	.acoes { display: flex; align-items: center; flex-wrap: wrap; gap: 1.25rem; padding-top: .5rem; }
	button { padding: .75rem 1rem; border: 0; border-radius: .5rem; background: #2563eb; color: #fff; font: inherit; font-weight: 650; cursor: pointer; }
	button:hover { background: #1d4ed8; }
	button:disabled, fieldset:disabled button { opacity: .65; cursor: wait; }
	a { color: #2563eb; }
	input:focus-visible, select:focus-visible, textarea:focus-visible, button:focus-visible, a:focus-visible { outline: 3px solid #1d4ed8; outline-offset: 3px; }
	.mensagem { padding: 1rem; border: 1px solid #fecaca; border-left-width: .35rem; border-radius: .5rem; background: #fef2f2; color: #991b1b; line-height: 1.5; }
	.invalido input, .invalido select { border: 2px solid #b91c1c; }
	.erro-campo { margin: 0; color: #991b1b; font-size: .9rem; font-weight: 600; }
	abbr { text-decoration: none; }
	.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
	@media (max-width: 36rem) { .colunas { grid-template-columns: 1fr; } }
</style>
