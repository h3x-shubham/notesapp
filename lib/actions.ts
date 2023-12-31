'use server'
import { revalidatePath } from "next/cache";

import * as z from "zod";

const formSchema = z.object({
    title: z.string().min(1),
    content: z.string().min(1),
});
async function onSubmit(values: z.infer<typeof formSchema>) {
    const apiEndpoint = "/api/notes/addnote";
    try {
        const response = await fetch(apiEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });
        // const data = await response.json();
        // console.log("Success:", response)          
            revalidatePath('/home')
            
                // Handle success
    } catch (error) {
        console.error("Error:", error);
        // Handle error
    }

    // console.log(values);
}