import sharp from 'sharp';
import satori from 'satori';
import { html } from "satori-html";

export default defineEventHandler(async (event) => {
	const query = getQuery(event);
	console.log('api/preview-image.js');
	console.log(query);
	const tokenID = query.token;
	const imageType = query.type;

	const frameImage = html`
	<div style="display: flex; width:100%; height:100%; background-color:#000;">
		<img v-if="tokenID" src="http://images.hyperlootproject.com/${imageType}/${tokenID}.jpg" style="height: 100%; width: 100%; object-fit: contain">
	</div>`;
	const svg = await satori(frameImage, {
		width: 1200,
		height: 800,
		fonts: [],
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
