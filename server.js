// import express from 'express';
// import multer from 'multer';

const express = require('express');
const multer = require('multer');
const data = require('./store');

const PORT = 3000;
const app = express();
const upload = multer();

app.use(express.json({ extended: false }));
app.use(express.static('./views'));

//config view
app.set('view engine', 'ejs');
app.set('views', './views');

//routes
app.get('/', (req, res) => {
    const courses = data;
    return res.render('index', { courses });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.post('/', upload.fields([]), (req, res) => {
    const { id, name } = req.body; 
    data.push({ id, name });
    console.log(data);
    return res.redirect('/');
});

app.post('/delete', upload.fields([]), (req, res)=> {
    const id = req.body.sel;
    console.log(id); 
    data.splice(id, 1);
    return res.redirect('/');
});
