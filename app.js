import express from "express";

const app =  express();

app.use(mid);
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}))


const port = 8000;

app.get('/', (request, response) => {
    console.log('Get');
    response.send('heoh');
})

app.get('/text/:text', (request, response) => {
    console.log('Get');
    console.log(request.params.text);
    console.log(request.query.name);
    console.log(request.body.name);
    response.send('Under construction');
})

app.listen(port, () => console.log('Listening to port ' + port));

function mid(request, response, next) {
    console.log("I'm mid");
    next();
}