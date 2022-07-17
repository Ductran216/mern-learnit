import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import classNames from 'classnames/bind';

import { AuthContext } from '../../contexts/AuthContext';
import styles from '../../Global.css';
import NavbarMenu from '../layouts/NavbarMenu';

const cx = classNames.bind(styles);

function ProtectedRoute({ component }) {
    const {
        authState: { authLoading, isAuthenticated },
    } = useContext(AuthContext);

    if (authLoading) {
        return (
            <div className={cx('spinner-container')}>
                <Spinner animation="border" variant="info" />
            </div>
        );
    }

    return isAuthenticated ? (
        <>
            <NavbarMenu />
            {component}
        </>
    ) : (
        <Navigate to="/login" />
    );
}

export default ProtectedRoute;
