import { useLocation } from 'react-router-dom';
import '../css/Header.css';

function Header() {
    const location = useLocation();
    const isRoot = location.pathname === '/';

    let token = false;
    token = localStorage.getItem('accessToken');

    return (
        <div>
            <header id="header">
                <a href="/" className="header-text">StudyHope</a>
                <div className="header-links">
                    {isRoot && (
                        <a href="#courses" className="link">Курсы</a>
                    )}
                    {!token ? (
                        <a href="/login" className="link">Войти</a>
                    ) : (
                        <a href="/profile" className="link">Личный кабинет</a>
                    )}
                </div>
            </header>
        </div>
    )
}

export default Header;