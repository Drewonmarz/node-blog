const express = require('express')
const Article = require('../models/article');
const router = express.Router()




router.get('/new', (req, res )=>{
    res.render('articles/new', {article: new Article})
})

router.get('/edit/:id',async (req, res )=>{
    const article = await findById(req.params.id)
    res.render('articles/edit', {article: article})
})

router.get('/:slug', async (req ,res)=>{
    const article =  await findOne({ slug:
        req.params.slug })
    if(article == null) res.redirect('/')
    res.render('articles/show', {article: article})

}, saveArticleAndRedirect('new'))

router.post('/', async (req ,res, next )=>{
    req.article = new Article()
    next()
   
}, saveArticleAndRedirect('new'))


router.put('/;id', async (req ,res, next )=>{
    req.article = await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
    next()


},saveArticleAndRedirect('edit'))

router.delete('/:id',async (req,res)=>{
    await findByIdAndDelete(req.params.id)
    res.redirect('/')
})

async function saveArticleAndRedirect(Path){
    let article = req.article
    return async (req ,res) => {
       
        article.title = req.body.title
        article.description = req.body.description
        article.markdown = req.body.markdown
        try{
            article = await article.save()
            res.redirect(`/articles/${article.slug}`)  
        }catch (e){
            res.render(`/article/${path}`,{article: article}
            )
    }

    
    }

}  
module.exports = router

