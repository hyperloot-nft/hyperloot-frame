import sharp from 'sharp';
import satori from 'satori';
import { html } from "satori-html";

export default defineEventHandler(async (event) => {
	const query = getQuery(event);
	console.log('api/preview-image.js');
	console.log(query);
	const tokenID = query.id;
	const imageType = query.type;

	let fileType = 'jpg';
	if (imageType === 'pfp') {
		fileType = 'png';
	}

	const frameImage = html`
		<div style="display:flex; width:100%; height:100%; background-color:#000;">
			<img src="http://images.hyperlootproject.com/${imageType}/${tokenID}.${fileType}"
     			style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: -1; filter: blur(40px) brightness(80%);">
			<img src="http://images.hyperlootproject.com/${imageType}/${tokenID}.${fileType}"
				style="height: 100%; width: 100%; object-fit: contain">
			<div style="z-index:100; position:absolute; top:20px; right:40px; font-family:'BluuNext-Bold'; font-size: 24px; color:#F3BA14;">#${tokenID}</div>
			<img src="https://hyperloot-frame-preview-test.vercel.app/hyperloot-icon-transparent.png"
				style="z-index:100; position:absolute; top:22px; left:30px; width:5%;">
		</div>`;

	const fontResponse = await fetch('https://hyperloot-frame-preview-test.vercel.app/BluuNext-Bold.otf');
	const fontData = await fontResponse.arrayBuffer();

	const svg = await satori(frameImage, {
		width: 1200,
		height: 600,
		fonts: [
			{
				name: 'BluuNext-Bold',
				data: fontData,
				weight: 400,
				style: 'Bold',
			},
		],
	});
	const svgBuffer = Buffer.from(svg);
    const png = sharp(svgBuffer).png();
    const response = await png.toBuffer();

	return new Response(response,
        {
            status: 200,
            headers: { 'Content-Type': 'image/png' }
        }
    );
});
