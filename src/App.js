 import styles from'./App.css';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [values,setValue]=useState({name:"",sex:"",age:"",email:""})
  const [todo,setTodo]=useState([])
  const [arr,setArr]=useState([])
  const [ind,setind]=useState(1)
  const [page,setpage]=useState(1)
  const [slice,setSlice]=useState([])
  const [edit, setEdit] = useState(false);
   const [currentTodo, setCurrentTodo] = useState({});
   console.log("todo",todo)
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('todo'));
    if (items) {
     setTodo(items);
     handelSlice(1,items)
    }
    
  }, []);
const handelChange=(e)=>{
// let obj=value;
// let name=e.target.name;
//  obj[name]=e.target.value
  setValue({...values,[e.target.name]:e.target.value})
  // console.log("obj",values)

}

const handelSubmit=(e)=>{
  e.preventDefault();
 if(values.name.length>0&&values.email.length>0){
 
 let item=values;
 item.id=uuidv4()
  setTodo([...todo ,item])
  localStorage.setItem('todo', JSON.stringify([...todo ,item]));
   setValue({name:"",sex:"",age:"",email:""})
   setEdit(false)
  //  console.log("todo",todo)
 }
}
const handelDelete=(id)=>{
  const removetodo=todo.filter((el)=>{
    return el.id !==id
  })
  setTodo(removetodo)
  localStorage.setItem('todo', JSON.stringify(removetodo));

}
 

const handelEdit=(v)=>{
 if(!edit){
  setValue(v)
  setEdit(true)
  console.log("edit",!edit)
  let vals=todo.filter((e)=>v.id!=e.id)
  setTodo(vals)
 }
 }
// pagintion 
let rowofpag=3
 useEffect(()=>{
 
  const Nofpages=Math.ceil(todo.length/rowofpag)
   let array=[]
  for(var i=1;i<=Nofpages;i++){
    array.push(i)
    setArr(array)
  } 
  console.log(arr)
},[todo])

useEffect(()=>{
  handelSlice(page)

},[todo,page])
const handelSlice=(page=1,item)=>{
  if(!item){
    item=todo
  }
setSlice(item.slice((page-1)*rowofpag,page*rowofpag))

  setind((page-1)*rowofpag)

console.log("a",item.slice((page-1)*rowofpag,page*rowofpag))
}
 

// maping that tabel-----------------------------------------------------------
const Table = ({ data, rowsPerPage }) => {
 
  return(
    <>
      <table>
          <thead>
              <tr>
                  <th>S.N</th>
                  <th>Name</th>
                  <th>Sex</th>
                  <th>age</th>
                  <th>Email</th>
                  <th>Delete</th>
                  <th>Edit</th>
                  
              </tr>
          </thead>
          <tbody>
          {
              slice.map((data, index)=>{
                  return(
                      <tr key={data.id} >
                          <td>{index+1+ind}</td>
                          <td>{data.name}</td>
                          <td>{data.sex}</td>
                          <td>{data.age}</td>
                          <td>{data.email}</td>
                          <td>{<button onClick={()=>handelDelete(data.id)}>delete</button>}</td>
                          <td>{<button onClick={()=>handelEdit(data)} >edit</button>}</td>
                      </tr>
                  )
              })
          }
          </tbody>
        
      </table>
       <div> { arr.map((no)=><button onClick={()=>setpage(no)}>{no}</button>)}
       </div>
        </>
  )
  
}

  return (
    <div className="App">
      <header className="App-header">
        <h1>todo list</h1>
        <input onChange={handelChange} value={values.name} placeholder='Name...' name='name'  />
        <input onChange={handelChange} value={values.sex} placeholder='sex' name='sex'  />
        <input onChange={handelChange} value={values.age} placeholder='age' name='age'  />
        <input onChange={handelChange} value={values.email} placeholder='email' name='email'  />
        <button onClick={handelSubmit} >submit</button>
         {/* {Table()} */}
         <Table data={todo} rowsPerPage={2}/>

      </header>
    </div>
  );
}

export default App;
