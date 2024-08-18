import './App.css'
import { PAll } from './promise-pool/pall'
import { PMap } from './promise-pool/pmap'
import MyWebWorkers from './web-worker'

function App() {
  
  return (
    <>
      <h2>2 ways to give the main thread a break when fetching data:</h2>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid black', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'top', alignItems: 'top', border: '1px solid black', padding: '20px', color: 'white', backgroundColor: 'black' }}>1a. Promise Pool using p-all</div>
      <PAll/>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid black', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'top', alignItems: 'top', border: '1px solid black', padding: '20px', color: 'white', backgroundColor: 'black' }}>1b. Promise Pool using p-map</div>
      <PMap/>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid black', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'top', alignItems: 'top', border: '1px solid black', padding: '20px', color: 'white', backgroundColor: 'black' }}>2. Web workers</div>
      <MyWebWorkers/>
      </div>
    </>
  )
}

export default App