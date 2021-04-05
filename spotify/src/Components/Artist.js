import artistsData from "../Jsons/artists.json";
import { useEffect, useState } from "react";

function Artist(props) {
  const [exists, setExists] = useState(true);
  const [selectedSongs, setSelectedSongs]= useState([])
  const [albums, setAlbums]= useState([])


  useEffect(() => {
    const myArtist = artistsData.find(
      (item) => item.id === Number(props.match.params.id)
    );
    setExists(myArtist);
    console.log(myArtist);
    setSelectedSongs(myArtist.selectedSongs);
    setAlbums(myArtist.albumsList);
  }, []);
  return (
    <div>
      <div>{exists.name}</div>
      <ol>
        <h2>Albums</h2>
        {albums.map((album, i) => {
          return <li key={i}>{album}</li>;
        })}
      </ol>
      <ol>
      <h2>Selected songs</h2>
        {selectedSongs.map((song, i) => {
          return <li key={i}>{song}</li>;
        })}
      </ol>
      <img src={`..${exists.cover_img}`} alt={exists.name} style={{ width: "100px" }}></img>
    </div>
  );
}

export default Artist;
