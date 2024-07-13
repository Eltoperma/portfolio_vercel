import type { Actions, PageServerLoad } from './$types.js';
import { fail, superValidate } from 'sveltekit-superforms';
import { formSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';
import resizeImage from './helper/resizeImage.js';
//import sharp from 'sharp';
//import db from '$lib/prisma/client.js';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(formSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(formSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		} else {
			console.log("ENTERED VALID FORM")
			let img: ArrayBuffer = new ArrayBuffer(0);
			const reader = new FileReader()
			reader.onload = function(e){
				if (e.target) {
						img = e.target.result as ArrayBuffer;
					}
				}
			resizeImage(img, form.data.title);
			}
		}
	};
