import React, {useMemo, useState} from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

export default function StarRating({ count, rating, color, onRating }) {
  const [hoverRating, setHoverRating] = useState(0);
  const getColor = index => {
    if (hoverRating >= index) {
      return color.filled;
    } else if (!hoverRating && rating >= index){
      return color.filled;
    }
    return  color.unfilled;
  }
  
  
  const starRating = useMemo(()=>{
    // return an array, with the same number of element as count
    return Array(count)
    // fill the array with 0, other wise the all elements will be undefined 
            .fill(0)
    // fill array element with an incrementing integer starting with x, x default value is 0, so x+1 = 1 as starting value, the _ is a throwaway variable, can also use unused
            .map((_,x)=>x+1)
            .map(starIndex => (
              <FontAwesomeIcon 
                key={starIndex} 
                className="starRating" 
                icon={faStar} 
                onClick={()=> onRating(starIndex)} 
                style={{color: getColor(starIndex)}}
                onMouseEnter={()=>setHoverRating(starIndex)} 
                onMouseLeave={()=>setHoverRating(0)}/>
            ))
  },[count, rating, hoverRating])
  
  return (
    <div>
     {starRating}
    </div>
  )
}