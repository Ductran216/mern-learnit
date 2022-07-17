import classNames from 'classnames/bind';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

import LoginForm from '../auth/LoginForm';
import RegisterForm from '../auth/RegisterForm';
import styles from '../../Global.css';
import { AuthContext } from '../../contexts/AuthContext';

const cx = classNames.bind(styles);

function Auth({ authRoute }) {
    const {
        authState: { authLoading, isAuthenticated },
    } = useContext(AuthContext);

    let body;

    if (authLoading) {
        body = (
            <div className="d-flex justify-content-center mt-2">
                <Spinner animation="border" variant="info" />
            </div>
        );
    } else if (isAuthenticated) {
        return <Navigate to="/dashboard" />;
    }

    body = (
        <>
            {authRoute === 'login' && <LoginForm />}
            {authRoute === 'register' && <RegisterForm />}
        </>
    );

    return (
        <div className={cx('landing')}>
            <div className={cx('dark-overlay')}>
                <div className={cx('landing-inner')}>
                    <h1>LearnIt</h1>
                    <h4>Keep track of what you are learning</h4>
                    {body}
                </div>
            </div>
        </div>
    );
}

export default Auth;
