/* eslint-disable react/prop-types */
import {Fragment} from 'react'
import {connect} from 'react-redux'

import { BeakerIcon } from '@heroicons/react/24/solid'

function Alert ( {alert}) {

    const displayAlert = () => {
        if (alert !== null){
            return (
                // eslint-disable-next-line react/prop-types
                <div className={`bg-${alert.alertType}-50 rounded-md p-4`}>
                <div className="flex">
                    <div className="flex-shrink-0">
                    <BeakerIcon className={`h-5 w-5 text-${alert.alertType}-300`} aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                    <p className={`text-sm font-medium text-${alert.alertType}-800`}>{alert.msg}</p>
                    </div>
                </div>
                </div>
            )
        } else {
            return(
                <>
                </>
            )
        }
    }

    return (
        <Fragment>
            {displayAlert()}
        </Fragment>
    )
}

const mapStateToProps = state => ({
    alert: state.Alert.alert
})

export default connect(mapStateToProps)(Alert)