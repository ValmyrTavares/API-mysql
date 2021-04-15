const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const connection = require("./database/database")
const Game = require("./database/Games")

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.set('view engine', 'ejs')


connection
.authenticate()
.then(()=> {
    console.log("Conexão feita com o banco de dados")
})
.catch((msgErro)=>{
    console.log(msgErro)
})

app.get("/games",(req, res)=>{
     
    Game.findAll().then(games =>{
        console.log(games)
      res.json(games)
  })
})

app.get("/game/:id",(req, res)=>{
    if(isNaN(req.params.id)){
        res.statusCold = 400
    }else{
        var id = req.params.id
        Game.findOne({
            where:{
                id:id
            }            
        }).then(games=>{         
            res.json(games)
        })
    }
})

app.post("/game",(req, res) =>{   

    var{title, year, price} = req.body

    Game.create({
        title:title,
        year:year,
        price:price
    }).then(()=>{
        res.sendStatus(200)
    })
})

app.delete("/game/:id",(req, res)=>{
    if(isNaN(req.params.id)){
        res.statusCode = 400
    }else{
        var id = req.params.id
        console.log(id)
        Game.destroy({
            where:{
                id:id
            }
        })
        res.sendStatus(200)
    }
})

app.put("/game/:id",(req, res) =>{
    if(isNaN(req.params.id)){
        res.statusCode = 400
    }else{
        var id = req.params.id
        var {title, price, year}= req.body;
        // console.log(title)
        // console.log(price)
        // console.log(year)

        if(title != undefined){
            title: title
        }
        if(year != undefined){
            year: year
        }
        if(price != undefined){
            price: price
        }
        Game.update({title:title, year:year, price:price},{
            where:{
                id:id
            }
        }).then(()=>{
            res.sendStatus(200)
        })
    }

})




app.listen(1800, ()=>{
    console.log("API RODANDO NA PORTA 1800")
})