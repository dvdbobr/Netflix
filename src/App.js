import Main from "./Components/Main";
import './CSS/movieRow.css'
import './CSS/navbar.css'
import './CSS/billboard.css'
import './CSS/general.css'
import './CSS/userPage.css'
import './CSS/spinner.css'
import './CSS/fonts.css'
import { BrowserRouter, Route } from 'react-router-dom'
import UserPage from "./Components/UserPage";
import Movies from "./Components/Movies";
import Search from "./Components/Search";
import TVshows from "./Components/TVshows";
import MyList from "./Components/MyList";
function App() {
  return (
    <BrowserRouter>
      <div >
        <Route path="/" exact component={UserPage}/>
        <Route path="/main" component={Main} />
        <Route path="/movies" exact component={Movies} />
        <Route path="/tv" exact component={TVshows} />
        <Route path="/search/:term" component={Search} />
        <Route path="/mylist" component={MyList} />
      </div>
    </BrowserRouter>

  );
}

export default App;
