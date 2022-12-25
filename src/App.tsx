import {useLocation} from 'react-router-dom';

import Header from './components/Header';
import MainLayout from './components/MainLayout';
import AddFriendsModal from './components/Modal/AddFriendsModal';
import EditPostModal from './components/Modal/EditPostModal';
import PostCommentModal from './components/Modal/PostCommentModal';
import UserImageModal from './components/Modal/UserImageModal';
import Routers from './routes';

function App() {
    const {pathname} = useLocation();

    return (
        <div className='App'>
            {pathname.includes('/auth') || pathname.includes('/admin') ? (
                <Routers />
            ) : (
                <>
                    <Header />
                    <MainLayout>
                        <Routers />
                    </MainLayout>
                    <AddFriendsModal />
                    <EditPostModal />
                    <UserImageModal />
                    <PostCommentModal />
                </>
            )}
        </div>
    );
}

export default App;
