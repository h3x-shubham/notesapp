import { authoptions } from "@/lib/options";
import NextAuth from "next-auth/next";

const handler= NextAuth(authoptions)
export {handler as GET,handler as POST};


