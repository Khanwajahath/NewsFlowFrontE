import './card.css'
export function Card({item,pos}){

    function published(date){
        const diffMs=new Date()-new Date(date)
        const seconds = Math.floor(diffMs / 1000);
        const minutes = Math.floor(diffMs / (1000 * 60));
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const days=Math.floor(hours/24)
        return days+" min ago";
    }
    
    return(
                <div className='card text-white gap-3' style={{width:`${(pos+1)%5==0?50:25}%`}}>
                    <img src={item.urlToImage} className='card-img-top card-img-fixed'
                    style={{width:"100%"}}></img>
                    <div className='card-body'>
                        <h6 className='card-title'>
                        {item.title}
                    </h6>
                     
                    </div>
                    <div>
                    <span className='bi bi-person-fill mx-2'><sapn>{item.author!=null?item.author:"Unknown"}</sapn></span>
                    <span className='bi bi-dot'>{
                        published(item.publishedAt)
                        }</span>
                    </div>
                    <button className='btn btn-primary d-inline-block' >
                        <a href={item.url}
                        className='text-white text-decoration-none d-inline'
                        target='_blank'>
                            read more
                        </a>
                    </button>
                </div>
    )
}