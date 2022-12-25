import {Routes, Route, Outlet} from 'react-router-dom';
import Admin from '../pages/Admin';
import Auth from '../pages/Auth';

import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import PostDetail from '../pages/PostDetail';
import Profile from '../pages/Profile';

const Routers = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/profile/:userId' element={<Profile />} />
            <Route path='/auth/:page' element={<Auth />} />
            <Route path='/post-detail/:postId' element={<PostDetail />} />
            <Route path='/admin' element={<Outlet />}>
                <Route path='' element={<Admin />} />
            </Route>
            <Route path='/*' element={<NotFound />} />
        </Routes>
    );
};

export default Routers;
