import sharp from 'sharp';
import satori from 'satori';
import { html } from "satori-html";

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig(event);
	const query = getQuery(event);
	console.log('api/preview-image.js');
	console.log(query);
	const tokenID = query.id;
	const imageType = query.type;

	let fileType = 'png';
	let backgroundHtml = '';
	if (imageType === 'nft') {
		fileType = 'jpg';
		backgroundHtml = `<img src="http://images.hyperlootproject.com/${imageType}/${tokenID}.${fileType}"
				style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: -1; filter: blur(40px) brightness(80%);">
		`;
	} else if (imageType === 'pixel') {
		const bgRandom = Math.floor(Math.random() * 4) + 1;
		backgroundHtml = `<img src="${config.public.domain}/img/pixel-bg-${bgRandom}.png" 
			style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: -1; filter: blur(20px) brightness(80%);">
		`;
	} else if (imageType === 'pfp') {
		const bgRandom = Math.floor(Math.random() * 9);
		backgroundHtml = `<img src="${config.public.domain}/img/pfp-bg-${bgRandom}.jpg" 
			style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; z-index: -1; filter: blur(10px) brightness(80%);">
		`;
	}

	let frameImage = `
		<div style="display:flex; width:100%; height:100%; background-color:#000;">
			${backgroundHtml}
			<img src="http://images.hyperlootproject.com/${imageType}/${tokenID}.${fileType}"
				style="height: 100%; width: 100%; object-fit: contain">
			<div style="z-index:100; position:absolute; top:20px; right:40px; font-family:'BluuNext-Bold'; font-size: 24px; color:#F3BA14;">#${tokenID}</div>
			<img src="${config.public.domain}/hyperloot-icon-transparent.png"
				style="z-index:100; position:absolute; top:22px; left:45px; width:5%;">
		</div>`;

	frameImage = html(frameImage);

	const fontResponse = await fetch(`${config.public.domain}/BluuNext-Bold.otf`);
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
