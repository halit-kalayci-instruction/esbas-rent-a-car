import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { userHasRole } from '../../utils/auth-status/AuthStatus';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, roles }) {
    const authContext = useContext(AuthContext);
    // Kullanıcı bu route'a erişebilir mi?
    // Erişebilir ise children render et
    // erişemez ise render etme
    // const checkAuthentication = () => {
    //     return userHasRole(authContext, roles);
    // }
    return (
        userHasRole(authContext, roles) ? children : <Navigate to="/login"></Navigate>
    )
}
