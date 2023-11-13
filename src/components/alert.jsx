import { Fragment, useEffect } from 'react';
import { BeakerIcon } from '@heroicons/react/24/solid';
import { useDispatch, useSelector } from 'react-redux';
import { removeAlert } from '../redux/slices/alertSlice';

function Alert() {
  const alert = useSelector(state => state.Alert.alert)
  const dispatch = useDispatch()

  console.log(alert)

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Verifica si la alerta sigue siendo la misma antes de llamar a removeAlert
      if (alert) {
        dispatch(removeAlert());
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [alert, dispatch]);

  return (
    <Fragment>
      {alert  && (
        <div className={`bg-${alert.alertType}-500 rounded-md p-4 z-10`}>
          <div className="flex">
            <div className="flex-shrink-0">
              <BeakerIcon className={`h-5 w-5 text-${alert.alertType}-300`} aria-hidden="true" />
            </div>
            <div className="ml-3">
              <p className={`text-sm font-medium text-${alert.alertType}-800`}>{alert.msg}</p>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default Alert;