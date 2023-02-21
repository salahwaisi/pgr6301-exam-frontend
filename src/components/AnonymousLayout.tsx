import { Outlet } from 'react-router-dom';

import "./AnonymousLayout.scss";

const AnonymousLayout = () => {
  return <>
    <div className="anonymous-login-container">
        <Outlet />
    </div>
  </>
}

export default AnonymousLayout;