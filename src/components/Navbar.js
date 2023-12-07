import React, { useState } from 'react';
import Wrapper from '../assets/wrappers/Navbar';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../components/Logo';
import { toggleSidebar, logoutUser } from '../features/user/userSlice';
const Navbar = () => {
    const [showLogout, setShowLogout] = useState(false);
    const { user } = useSelector((store) => store.user);
    const dispatch = useDispatch();

    const toggle = () => {
        dispatch(toggleSidebar());
    };

    return (
        <Wrapper>
            <div className="nav-center">
                <button type="button" onClick={toggle} className="toggle-btn">
                    <FaAlignLeft />
                </button>
                <div>
                    <Logo />
                    <h3 className="logo-text">dashboard</h3>
                </div>
                <div className="btn-container">
                    <button
                        type="button"
                        onClick={() => setShowLogout(!showLogout)}
                        className="btn"
                    >
                        <FaUserCircle />
                        {user?.name}
                        <FaCaretDown />
                    </button>
                    <div
                        className={
                            showLogout ? 'dropdown show-dropdown' : 'dropdown'
                        }
                    >
                        <button
                            type="button"
                            onClick={() =>
                                dispatch(logoutUser('Logging out...'))
                            }
                            className="dropdown-btn"
                        >
                            logout
                        </button>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default Navbar;
