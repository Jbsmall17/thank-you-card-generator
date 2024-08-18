import { useMyContext } from '../contextApi'

export default function CardModal() {
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

    function closeCardModal(e: React.MouseEvent){
        const targetElement = e.target as HTMLDivElement
        if(targetElement.id === "card-modal-bg"){
            setIsCardVisible(false)
            setRecipientName("")
        }
      } 


  return (
    <div
        id='card-modal-bg' 
        className='fixed top-0  left-0 min-h-[100vh] w-[100vw] bg-black flex flex-col gap-4 justify-center items-center'
        onClick={closeCardModal}
    >
        
        <span 
        onClick={handleClick}
        className='absolute top-[3%] right-[3%] text-white text-3xl cursor-pointer hover:text-red'
        >
        x
      </span>
        <div
            className='relative zoomOut w-[65vw] md:w-[50vh]  lg:w-[30vw] rounded-lg'
        >
            <p className='absolute font-bold top-[2%] left-[50%] text-white -translate-x-[50%]  text-base md:text-2xl'>THANK YOU</p>
            <img 
                src={imageUrl} 
                style={{aspectRatio: "4/5"}}  
                className='block rounded-lg'
            />
            <p className='absolute font-bold bottom-[2%] left-[50%] text-white -translate-x-[50%] text-base md:text-2xl'>{recipientName.toLocaleUpperCase()}</p>
        </div>
        <button
            className='transition duration-500 ease-in-out hover:bg-blue-900 cursor-pointer p-2 text-white rounded-lg bg-blue-700'
            onClick={downloadCard}
        >
            Download card
        </button>

    </div>
  )
}
