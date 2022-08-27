import './App.css';
import { useState,useEffect } from 'react';
import { Articlelist } from './COMPONENTS/Articlelist';
import Form from './COMPONENTS/Form';
function App() {
  const [article,setarticles]=useState([])
  //WITH THIS editArticle we will be getting the original article which needs to be editted
  //This thing will be getting from Articlelist.js,EDIT_ARTICLE function will heps us to do that
  //After getting this article we will be passing to Form.js as article_
  const [editArticle,seteditArticle]=useState("")
  //THIS ALSO WORKS(THIS IS COPY PASTED FROM TASK TRACKER)
  // useEffect(()=>{
  //   const getarticles=async()=>{
  //      const articlesfromserver=await fectcharticleFromServer()
  //      setarticles(articlesfromserver)
  //   }
  //   getarticles()
  // },[])
  // const fectcharticleFromServer=async()=>{
  //   const res=await fetch('http://127.0.0.1:5000/get')
  //   const data=await res.json()
  //   return data
  // }
  useEffect(()=>{
    fetch('http://127.0.0.1:5000/get',{'method':'GET',headers:{'Content-Type':'application/json'}})
    .then(resp=>resp.json())
    // Note that despite the method being named json(), the result is not JSON but is instead the result 
    // of taking JSON as input and parsing it to produce a JavaScript object.
    .then(resp=>setarticles(resp))
    .catch(error=>console.log(error)) 
  },[]
  )
  const EDIT_ARTICLE=(article_)=>{
    console.log("HY")
    seteditArticle(article_)
  }
  const EDIT_ARTICLE_TO_NULL=()=>{
    console.log("HY NULL")
    seteditArticle("")
  }
  const updatedData=(articleAfterUpdated)=>{
    const new_article=article.map((x)=>
    {
      if (x.id==articleAfterUpdated.id)
      {
        return articleAfterUpdated
      }
      else{
        return x
      }
    }
    )
    setarticles(new_article)//doubt
  }
  const deletedataArticleList=(id)=>{
    setarticles(article.filter((e)=>{
      return e.id!==id
    }))
  }
  const updateArticleList=(x)=>{
    setarticles([...article,x])
  }
  const openForm=()=>{
    seteditArticle({title:"",body:""})  
  }
  return (
    <div className="App">
     
     <div className='row'>
       <div className='col'>
       <h1>FLASK AND REACTJS COURSE</h1>
       </div>
       <div className='col'>
         <button className='btn btn-success' onClick={openForm}>InsertTodos</button>
       </div>
     </div>

     {/* for updating and removing the existing data we go here,but backend deletion only take place there 
     1.this will lists the article list in the database
     2.handles update button on each atricle
     3.handles deletes button on each atricle
     
     here the article contain full list of articles
     deletedataArticleList accepts the id as the argument and in this file it will filter the list.
     articleEdit 
     */}
     <Articlelist deletedataArticleList={deletedataArticleList} article={article} 
     articleEdit={EDIT_ARTICLE}/>

     {/* to show the added todos we go here,backend update,backend insert will take place here  
     1.shows form when we click update on the article.At this time the editArticle will get filled by
     the article which needs to updated,here to form.py file this article is passed as article_.
     
     2.shows the form when we click InsertTodos button in UI.here we will be passing emptyarticle in 
     in the editArticle
     
     updateArticleList fn is used in form.js when a new article is made ,this will accept new article
     as argument and in this file the new article will be added to original article

     article_ is passed to identify which article in UI is to be changed and updatedData fn accepts
     the new article and in this file it will searches in the article list ,and replace that with 
     new article
     */}
     {editArticle ?<Form  updateArticleList={updateArticleList} article_={editArticle} 
     updatedData={updatedData} EDIT_ARTICLE_TO_NULL={EDIT_ARTICLE_TO_NULL}/>:null }
    </div>
  );
}

export default App;
