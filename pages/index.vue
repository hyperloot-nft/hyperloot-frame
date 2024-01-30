<template>
	<div>
	  home
	</div>
</template>
  
<script setup>
// import { usePreviewStore } from '@/stores/preview.js';

// const { data, pending, error, refresh } = await useFetch('/api/random', {
// 	query: { buttonIndex:3, tokenID:1 },
// });
// console.log(data.value);

// defineOgImageComponent('random', { action:'next', tokenID:'0' });

// const previewStore = usePreviewStore();
// console.log('page/index.vue');
// console.log(previewStore.tokenID);

// previewStore.$subscribe((mutation, state) => {
// 	console.log('preview subscribe');
// 	console.log(state);
// 	defineOgImageComponent('random', { action:state.action,tokenID:state.tokenID});
// });

// if (previewStore.tokenID) {
// 	defineOgImageComponent('random', { action:previewStore.action,tokenID:previewStore.tokenID});
// }

useHead({
	meta: [
		{ property: 'og:title', content: 'HyperLoot Previewer' },
		{ property: 'og:image', content: 'https://hyperlootproject.com/hyperloot-og-image-twitter.jpg' },
		{ property: 'fc:frame', content: 'vNext' },
		{ property: 'fc:frame:image', content: 'https://hyperlootproject.com/hyperloot-og-image-twitter.jpg' },
		{ property: 'fc:frame:button:1', content: '⬅️ Previous' },
		{ property: 'fc:frame:button:2', content: '➡️ Next' },
		{ property: 'fc:frame:button:3', content: '🎲 Random' },
		{ property: 'fc:frame:button:4', content: '🎨 2D/Pixel' },
		{ property: 'fc:frame:post_url', content: 'https://hyperloot-frame-preview-test.vercel.app/api/preview' },
	],
});

</script>
