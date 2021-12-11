import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DetailModal from './Components/DetailModal'
import LoadingSpinner from './Components/LoadingSpinner';
function App() {
  // contains raw data
  const [cryptoList, setCryptoList] = useState([])
  // loading spinner activates when this state is true. Occurs when axios is fetching something.
  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState('')
  // copy of crypto list, contains same info but can be used to hold any filtered data.
  const [filteredItems, setFilteredItems] = useState([])


  const [maxItems, setMaxItems] = useState(30)
  const changeMaxItems = (e) => {
    firstPage()
    setMaxItems(e.target.value)
  }
  const [currentPage, setCurrentPage] = useState(1)
  const [filterQuery, setFilter] = useState('')
  const [pageList, setPageList] = useState([])
  const refreshPageSelector = (page) => {
    let startIndex = 1
    let endIndex = 1
    let pageLimit = Math.round(filteredItems.length / maxItems)
    page - 5 < 1 ? startIndex = 1 : startIndex = page - 5
    page + 5 > pageLimit ? endIndex = pageLimit : endIndex = page + 5

    let selectorList = []

    for (let i = startIndex; i < endIndex; i++) {
      selectorList.push(i)
    }
    setPageList(selectorList)
  }
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
  const setPage = (i) => {
    setCurrentPage(i)
    refreshPageSelector(i)
  }
  const nextPage = () => setPage(currentPage + 1 > Math.round(filteredItems.length / maxItems) ? Math.round(filteredItems.length / maxItems) : currentPage + 1)
  const prevPage = () => setPage(currentPage - 1 < 1 ? 1 : currentPage - 1)
  const lastPage = () => setPage(Math.round(filteredItems.length / maxItems))
  const firstPage = () => setPage(1)

  useEffect(() => {
    setLoading(true)
    axios.get('https://api.coingecko.com/api/v3/coins/list', { crossDomain: true }).then(res => {
      setFilteredItems(res.data);
      setCryptoList(res.data);
      setLoading(false);
      refreshPageSelector(1)
    }
    ).catch((err) => setError('an error occured.'))

  }, [])

  return (
    <div className="App">
      {
        isError ? <div className='simpleError'> Something went wrong while attempting to fetch data. Please try again. </div> : <div>
          <h1 style={{ textAlign: 'center' }}>Crypto list</h1>
          <div className="filterContainer">
            <input type="text" placeholder="Search..." onChange={(e) => { setFilter(e.target.value) }} value={filterQuery} />
            <button onClick={() => doFilter('name')}> Filter Name </button>
            <button onClick={() => doFilter('symbol')}> Filter symbol </button>

            <p>Show per page: </p> <select value={maxItems} onChange={changeMaxItems}>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={30}>50</option>
            </select>
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
          <div >
            <button onClick={firstPage}>First</button>
            <button onClick={prevPage}>Previous</button>
            <span className="pageSelector"> {pageList.map((i) => currentPage === i ? (<i key={i}>{i}</i>) : (<a key={i} href='javascript:void(0)' onClick={() => setPage(i)}> {i} </a>))} </span>

            <button onClick={nextPage}>Next</button>
            <button onClick={lastPage}>Last</button>
          </div>
          {
            modalActive ? <DetailModal item={currentActive} exitCallback={closeModal} ></DetailModal> : null
          }
        </div>
      }
      {isLoading ? <LoadingSpinner /> : ''}
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
