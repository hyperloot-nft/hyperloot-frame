<script setup>
const config = useRuntimeConfig();

useHead({
	title: 'HyperLoot Frame',
	description: 'HyperLoot: Farcaster | Warpcast Frame',
	meta: [
		{ property: 'og:title', content: 'HyperLoot Frame' },
		{ property: 'og:description', content: 'HyperLoot: Farcaster | Warpcast Frame' },
		{ property: 'og:image', content: 'https://hyperlootproject.com/hyperloot-og-image-twitter.jpg' },
		{ property: 'fc:frame', content: 'vNext' },
		{ property: 'fc:frame:image', content: 'https://hyperlootproject.com/hyperloot-og-image-twitter.jpg' },
		{ property: 'fc:frame:button:1', content: '🎲 Random' },
		{ property: 'fc:frame:post_url', content: `${config.public.domain}/api/preview?type=nft` },
	],
});

</script>


<template>
  <div class="app">
	Follow  <a href="https://warpcast.com/hyperloot" target="_blank">@hyperloot</a>
	<NuxtPage />
  </div>
</template>

<style>
body {
	margin: 0;
}

a {
	margin-left: 5px;
	color: #F3BA14;
}

.app {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100vh;
	font-family: 'BluuNext-Bold';
	font-size: 22px;
	text-align: center;
	background-color: #15161A;
	color: #ffffff;
}
</style>