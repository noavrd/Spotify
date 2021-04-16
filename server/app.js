const express = require('express');
const mysql = require('mysql');
const app = express();
app.use(express.json());

let mysqlCon = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '250399Noa',
  database: 'spotify',
  multipleStatements: true,
});

mysqlCon.connect((err) => {
  if (err) throw err;
  console.log('connected!');
});
//GET 5 TOP SONGS
app.get('/songs', (req, res) => {
  mysqlCon.query(
    'SELECT * FROM song ORDER BY views DESC LIMIT 5',
    (err, results, fields) => {
      if (err) {
        res.send(err.message);
      }
      res.send(results);
    }
  );
});
//GET 5 TOP ARTISTS
app.get('/artists', (req, res) => {
  mysqlCon.query(
    'SELECT * FROM artists ORDER BY RAND() LIMIT 5 ',
    (err, results, fields) => {
      if (err) {
        res.send(err.message);
      }
      res.send(results);
    }
  );
});

//GET 5 TOP ARTISTS
app.get('/albums', (req, res) => {
    mysqlCon.query(
      'SELECT * FROM album ORDER BY RAND() LIMIT 5 ',
      (err, results, fields) => {
        if (err) {
          res.send(err.message);
        }
        res.send(results);
    }
    );
});

//GET 5 TOP ARTISTS
app.get('/playlists', (req, res) => {
    mysqlCon.query(
      'SELECT * FROM playlist ORDER BY RAND() LIMIT 5 ',
      (err, results, fields) => {
        if (err) {
          res.send(err.message);
        }
        res.send(results);
    }
    );
});

app.get('/song/:id', (req, res) => {
    mysqlCon.query('SELECT * FROM song WHERE id = ' + req.params.id, (err, results, fields) => {
        if (err) {
            res.send(err.message);
        } else if (results && results.length === 1) {
            res.send(results[0]);
        }
    })
})

app.listen(3000)