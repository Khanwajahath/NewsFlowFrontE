 import { useEffect, useState } from 'react';
 import { Card } from '../card/Card';
import './header.css'
import { Searched } from '../searchedPage/Searched';
 import { Footer } from '../footer/footer';
import { NewsCat } from '../categories/categories';
import  Carousel  from './carousel/carousal';
import { Weather } from '../weather/weather';
export function NewsHeader() {
    const [articles,setArticles]=useState(50);
    const [newsdata,setnewsData]=useState([]);
    const [carousalData,setCarouslData]=useState([]);
    const [searchedQuery,setSearchedQuery]=useState(`${Math.round(Math.random()+1)==1?"technology":"cars"}`)
    const [runquery,setrunSearchQuery]=useState(null);
    const [def,setDefault]=useState(1)
    const [currIndex]=useState(0);
    const [category,setCategories]=useState("")

    useEffect(()=>{ 
      fetch(`https://news-flow-backend.vercel.app/api/news?q=${searchedQuery}`) 
        .then(response=>response.json()) 
        .then(data=>{
          setCarouslData(data.articles.slice(0,10))
          setnewsData(data.articles.slice(10))
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
    <div className='flex-col text-black font-sans'>
      <div className="bg-black text-1xl p-1 sticky top-0 z-10">
        <div className='flex justify-between   p-2 items-center'>

        <div className="my-0 ms-2 ">
            <span className='font-bold text-2xl bg-white rounded p-1' >News Flow</span>
        </div>       
         <NewsCat></NewsCat>
        <div className="flex gap-0 bg-white rounded-2xl p-1">
            <input
              className="placeholder:text-gray-500 placeholder:italic outline-0"
              placeholder="Search Topic"
              type="text"
              name="search"
              onBlur={getQuery}
              
            />

            <button onClick={setQuery}> 
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6  ">
              <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
              </svg>
            </button>
        </div>
        </div>
      </div>
      <div className='  md:flex align-middlee'>
      <Carousel content={carousalData}></Carousel>
      <Weather></Weather>
      </div>
        <div className='flex flex-wrap content-end gap-5  p-3 text-black' >
        {
            def &&
                ( newsdata
                .filter(item => item.urlToImage)
                .map((item,index) => (
                item.author!=null &&
                <Card key={item.url} item={item} pos={index}/>
                ))) 
                ||<Searched data={newsdata.filter(item => item.urlToImage||item.author)} ></Searched>
             
        }
        </div>
      <hr className='text-black text-2xl'></hr>
      <Footer className="mt-5"></Footer>
    </div>


  );
}
