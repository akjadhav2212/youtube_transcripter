import {marked} from 'marked'
export default ({src,text})=>{
    return <>
        <img width={360} src={src} alt="" />
        <div dangerouslySetInnerHTML={{ __html: marked(text) }} />
    </>
 }
