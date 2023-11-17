import React from 'react'
import { Avatar } from '@mui/material'
import { useRouter } from 'next/navigation'

const CustomAvatar = ({avLink, email}: {avLink:string , email: string}) => {
  const router = useRouter();
  const Email = email[0].toUpperCase();

  return (
    <Avatar
    className="pointer"
    onClick={() => {}}
    sx={{
      width: 56,
      height: 56,
      backgroundColor: "#1F6FFF",
     
    }}
  >
    {Email}
  </Avatar>
  )
}

export default CustomAvatar