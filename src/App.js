import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Button from './components/Button/Button';
import Heading from './components/Heading/Heading';

function App() {
  const [animeData, setAnimeData]= useState([]);
  // const [animeName, setAnimeName ]  = useState()
  const [animeFacts, setAnimeFacts] = useState([])
  let API_URL = "https://anime-facts-rest-api.herokuapp.com/api/v1"

  //fetching data
  useEffect(()=> {
    axios.get(API_URL).then((res)=>{
      setAnimeData(res.data.data)
    }).catch((err)=> console.log(err))
  },[])

//retreiving anime names
  const animeNames = animeData.map((data)=> {
    return data.anime_name
  })

  const generateRandomAnimeName =()=> {
    let randomIndex = Math.floor(Math.random() * (animeNames.length-1))
    return animeNames[randomIndex]
  }

  //generate anime facts api
  const generateAnimeAPI = () => {
    let name = generateRandomAnimeName()
    if(name === undefined) {
      name  = 'naruto'
    }
    let animeChannel = `${API_URL}/${name}`
    return animeChannel
}

//fetch anime facts
  useEffect(()=>{
    axios.get(`${generateAnimeAPI()}`).then((res)=> {
      setAnimeFacts(res.data.data)
      console.log(res.data.data)
    }).catch((error) => console.log(error))
  }, [])
  
  //generating random fact
  const genrateAnimeFact = () => {
    let index = Math.floor(Math.random() * (animeFacts.length -1))
    let fact = animeFacts[index]
    return fact
  }


  return (
    <>
      <Heading />
      <Button handleClick={genrateAnimeFact} /> 
    </>
  )
  
}

export default App;
