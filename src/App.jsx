import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Error404 from './containers/errors/Error404'
import Home from './containers/Home'
import { useEffect } from 'react';
import {Signup} from './containers/auth/Signup'
import {useDispatch} from 'react-redux'
import { readSignup } from './redux/thunks/authThunk';
import { showAlert } from './redux/thunks/alertThunk';


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readSignup());
    dispatch(showAlert());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
return (
  <>
    <Router>
      <Routes>
        <Route path="*" element={<Error404/>}/>
        <Route exact path="/" element={<Home/>}/>
        {/* Autenticacion */}
        <Route exact path='/signup' element={<Signup/>}/>
      </Routes>
    </Router>
  </>
)
}

export default App