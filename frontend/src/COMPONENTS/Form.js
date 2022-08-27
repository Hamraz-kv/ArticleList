import React from 'react'
import { useState,useEffect } from 'react'
import APIService from './ApiService'
function Form(props) {
    const [title,settitle]=useState('')
    const [body,setbody]=useState('')
    // A component is changing an uncontrolled input to be controlled. This is likely 
    // caused by the value changing from undefined to a defined value, which should not happen. 
    // For removing this error we have to initialiize title and body as ''
    useEffect(()=>{
        settitle(props.article_.title)
        setbody(props.article_.body) 
    },[props.article_])


    // when we click updates in the form 2 things happens
    // 1. From APIService file it will call UpdateArticle fn which directly updates article with the
    // new title and body
    // 2. We also need to see this change in UI,so we uses updatedData fn .
    const updateArticle=()=>{
        APIService.UpdateArticle(props.article_.id,{title,body})
        .then(resp_=>props.updatedData(resp_))//this must understand
        .catch(error=>console.log(error))
        // settitle("")
        // setbody("")
        // props.EDIT_ARTICLE_TO_NULL()
    }
    const insertArticle=()=>{
        APIService.InsertArticle({title,body})
        .then(resp=>props.updateArticleList(resp))
        // .then(resp=>console.log(resp))
        .catch(error=>console.log(error))
    }
  return (
    <div>
        {/* {props.article_ ?( */}
            <div className='mb-3'>
                <label htmlFor='title' className='form-label'>Title</label>
                <input type="text" className='form-control' placeholder='Enter the Title'
                 onChange={(e) => settitle(e.target.value)} value={title}/>

                <label htmlFor='body' className='form-label'>Description</label>
                <textarea rows="5" className='form-control' placeholder='Description' 
                onChange={(e) => setbody(e.target.value)} value={body}/>
                {/* {title!='' & body!='' &&(<button onClick={updateArticle} className='btn btn-success mt-3'>Update</button>)} */}
                {props.article_.id?(<button onClick={updateArticle} className='btn btn-success mt-3'>Update</button>):(<button  
                className='btn btn-success mt-3' onClick={insertArticle}>Insert</button>)}
            </div>
        {/* ):null} */}
    </div>
    
  )
}

export default Form