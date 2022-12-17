
import React, {useState, useEffect} from 'react'
//import {auth, db} from '../../firebase'

export default function Home() {
  const [usr, setUsr]= useState(null)
  
  return (
      <div>
          {usr? (<h1>Home </h1>): null}
      </div>
  )
}
