import { Outlet, Navigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import userState from "../user/userState";

import './AuthenticatedLayout.scss';

const AuthenticatedLayout = () => {
    const [user] = useRecoilState(userState);

    if (!user) return <Navigate replace to="/user/login" />;

    return <div className="authenticated-route-wrapper">
        <header>
            <div className="container">
                <div className="user-profile-wrapper">
                    <div className="user-profile">
                        <div className="user-initials">{ user.firstName.substring(0,1) + user.lastName.substring(0,1) }</div>
                    </div>
                </div>
            </div>
        </header>

        <main>
            <Outlet />
        </main>
    </div>
}

export default AuthenticatedLayout;