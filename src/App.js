import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DetailModal from './Components/DetailModal'
import LoadingSpinner from './Components/LoadingSpinner';
function App() {
  const [cryptoList, setCryptoList] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState('')
  const [filteredItems, setFilteredItems] = useState([])

  const [maxItems, setMaxItems] = useState(30)
  const [currentPage, setCurrent] = useState(1)
  const [filterQuery, setFilter] = useState('')
  const doFilter = (field) => {
    setFilteredItems(cryptoList.filter(i => i[field].toLowerCase().includes(filterQuery.toLowerCase())))
    firstPage()
  }

  const [modalActive, setModalActive] = useState(false)
  const [currentActive, setCurrentActive] = useState({})
  const openModal = () => setModalActive(true)
  const closeModal = () => setModalActive(false)
  const setCurrentItem = (id) => {
    setLoading(true)
    axios.get('https://api.coingecko.com/api/v3/coins/' + id, {
      crossDomain: true,
      params: { localization: 'false' }
    }).then(res => { setCurrentActive(res.data); openModal(); setLoading(false) })
  }

  const nextPage = () => setCurrent((i) => i + 1 > Math.round(filteredItems.length / maxItems) ? Math.round(filteredItems.length / maxItems) : i + 1)
  const prevPage = () => setCurrent((i) => i - 1 < 1 ? 1 : i - 1)
  const lastPage = () => setCurrent(Math.round(filteredItems.length / maxItems))
  const firstPage = () => setCurrent(1)

  useEffect(() => {
    setLoading(true)
    axios.get('https://api.coingecko.com/api/v3/coins/list', { crossDomain: true }).then(res => { setFilteredItems(res.data); setCryptoList(res.data); setLoading(false) }).catch((err) => setError('an error occured.'))
  }, [])

  return (
    <div className="App">
      {
        isError ? <div className='simpleError'> Something went wrong while attempting to fetch data. Please try again. </div> : <div>
          <h1 style={{textAlign:'center'}}>Crypto list</h1>
          <div className="filterContainer">
            <input type="text" placeholder="Search..." onChange={(e) => { setFilter(e.target.value) }} value={filterQuery} />
            <button onClick={() => doFilter('name')}> Filter Name </button>
            <button onClick={() => doFilter('symbol')}> Filter symbol </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Symbol</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.slice(currentPage * maxItems - maxItems, currentPage * maxItems).map(i => {
                return (
                  <tr key={i.id} onClick={() => setCurrentItem(i.id)}>
                    <td>{i.id}</td>
                    <td>{i.name}</td>
                    <td>{i.symbol}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div style={{ alignContent: 'center', textAlign: 'center', marginTop: 20 }}>
            <button onClick={firstPage}>First</button> <button onClick={prevPage}>Previous</button> {currentPage} <button onClick={nextPage}>Next</button> <button onClick={lastPage}>Last</button>
          </div>
          {
            modalActive ? <DetailModal item={currentActive} exitCallback={closeModal} ></DetailModal> : null
          }
        </div>
      }
      {isLoading ? <LoadingSpinner />  : ''}
      <div>
        <h2>Additional Notes</h2>
        <p>Please note, the following additional third party software/code was used</p>
        <li>LoadingSpinner from <a href='https://loading.io/css/'>https://loading.io/css/</a></li>
        <li>FontAwesome</li>
      </div>
    </div>
  );
}

export default App;
