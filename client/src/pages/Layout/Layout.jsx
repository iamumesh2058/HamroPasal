import React, { useState } from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom';

const Layout = ({ isDarkThemeEnabled }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled);

    const toggleTheme = () => {
        const newDarkTheme = !isDarkTheme;
        setIsDarkTheme(newDarkTheme);
        document.body.classList.toggle('dark', newDarkTheme);
        localStorage.setItem('darkTheme', newDarkTheme);
    }

    return (
        <>
            <Header isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
            <Outlet />
        </>
    )
}

export default Layout