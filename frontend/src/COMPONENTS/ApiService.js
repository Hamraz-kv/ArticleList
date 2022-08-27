// Syntax. fetch(URL, options);
// Parameters. The fetch() method accepts the following two parameters. URL : 
// The URL on which the request is to be made. ...
// Return value. The fetch() method returns a promise that can either be resolved or not.

export default class APIService{
    static UpdateArticle(id,body){
        // Content-Type. application/json. Indicates that the request body format is JSON.
        return fetch(`http://127.0.0.1:5000/update/${id}/`,{'method':'PUT',
        headers:{'Content-Type':'application/json'},body :JSON.stringify(body)})
        // The JSON. stringify() method converts a JavaScript object or value to a JSON string,

        // What is res => res JSON ()?
        // res. json() in react means: when you try fetch data from a server, 
        // it will send you a RESPONSE which contains tons of irrelevant information. 
        // To target only the BODY part of the response and to convert it from JSON to javascript, 
        // you use res. json(). –
        .then(resp=>resp.json())

        .catch(error=>console.log(error));
    }
    static InsertArticle(body){
        return fetch(`http://127.0.0.1:5000/add`,{'method':'POST',headers:{'Content-Type':'application/json'},body :JSON.stringify(body)})
        .then(resp=>resp.json())
        .catch(error=>console.log(error));
    }
    static DeleteArticle(id){
        return fetch(`http://127.0.0.1:5000/delete/${id}/`,{'method':'DELETE',headers:{'Content-Type':'application/json'}})
        
    }
}