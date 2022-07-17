import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';

import { AuthContext } from '../../contexts/AuthContext';
import AlertMessage from '../layouts/AlertMessage';

function RegisterForm() {
    // Context
    const { registerUser } = useContext(AuthContext);

    // Local state
    const [registerForm, setRegisterForm] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });

    const [alert, setAlert] = useState(null);

    const { username, password, confirmPassword } = registerForm;

    const onChangeRegisterForm = (e) => {
        setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setAlert({ type: 'danger', message: 'Passwords do not match' });
            setTimeout(() => setAlert(null), 3000);
            return;
        }

        try {
            const registerData = await registerUser(registerForm);
            if (!registerData.success) {
                setAlert({ type: 'danger', message: registerData.message });
                setTimeout(() => setAlert(null), 3000);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Form className="my-4" onSubmit={handleRegister}>
            <AlertMessage info={alert} />

            <Form.Group className="mb-4">
                <Form.Control
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={username}
                    onChange={onChangeRegisterForm}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-4">
                <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={onChangeRegisterForm}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-4">
                <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={onChangeRegisterForm}
                    required
                />
            </Form.Group>

            <Button className="mb-4" variant="success" type="submit">
                Register
            </Button>

            <p>
                Already have an account?
                <Link to="/login">
                    <Button className="mx-2" variant="info" size="sm">
                        Login
                    </Button>
                </Link>
            </p>
        </Form>
    );
}

export default RegisterForm;
