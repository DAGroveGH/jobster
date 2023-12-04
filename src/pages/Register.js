import React, { useState } from 'react';
import Wrapper from '../assets/wrappers/RegisterPage';
import { Logo, FormRow } from '../components';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../features/user/userSlice';

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
};

const Register = () => {
    const [values, setValues] = useState(initialState);

    const { user, isLoading } = useSelector((store) => store.user);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setValues({ ...value, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, password, isMember } = values;
        if (!email || !password || (!isMember && !name)) {
            toast.error('Please fill out all fields');
            return;
        }
        if (isMember) {
            dispatch(loginUser({ email, password }));
            return;
        }

        dispatch(registerUser({ name, email, password }));
    };

    const toggleMember = () => {
        setValues({ ...values, isMember: !values.isMember });
    };

    return (
        <Wrapper className="full-page">
            <form onSubmit={handleSubmit} className="form">
                <Logo />
                <h3>{values.isMember ? 'Login' : 'Register'}</h3>
                {/* name */}
                {!values.isMember && (
                    <FormRow
                        type="text"
                        name="name"
                        value={values.name}
                        handleChange={handleChange}
                    />
                )}

                {/* email */}
                <FormRow
                    type="email"
                    name="email"
                    value={values.email}
                    handleChange={handleChange}
                />
                {/* password */}
                <FormRow
                    type="password"
                    name="password"
                    value={values.password}
                    handleChange={handleChange}
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-block"
                >
                    {isLoading ? 'loading...' : 'submit'}
                </button>
                <p>
                    {values.isMember
                        ? 'Not a member yet?'
                        : 'Already a member?'}
                    <button
                        type="button"
                        onClick={toggleMember}
                        className="member-btn"
                    >
                        {values.isMember ? 'Register' : 'Login'}
                    </button>
                </p>
            </form>
        </Wrapper>
    );
};

export default Register;
