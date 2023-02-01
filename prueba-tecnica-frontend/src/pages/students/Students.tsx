import React from 'react'
import useAuth from '../../context/AuthProvider'

const Students = () => {
  const { auth } = useAuth()
  console.log(auth)

  return (
    <div>
      <p>Hola</p>
      <p>Bienvenido alumno</p>
    </div>
  )
}

export default Students