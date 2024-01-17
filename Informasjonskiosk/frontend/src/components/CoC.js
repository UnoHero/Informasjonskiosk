import {useState} from "react"

const CoC = () => {

    const [Characters, setCaracters] = useState()
    async function Aphra() {
        try {
            const response = await fetch("127.0.0.1:3001/CoC")
            let Data = await response.json()
            setCaracters(Data)
            console.log(Data);
        } catch (error) {
            console.log(error);
        }
        
    }
    Aphra()
    return (

        <div>
        </div>
    )
}

export default CoC