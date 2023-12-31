import bcrypt from 'bcrypt';

import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const body = await req.json()
    const { name, email, password } = body;
    console.log({ name, email, password })
    if (!name || !email || !password) {
        return new NextResponse("missing values", { status: 400 })
    }
    const userexist = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if (userexist) {
        return new NextResponse("user already exists", { status: 400 })
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: {
            name: name, email: email, password: hashedPassword,
        }
    })
    return NextResponse.json(user)
}