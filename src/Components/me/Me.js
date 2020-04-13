import React from 'react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import Google from './GoogleData';
import Github from './GithubList';
import { Route} from 'react-router-dom';

const Me = () => {
    return (
        <div className="container-fluid p-0">
            <Navbar/>
            <div className="container">
              <Route path='/me/google' component={Google}/>
              <Route path='/me/github' component={Github}/>
            </div>
            <Footer/>
        </div>
    );
}
 
export default Me;