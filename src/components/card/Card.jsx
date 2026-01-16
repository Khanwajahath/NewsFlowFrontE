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
                
                <div className={`card text-white gap-1 cardNi rounded-3 ${
    (pos + 1) % 5 === 0 ? "card-50" : "card-25"
  }`}>
                    <img src={item.urlToImage} className='card-img-top card-img-fixed'
                    style={{width:"100%"}}></img>
                    <div className='card-body'>
                        <h6 className='card-title'>
                        {item.title}
                    </h6>
                     
                    </div>
                    <div className='ms-3'>
                        <span>{item.source.name}</span>
                    </div>
                    <div className='d-flex p-2'>
                    <span className='bi bi-person-fill mx-2'></span>
                    <span className='author'>{item.author!=null && item.author.length<=16?item.author:"Unknown"}</span>
                    <span className='bi bi-dot' style={{fontSize:"15px"}}>{
                        published(item.publishedAt)
                        }</span>
                    </div>
                    {/* <button className='btn btn-primary d-inline-block' >
                        <a href={item.url}
                        className='text-white text-decoration-none d-inline'
                        target='_blank'>
                            read more
                        </a>
                    </button> */}
                </div>
    )
}