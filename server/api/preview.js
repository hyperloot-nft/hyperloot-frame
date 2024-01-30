import sharp from 'sharp';

export default defineEventHandler(async (event) => {
	const query = getQuery(event);
	console.log('api/preview.js');
	console.log(query);
	const body = await readBody(event);
	console.log(body);
	const buttonIndex = parseInt(body.untrustedData.buttonIndex);
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

	return new Response(`
		<!DOCTYPE html>
		<html>
		<head>
			<meta property="fc:frame" content="vNext" />
			<meta property="fc:frame:image" content="http://images.hyperlootproject.com/${imageType}/${tokenID}.jpg" />
			<meta property="fc:button:1" content="⬅️ Previous" />
			<meta property="fc:button:2" content="➡️ Next" />
			<meta property="fc:button:3" content="🎲 Random" />
			<meta property="fc:button:4" content="🎨 2D/Pixel" />
			<meta property="fc:post_url" content="https://hyperloot-frame-preview.vercel.app/api/preview" />
		</head>
		</html>
	`, {
			status: 200,
			headers: { 'Content-Type': 'text/html' },
		}
    );

	// const imgResponse = await fetch(`http://images.hyperlootproject.com/${imageType}/${tokenID}.jpg`);
	// if (!imgResponse.ok) {
	// 	return new Response("Image not found", { status: 404 });
    // }

	// const imgBuffer = await imgResponse.arrayBuffer();
	// const response = await sharp(Buffer.from(imgBuffer)).toBuffer();

	// return new Response(response, {
	// 		status: 200,
	// 		headers: { 'Content-Type': 'image/png' }
	// 	}
    // );

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


    // const html = `
    //     <html>
    //     <head>
    //     <style>
    //     </style>
    //     </head>
    //     <body>
    //     <fc-frame>
	// 		<div style="width:100%; height:100%; background-color:#000;">
	// 			<img v-if="tokenID" src="http://images.hyperlootproject.com/${imageType}/${tokenID}.jpg" style="height: 100%; width: 100%; object-fit: contain">
	// 		</div>
    //     </fc-frame>
    //     </body>
    // </html>
    // `

    // return new Response(html,
    //     {
    //         status: 200,
    //         headers: { 'Content-Type': 'text/html' },
    //     }
    // );
});
