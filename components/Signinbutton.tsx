'use client'
import { Session } from 'next-auth'
import { useSession,signIn,signOut } from 'next-auth/react'
import React from 'react'
import { Button } from './ui/button'
import Profilebutton from './Profilebutton'
import ProfileMenu from './ProfileMenu'

export default function Signinbutton() {
    const {data:session}=useSession()
    // console.log(session)
    function onclickhandle(){
      signIn()
    }
  return (
    <>
      {session ? (
        <ProfileMenu session={session}/>
        //   <Profilebutton
        //     src="https://github.com/shadcn.png"
        //     alt="@shadcn"
        //     fallbackInitials="CN"
        //   />
        
      ) : (
        <Button variant={"outline"} onClick={onclickhandle}>
          {/* <Link href={"/"}>Sign In</Link> */}
          Sign In
        </Button>
        // <Button></Button>  

      )}
    </>
  );
}
