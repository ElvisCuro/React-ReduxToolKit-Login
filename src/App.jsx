
import './App.css';
import CounterActions from './components/CounterActions';


function App() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(readProducts());
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <>
      <header>
        <h1>
          Tiendita Feliz Redux
        </h1>
        <CounterActions />
      </header>
    </>
  )
}
export default App