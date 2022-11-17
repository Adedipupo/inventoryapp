import React from 'react'
import './Home.scss'
import {RiProductHuntLine} from "react-icons/ri";


export default function Home() {
  return(
    <div className="home">
        <nav className="container --flex-between">
            <div className="logo">
                <RiProductHuntLine size={35}/>
            </div>
        </nav>
    </div>
  )
}
