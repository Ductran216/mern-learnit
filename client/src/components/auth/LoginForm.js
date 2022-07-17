import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';

import { AuthContext } from '../../contexts/AuthContext';
import AlertMessage from '../layouts/AlertMessage';

function LoginForm() {
    // Context
    const { loginUser } = useContext(AuthContext);

    // Router
    // const navigate = useNavigate();

    // Local state
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: '',
    });

    const [alert, setAlert] = useState(null);

    const { username, password } = loginForm;

    const onChangeLoginForm = (e) => {
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const loginData = await loginUser(loginForm);
            if (loginData.success) {
                // navigate('/dashboard');
            } else {
                setAlert({ type: 'danger', message: loginData.message });
                setTimeout(() => setAlert(null), 3000);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Form className="my-4" onSubmit={handleLogin}>
            <AlertMessage info={alert} />

            <Form.Group className="mb-4">
                <Form.Control
                    type="text"
                    placeholder="Username"
                    name="username"
                    required
                    value={username}
                    onChange={onChangeLoginForm}
                />
            </Form.Group>

            <Form.Group className="mb-4">
                <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    required
                    value={password}
                    onChange={onChangeLoginForm}
                />
            </Form.Group>

            <Button className="mb-4" variant="success" type="submit">
                Login
            </Button>

            <p>
                Don't have an account?
                <Link to="/register">
                    <Button className="mx-2" variant="info" size="sm">
                        Register
                    </Button>
                </Link>
            </p>
        </Form>
    );
}

export default LoginForm;
