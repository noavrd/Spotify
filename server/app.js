const express = require('express');
const mysql = require('mysql');
const cors = require("cors")
const app = express();

app.use(express.json());
app.use(cors());


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

//UPDATE SONG
app.put('/song', (req, res) => {
    mysqlCon.query('UPDATE song SET songName = ?, artistName = ?, album = ?, length = ?, views = ?, src = ?, lyrics = ? WHERE id = ?', [req.body.songName, req.body.artistName, req.body.album, req.body.length, req.body.views, req.body.src,req.body.lyrics, req.body.id], (err, results, fields) => {
        if(err){
            res.send(err.message);
        } else {
            res.send("Updated successfully");
        }
    });
}); 

//UPDATE ALBUM
app.put('/album', (req, res) => {
  mysqlCon.query(
    'UPDATE album SET artistName = ?, albumName = ?, cover_img = ?, songsList = ? WHERE id = ?',[req.body.artistName, req.body.albumName, req.body.cover_img, req.body.songsList, req.body.id], (err, results, fields) => {
      if (err) {
        res.send(err.message);
      } else {
        res.send('Updated successfully');
      }
    }
  );
});

//UPDATE ARTIST
app.put('/artist', (req, res) => {
  mysqlCon.query(
    'UPDATE artists SET name = ?, cover_img = ?, albumsList = ?, selectedSongs = ? WHERE id = ?',[req.body.name, req.body.cover_img, req.body.albumsList, req.body.selectedSongs,req.body.id],
    (err, results, fields) => {
      if (err) {
        res.send(err.message);
      } else {
        res.send('Updated successfully');
      }
    }
  );
});

//UPDATE PLAYLIST
app.put('/playlist', (req, res) => {
  mysqlCon.query(
    'UPDATE playlist SET name = ?, cover_img = ?,created_at = ?, songsList = ? WHERE id = ?',
    [req.body.name, req.body.cover_img, req.body.created_at, req.body.songsList, req.body.id], (err, results, fields) => {
      if (err) {
        res.send(err.message);
      } else {
        res.send('Updated successfully');
      }
    }
  );
});

//DELETE SONG
app.delete('/song/:id', (req, res) => {
  mysqlCon.query('DELETE FROM song WHERE id = ?',[req.params.id], (err, results, fields) => {
      console.log(fields);
      if (err) {
        res.send(err.message);
      } else {
        res.send("Deleted successfully");
      }
    }
  );
});

//DELETE ARTIST
app.delete('/artist/:id', (req, res) => {
  mysqlCon.query('DELETE FROM artists WHERE id = ?',[req.params.id], (err, results, fields) => {
      console.log(fields);
      if (err) {
        res.send(err.message);
      } else {
        res.send("Deleted successfully");
      }
    }
  );
});

//DELETE ALBUM
app.delete('/album/:id', (req, res) => {
  mysqlCon.query('DELETE FROM album WHERE id = ?',[req.params.id], (err, results, fields) => {
      console.log(fields);
      if (err) {
        res.send(err.message);
      } else {
        res.send("Deleted successfully");
      }
    }
  );
});

//DELETE PLAYLIST
app.delete('/playlist/:id', (req, res) => {
  mysqlCon.query('DELETE FROM playlist WHERE id = ?',[req.params.id], (err, results, fields) => {
      console.log(fields);
      if (err) {
        res.send(err.message);
      } else {
        res.send("Deleted successfully");
      }
    }
  );
});

app.listen(3000)