const { render } = require('ejs');
const express = require('express');
const { get } = require('lodash');
const app = express();
const pool = require('./database');

app.set('view engine', 'ejs');

app.listen(3000);

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/posts', async (req, res) => {
    try {
        console.log("get posts request has arrived");
        const posts = await pool.query(
            "SELECT * FROM posts"
        );
        var json = res.json(posts.rows);
        res.render("posts");
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/contactus', (req, res) => {
    res.render('contactus');
});

app.use((req, res) => {s
    res.render('404');
});

app.post('/posts/', async (req, res) => {
    try {
        console.log("a post request has arrived");
        const post = req.body;
        const newpost = await pool.query(
            "INSERT INTO nodetable(title, body, urllink) values ($1, $2, $3) RETURNING * ",
            [post.title, post.body, post.urllink]
        );
        res.json(newpost);
    } catch (err) {
        console.error(err.message);
    }
});

app.put('/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const post = req.body;
        console.log("update request has arrived");
        const updatepost = await pool.query(
            "UPDATE nodetable SET (title, body, urllink) = ($2, $3, $4) WHERE id = $1",
            [id, post.title, post.body, post.urllink]
        );
        res.json(post);
    } catch (err) {
        console.error(err.message);
    }
});

app.delete('/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const post = req.body;
        console.log("delete a post request has arrived");
        const deletepost = await pool.query("DELETE FROM nodetable WHERE id = $1", [id]
        );
        res.json(post);
    } catch (err) {
        console.error(err.message);
    }
});
