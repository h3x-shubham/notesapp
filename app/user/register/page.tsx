import RegisterForm from "@/components/RegisterForm";
import TopNav from "@/components/Top-nav";
import React from "react";

export default function page() {
  return (
    <div className="flex flex-col flex-grow  h-screen p-5">
      {/* route */}
      <div className="w-full flex flex-row ">
        {/* <ModeToggle /> */}
        <div className="flex-grow  h-auto">{/* <TopNav /> */}</div>
      </div>
      <div className="p-5 flex  text-center justify-center items-end h-full  sm:items-center">
        <RegisterForm />
      </div>
    </div>
  );
}
