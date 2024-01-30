export default defineEventHandler((event) => {
	const query = getQuery(event);
	console.log('api/preview.js');
	console.log(query);
	const buttonIndex = parseInt(query.buttonIndex);
	let tokenID = 1;
	let imageType = 'nft';

	if (buttonIndex === 1) {
		tokenID = 19993;
	} else if (buttonIndex === 2) {
		tokenID = 3;
	} else if (buttonIndex === 3) {
		tokenID = Math.floor(Math.random() * (8585 - 1 + 1) + 1);
	} 
	
	if (buttonIndex === 4) {
		imageType = 'character';
	}

	return new Response({
		image: `http://images.hyperlootproject.com/${imageType}/${tokenID}.jpg`,
		post_url: 'api/preview',
		buttons: ['Prev', 'Next', 'Random', 'Toggle'],
	}, {
		status: 200,
		headers: {
		  'Content-Type': 'image/png'
		}
	  }); 
});
