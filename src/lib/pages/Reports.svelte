<script>
	import { onMount } from 'svelte';
	import Cookies from 'js-cookie';
	let reports = [];

	onMount(async () => {
		const response = await fetch('/api/reports', {
			headers: {
				Authorization: `Bearer ${Cookies.get('token')}`
			}
		});
		const data = await response.json();
		reports = data;
		console.log(reports);
	});
</script>

<table style="width: 100%;">
	<caption> Requests </caption>
	<thead>
		<tr>
			<th>Reporter</th>
			<th>Reportee</th>
			<th>Reason</th>
		</tr>
	</thead>
	<tbody>
		{#each reports as item}
			<tr>
				<td>{`${item.reporter.details.details.firstname} ${item.reporter.details.details.lastname}`}</td>
				<td>{`${item.reportee.details.details.firstname} ${item.reportee.details.details.firstname}`}</td>
				<td>{item.description}</td>
			</tr>
		{/each}
	</tbody>
</table>
