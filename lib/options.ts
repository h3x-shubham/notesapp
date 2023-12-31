import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import prisma from "./prisma"
import bcrypt from 'bcrypt'
import CredentialsProvider from "next-auth/providers/credentials";
import { decode, encode } from "next-auth/jwt"

export const authoptions: NextAuthOptions = {
    // adapter:PrismaAdapter(prisma),
    pages:{
        signIn:'/user/login'
    }
    ,
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // console.log("user"," ",credentials)
                // Add logic here to look up the user from the credentials supplied
                if (!credentials?.email || !credentials?.password) {
                    // console.log('user')
                    return null
                }
                const user =await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })
                // console.log(user)
                if (!user) {
                    return null
                }
                // console.log(credentials," ",user)

                const passwordMatch = await bcrypt.compare(credentials.password, user.password)
                // console.log(passwordMatch)
                if (!passwordMatch) {
                    return null;
                }
                // console.log(user)
                return user;
            }
        })
    ],
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user, account, profile }) {
            if (user) {
                token.userId = user.id
                return { ...token, userId: user.id }
            }
            return token
        },
        async session({ session, token }) {
            // console.log(session)
            return {
                ...session, user: {
                    ...session.user, id: token.userId
                }
            }

        },
        // redirect() {
        //     return '/home'
        // }
    },
    jwt: { encode, decode },
    // pages:{
    //     signIn:'/user/login'
    // }
}

