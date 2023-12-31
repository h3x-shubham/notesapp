import prisma from "@/lib/prisma"
export async function GET(req: Request) {
    // const res=await prisma.items.findMany()
    const res = await fetch("https://dummyjson.com/products/1")
    const data = await res.json()

    // console.log(data)
    if (data) {

        return new Response(JSON.stringify(data), { status: 200 })
    }
    else {
        return new Response(JSON.stringify({ msg: "error" }), { status: 500 })

    }
}