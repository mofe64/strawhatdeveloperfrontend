import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Post from './pages/Post';
import About from './pages/About';
import Portfolio from './pages/Porfolio';
import Search from './pages/Search';
import CreatePost from './pages/admin/CreatePost';
import Drafts from './pages/admin/Drafts';
import AllPosts from './pages/admin/AllPosts';
import UpdatePost from './pages/admin/UpdatePost';

function App() {
  return (
    <>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/post/:slug' component={Post} />
        <Route exact path='/about' component={About} />
        <Route exact path='/portfolio' component={Portfolio} />
        <Route exact path='/search' component={Search} />
        <Route exact path='/admin/createpost' component={CreatePost} />
        <Route exact path='/admin/drafts' component={Drafts} />
        <Route exact path='/admin/all' component={AllPosts} />
        <Route exact path='/admin/update/:slug' component={UpdatePost} />
      </Switch>
   </>   
  );
}

export default App;
