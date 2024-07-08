 import React from 'react'
 
 function TopButtons({setQuery} ) {
    
    
    const cities=[
        
        {
            id:1,
            title:'New Delhi',
            
            
            
        },
        {
            id:2,
            title:'Mumbai'
        },
        {
            id:3,
            title:'Uttar Pradesh'
        },
        {
            id:4,
            title:'Varanasi'
        },
        {
            id:5,
            title:'Goa'
        }
    ];
   return (
    
     <div className="flex items-center justify-around my-6 ">{cities.map((city)=>(<button key={city.id}className="text-white text-lg   transition ease-out font-medium hover:scale-110" onClick={() => setQuery({q:city.title})}>
        {city.title}</button>))}
     </div>
   );
   
 }
 
 export default TopButtons;