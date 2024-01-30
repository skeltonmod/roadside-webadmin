<script>
	// @ts-nocheck

	export let token;
	export let name;
</script>

<h4>Welome to Roadside Assistance {name}</h4>

<a href={`https://roadside-webadmin.vercel.app/api/verify/${token}`}>Click here to verify your account</a>
