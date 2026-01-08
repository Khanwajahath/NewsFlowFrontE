import { useEffect, useState } from "react"
 
import './bresking.css'
export function Breaking(){
    const [query]=useState("Breaking");
    const [breaking,setBreaking]=useState([]);
    useEffect(()=>{
        fetch(`https://news-flow-backend.vercel.app/news?q=${query}`)
        .then((response)=>response.json())
        .then((data)=>{
   
            setBreaking(data.articles[0])
            
        })
    },[])
     
    const publishedat =new Date(breaking.publishedAt)
    const currenttime=new Date();
    const lapsedTime=currenttime-publishedat
   
    const daysAgo = Math.floor(lapsedTime / (1000 * 60 * 60 * 24));

    return(
        
        <div className="p-3">
            <h1 className="fw-bold text-white d-inline mb-4">Breaking News</h1>
            <div className=" breaking-card">
                     <img src={breaking.urlToImage} className="rounded-start-3" style={{objectFit:"cover"}}></img>
                 <div className=" card d-flex justify-content-between flex-column rounded-3 p-3 text-white">
                    <div className=" d-flex flex-column">
                        <div className="my-4">
                            <span className="bg-primary fw-bold d-inline text-light p-2 rounded ">{query}</span>
                        <span className="bi bi-dot"></span>
                        <span>{`${daysAgo} Minutes ago`}</span>
                        </div>
                        <h5 className="fw-lightbold ">{breaking.title}</h5>
                        <p className="desc">
                            {breaking.description}
                        </p>
                        <div className="float-end mb-2">
                             <button className="btn text-white bg-primary w-50" ><a className="readbtn text-white" href={breaking.url}>Read more</a></button>
                        </div>
                    </div>
                    <div>
                        <span className="bi bi-person-circle"></span><span> by {breaking.author===null?"Unknown":breaking.author}</span>
                    </div>
                 </div>
            </div>
        </div>
    )
}