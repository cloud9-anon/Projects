
import { useCallback, useState , useEffect ,useRef} from 'react';

function App() {

  const [length, setLength] = new useState(8);  
  const [numberAllowed , setNumberAllowed] = new useState(false);
  const [charAllowed, setCharAllowed] = new useState(false);
  const [password , setPassword ] = new useState("");



const passRef = new useRef(null);


  const passwordGenerator = useCallback(() =>
   {
    let pass =""
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*()_+"
     
    for (let i = 1; i <= length; i++) 
    {
      let char =Math.floor(Math.random() * str.length + 1);
      
      pass += str.charAt(char)
      
      setPassword(pass)
    }
      
  },[length,numberAllowed,charAllowed,setPassword]) 

const copyToClipboard = useCallback(() => {
    passRef.current?.select()
    // passRef.current?.setSelectionRange(0,1)
    window.navigator.clipboard.writeText(password)
},[password])
  useEffect(()=>{
    passwordGenerator()
  },[numberAllowed,length,charAllowed,passwordGenerator])

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg 
    px-4 py-3 my-8 text-orange-600 bg-gray-900'>
    <h1  className='text-white text-center'>Password Generator</h1> 
      <div className='flex shadow rounded-lg overflow-hidden mb-4 my-3'>
       <input 
        type='text'
        value={password}
        className='outline-non w-full py-1 px-3'
        placeholder='Password'
        ref={passRef}  
       />
       <button 
       className='bg-red-600 text-black px-3 py-0.5 shrink-0'
       onClick={copyToClipboard}

       >copy</button>
      </div>
      
      <div className='flex text-sm gap-x-2'>
          
          <div className='flex items-center gap-x-1'>
            <input 
              type="range"
              min={6}
              max ={12}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {setLength(e.target.value)}} 
              
            />
            <label>Length : {length}</label>
          </div>

          <div>
          <input 
              type="checkbox"
              defaultChecked={numberAllowed}
              id = 'numberInput'
              className='cursor-pointer'
              onChange={() => {
                setNumberAllowed((prev) => !prev)}}
           
            />
             <label htmlFor='numberInput' > Numbers </label>
          </div>
          
          <div>
              <input 
                type="checkbox"
                defaultChecked={charAllowed}
                id = "charInput"
                onChange={()=>{
                  setCharAllowed((old) => !old)}}         
              />
              <label htmlFor='charInput' > Characters </label>
          </div>
      </div>
    </div>
  );
}

export default App;
