import React, { createContext, useState, useContext } from 'react';

// 1. Context 생성
const AuthContext = createContext(null);

// 2. Context를 제공하는 Provider 컴포넌트 생성
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = () => setIsLoggedIn(true);
    const logout = () => setIsLoggedIn(false);

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// 3. 다른 컴포넌트에서 쉽게 Context를 사용하기 위한 Custom Hook
export const useAuth = () => {
    return useContext(AuthContext);
};