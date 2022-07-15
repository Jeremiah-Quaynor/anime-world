import axios from 'axios';
import "./App.css"
import { useEffect, useState } from 'react';
import Button from './components/Button/Button';
import Heading from './components/Heading/Heading';

function App () {
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
        <li className='lii'
        key={fact.fact_id}
        >{fact.fact}</li>
      </ul>
    )  
    })

    const tempRender =  (
            <>
                <h3 style={{"textAlign": "center"}}>Click button to generate anime fact.</h3>
                <img style={{"marginBottom":"10%","marginLeft": "40%","marginTop": "5%", "display": "block"}}
                src="https://blog.teamtreehouse.com/wp-content/uploads/2015/05/InternetSlowdown_Day.gif" 
                alt="loading" />
            </>
        )





    return (
        <>
            <Heading head={animeName}/>
            {isDisplaying ? renderCard: tempRender}
            <Button handleClick={generateRandomAnime} val ={"Generate Anime"} />
        </>
    )
}

export default App