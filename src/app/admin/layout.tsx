import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
    title: 'Secret Santa - Admin'
}

type Props = { children: ReactNode }
const Layout = ({children}: Props) => {
    return (
        <div>
            <header className="bg-gray-800 text-center py-5">
                <h3 className="text-3xl">Secret Santa</h3>
                <h4 className="text-base">Admin Panel</h4>
            </header>
            <main className="mx-auto w-full max-w-3xl p-3">{children}</main>
        </div>
    )
}

export default Layout;