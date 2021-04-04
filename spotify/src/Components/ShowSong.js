function ShowSong(props) {

  return (
    <div>
        {console.log(props.songs)}
        <li>{props.songs.map((song) => {
            {console.log(song.id)}
            <span>{song.id}</span>
        })}</li>     
    </div>
  );
}

export default ShowSong;