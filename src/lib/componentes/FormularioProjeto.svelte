<script lang="ts">
	import { untrack } from 'svelte';
	import type { NovoProjeto } from '#lib/api.ts';

	/** Campos que a pessoa preenche; `criadoEm` é definido pela tela de cadastro. */
	type DadosProjeto = Pick<NovoProjeto, 'nome' | 'descricao' | 'disciplina'>;
	type CampoObrigatorio = 'nome' | 'disciplina';

	let { inicial, salvar, cancelarHref, textoSalvar }: {
		inicial: DadosProjeto;
		salvar: (dados: DadosProjeto) => Promise<void>;
		cancelarHref: string;
		textoSalvar: string;
	} = $props();

	let dados = $state(untrack(() => ({ ...inicial })));
	let salvando = $state(false);
	let erro = $state('');
	let tentouEnviar = $state(false);

	/** Mensagem de cada campo inválido; só aparece depois da primeira tentativa de envio. */
	const erros = $derived.by(() => {
		const lista: Partial<Record<CampoObrigatorio, string>> = {};
		if (!dados.nome.trim()) lista.nome = 'Informe o nome do projeto.';
		else if (dados.nome.trim().length > 80) lista.nome = 'Use no máximo 80 caracteres no nome.';
		if (!dados.disciplina.trim()) lista.disciplina = 'Informe a disciplina do projeto.';
		return lista;
	});
	const visiveis = $derived(tentouEnviar ? erros : {});
	const quantidadeErros = $derived(Object.keys(visiveis).length);

	async function enviar(evento: SubmitEvent) {
		evento.preventDefault();
		if (salvando) return;
		erro = '';
		tentouEnviar = true;
		const primeiro = (Object.keys(erros) as CampoObrigatorio[])[0];
		if (primeiro) {
			document.getElementById(primeiro)?.focus();
			return;
		}
		salvando = true;
		try {
			await salvar({ nome: dados.nome.trim(), descricao: dados.descricao.trim(), disciplina: dados.disciplina.trim() });
		} catch {
			erro = 'Não foi possível salvar o projeto. Confira se a API está disponível e tente novamente.';
		} finally {
			salvando = false;
		}
	}
</script>

<form onsubmit={enviar} aria-busy={salvando} novalidate>
	<p class="orientacao">Os campos com <abbr title="obrigatório">*</abbr> são obrigatórios.</p>
	<div role="alert">
		{#if quantidadeErros > 0}
			<p class="mensagem"><strong>Erro:</strong> corrija {quantidadeErros === 1 ? 'o campo indicado' : `os ${quantidadeErros} campos indicados`} antes de salvar.</p>
		{:else if erro}
			<p class="mensagem"><strong>Erro:</strong> {erro}</p>
		{/if}
	</div>
	<p class="sr-only" role="status">{salvando ? 'Salvando o projeto…' : ''}</p>
	<fieldset disabled={salvando}>
		<legend class="sr-only">Dados do projeto</legend>
		<div class="campo" class:invalido={visiveis.nome}>
			<label for="nome">Nome *</label>
			<input id="nome" name="nome" bind:value={dados.nome} required maxlength="80" autocomplete="off"
				aria-invalid={visiveis.nome ? 'true' : undefined} aria-describedby={visiveis.nome ? 'nome-erro' : undefined} />
			{#if visiveis.nome}<p id="nome-erro" class="erro-campo"><span aria-hidden="true">⚠</span> {visiveis.nome}</p>{/if}
		</div>
		<div class="campo" class:invalido={visiveis.disciplina}>
			<label for="disciplina">Disciplina *</label>
			<input id="disciplina" name="disciplina" bind:value={dados.disciplina} required autocomplete="off"
				aria-invalid={visiveis.disciplina ? 'true' : undefined} aria-describedby={visiveis.disciplina ? 'disciplina-erro' : undefined} />
			{#if visiveis.disciplina}<p id="disciplina-erro" class="erro-campo"><span aria-hidden="true">⚠</span> {visiveis.disciplina}</p>{/if}
		</div>
		<div class="campo">
			<label for="descricao">Descrição</label>
			<textarea id="descricao" name="descricao" rows="4" bind:value={dados.descricao}></textarea>
		</div>
		<div class="acoes">
			<button type="submit">{salvando ? 'Salvando…' : textoSalvar}</button>
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
	input, textarea { box-sizing: border-box; width: 100%; min-width: 0; padding: .7rem .8rem; border: 1px solid #cbd5e1; border-radius: .5rem; background: #fff; color: #0f172a; font: inherit; }
	textarea { resize: vertical; }
	.acoes { display: flex; align-items: center; flex-wrap: wrap; gap: 1.25rem; padding-top: .5rem; }
	button { padding: .75rem 1rem; border: 0; border-radius: .5rem; background: #2563eb; color: #fff; font: inherit; font-weight: 650; cursor: pointer; }
	button:hover { background: #1d4ed8; }
	fieldset:disabled button { opacity: .65; cursor: wait; }
	a { color: #2563eb; }
	input:focus-visible, textarea:focus-visible, button:focus-visible, a:focus-visible { outline: 3px solid #1d4ed8; outline-offset: 3px; }
	.mensagem { padding: 1rem; border: 1px solid #fecaca; border-left-width: .35rem; border-radius: .5rem; background: #fef2f2; color: #991b1b; line-height: 1.5; }
	.invalido input { border: 2px solid #b91c1c; }
	.erro-campo { margin: 0; color: #991b1b; font-size: .9rem; font-weight: 600; }
	abbr { text-decoration: none; }
	.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
</style>
