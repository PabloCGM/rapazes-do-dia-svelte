export function formatarData(data: string): string {
	return new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(
		new Date(`${data}T00:00:00Z`)
	);
}
