
const { error } = require('console');
const express = require('express');
const server = express();



const Port = process.env.Port || 3000

//***** setting Middlewars */

server.use(express.static('public'));
server.set('view engine', 'ejs')
 
  

//***** Setting Endpoints */

server.get('/page/:p', (req, res) => {
  
  let page = req.params.p 

  page++ 

  console.log(page)


});

server.get('/', (req, res) => {
       
       let page = req.query.page
    
       const query = req.query.q
     
        fetch(`https://api.unsplash.com/search/photos/?page=1&per_page=30&query=${query}&client_id=Ryd5V1rN8vRB2L8d8BW8A5bEcOtq0mWVZF-GAf1wuJw`)
        .then(data => data.json())
        .then(images =>  res.render('index', { images }))
        .catch(error => console.log(error))

})



//***** Setting a Port for my server */

server.listen(Port, () => {
    console.log(`Server is running on Port : ${Port}`)
})