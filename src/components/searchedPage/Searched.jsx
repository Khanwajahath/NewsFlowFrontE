 
import { Card } from "../card/Card";
 
import './searched.css'
export function Searched({ data }) {
  return (
        <div className="flex flex-wrap content-end gap-5  p-3 text-black">
          {data.shift() &&
          data.map((item, index) => (
            <Card key={item.url} item={item} pos={index}></Card>
          ))}
        </div>
  );
}
