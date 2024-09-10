<svelte:head>
	<title>Contact me</title>
</svelte:head>
<h1>Contact</h1>
<form action="mailto:foo@example.com">
	<span>
		<label for="subject">Subject</label>
		<input type="text" name="subject" />
	</span>
	<span>
		<label for="body">Body </label>
		<textarea name="body" id="" cols="30" rows="10"></textarea>
	</span>
	<button type="submit">Submit</button>
</form>
