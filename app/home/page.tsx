import AddNoteDialog from "@/components/AddNoteDialog";
import HomeMain from "@/components/HomeMain";
import HomePinned from "@/components/HomePinned";
import ProductTray from "@/components/ProductTray";
import TopNav from "@/components/Top-nav";
import { getnotes } from "@/lib/getdata";
import React from "react";

export default async function page() {
  const data = await getnotes();
  const d = data;

  return (
    <div>
      {/* <HomePinned data={d}/> */}
      {JSON.stringify(`${process.env.NEXTAUTH_URL}/api/notes/getallnote`,d)}
      {JSON.stringify(d)}
      <HomeMain data={d} />
    </div>
  );
}
