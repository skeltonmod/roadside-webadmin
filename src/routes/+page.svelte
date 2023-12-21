<script>
	import { enhance } from '$app/forms';
	import Cookies from 'js-cookie';
	import { onMount } from 'svelte';

	onMount(() => {
		console.log(document.cookie.auth_session);
	})
</script>

<div class="container">
	<div class="terminal-container">
		<div class="sidebar">
			<nav>
				<ul>
					<li><a href="#NavigationList">Dashboard</a></li>
					<li><a href="#NavigationList">Members</a></li>
					<li><a href="#NavigationList">Settings</a></li>
					<li>
						<a href="#NavigationList">Profile</a>
						<ul>
							<li><a href="#NavigationList">Account</a></li>
							<li><a href="#NavigationList">Billing</a></li>
							<form method="post" action="?/logout" use:enhance>
                <li>
                  <a type="submit" href="?/logout">Logout</a>
                </li>
              </form>
						</ul>
					</li>
				</ul>
			</nav>
		</div>
		<div class="main-content">
			<!-- Main content goes here -->
			<h1>Main Content</h1>
			<p>This is the center of your application.</p>
		</div>
	</div>
</div>

<style>
	body {
		margin: 0;
	}

	.terminal-container {
		display: flex;
		height: 100vh;
	}

	.sidebar {
		width: 25%;
		color: #000;
	}

	.main-content {
		padding: 20px;
		text-align: center;
	}
</style>
