import React,{useState, useEffect} from 'react'




const getWindowDimensions= () => {
    const { innerWidth: width } = window;
    //console.log('width dimension: '+width)
    return width
      
  
  }


export const GetDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    //check dimnesions 
      useEffect(() => {
        const handleResize = ()=> {
          setWindowDimensions(getWindowDimensions());
          
        }
       // console.log('dimension '+windowDimensions);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);
    return windowDimensions
}
export default GetDimensions