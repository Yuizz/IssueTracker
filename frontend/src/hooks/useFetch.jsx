import {useState, useEffect} from 'react'

export function useFetch(url, options, deps) {
    const  [response, setResponse] = useState(null)
    const  [error, setError] = useState(null)
    const  [isLoading, setIsLoading] = useState(false)
    const [trigger, setTrigger] = useState(false)

    function reFetch(){
        setTrigger(!trigger)
    }

    useEffect(() => {
        const fetchData = async () => {
            if(!response)  setIsLoading(true)
            try {
                const res = await fetch(url, options)
                const json = await res.json()
                setResponse(json)
                setIsLoading(false)
            } catch (error) {
                setError(error)
            }
        }
        fetchData()
    }, [trigger])
    return { response, error, isLoading, reFetch}
}