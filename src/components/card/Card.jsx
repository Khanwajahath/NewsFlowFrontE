import './card.css'
export function Card({item,pos}){

function published(date) {
  const diffMs = Date.now() - new Date(date).getTime();

  const minutes = Math.floor(diffMs / (1000 * 60));
  if (minutes < 60) return `${minutes} sec ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} min ago`;

  const days = Math.floor(hours / 24);
  return `${days} ${days==1?"min":"mins"} ago`;
}

    
    return(
                
        <div className='  card-25   h-80 rounded-3xl hover:shadow-2xl bg-grey-600 bg-gray-300 '>
                    <img loading='lazy'  src={item.urlToImage} className='rounded-t-2xl card-img-fixed '
                    style={{width:"100%"}}></img>
                    <div className=' flex justify-between p-2'>
                        <div className='flex gap-1 mt-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                        </svg>
                        <span>{item.source.name}</span>
                        </div>
                            <a target='_blank' href={item.url}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>
                    <div className='card-body p-2'>
                        <h6 className='card-title font-bold p-1'>
                        {item.title}
                        </h6>
                    </div>
        </div>
    )
}