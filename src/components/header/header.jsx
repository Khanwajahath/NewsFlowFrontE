 import { useEffect, useState } from 'react';
 import { Card } from '../card/Card';
import './header.css'
import { Searched } from '../searchedPage/Searched';
export function NewsHeader() {
    const [articles,setArticles]=useState(50);
    const [newsdata,setnewsData]=useState([]);
    const [searchedQuery,setSearchedQuery]=useState("technology")
    const [runquery,setrunSearchQuery]=useState(null);
    const [def,setDefault]=useState(1)


    useEffect(()=>{ 
      fetch(`https://news-flow-backend.vercel.app/api/news?q=${searchedQuery}`) 
        .then(response=>response.json()) 
        .then(data=>{
          setnewsData(data.articles)
        }) 
      },[searchedQuery])
    function getQuery(e){
    
        setrunSearchQuery(e.target.value)
      
    }
    function setQuery(){
         setSearchedQuery(runquery)
         setDefault(0)
    }

  return (
    <div>
      <div className="head fixed-top mainHeader">

        <div className="d-flex gap-2  align-items-end my-0 ms-2">
            <span className='fw-bold bi bi-newspaper text-primary fs-3'></span>
            <h5 className="fw-bold text-white">NewsFlow</h5>
        </div>
        <h2 className='fw-lightbold text-white' style={{fontFamily:"sans-serif"}}>Empowering your daily dose of <b>News</b></h2>
        <div className="input-group w-25">
            <input className="form-control w-25 my-0 search input-placeholder" placeholder="search news,sources ..."
            id="userip"
            onBlur={getQuery}></input>
            <button
            className='btn btn-light bi bi-search input-group-text' onClick={setQuery}>
            </button>
        </div>
      </div>
        <div className='d-flex flex-wrap p-4 gap-3 justify-content-center' style={{marginTop:"5%"}} >
        {
        
            def && newsdata
                .filter(item => item.urlToImage)
                .slice(0, articles)
                .map((item,index) => (
                item.author!=null &&
                <Card key={item.url} item={item} pos={index}/>
                )) || <Searched data={newsdata.filter(item => item.urlToImage||item.author)} ></Searched>
             
        }
        </div>
    </div>


  );
}
