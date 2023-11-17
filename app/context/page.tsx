"use client"

import Header from "@/components/Header"
import Landing from "@/components/Landing"
import supabase from "@/supabase"
import { User } from "@supabase/supabase-js"
import { createContext, useContext, useEffect, useMemo, useState } from "react"

interface contextProps {
  user: User,
  switchTheme: ( ) => void,
  children: React.ReactNode
}

const AuthContext = createContext<contextProps>({})
export const AuthContextProvider = ({children, switchTheme}):contextProps => {
  const [user,setUser] = useState<User | null>(null);
  useEffect(() => {
    onAuthChange();
  }, [])
  
  const onAuthChange = async () => {
    try {
      const {
        data: { user }
     } = await supabase.auth.getUser()
      console.log(user);
      if(user) setUser(user);
    } catch (error) {
      console.log(error)
    }
  }
  const value =  useMemo(() => {
    return {
      user,
      signOut: () => supabase.auth.signOut(),
    }
  }, [user])
  return (
  <AuthContext.Provider value={{ user }}>
    <Header switchTheme={switchTheme}></Header>
    {user ? children : <Landing/>} 
  </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const {user, signOut} = useContext(AuthContext);
  return {user, signOut};
}

export default AuthContextProvider;