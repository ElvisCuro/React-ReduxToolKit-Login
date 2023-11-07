// import { check_authenticated,load_user,refresh } from '../redux/actions/auth';


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import Navbar from '../components/navigation/Navbar';
import Footer from '../components/navigation/Footer';

const Layout = (props) => {

    useEffect(()=>{

    },[]);

    return(
        <div>
            <Navbar/>
            <ToastContainer autoClose={5000} />
            {props.children}
            <Footer/>
        </div>
    )
}

// export default connect (null,{
//     check_authenticated,load_user,refresh
// }) (Layout)

export default Layout