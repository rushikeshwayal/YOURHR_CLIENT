



function Btn(props) {

   
  return(

    <a href={props.link} className=" border-[1px] border-black text-black font-bold px-5 py-2 rounded-lg bg-green-400 hover:bg-green-500 ">{props.title}</a>
                
  );
    
}

export default Btn;