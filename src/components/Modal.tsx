import React, { Dispatch, SetStateAction, useState } from 'react'
import { useMyContext } from '../contextApi'



export default function Modal() {
  // const [recipientName, setRecipientName] = useState("")
  const {recipientName, setRecipientName, setIsModalVisible, setIsCardVisible} = useMyContext()
  
  function generateCard(){
    if(!recipientName) return
    setIsModalVisible(false)
    setIsCardVisible(true)
  }

  function handleClick(e : React.ChangeEvent<HTMLInputElement>){
    const name = e.target.value.replace(/[0-9]/g,"")
    setRecipientName(name)
  }

  return (
    <div className='fixed top-0 left-0 w-[100vw] h-[100vh] bg-black opacity-85 flex justify-center items-center'>
      <span 
        onClick={()=>setIsModalVisible(false)}
        className='absolute top-[5%] right-[5%] text-white text-3xl cursor-pointer'
      >
        x
      </span>
      <div className='zoomOut w-[90vw] md:w-[60vw] lg:w-[50vw] bg-white rounded-lg p-4 round-lg flex justify-center'>
        <div className='flex flex-col justify-center gap-4 w-[100%]'>
          <label className='text-2xl text-black'>Your name</label>
          <input 
            className='p-2 border-2 border-black rounded-lg text-base'
            type='text' 
            value={recipientName}
            name="recipientName"
            onChange={handleClick}
            maxLength={12}
            placeholder='Your name' 
          />
          <button 
            onClick={generateCard}
            style={{cursor: recipientName ? "pointer" : "not-allowed"}} 
            className='transition duration-500 ease-in-out hover:bg-blue-900 p-2 text-white rounded-lg bg-blue-700' >Generate Card</button>
        </div>
    
      </div>
    </div>
  )
}
