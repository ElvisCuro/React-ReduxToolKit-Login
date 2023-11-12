import Layout from '../../hocs/Layout'
import {useParams} from 'react-router'
import { useState } from 'react'
import { Audio } from 'react-loader-spinner';
import { Navigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { authActivate } from '../../redux/thunks/authThunk'

const Activate = () =>{

    const dispatch = useDispatch()

    const loading =useSelector(
    
        state=> state.Auth.loading
    )

    const params = useParams()


    const [activated, setActivated] = useState(false);

    const activate_account = () => {
      const uid = params.uid
      const token = params.token
      dispatch(authActivate({uid,token}))
      console.log(uid);
      console.log(token);
      setActivated(true);
    }

    if (activated && !loading)
    return <Navigate to='/' />;
    
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
          <div className="max-w-3xl mx-auto">
            {loading ? 
            <button
                className="inline-flex mt-12 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                <Audio
                type="Oval"
                color="#fff"
                width={20}
                height={20}
                />
            </button>:
            <button
            onClick={activate_account}
            className="inline-flex mt-12 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
            Activate Account
            </button>
            }
          </div>
        </div>
      </Layout>
)
}

export default Activate