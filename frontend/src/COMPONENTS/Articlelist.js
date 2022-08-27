import React from 'react'
import App from '../App'
import APIService from './ApiService'

// IN THIS FN 2 happens 

// 1. From APIService file it will call fn which directly deletes article using id of article

// 2. We also need to see this change in UI,so the id of article which needs to be deleted will be passed
//    to deletedataArticleList fn .
export const Articlelist = (props) => {
    const ondelete=(id)=>{
        APIService.DeleteArticle(id)
        .then(()=>props.deletedataArticleList(id))
        // props.deletedataArticleList(id)
        //This also works
    }
    //what this fn does is it will take the article which needs to be updated ,and pass it to the App.js
    // through articleEdit fn
    const onUpdateArticle=(x)=>{
        props.articleEdit(x)
    }
  return (
    <div >
        {props.article.length!==0 ? props.article.map((x)=>{
            return (
                <div key={x.id} style={{color:"red"}}>
               <h2 style={{color:"blue"}}>{x.title}</h2> 
               <p>{x.body}</p> 
               <p>{x.date}</p>
               <div className='row'>
                   <div className='col-md-1'>
                   <button className='btn btn-primary' onClick={()=>{onUpdateArticle(x)}}>UPDATE</button>
                   </div>
                   <div className='col'>
                   <button className='btn btn-sm btn-danger' onClick={()=>{ondelete(x.id)}}>REMOVE</button>
                   </div>
                   
                </div>
               
               <hr style={{color:"white"}}/> 
               </div>
            
            )
        }):"NOTHING TO SHOW" }
       
    </div>
  )
}
