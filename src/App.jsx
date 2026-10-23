import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';
import ChatBot from './components/ChatBot'; // 👈 Add this import

function App() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        authService.getCurrentUser()
            .then((userData) => {
                if (userData) {
                    dispatch(login({ userData }));
                } else {
                    dispatch(logout());
                }
            })
            .finally(() => setLoading(false));
    }, []);

    return !loading ? (
        <div className='min-h-screen flex flex-wrap content-between bg-slate-50'>
            <div className='w-full block'>
                <Header />
                <main>
                    <Outlet />
                </main>
                <Footer />
                <ChatBot /> {/* 👈 Add this line */}
            </div>
        </div>
    ) : null;
}

export default App;