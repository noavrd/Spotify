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

//GET 5 TOP ALBUMS
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

//GET 5 TOP PLAYLISTS
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

//GET SONG BY ID
app.get('/song/:id', (req, res) => {
    mysqlCon.query('SELECT * FROM song WHERE id = ' + req.params.id, (err, results, fields) => {
        if (err) {
            res.send(err.message);
        } else if (results && results.length === 1) {
            res.send(results[0]);
        }
    })
})

//GET ARTIST BY ID
app.get('/artist/:id', (req, res) => {
    mysqlCon.query('SELECT * FROM artists WHERE id = ' + req.params.id, (err, results, fields) => {
        if (err) {
            res.send(err.message);
        } else if (results && results.length === 1) {
            res.send(results[0]);
        }
    })
})

//GET PLAYLIST BY ID
app.get('/playlist/:id', (req, res) => {
    mysqlCon.query('SELECT * FROM playlist WHERE id = ' + req.params.id, (err, results, fields) => {
        if (err) {
            res.send(err.message);
        } else if (results && results.length === 1) {
            res.send(results[0]);
        }
    })
})

//GET ALBUM BY ID
app.get('/album/:id', (req, res) => {
    mysqlCon.query('SELECT * FROM album WHERE id = ' + req.params.id, (err, results, fields) => {
        if (err) {
            res.send(err.message);
        } else if (results && results.length === 1) {
            res.send(results[0]);
        }
    })
})

//POST - ADD SONG 
app.post('/song', (req, res) => {
    let body = req.body;
    if (body.id && body.songName && body.artistName && body.album && body.length && body.views && body.src && body.lyrics) {

        mysqlCon.query(`INSERT INTO song VALUES (${body.id}, "${body.songName}", "${body.artistName}", "${body.album}", "${body.length}", ${body.views}, "${body.src}", "${body.lyrics}")`, (err, results, fields) => {
            if (err) {
                res.send(err.message)
            } else {
                res.send("Add successfully")
            }
        })
    } else {
        res.send("You missed a value")
    }
})

//POST- ADD ARTIST
app.post('/artist', (req, res) => {
    let body = req.body;
    if (body.id && body.name && body.cover_img && body.albumsList && body.selectedSongs) {

        mysqlCon.query(`INSERT INTO artists VALUES (${body.id}, "${body.name}", "${body.cover_img}", "${body.albumsList}", "${body.selectedSongs}")`, (err, results, fields) => {
            if (err) {
                res.send(err.message)
            } else {
                res.send("Add successfully")
            }
        })
    } else {
        res.send("You missed a value")
    }
})

//POST- ADD PLAYLIST
app.post('/playlist', (req, res) => {
    let body = req.body;
    console.log(`${body.id}, "${body.name}", "${body.cover_img}", "${body.created_at}", "${body.songsList}`)
    if (
      body.id && body.name && body.cover_img && body.created_at && body.songsList) {
      mysqlCon.query(
        `INSERT INTO playlist VALUES (${body.id}, "${body.name}", "${body.cover_img}", "${body.created_at}", "${body.songsList}")`,
        (err, results, fields) => {
          if (err) {
            res.send(err.message);
          } else {
            res.send('Add successfully');
          }
        }
      );
    } else {
      res.send('You missed a value');
    }
});

//POST- ADD ALBUM
app.post('/album', (req, res) => {
    let body = req.body;
    console.log(`${body.id}, "${body.artistName}", "${body.albumName}", "${body.cover_img}", "${body.songsList}"`)
    if (body.id && body.artistName && body.albumName && body.cover_img &&body.songsList) {
      mysqlCon.query(
        `INSERT INTO album VALUES (${body.id}, "${body.artistName}", "${body.albumName}", "${body.cover_img}", "${body.songsList}")`,
        (err, results, fields) => {
          if (err) {
            res.send(err.message);
          } else {
            res.send('Add successfully');
          }
        }
      );
    } else {
      res.send('You missed a value');
    }
  });
  
app.listen(3000)