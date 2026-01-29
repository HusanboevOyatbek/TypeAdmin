import Sidebar from "./Sidebar"
import { Outlet } from "react-router-dom"
import HeaderPage from "./HeaderPage"


function Layoute() {
    return (
        <>
            <HeaderPage />
            <Sidebar />

            <main>
                <Outlet />
            </main>
        </>
    )
}

export default Layoute