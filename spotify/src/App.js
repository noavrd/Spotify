import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import Album from "./Components/Album";
import Artist from "./Components/Artist";
import Main from "./Components/Main"
import Playlist from "./Components/Playlist";
import Song from "./Components/Song";
import NotFound from "./Components/NotFound";
function App() {
  return (
    <div>
      <BrowserRouter>
      <header>
        <h1>
          Spotify
        </h1>
      </header>
      <Switch>
        <Route exact path="/" component={Main}/>
        <Route exact path="/song/:id" component={Song} />
        <Route exact path="/artist/:id" component={Artist} />
        <Route exact path="/album/:id" component={Album} />
        <Route exact path="/playlist/:id" component={Playlist} />
        <Route component={NotFound} />
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
