<script lang="ts">
	export let name: string;
</script>

<svg viewBox="0 0 24 24" width="24" height="24">
	<use href={`/icons/${name}.svg#${name}`} />
</svg>
