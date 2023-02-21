<script lang="ts">
	export let name: string;
	export let size = 24;
</script>

<svg viewBox="0 0 24 24" width={size} height={size}>
	<use href={`/icons/${name}.svg#${name}`} />
</svg>
