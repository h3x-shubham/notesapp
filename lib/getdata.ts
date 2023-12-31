import { headers } from "next/headers"
export async function getnotes() {
    try {
        const res = await fetch("http://localhost:3000/api/notes/getallnote", {
            cache: 'no-cache',
            method: "GET",
            headers: headers()
        });
        const data = await res.json()
        // console.log("d--",data)
        return data
    } catch (error) {
        console.log(error)
        return { NoteItems: [] }
    }
}