<script>
	import Users from '$lib/pages/Users.svelte';
	import Requests from '../lib/pages/Requests.svelte';
	import Reports from '../lib/pages/Reports.svelte';
	import Home from '../lib/pages/Home.svelte';
	let currentTab = 1;
	const navigation = [
		{ label: 'Users', value: 1, component: Users },
		{ label: 'Reports', value: 2, component: Reports },
		{ label: 'Requests', value: 3, component: Requests }
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

		<main style="width: 100%;">
			<div class="row center broider">
				<div style="margin-top: 20px; margin-bottom: 20px;">
					{#each navigation as item}
						<div hidden={currentTab != item.value} class="box">
							<slot>
								<svelte:component this={item.component} />
							</slot>
						</div>
					{/each}
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
