import React, { useEffect } from 'react'
import { useMyContext } from '../contextApi'


export default function Modal() {
  // const [recipientName, setRecipientName] = useState("")
  const {recipientName, setRecipientName, setIsModalVisible, isModalVisible ,setIsCardVisible} = useMyContext()
  
  function generateCard(){
    if(!recipientName) return
    setIsModalVisible(false)
    setIsCardVisible(true)
  }

  function handleClick(e : React.ChangeEvent<HTMLInputElement>){
    const name = e.target.value.replace(/[0-9]/g,"")
    setRecipientName(name)
  }

  function handleClick2(){
    setIsModalVisible(false)
  }

  function handleKeyDown(e : KeyboardEvent){
    if(e.key === "Enter" && isModalVisible && recipientName){
      generateCard()
    }
  }

  function closeModal(e: React.MouseEvent){
    const targetElement = e.target as HTMLDivElement
    if(targetElement.id === "modal-bg"){
      setIsModalVisible(false)
      setRecipientName("")
    }
  } 

  useEffect(()=>{
    window.addEventListener("keydown",handleKeyDown)

    return ()=>{
      window.removeEventListener("keydown", handleKeyDown)
    }
  },[isModalVisible,recipientName])

  return (
    <div onClick={closeModal} id='modal-bg' className='fixed top-0 left-0 w-[100vw] h-[100vh] bg-black flex justify-center items-center'>
      <span 
        onClick={handleClick2}
        className='absolute top-[3%] right-[3%] text-white text-3xl cursor-pointer'
      >
        x
      </span>
      <div className='zoomOut w-[90vw] md:w-[60vw] lg:w-[50vw] bg-white rounded-lg p-4 round-lg flex justify-center'>
        <div className='flex flex-col justify-center gap-2 w-[100%]'>
          <label className='text-2xl text-black'>Your name</label>
          <input 
            className={`transition duration-500 ease-in-out p-2 border-2 ${recipientName.length === 15 ? "border-red-400 focus:border-red-400" :"border-black focus:border-blue-700"} rounded-lg text-base outline-none focus:border-blue-700`}
            type='text' 
            value={recipientName}
            name="recipientName"
            onChange={handleClick}
            maxLength={15}
            placeholder='e.g Joe' 
          />
          {recipientName.length === 15 && <p className='text-base text-red-400'>Character limit exceeded</p>}
          <button 
            onClick={generateCard}
            style={{cursor: recipientName ? "pointer" : "not-allowed"}} 
            className='transition duration-500 ease-in-out hover:bg-blue-900 p-2 text-white rounded-lg bg-blue-700' >Generate Card</button>
        </div>
    
      </div>
    </div>
  )
}
