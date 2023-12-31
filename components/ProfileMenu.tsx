import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import Useravatar from "./Useravatar";
import {
  ExitIcon,
  GearIcon,
  PersonIcon,
  QuestionMarkCircledIcon,
  ReaderIcon,
} from "@radix-ui/react-icons";
import { SettingsIcon } from "lucide-react";
import Profilebutton from "./Profilebutton";
import { signOut } from "next-auth/react";
import { ModeToggle } from "./Theme-toggle";

export default function ProfileMenu({session }:any) {
  const user=session?.user;
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-full">
          {/* <Useravatar sr={"https://github.com/shadcn.png"} /> */}
          <Profilebutton
            src={user?.image}
            alt={user?.name}
            fallbackInitials="CN"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className=" mt-5 w-[228px] ">
          {/* <DropdownMenuContent className="mr-4 mt-4 w-screen h-screen sm:w-[228px] sm:h-auto "> */}
          <DropdownMenuLabel>
            <div className="flex flex-row gap-4 items-center ml-2">
              {/* <Useravatar sr={"https://github.com/shadcn.png"} /> */}
              <Profilebutton
                src={user?.image}
                alt={user?.name}
                fallbackInitials="CN"
              />
              <div className="">
                <h1 className="text-base mb-0">{user?.name}</h1>
                {/* <h1 className="text-sm font-light mt-0">admin</h1> */}
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bordered" />
          <DropdownMenuItem>
            <PersonIcon className=" w-[20px] h-[20px] mr-4 ml-2" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <GearIcon className=" w-[20px] h-[20px] mr-4 ml-2" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ReaderIcon className=" w-[20px] h-[20px] mr-4 ml-2" />
            Billing
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <QuestionMarkCircledIcon className=" w-[20px] h-[20px] mr-4 ml-2" />
            {/* <ModeToggle/> */}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={signOut}>
            <ExitIcon className=" w-[20px] h-[20px] mr-4 ml-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
}
