<script>
	// @ts-nocheck

	export let token;
	export let name;
</script>

<h4>Welome to Roadside Assistance {name}</h4>

<a href={`http://localhost:5173/api/verify/${token}`}>Click here to verify your account</a>
