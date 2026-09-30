import { useEffect, useRef, useState } from "react";
import CharacterPicker from "../atoms/CharacterPicker";
import useSound from 'use-sound';
import  success  from "../../assets/success.mp3"
import  win  from "../../assets/win.mp3"
import FoundList from "../atoms/FoundList";
import FoundGraphic from "../atoms/FoundGraphic";
import Victory from "../atoms/Victory";

export default function PlayPage() {
  const TOTAL_CHARACTERS = 4

  const [gameDetails, setGameDetails] = useState({x: 0, y: 0, imageX: 0, imageY: 0, mouseX: 0, mouseY: 0, time: 0});
  const [visibilityPicker, setVisibilityPicker] = useState(false);
  const [foundCharacters, setFoundCharacters] = useState([]);

  
  const imageRef = useRef(null);
  const [playPoint] = useSound(success);
  const [playWin] = useSound(win);


  function handleImageClick(e) {
    const imageClickX = e.nativeEvent.offsetX;
    const imageClickY = e.nativeEvent.offsetY;
    const mouseX = e.nativeEvent.pageX;
    const mouseY = e.nativeEvent.pageY;
    const imageWidth = e.target.clientWidth;
    const imageHeight = e.target.clientHeight;
    setGameDetails({x: imageClickX, y: imageClickY, imageX: imageWidth, imageY: imageHeight, mouseX: mouseX, mouseY: mouseY});
    setVisibilityPicker(true);
    
  }

  async function handlePick(character) {
    setVisibilityPicker(false);
    const response = await fetch("http://localhost:3000/verify", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "x": gameDetails.x,
      "y": gameDetails.y,
      "imageX": gameDetails.imageX,
      "imageY": gameDetails.imageY,
      "character": character,
      "foundX": gameDetails.mouseX,
      "foundY": gameDetails.mouseY,
    }),
  });
  const result = await response.json();

  if (result.score) {
    const isLast = foundCharacters.length + 1 === TOTAL_CHARACTERS;
    if (isLast){
      playWin();
      setGameDetails({...gameDetails, time: result.time});
    }else{
      playPoint()
    }
    setFoundCharacters((prev) => [
      ...prev,
      { name: character, foundX: gameDetails.mouseX, foundY: gameDetails.mouseY },
    ]);
  }else{
    alert("Thats not " + character);
  }};

//Start game use effect, fetches data from server if available.
  useEffect(() => {
    async function startMap(){
      const response = await fetch("http://localhost:3000/start", {
        method: "GET",
        credentials: "include",
      })
      const result = await response.json();
      if (result){
        setFoundCharacters([...foundCharacters, ...result]);
      }
      setGameDetails({...gameDetails, imageX: imageRef.current.clientWidth, imageY: imageRef.current.clientHeight})
    }
    startMap();
  }, [])
  
  return (
    <div className="play-div">
      {foundCharacters.length < 4 ? 
      <>
        <ul className="found-list"><li className="title">Found characters:</li><FoundList foundCharacters={foundCharacters} /></ul>
        <div className="waldo-image-div">
          <img ref={imageRef} onClick={(e) => handleImageClick(e)} className="waldo-image" src="/waldo-1.jpg" alt="" />
          <FoundGraphic foundCharacters={foundCharacters} gameDetails={gameDetails}/>
        </div>
        <CharacterPicker onPick={handlePick} top={gameDetails.mouseY} left={gameDetails.mouseX} visibility={visibilityPicker} setVisibility={setVisibilityPicker} foundCharacters={foundCharacters}/>
      </>
      : 
      <Victory time={gameDetails.time} />
      }
    </div>
  )};