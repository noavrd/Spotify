import artistsData from "../Jsons/artists.json";
import { useEffect, useState } from "react";

function Artist(props) {
  const [exists, setExists] = useState(true);
  const [selectedSongs, setSelectedSongs]= useState([])

  useEffect(() => {
    const myArtist = artistsData.find(
      (item) => item.id === Number(props.match.params.id)
    );
    setExists(myArtist);
    console.log(myArtist);
    setSelectedSongs(myArtist.selectedSongs)
  }, []);
  return (
    <div>
      <h1>Artist</h1>
      <div>{exists.name}</div>
      <ol>
        {selectedSongs.map((song, i) => {
          return <li key={i}>{song}</li>;
        })}
      </ol>
      <img src={`..${exists.cover_img}`} alt={exists.name} style={{ width: "100px" }}></img>
    </div>
  );
}

export default Artist;
