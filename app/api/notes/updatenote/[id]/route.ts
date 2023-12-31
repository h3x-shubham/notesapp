import { authoptions } from "@/lib/options"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth/next"
import { revalidatePath } from "next/cache"
import { NextRequest } from "next/server"

async function exists<Model extends { count: any }>(model: Model, args: Parameters<Model['count']>[0]) {
    const count = await model.count(args)
    return Boolean(count)
}


export async function PUT(req: NextRequest,{params}) {
    const paramId=params.id
    try {
        // const noteId = req.query.id;
        const session = await getServerSession(authoptions)
        if (!session) {
            return new Response(JSON.stringify({ msg: "UNAUTHORIZED ACCESS!" }))
            
        }
        let userId;
        const user = session?.user
        const item = await req.json()
        console.log()
        const notesExists = await exists(prisma.notes, {
            where: {
                userId: user?.id
            }
        })

        let notesId;
        if (!notesExists) {


            const notes = await prisma.notes.create({
                data: {
                    userId: user?.id
                },
                include: {
                    user: true
                }

            })
            notesId = notes.id

            console.log("----", item, " ", user, " ", notesExists, " ", noteitem,)

        }
        else {
            const notes = await prisma.notes.findFirst({
                where: {
                    userId: user?.id
                }
            })
            notesId = notes?.id
        }

        const noteitem = await prisma.note.update({
            where:{
                id:paramId
            },
            data:{
                title: item.title,
                content: item.content,
                pinned:item.pinned
                // NotesId: notesId
            },
            // data: {
            //     title: item.title,
            //     content: item.content,
            //     NotesId: notesId
            // },
        })
        // const noteitem = await prisma.note.create({
        //     data: {
        //         title: item.title,
        //         content: item.content,
        //         NotesId: notesId
        //     },
        // })
        // console.log("----",item, " ", user, " ", notesExists," ",notesId," ",noteitem)


        return new Response(JSON.stringify(noteitem), { status: 200 })
        // }


    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 })

    }

}