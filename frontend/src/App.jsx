import { useState,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Transcript from './components/Transript'

function App() {
  const [text, setText] = useState([]);
  const inputref = useRef(null);
  const [loading, setLoading] = useState(false);
  async function transcipter(){
    console.log("button clicked");
    setLoading(true);
    const linkAddress = inputref.current.value;
    // inputref.current.value="";
    const id = linkAddress.match(/(?:.be\/|\/watch\?v=|\/(?=p\/))([\w\/\-]+)/)[1];
    const response = await fetch('http://localhost:4000/video?videoId='+id);
    const data = await response.json();
    if(data.success){
      console.log(data.message);
      const src = `http://img.youtube.com/vi/${id}/0.jpg`;
      const objj = text;
      objj.push({
        src:src,
        text:data.message
      });
      setText(objj);
    }
    else{
      console.log(data.message);
    }
    setLoading(false);
    console.log("process completed");
  }
  return (
    <>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
        <input ref={inputref} placeholder='give the link of youtube'></input>
        <button onClick={transcipter} >Submit</button>
        {loading ? <div>Loading...</div> : <div>Search the Trascript for the Video</div>}
        {text.map((item)=>{
          return <Transcript key={item.key} src={item.src} text={item.text} />
        })}
      </div>

    </>
  )
}

export default App
