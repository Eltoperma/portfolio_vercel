import type { Actions, PageServerLoad } from "./$types.js";
import { fail, superValidate } from "sveltekit-superforms";
import { formSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";
import db from "$lib/schema/db.js"


export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(formSchema)),
  };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(formSchema));
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }
    else {
      console.log(JSON.stringify(form))
      await db
      .insertInto('contact')
      .values({name:form.data.username, message:form.data.message})
      .execute()
    }
    },
  };