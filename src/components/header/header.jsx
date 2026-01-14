 import { useEffect, useState } from 'react';
 import { Card } from '../card/Card';
import './header.css'
import { Searched } from '../searchedPage/Searched';
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
    <div className='d-flex flex-column gap-1'>
      <div className="head fixed-top mainHeader" >
        
        <div className="d-flex gap-2  align-items-end my-0 ms-2 w-25">
            <span className='fw-bolder bi bi-newspaper text-primary fs-3'> NewsFlow</span>

        </div>
        <h2 className='fw-lightbold text-white w-50' style={{fontFamily:"sans-serif"}}>Empowering your daily dose of <b>
          <div className='border border-2 rounded-4 p-2 overflow-hidden' style={{width:"80%"}}>
                                    <div className='d-block rounded-2 Topic'
                                     style={{height:"30px"}}
                                    id='cat'>
                                      <h2 className='p-0 m-0 text-primary'><b>News</b></h2>
                                      <h2 className='p-0 m-0'><b>Sports</b></h2>
                                      <h2 className='p-0 m-0'><b>Technology</b></h2>
                                      <h2 className='p-0 m-0'><b>Business</b></h2>
                                      <h2 className='p-0 m-0'><b>Entertainment</b></h2>
                                      <h2 className='p-0 m-0'><b>Science</b></h2>
                                    </div>
                                    </div>
                                    </b></h2>
        <div className="input-group w-25 ui " style={{borderRadius:"10%"}}>
            <input className="form-control w-25 my-0 search input-placeholder" placeholder="search news,sources ..."
            id="userip"
            onBlur={getQuery}></input>
            <button
            className='btn btn-light bi bi-search input-group-text' onClick={setQuery}>
            </button>
        </div>
      </div>
        <div className='d-flex flex-wrap p-4 gap-0 defS' >
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
