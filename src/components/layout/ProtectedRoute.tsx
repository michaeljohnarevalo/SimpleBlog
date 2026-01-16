import type React from "react"
import type { RootState } from "../../app/store"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

type Props={
    children:React.ReactNode
}

export default function ProtectedRoute({children}:Props){

    const user = useSelector((state:RootState) => state.auth.user) 
    return user ? <>{children}</> : <Navigate to="/login"/>

}