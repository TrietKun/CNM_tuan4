const express = require('express');
const multer = require('multer');
const data = require('./store');
const path = require('path');

const PORT = 3000;
const app = express();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.use(express.json({ extended: false }));
app.use(express.static('./views'));

app.set('view engine', 'ejs');
app.set('views', './views');
app.set('public', './public');
app.set('uploads', './uploads');


app.get('/', (req, res) => {
    const courses = data;
    return res.render('index', { courses });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.post('/', upload.single('img'), (req, res) => {
    const { id, name } = req.body; 
    const img = req.file.filename;
    data.push({ id, name, img: "/uploads/" + img });
    console.log(data);
    return res.redirect('/');
});

app.post('/delete', upload.fields([]), (req, res)=> {
    const id = req.body.sel;
    console.log(id); 
    data.splice(id, 1);
    return res.redirect('/');
});

app.use(express.static(path.join(__dirname, 'public')));
