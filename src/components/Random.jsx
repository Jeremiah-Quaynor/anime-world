import axios from 'axios';
import { useEffect, useState } from 'react';

function Random () {
    const [animeData, setAnimeData]= useState([]);
    const [getAnimeNames, setGetAnimeNames] = useState([])
    const [animeName, setAnimeName] = useState("")
    const [animeFacts, setAnimeFacts] = useState([])
    const [isDisplaying, setIsDisplaying] = useState(false)

//fetching data
    useEffect(()=> {
        let API_URL = "https://anime-facts-rest-api.herokuapp.com/api/v1"
        axios.get(API_URL).then((res)=>{
          setAnimeData(res.data.data)
        }).catch((err)=> console.log(err))
      }, [])

//getting anime names
      useEffect(()=> {
        setGetAnimeNames(animeData.map((data)=> data.anime_name))
      },[animeData])

//generate anime to render
      const generateRandomAnime =() => {
        let index = Math.floor(Math.random() * (getAnimeNames.length -1))
        setAnimeName(getAnimeNames[index])
        setIsDisplaying(true)
        console.log(animeFacts)
      }

      useEffect(()=> {
        let API_URL = "https://anime-facts-rest-api.herokuapp.com/api/v1"
        axios.get(`${API_URL}/${animeName}`).then((res)=>{
          setAnimeFacts(res.data.data)
          // console.log(res.data)
        }).catch((error)=> console.log(error))
      },[animeName])

      const renderCard = animeFacts.map((fact)=> {
      return (
        <ul>
          <li key={fact.fact_id}>{fact.fact}</li>
        </ul>
      )  
      })
    


    return (
        <>
            <h1>Welcome to our page</h1>
            <h2>{animeName}</h2>
              {isDisplaying ? renderCard: <h3>Click button to generate anime fact.</h3>}
            <button onClick={generateRandomAnime} >Click Me</button>
        </>
    )
}

export default Random