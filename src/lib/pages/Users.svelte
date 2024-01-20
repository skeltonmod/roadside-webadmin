<script>
	import { onMount } from 'svelte';
	import Cookies from 'js-cookie';
	/**
	 * @type {any[]}
	 */
	let users = [];

	onMount(async () => {
		const response = await fetch('/api/users/', {
			headers: {
				Authorization: `Bearer ${Cookies.get('auth_session')}`
			}
		});
		const data = await response.json();
		users = data;
	});

	const handleDeactivate = async (/** @type {any} */ id) => {
		users = users.filter((item) => item.id !== id);
		await fetch(`/api/users/delete/${id}`, {
			headers: {
				Authorization: `Bearer ${Cookies.get('auth_session')}`
			}
		});
	};

	const handleApproval = async (id) => {
		users = users.map((item) => {
			if (item.id == id) {
				return {
					...item,
					details: {
						...item.details,
						approved: true
					}
				};
			}

			return item;
		});

		await fetch(`/api/users/approve/${id}`, {
			headers: {
				Authorization: `Bearer ${Cookies.get('auth_session')}`
			}
		});
	};

	const handleManualActivate = async (id) => {
		users = users.map((item) => {
			if (item.id == id) {
				return {
					...item,
					email_verified: true
				};
			}

			return item;
		});

		await fetch(`/api/users/activate/${id}`, {
			headers: {
				Authorization: `Bearer ${Cookies.get('auth_session')}`
			}
		});
	}
</script>

<table style="width: 100%;">
	<caption> Users </caption>
	<thead>
		<tr>
			<th>Full Name</th>
			<th>Email</th>
			<th># of Reports</th>
			<th>Verified</th>
			<th>Role</th>
			<th>Action</th>
		</tr>
	</thead>
	<tbody>
		{#each users as user}
			<tr>
				<td>{user.details.details.firstname} {user.details.details.lastname}</td>
				<td>{user.email}</td>
				<td>{user.reporter.length}</td>
				<td>{user.email_verified ? 'Yes' : 'No'}</td>
				<td style="text-transform: capitalize">{user.details.role}</td>
				<td
					><a
						href="#Deactivate"
						on:click={() => {
							handleDeactivate(user.id);
						}}>Deactivate</a
					>
					{#if user.details.role != 'mechanic' || user.details.role != 'shop'}
						<a
							href="#Approve"
							style={`color: ${user.details.approved ? 'grey' : ''}`}
							on:click={() => {
								handleApproval(user.id);
							}}>{user.details.approved ? 'Already Approved' : 'Approve'}</a
						>
					{/if}

					{#if user.details.role != 'owner'}
						<a
							href="#Approve"
							style={`color: ${user.email_verified ? 'grey' : ''}`}
							on:click={() => {
								handleManualActivate(user.id);
							}}>{user.email_verified ? 'Activated' : 'Activate'}</a
						>
					{/if}
				</td>
			</tr>
		{/each}
	</tbody>
</table>
