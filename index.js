const md5 = require('md5')
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

let url = null;

app.get('/api', (req,res)=> {
  let ts = Date.now()
  let id = req.body.id
  let version = req.body.version
  let device = req.body.device
  let key = req.body.key
  hashed = md5(id + key + ts)
  url = `https://dsfut.net/api/${version}/${device}/${id}/${ts}/${hashed}`
  function get () {
    axios.get(url)
      .then(response => {
        if ( response.data.message == "1 player popped"){
          console.log(response.data.message)
          res.send(response.data.player)
        } else if (response.data.message == "Que is empty") {
          get()
        } else {
          console.log(response.data.message)
          res.send(response.data.message)
        }
      })
      .catch(error => {
        console.log(error)
        res.send('Bad Request Mr.Hoshemiah Make sure you have version , device , id and key included in your request.')
    });
  }
  get()
})


app.listen(process.env.PORT || 9000 , ()=> {
  console.log('listening')
})