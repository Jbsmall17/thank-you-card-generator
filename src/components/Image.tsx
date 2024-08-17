import React, { Dispatch, SetStateAction } from 'react'
import { useMyContext } from '../contextApi'

interface ImageComponentProps{
    imageUrl : string,
    info: string,
}

export default function Image({imageUrl,info} : ImageComponentProps) {
    const {setImageUrl,  setIsModalVisible} = useMyContext()
    function handleClick(){
        setIsModalVisible(true);
        setImageUrl(imageUrl);
    }
  return (
    <div className='w-[200px] h-[250px]'>
      <img
      onClick={handleClick}
      src={imageUrl} 
      alt={info}  
      className='block w-[100%] h-[100%] hover:cursor-pointer filter hover:grayscale transition duration-700 ease-in-out hover:scale-110 rounded-lg shadow-2xl' />
    </div>
  )
}
