const express = require ('express');
const app = express()
const Article = require('./models/article')
// const articleRouter = require('.');
const mongoose = require('mongoose')
const methodOverride =require('method-override')
const articleRouter = require('./Routes/articles')

mongoose.connect('mongodb://localhost:27017',{
    useNewUrlParser: true, useUnifiedTopolgy: true, useCreateIndex: true
})


app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('-method'))

app.get('/', async (req , res) =>{
    const articles = await Article.find().sort({ 
        createdAt: 'desc'
    })  
    res.render( 'articles/index', {articles: articles})
})

app.use('/articles',articleRouter)

app.listen(5000)