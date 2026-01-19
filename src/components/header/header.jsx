 import { useEffect, useState } from 'react';
 import { Card } from '../card/Card';
import './header.css'
import { Searched } from '../searchedPage/Searched';
import Loader from '../loader/loader';
export function NewsHeader() {
    const [articles,setArticles]=useState(50);
    const [newsdata,setnewsData]=useState([]);

    const [searchedQuery,setSearchedQuery]=useState(`${Math.round(Math.random()+1)==1?"technology":"cars"}`)
    const [runquery,setrunSearchQuery]=useState(null);
    const [def,setDefault]=useState(1)
    const [currIndex]=useState(0);
    const [category,setCategories]=useState(["Sports","Technology","Business","Health","Entertainment","General","Science"])

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
    <div className='d-flex flex-column'>
      <div className="head fixed-top d-flex justify-content-between align-items-center" >

        <div className="  align-items-end my-0 ms-2 ">
            <span className='fw-bolder bi bi-newspaper text-primary fs-3'> 
              <span className='overflow-hidden border border-2  bg-white mx-1 rounded p-1 ' style={{height:"40px"}}>
                News
                </span>
              Flow</span>
        </div>
         
                                  
        <div className="input-group mx-1 ui w-50 " style={{borderRadius:"10%"}}>
            <input className="form-control w-25 my-0 search input-placeholder" placeholder="search news,sources ..."
            id="userip"
            onBlur={getQuery}></input>
            <button
            className='btn btn-light bi bi-search input-group-text' onClick={setQuery}>
            </button>
        </div>
      </div>
        <div className='d-flex flex-wrap justify-content-center gap-4 defS' >
        {
            def && newsdata.length===0? 
                 <Loader className="waiter"></Loader> :
                ( newsdata
                .filter(item => item.urlToImage)
                .map((item,index) => (
                item.author!=null &&
                <Card key={item.url} item={item} pos={index}/>
                ))) 
                ||<Searched data={newsdata.filter(item => item.urlToImage||item.author)} ></Searched>
             
        }
        </div>
    </div>


  );
}
