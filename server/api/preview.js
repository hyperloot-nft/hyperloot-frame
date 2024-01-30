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
			<meta property="fc:frame:image" content="https://hyperloot-frame-preview-test.vercel.app/api/preview-image?type=${imageType}&token=${tokenID}.jpg" />
			<meta property="fc:frame:button:1" content="⬅️ Previous" />
			<meta property="fc:frame:button:2" content="➡️ Next" />
			<meta property="fc:frame:button:3" content="🎲 Random" />
			<meta property="fc:frame:button:4" content="🎨 2D/Pixel" />
			<meta property="fc:post_url" content="https://hyperloot-frame-preview-test.vercel.app/api/preview" />
		</head>
		</html>
	`, {
			status: 200,
			headers: { 'Content-Type': 'text/html' },
		}
    );
});
