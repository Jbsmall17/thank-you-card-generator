import { useEffect, useState } from 'react'
import './App.css'
import Image from './components/Image'
import { useMyContext } from './contextApi'
import axios from "axios"
import Modal from './components/Modal'
import CardModal from './components/CardModal'


function App() {
  const baseUrl = import.meta.env.VITE_APP_BASE_URL
  const Access_key = import.meta.env.VITE_APP_UNSPLASH_API_KEY
  const [isLoading, setIsLoading] = useState(false)
  const {imageArray, setImageArray, isModalVisible, isCardVisible} = useMyContext()

  async function getRandomPhotos(imageNum: number) {
    setIsLoading(true)
    try{
      const response = await axios.get(`${baseUrl}photos/random/?count=${imageNum}`,{
        headers: {
          Authorization : `Client-ID ${Access_key}`
        }
      })
      if(response.status === 200){
        setIsLoading(false)
        setImageArray(response.data)
      }
      else{
        setIsLoading(false)
        setImageArray([])
      }
    }catch(error){
      setIsLoading(false)
      setImageArray([])
    }
  }

  useEffect(()=>{
    if(imageArray.length === 0){
      getRandomPhotos(4)
    }
  },[imageArray])

  return (
    <>
      <h1 className='title inline w-[24ch] md:leading-[3.5rem] text-center font-bold text-2xl md:text-4xl mb-2 md-0'>Thank-you-card-generator</h1>
      <p className='inline sub-title text-center text-base md:text-2xl'>Choose your favourite card below</p>
     <div className='flex flex-row flex-wrap justify-center gap-[15px] md:gap-[25px] mt-8 md-mt-12'>
      {
        !isLoading
        ?
        imageArray.map(({id,alt_description,urls})=>{
          return <Image  key={id} imageUrl={urls.small} info={alt_description} />
        })
        : 
        <>
          <div className='animate-pulse w-[200px] h-[250px] rounded-lg bg-[#f1eff1]'></div>
          <div className='animate-pulse w-[200px] h-[250px] rounded-lg bg-[#f1eff1]'></div>
          <div className='animate-pulse w-[200px] h-[250px] rounded-lg bg-[#f1eff1]'></div>
          <div className='animate-pulse w-[200px] h-[250px] rounded-lg bg-[#f1eff1]'></div>
        </>
      }
     </div>
      {
        isModalVisible
        &&
        <Modal />
      }
      {
        isCardVisible
        &&
        <CardModal />
      }
    </>
  )
}

export default App
