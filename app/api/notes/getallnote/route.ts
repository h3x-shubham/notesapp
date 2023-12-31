import { authoptions } from "@/lib/options";
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth/next";
import { getSession } from "next-auth/react";
export async function GET(req: Request) {
    try {

        const session = await getServerSession(authoptions)
// const session =await getSession({req})
        // console.log(session)
        if (!session) {
            return new Response(JSON.stringify({ msg: "UNAUTHORIZED ACCESS!" ,s:session}))
            
        }
        const user = session?.user
        // const res = await prisma.note.findMany()

        const userNotes = await prisma.notes.findUnique({
            where: {
                userId: user.id,
            },
            include: {
                NoteItems: true, // Assuming 'NoteItems' is the relation field name in your Notes model
            },
        });

        // return userNotes ? userNotes.NoteItems : [];


        return new Response(JSON.stringify(userNotes), { status: 200 })

    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 })

    }

    // console.log(res)

}