import { authoptions } from "@/lib/options"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth/next"
import { revalidatePath } from "next/cache"
import { NextRequest } from "next/server"

async function exists<Model extends { count: any }>(model: Model, args: Parameters<Model['count']>[0]) {
    const count = await model.count(args)
    return Boolean(count)
}


export async function DELETE(req: NextRequest, { params }) {
    const paramId = params.id
    try {
        // const noteId = req.query.id;
        const session = await getServerSession(authoptions)
        if (!session) {
            return new Response(JSON.stringify({ msg: "UNAUTHORIZED ACCESS!" }))

        }
        let userId;
        const user = session?.user
        const item = await req.json()
        // console.log()
        // const notesExists = await exists(prisma.notes, {
        //     where: {
        //         userId: user?.id
        //     }
        // })

        // let notesId;
        // if (!notesExists) {


        //     const notes = await prisma.notes.create({
        //         data: {
        //             userId: user?.id
        //         },
        //         include: {
        //             user: true
        //         }

        //     })
        //     notesId = notes.id

        //     // console.log("----", item, " ", user, " ", notesExists, " ", noteitem,)

        // }
        // else {
        //     const notes = await prisma.notes.findFirst({
        //         where: {
        //             userId: user?.id
        //         }
        //     })
        //     notesId = notes?.id
        // }

         await prisma.note.delete({
            where: {
                id: paramId
            },
          
           
        })
    


        return new Response(JSON.stringify({"id":paramId}), { status: 200 })
        // }


    } catch (error) {
        return new Response(JSON.stringify({"delete":error}), { status: 500 })

    }

}