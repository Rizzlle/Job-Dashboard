import Sidebar from "@/components/layouts/Sidebar";
import "../globals.css";
import type { Metadata } from "next";
import { Epilogue } from "next/font/google";
import Header from "@/components/layouts/Header";
import NextAuthProvider from "@/context/NextAuthProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const epilogue = Epilogue({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (session === null) {
    return redirect("/auth/signin");
  }

  return (
    <html lang="en">
      <body className={epilogue.className}>
        <main>
          <NextAuthProvider>
            <div className="border-t">
              <div className="bg-background">
                <div className="flex flex-row">
                  <div className="hidden lg:block w-[18%]">
                    <Sidebar />
                  </div>
                  <div className="col-span-3 overflow-auto lg:col-span-5 lg:border-l w-[82%]">
                    <div className="px-6 py-6 lg:px-8">
                      <Header />
                      {children}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </NextAuthProvider>
        </main>
      </body>
    </html>
  );
}
