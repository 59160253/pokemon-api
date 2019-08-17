const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => res.send(Pokemon1))

class Pokemon{
    constructor(id,name,type,type2){
        this.id = id
        this.name = name
        this.type = type
        this.type2 = type2
    }
}

class Pokemon22{
    constructor(name,type,type2){
        this.name = name
        this.type = type
        this.type2 = type2
    }
}

function isNotSufficientParam(v){
    return !(v !== null && v !== '' && v !== undefined)
}

// let Pokemon2 = [
//     {id: 1 ,name:'Pikachu',type:'Electric'},
//     {id: 2 ,name:'Paras',type:'Bug'}
// ]
let Pokemon2 = []
Pokemon2.push(new Pokemon(generateNewId(Pokemon2.length),'Pikachu','Electric',''))
Pokemon2.push(new Pokemon(generateNewId(Pokemon2.length),'Paras','Bug'))
//Pokemon2.push(createPokemon('Pikachu','Electric'))

app.get('/pokemon', (req, res) => res.send(Pokemon2))



app.get('/pokemon/:id', (req, res) => {
    let p = Pokemon2[req.params.id - 1]
    if(p === undefined){
        res.status(400).send({error:'Cannot update Pokemon: Pokemon is not found'})
    }
    res.send(p)
})

app.put('/pokemon/:id', (req, res) => {
    if(isNotSufficientParam(req.params.id)){
        res.status(400).send({ error: 'Insufficient parameters: type2 is required parameter'})
        return
    }   
    let p = Pokemon2[req.params.id - 1]
    if(p === undefined){
        res.status(400).send({error:'Cannot update Pokemon: Pokemon is not found'})
    }
    p.type2 = req.body.type2
    res.sendStatus(201)
})

app.post('/pokemon', (req, res) => {
    console.log(isNotSufficientParam(req.body.name))
    if(isNotSufficientParam(req.body.name)||
        isNotSufficientParam(req.body.type)){

           res.status(400).send({ error: 'Insufficient parameters: name and type are required parameters'})
           return
    }

    //เปลือง เราย้ายไปใส่ข้างล่างเลยlet newId = Pokemon2.length + 1

    //p.id = generateNewId(Pokemon2.length)
    let p = new Pokemon(generateNewId(Pokemon2.length),req.body.name,req.body.type)
    Pokemon2.push(p)

    // let o = createPokemon(req.body.name,req.body.type)
    // Pokemon2.push(o)
    
    console.log(req.body)
    // res.send('Still work in progreen...')
    res.sendStatus(201)
})

app.delete('/pokemon/:id',(req,res) => {
    let id = req.params.id
    if(isNotSufficientParam(id)){
        res.status(400).send({ error: 'Insufficient parameters: type2 is required parameter'})
        return
    } 

    
    
    if(!isPokemonExisted(id)){
        res.status(400).send({error:'Cannot update Pokemon: Pokemon is not found'})
        return
    }

    delete Pokemon2 [id -1]
    res.sendStatus(204)
})


app.listen(port, () => console.log(`Pokemon API listening on port ${port}!`))


function isPokemonExisted(id){
    return Pokemon2[id-1] !== undefined && Pokemon2[id-1] !== null
}

function generateNewId(num){
    let newId =num + 1
    return newId
}

function createPokemon(name,type){
    let tmp = new Pokemon22(name,type)
    tmp.id = generateNewId(Pokemon2.length)
    return tmp
}
