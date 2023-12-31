import { authoptions } from "@/lib/options"
import prisma from "@/lib/prisma"
import { Session } from 'next-auth';
import { getServerSession } from "next-auth/next"
import { revalidatePath } from "next/cache"
import { NextRequest } from "next/server"
type UserSession = Session & {
    user: {
        id?: string| null | undefined; // Include other user properties as needed
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
    } | undefined;
};

async function exists<Model extends { count: any }>(model: Model, args: Parameters<Model['count']>[0]) {
    const count = await model.count(args)
    return Boolean(count)
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authoptions) as UserSession;
        if (!session) {
            return new Response(JSON.stringify({ msg: "UNAUTHORIZED ACCESS!" }))

        }
        const user = session?.user
       
      
        const item = await req.json()
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
            notesId=notes.id
           
            console.log("----", item, " ", user, " ", notesExists, " ", noteitem,)

        }
        else {
            const notes = await prisma.notes.findFirst({
                where: {
                    userId: user?.id
                }
            })
            notesId=notes?.id
        }
        
        const noteitem = await prisma.note.create({
            data: {
                title: item.title,
                content: item.content,
                NotesId: notesId
            },
        })
        // console.log("----",item, " ", user, " ", notesExists," ",notesId," ",noteitem)
           

        return new Response(JSON.stringify(noteitem), { status: 200 })
    // }


    } catch (error) {
        return new Response(JSON.stringify(error),{status:500})

    }
   
}
