import { TOKEN_KEY } from '~/app-configs';
import { REQUEST_STATE } from '~/app-configs';
import FullPageLoading from '~/components/Loading/FullPageLoading/FullPageLoading';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { CHECK_VALID_TOKEN_FAIL } from '~/redux/actions/user';
import { CHECK_VALID_TOKEN } from '~/redux/actions/user';

function PrivateRoute({ component: Component, role, location, ...rest }) {
    const dispatch = useDispatch();
    const isAuthencate = useSelector((state) => {
        return state.user?.verifyAuthState;
    });
    console.log('role is:', role);
    const user = useSelector((state) => state.user?.profile);
    console.log('user', user);

    useEffect(() => {
        (async () => {
            const accessToken = localStorage.getItem(TOKEN_KEY);
            if (accessToken) {
                if (isAuthencate !== REQUEST_STATE.SUCCESS) {
                    dispatch(CHECK_VALID_TOKEN());
                }
            } else {
                dispatch(CHECK_VALID_TOKEN_FAIL());
            }
        })();
    }, [dispatch]);
    switch (isAuthencate) {
        case REQUEST_STATE?.SUCCESS:
            if (user?.roles) {
                console.log(' roles: ' + role);
                console.log('user role: ' + user.roles);
                if (role.includes(user?.roles)) return <Route {...rest} render={(props) => <Component {...props} />} />;
                else return <Redirect to={{ pathname: '/', state: { from: location } }} />;
            } else {
                console.log('user role: ' + user.roles);
                return <Redirect to={{ pathname: '/auth', state: { from: location } }} />;
            }
        // return <Route {...rest} render={(props) => <Component {...props} />} />;
        case REQUEST_STATE?.ERROR:
            return <Redirect to={{ pathname: '/auth', state: { from: location } }} />;
        default:
            return <FullPageLoading />;
    }
}

export default PrivateRoute;
