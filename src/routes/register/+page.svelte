<script>
	import { enhance } from '$app/forms';
</script>

<div class="container">
	<section>
		<form method="POST" use:enhance>
			<fieldset>
				<legend>Road Side Assistance Web Admin</legend>
				<div class="form-group">
					<label for="email">Email</label>
					<input id="email" name="email" type="text" minlength="5" placeholder="test" />
				</div>
				<div class="form-group">
					<label for="pw">Password</label>
					<input
						type="password"
						placeholder="Password"
						class="input input-bordered w-full max-w-xs"
						name="password"
						required
					/>
				</div>

				<button class="btn btn-default" type="submit">Register</button>
			</fieldset>
		</form>
	</section>
</div>
