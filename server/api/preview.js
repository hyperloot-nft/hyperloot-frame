import sharp from 'sharp';

export default defineEventHandler(async (event) => {
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

	const imgResponse = await fetch(`http://images.hyperlootproject.com/${imageType}/${tokenID}.jpg`);
	if (!imgResponse.ok) {
		return new Response("Image not found", { status: 404 });
    }

	const imgBuffer = await imgResponse.arrayBuffer();
	const response = await sharp(Buffer.from(imgBuffer)).toBuffer();

	return new Response(response, {
			status: 200,
			headers: { 'Content-Type': 'image/png' }
		}
    );

	// return new Response({
	// 	image: `http://images.hyperlootproject.com/${imageType}/${tokenID}.jpg`,
	// 	post_url: 'api/preview',
	// 	buttons: ['Prev', 'Next', 'Random', 'Toggle'],
	// }, {
	// 	status: 200,
	// 	headers: {
	// 	  'Content-Type': 'image/png'
	// 	}
	//   }); 
});
