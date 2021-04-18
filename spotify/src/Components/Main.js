import { React, useEffect, useState } from "react";
import {Link} from "react-router-dom";
import axios from "axios";

function Main() {
  const [topSongs, setTopSongs] = useState([]);
  const [topAlbums, setTopAlbums] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [topPlayLists, setTopPlayLists] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/songs`)
    .then((response) => {
      setTopSongs(response.data);
    }).catch((err) => {
      console.log(err)
    })
    

    axios.get(`http://localhost:3000/playlists`)
    .then((response) => {
      setTopPlayLists(response.data);
    }).catch((err) => {
      console.log(err)
    })

    axios.get(`http://localhost:3000/albums`)
    .then((response) => {
      setTopAlbums(response.data);
    }).catch((err) => {
      console.log(err)
    })

    axios.get(`http://localhost:3000/artists`)
    .then((response) => {
      setTopArtists(response.data);
    }).catch((err) => {
      console.log(err)
    })
  }, []);



  return (
    <div>
      <h3>Top 5 songs</h3>
      <ul className="topSongs">
        <ShowSongs songs={topSongs} />
      </ul>
      <h3>Top 5 playlists</h3>
      <ul className="playlists">
        <ShowPlayLists playlists={topPlayLists} />
      </ul>
      <h3>Top 5 albums</h3>
      <ul className="albums">
        <ShowAlbums albums={topAlbums} />
      </ul>
      <h3>Top 5 artists</h3>
      <ul className="artists">
        <ShowArtists artists={topArtists} />
      </ul>
    </div>
  );
}
function ShowSongs({songs}) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(songs);
  },[songs]);
  return items.map((song) => (
      <Link
      to={{
      pathname: `/song/${song.id}`,
      }}
      >
        <li key={song.id} className="eachTopSong">{song.songName}</li>
      </Link>
  ))
}
function ShowAlbums({ albums }) {
  // console.log(songs)
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(albums);
  }, [albums]);

  return items.map((album) => (
    <Link
    to={{
    pathname: `/album/${album.id}`,
    }}
    >
      <div className="mainDiv" key={album.id}>
        <img
        src={`..${album.cover_img}`}
        alt={album.albumName}
        className="mainPicture"
        />
        <li className="mainLi">{album.artistName}</li>
        <li className="mainLi">{album.albumName}</li>
      </div>
    </Link>
  ));
}

function ShowArtists({ artists }) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(artists);
  }, [artists]);
  return items.map((artist) => (
    <Link
    to={{
    pathname: `/artist/${artist.id}`,
    }}
    >
      <div className="mainDiv" key={artist.id}>
        <img
          src={`..${artist.cover_img}`}
          alt={artist.name}
          className="mainPicture"
        />
        <li className="mainLi">{artist.name}</li>
        <li className="mainLi">{artist.selectedSong}</li>
      </div>
    </Link>
  ));
}
function ShowPlayLists({ playlists }) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(playlists);
  }, [playlists]);
  return items.map((playlist) => (
    <Link
    to={{
    pathname: `/playlist/${playlist.id}`,
    }}
    >
      <div className="mainDiv" key={playlist.id}>
        <img
          src={`..${playlist.cover_img}`}
          alt={playlist.name}
          className="mainPicture"
        />
        <li className="mainLi">{playlist.name}</li>
        <li className="mainLi">{playlist.created_at}</li>
      </div>
    </Link>
  ));
}
export default Main;