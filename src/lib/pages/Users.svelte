<script>
	import { onMount } from "svelte";
    import Cookies from 'js-cookie'
	/**
	 * @type {any[]}
	 */
	let users = [];

    onMount(async () => {
        const response = await fetch('/api/users/', {
            headers: {
                'Authorization': `Bearer ${Cookies.get('auth_session')}`
            }
        });
        const data = await response.json();
        users = data;
    })

    const handleDeactivate = async (/** @type {any} */ id) => {
        await fetch(`/api/users/delete/${id}`, {
            headers: {
                'Authorization': `Bearer ${Cookies.get('auth_session')}`
            }
        });
    }
</script>

<table>
	<caption> Users </caption>
	<tfoot>
		<!-- <tr>
			<th colspan="6"
				><a href="https://en.wikipedia.org/wiki/Traditional_colors_of_Japan" target="_blank"
					>Source: Wikipedia</a
				></th
			>
		</tr> -->
	</tfoot>
	<tbody> </tbody><thead>
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
                <td><a href="#Deactivate" on:click={() => {handleDeactivate(user.id)}}>Deactivate</a></td>
            </tr>
        {/each}
	</tbody>
</table>
