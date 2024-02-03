<script>
	import { onMount } from 'svelte';
	import Cookies from 'js-cookie';
	import Modal from '../Components/Modal.svelte';
	let showModal = false;
	let image = null;
	/**
	 * @type {any[]}
	 */
	let users = [];

	onMount(async () => {
		const response = await fetch('/api/users/', {
			headers: {
				Authorization: `Bearer ${Cookies.get('token')}`
			}
		});
		const data = await response.json();
		users = data;
	});

	const handleDeactivate = async (/** @type {any} */ id) => {
		users = users.filter((item) => item.id !== id);
		await fetch(`/api/users/delete/${id}`, {
			headers: {
				Authorization: `Bearer ${Cookies.get('token')}`
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
				Authorization: `Bearer ${Cookies.get('token')}`
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
				Authorization: `Bearer ${Cookies.get('token')}`
			}
		});
	};
</script>

<Modal bind:showModal>
	{#if !image}
		<p>No document image provided</p>
	{:else}
		<img alt="what ze fack" src={image} />
	{/if}
</Modal>

<table style="width: 100%;">
	<caption> Users </caption>
	<thead>
		<tr>
			<th>Full Name</th>
			<th>Email</th>
			<th># of Reports</th>
			<th>Verified</th>
			<th>Role</th>
			<th>Rating</th>
			<th>Document</th>
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
				<td>{`${parseInt(user.rating)} Star/s`}</td>
				<td style="text-transform: capitalize"
					><a
						href="#image"
						on:click={() => {
							showModal = true;
							image = user.document_image;
						}}>View</a
					></td
				>
				<td
					><a
						href="#Deactivate"
						style={`color: ${user.deactivated ? 'grey' : ''}`}
						on:click={() => {
							if(user.deactivated){
								return;
							}
							handleDeactivate(user.id);
						}}>{user.deactivated ? 'Deactivated' : 'Deactivate'}</a
					>
					{#if user.details.role != 'mechanic' || user.details.role != 'shop'}
						<a
							href="#Approve"
							style={`color: ${user.details.approved ? 'grey' : ''}`}
							on:click={() => {
								if (user.details.approved) {
									return;
								}
								handleApproval(user.id);
							}}>{user.details.approved ? 'Already Approved' : 'Approve'}</a
						>
					{/if}

					{#if user.details.role != 'owner'}
						<a
							href="#Approve"
							style={`color: ${user.email_verified ? 'grey' : ''}`}
							on:click={() => {
								if (user.email_verified) {
									return;
								}
								handleManualActivate(user.id);
							}}>{user.email_verified ? 'Activated' : 'Activate'}</a
						>
					{/if}
				</td>
			</tr>
		{/each}
	</tbody>
</table>
