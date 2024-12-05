import React from 'react';
import Navbar from '../components/main/Navbar';
import Search from '../components/main/Search';
import Main from '../components/main/Main';

function Pages() {
    return(
        <div>
            <Navbar />
            <Search />
            <Main />
        </div>
    );
};

export default Pages;