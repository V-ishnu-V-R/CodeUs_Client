import {React,useState }from 'react'
import { Link } from 'react-router-dom'
import './RightSide.css'

import {ImHome} from 'react-icons/im'

import {MdNotificationsActive} from 'react-icons/md'


import {IoSettingsSharp} from 'react-icons/io5'
import {BsFillChatLeftTextFill} from 'react-icons/bs'
import TrendCard from '../TrendCard/TrendCard'

import ShareModal from '../ShareModel/ShareModel'

const RightSide = () => {
    const [modalOpened, setModalOpened] = useState(false)
  return (
    <div className='RightSide'>
        <div className="navIcons">
          <Link to='../home' style={{color:"white"}} > <ImHome size={32}/> </Link>
             
            <IoSettingsSharp size={32} />
            <MdNotificationsActive size={32} />
            <Link to='../chat' style={{color:"white"}}> <BsFillChatLeftTextFill size={31} /></Link>
           
            
            


        </div>
        <TrendCard/>
        <button className='button r-button'onClick={()=>{setModalOpened(true)}} >
            
            Share
        </button>
        <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened}/>

    </div>
  )
}

export default RightSide