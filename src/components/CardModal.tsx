import { useEffect, useRef } from 'react'
import { useMyContext } from '../contextApi'

export default function CardModal() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const {recipientName,imageUrl, setIsCardVisible, setRecipientName} = useMyContext()

    function handleClick(){
        setIsCardVisible(false); 
        setRecipientName("");
    }

    function downloadCard(){
        const canvas = document.createElement('canvas')


        if(canvas){
            const canvasWidth = 800; 
            const canvasHeight = 1000; 
            
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
    
            const canvaDraw = canvas.getContext("2d");
    
            // Load the image to be drawn on the canvas
            const image = new Image();
            image.crossOrigin = "anonymous"; // Avoid tainting the canvas
            image.src = imageUrl

            image.onload = () => {
                canvaDraw?.drawImage(image, 0, 0, canvasWidth, canvasHeight);
    
                canvaDraw!.font = "bold 48px Arial"; 
                canvaDraw!.fillStyle = "white";
                canvaDraw!.textAlign = "center"; 
                canvaDraw!.fillText("THANK YOU", canvasWidth / 2, 60); 
    
                canvaDraw!.font = "bold 36px Arial";
                canvaDraw!.fillStyle = "white";
                canvaDraw!.textAlign = "center";
                canvaDraw!.fillText(recipientName.toLocaleUpperCase(), canvasWidth / 2, canvasHeight - 40);
    
    
            const imagePng = canvas.toDataURL('image/png')
                const anchorLink = document.createElement('a')
                anchorLink.href=imagePng
                anchorLink.download = `${recipientName}'card.png`
                anchorLink.click()
            }
        }
    }


    useEffect(()=>{
        const canvas = canvasRef.current
        if(canvas && imageUrl){
          const canvasDraw = canvas.getContext('2d')
          const image = new Image();
          image.crossOrigin = 'anonymous'

          image.onload = function(){
            canvasDraw?.clearRect(0,0,canvas.width,canvas.height)
            canvasDraw?.drawImage(image, 0,0,canvas.width,canvas.height)
            canvasDraw!.font = 'Bold 14px Arial';
            canvasDraw!.fillStyle = 'white';
            canvasDraw!.textAlign = 'center';
            canvasDraw!.fillText('THANK YOU', canvas.width / 2, 15);
            canvasDraw!.font = 'Bold 14px Arial';
            canvasDraw!.fillText(recipientName.toLocaleUpperCase(), canvas.width / 2, canvas.height - 5);
        }
       
        image.src = imageUrl
        }
    },[recipientName,imageUrl])
  return (
    <div 
        className='fixed top-0  left-0 min-h-[100vh] w-[100vw] opacity-80 bg-black flex flex-col gap-4 justify-center items-center'>
        <span 
        onClick={handleClick}
        className='absolute top-[5%] right-[5%] text-white text-3xl cursor-pointer hover:text-red'
      >
        x
      </span>
        <canvas
            style={{aspectRatio: "4/5"}}
            ref={canvasRef} className='zoomOut w-[65vw] md:w-[50vh]  lg:w-[30vw] rounded-lg' 
        />
        <button
            className='transition duration-500 ease-in-out hover:bg-blue-900 cursor-pointer p-2 text-white rounded-lg bg-blue-700'
            onClick={downloadCard}
        >
            Download card
        </button>

    </div>
  )
}
