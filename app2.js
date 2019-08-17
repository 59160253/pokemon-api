const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => res.send(Pokemon1))

class Pokemon{
    constructor(id,name,type){
        this.id = id
        this.name = name
        this.type = type
    }
}

class Pokemon22{
    constructor(name,type){

        this.name = name
        this.type = type
    }
}

let Pokemon2 = [
    {id: 1 ,name:'Pikachu',type:'Electric'},
    {id: 2 ,name:'Paras',type:'Bug'}
]

Pokemon2.push(createPokemon('Pikachu','Electric'))

app.get('/pokemon', (req, res) => res.send(Pokemon2))

app.post('/pokemon', (req, res) => {

    //เปลือง เราย้ายไปใส่ข้างล่างเลยlet newId = Pokemon2.length + 1

    //p.id = generateNewId(Pokemon2.length)
    let p = new Pokemon(generateNewId(Pokemon2.length),req.body.name,req.body.type)
    Pokemon2.push(p)

    let o = createPokemon(req.body.name,req.body.type)
    Pokemon2.push(o)
    
    console.log(req.body)
    // res.send('Still work in progreen...')
    res.sendStatus(201)
})

app.listen(port, () => console.log(`Pokemon API listening on port ${port}!`))

function generateNewId(num){
    let newId =num + 1
    return newId
}

function createPokemon(name,type){
    let tmp = new Pokemon22(name,type)
    tmp.id = generateNewId(Pokemon2.length)
    return tmp
}
