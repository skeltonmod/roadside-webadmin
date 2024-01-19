<script>
	import { enhance } from '$app/forms';
	import Users from '$lib/pages/Users.svelte';
	import { onMount } from 'svelte';
	let currentTab = 1;
	const navigation = [
		{ label: 'Home', value: 1 },
		{ label: 'Users', value: 2 },
		{ label: 'Reports', value: 3 },
		{ label: 'Requests', value: 4 },
		{ label: 'Cars', value: 5 },
		{ label: 'Shops', value: 7 },
	];
</script>

<div class="container">
	<div class="components components-grid">
		<div>
			<aside id="menu" style="border-right-style: solid; border-width: 1px">
				<h3>Admin Directory</h3>
				<nav>
					<ul>
						{#each navigation as item}
							<li>
								<a
									on:click={() => {
										currentTab = item.value;
									}}
									href="/">{item.label}</a
								>
							</li>
						{/each}
					</ul>
				</nav>
			</aside>
		</div>

		<main>
			<div class="row center broider">
				<div style="margin-top: 20px; margin-bottom: 20px;">
					<Users />
				</div>
			</div>
		</main>
	</div>
</div>

<style>
	.container {
		margin: 0 auto;
		padding: 0 calc(var(--global-space) * 2);
		max-width: var(--page-width);
	}

	.components-grid {
		display: grid;
		grid-column-gap: 1.4em;
		grid-template-columns: auto;
		grid-template-rows: auto;
	}

	@media only screen and (min-width: 70em) {
		.components-grid {
			grid-template-columns: 3fr 10fr;
		}

		.components-grid aside {
			position: sticky;
			top: calc(var(--global-space) * 2);
		}
	}
</style>
