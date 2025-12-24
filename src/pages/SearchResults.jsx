import {useEffect} from 'react'
import TrainFilters from '../components/common/TrainFilters/TrainFilters'
import TrainCard from '../components/cards/TrainCard'
import Pagination from '../components/common/Pagination'
import LastTickets from '../components/info/LastTickets/LastTickets'
import '../App.css'
import {useDispatch, useSelector} from "react-redux";
import {
    fetchTrains,
    selectSearchQuery,
    setPage,
    setSort,
    setTrainsOnPage,
    TrainsSort
} from "../store/searchResultSlice";
import debounce from 'lodash.debounce';

export default function SearchResults() {
    const isLoading = useSelector((state) => state.loading.isLoading)
    const dispatch = useDispatch();

    const routes = useSelector(state => state.searchResult.trains.items || [])
    const totalRoutes = useSelector(state => state.searchResult.trains.total_count || 0)
    const page = useSelector(state => state.searchResult.page)
    const trainsPerPage = useSelector(state => state.searchResult.limit)

    const totalPages = Math.ceil(totalRoutes / trainsPerPage)

    const useDebouncedSearch = (query) => {
        const dispatch = useDispatch();

        useEffect(() => {
            const debounced = debounce(() => {
                dispatch(fetchTrains(query));
            }, 300);

            debounced();

            return () => debounced.cancel();
        }, [query, dispatch]);
    };

    const searchQuery = useSelector(selectSearchQuery);
    useDebouncedSearch(searchQuery);

    const onPageChange = (page) => {
        dispatch(setPage(page))
    }

    return (
        <div className="search-results-page">
            <div className="page-container">
                <aside className="sidebar">
                    <TrainFilters
                        offset={(page - 1) * trainsPerPage}
                        limit={trainsPerPage}
                    />
                    <LastTickets />
                </aside>

                <section className="main-section">
                    <div className="train-controls">
                        <div className="train-sorting">
                            <label className="train-controls-label" htmlFor="sort-select">сортировать по:</label>
                            <select
                                id="sort-select"
                                className="sort-select"
                                onChange={(e) => dispatch(setSort(e.target.value))}
                                defaultValue={TrainsSort.Date}
                            >
                                <option value={TrainsSort.Date}>времени</option>
                                <option value={TrainsSort.Duration}>длительности</option>
                                <option value={TrainsSort.Price}>цене</option>
                            </select>
                        </div>
                        <div className="train-limit">
                            <span className="train-controls-label">показывать по:</span>
                            <div className="train-limit__options">
                                {[5, 10, 20].map((value) => (
                                    <span
                                        key={value}
                                        className={`train-limit__option ${value === trainsPerPage ? 'active' : ''}`}
                                        onClick={() => {
                                            dispatch(setTrainsOnPage(value))
                                        }}
                                    >
                                     {value}
                                     </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className={`search-results ${isLoading ? 'blurred' : ''}`}>
                        {routes.length !== 0 && routes.map((route, index) => (
                            <TrainCard key={route._id || index} data={route}/>
                        ))}

                        {routes.length === 0 && (
                            <p className="no-results">Маршруты не найдены</p>
                        )}

                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={onPageChange}
                        />
                    </div>


                </section>
            </div>
        </div>
)
}
