import Main from "./Components/Main";
import './CSS/movieRow.css'
import './CSS/navbar.css'
import './CSS/billboard.css'
import './CSS/general.css'
import './CSS/userPage.css'
import './CSS/fonts.css'
import { BrowserRouter, Route } from 'react-router-dom'
import UserPage from "./Components/UserPage";
import Movies from "./Components/Movies";
import Search from "./Components/Search";
import TVshows from "./Components/TVshows";
function App() {
  return (
    <BrowserRouter>
      <div >
        {/* <Carousel/> */}
        <Route path="/" exact component={UserPage}/>
        <Route path="/main" component={Main} />
        <Route path="/movies" exact component={Movies} />
        <Route path="/tv" exact component={TVshows} />
        <Route path="/search/:term" component={Search} />
        {/* <Movies/> */}
        {/* <UserPage/> */}

      </div>
    </BrowserRouter>
    // <BrowserRouter>
    //   <div>
    //     <Header />
    //     <Route path="/" exact component={Homepage} />
    //     <Route path="/products" exact component={Products} />
    //     <Route path="/products/:id" component={ProductDetail} />
    //   </div>
    // </BrowserRouter>
  );
}

export default App;
