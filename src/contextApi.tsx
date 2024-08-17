import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

interface imageObj {
    id: string,
    alt_description: string,
    urls: {
        regular: string,
        small: string;
        thumb: string
    }
}

interface contextData {
    imageArray : imageObj[],
    setImageArray: Dispatch<SetStateAction<imageObj[]>>,
    recipientName: string, 
    setRecipientName: Dispatch<SetStateAction<string>>,
    imageUrl: string, 
    setImageUrl: Dispatch<SetStateAction<string>>,
    isModalVisible: boolean,
    setIsModalVisible: Dispatch<SetStateAction<boolean>>,
    isCardVisible: boolean,
    setIsCardVisible : Dispatch<SetStateAction<boolean>>
}

const context = createContext<contextData | undefined>(undefined)


export function MycontextProvider({children}: {children: ReactNode}){
    const [imageArray, setImageArray] = useState<imageObj[]>([])
    const [recipientName, setRecipientName] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [isModalVisible,setIsModalVisible] = useState(false)
    const [isCardVisible, setIsCardVisible] = useState(false)
    return (
        <context.Provider
            value={{
                imageArray, 
                setImageArray,
                recipientName, 
                setRecipientName,
                imageUrl, 
                setImageUrl,
                isModalVisible,
                setIsModalVisible,
                isCardVisible, 
                setIsCardVisible
            }}
        >
            {children}
        </context.Provider>
    )
}


export function useMyContext(){
    const contextData = useContext(context);
    if(!contextData){
        throw new Error("context must be defined");
    }
    return contextData
}
