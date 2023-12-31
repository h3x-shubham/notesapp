// import MainNavbar from "@/components/MainNavbar";

import { Toaster } from "@/components/ui/sonner";


export default function HomeLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section >
      {/* Include shared UI here e.g. a header or sidebar */}

      {children}
      <Toaster/>     
    </section>
  );
}
