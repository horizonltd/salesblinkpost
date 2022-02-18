import Footer from './components/Footer/Footer';
import { Container } from "react-bootstrap";
import Home from "./container/Home/Home";
import SinglePost from "./components/SinglePost/SinglePost";
import Login from "./components/Login/Login";
import {HashRouter as Router, Route} from "react-router-dom";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";
import AddEditPost from "./components/AddEditPost/AddEditPosts";
import HeaderScreen from "./components/Header/HeaderScreen";
import PrivateRoute from "./container/PrivateRoute/PrivateRoute";
import PostsList from "./components/PostsList/PostsList";


function App() {
    return (
        <Router>
            <HeaderScreen />

            <main className="py-3">
                <Container>
                    <Route path='/' component={Home} exact />
                    <Route path='/post/:id' component={SinglePost} />
                    <Route path='/login/' component={Login} />
                    <Route path='/register/' component={Register} />

                    <PrivateRoute path='/admin/posts/' component={PostsList} />
                    <PrivateRoute path='/admin/post/:id/edit/' component={AddEditPost} />
                    <PrivateRoute path='/profile/' component={Profile} />

                </Container>
            </main>

            <Footer />
        </Router>
    );
}

export default App;
