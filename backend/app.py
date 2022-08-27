from datetime import datetime
from flask import Flask, render_template,jsonify,request
import datetime
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS

app=Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI']='mysql://root:' '@localhost/flask'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False

db=SQLAlchemy(app)
ma=Marshmallow(app)

class Articles(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    title=db.Column(db.String(100))
    body=db.Column(db.Text())
    date=db.Column(db.DateTime,default=datetime.datetime.now)

    def __init__(self,title,body) -> None:
        self.title=title
        self.body=body

# what is the purpose of this 
class ArticlesSchema(ma.Schema):
    class Meta:
        fields=('id','title','body','date')
        # These are the fields we need to serialize using Marshmallow

# NOW create schema object
article_schema=ArticlesSchema()
articles_schema=ArticlesSchema(many=True)

@app.route('/get',methods=['GET'])
def get_articles():
    all_articles=Articles.query.all()
    results=articles_schema.dump(all_articles)
    # return jsonify("HELLO","WORLD",8)
    return jsonify(results)
    # we can see the result in the postman 

@app.route('/get/<id>/',methods=['GET'])
def post_details(id):
    article=Articles.query.get(id)
    return article_schema.jsonify(article)

@app.route('/update/<id>/',methods=['PUT'])
def update_article(id):
    article=Articles.query.get(id)
    title=request.json['title']
    body=request.json['body']
    article.title=title
    article.body=body
    db.session.commit()
    return article_schema.jsonify(article)

@app.route('/delete/<id>/',methods=['DELETE'])
def delete_article(id):
    article=Articles.query.get(id)
    db.session.delete(article)
    db.session.commit()
    return article_schema.jsonify(article)

@app.route('/add',methods=['POST'])
def add_articles():
    title=request.json['title']
    body=request.json['body']
    articles=Articles(title,body)
    db.session.add(articles)
    db.session.commit()
    # this is just to print in the post man
    return article_schema.jsonify(articles)



if __name__=="__main__":
    app.run(debug=True)