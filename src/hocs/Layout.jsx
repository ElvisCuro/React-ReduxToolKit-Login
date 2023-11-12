import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

import Navbar from '../components/navigation/Navbar';
import Footer from '../components/navigation/Footer';
import { useDispatch } from 'react-redux';
import {authCheck, authLoader, authRefresh } from '../redux/thunks/authThunk';


const Layout = (props) => {
    const dispatch = useDispatch()

useEffect(() => {
    dispatch(authRefresh({ access: localStorage.getItem('access') }));
    dispatch(authCheck({ access: localStorage.getItem('access') }));
    dispatch(authLoader({ access: localStorage.getItem('access') }));
  }, []);


    return(
        <div>
            <Navbar/>
            <ToastContainer autoClose={5000} />
            {props.children}
            <Footer/>
        </div>
    )
}


export default Layout