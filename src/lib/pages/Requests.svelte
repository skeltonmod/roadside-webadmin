<script>
	let requests = [];
	import { onMount } from 'svelte';
	import Cookies from 'js-cookie';
	onMount(async () => {
		const response = await fetch('/api/request/all', {
			headers: {
				Authorization: `Bearer ${Cookies.get('auth_session')}`
			}
		});
		const data = await response.json();
		requests = data;
		console.log(requests);

		setInterval(() => {
			(async () => {
				const response = await fetch('/api/request/cancel-request', {
					headers: {
						Authorization: `Bearer ${Cookies.get('auth_session')}`
					}
				});

				const data = await response.json();
				console.log(data);
			})();
		}, 5 * 60 * 1000);
	});
</script>

<table style="width: 100%;">
	<caption> Requests </caption>
	<thead>
		<tr>
			<th>Car Owner</th>
			<th>Car Details</th>
			<th>Status</th>
			<th>Description</th>
			<th>Mechanic Details</th>
		</tr>
	</thead>
	<tbody>
		{#each requests as item}
			<tr>
				<td>{`${item.user.details.details.firstname} ${item.user.details.details.lastname}`}</td>
				<td>{`${item.car.color} ${item.car.brand} ${item.car.model}`}</td>
				<td style="text-transform: capitalize">{item.status}</td>
				<td style="text-transform: capitalize">{item.description}</td>
				<td
					>{`${item.mechanic.details.details.firstname} ${item.mechanic.details.details.lastname}`}</td
				>
			</tr>
		{/each}
	</tbody>
</table>
