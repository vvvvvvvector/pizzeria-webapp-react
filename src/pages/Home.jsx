import React from 'react';

import axios from 'axios';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setCurrentPage, setPageParameters } from '../redux/slices/filterSlice';

import { Overlay, Categories, Sort, Pizza, Skeleton, Pagination } from '../components/';

const sortParameters = ["popularity", "popularity", "cost", "cost", "name", "name"];

export const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isMounted = React.useRef(false);

    const searchValue = useSelector((state) => state.filter.searchValue);

    const [loading, setLoading] = React.useState(true);
    const [fetchedPizzas, setFetchedPizzas] = React.useState([]);

    // pagination component
    const currentPage = useSelector((state) => state.filter.currentPage);
    const onChangePage = (page) => {
        dispatch(setCurrentPage(page));
    }

    // category component
    const { selectedCategoryIndex, selectedCategoryName } = useSelector((state) => state.filter);

    // sort component
    const selectedSortParameter = useSelector((state) => state.filter.selectedSortParameterIndex);

    React.useEffect(() => {
        async function fetchData() {
            setLoading(true);

            const pizzasResponse = await
                axios.get(`https://62e2f40c3891dd9ba8f276a3.mockapi.io/pizzas?page=${currentPage}&limit=4&categories=${selectedCategoryIndex}&sortBy=${sortParameters[selectedSortParameter]}&order=${selectedSortParameter % 2 === 0 ? "asc" : "desc"}`);

            setLoading(false);

            setFetchedPizzas(pizzasResponse.data);
        }

        fetchData();
    }, [selectedCategoryIndex, selectedSortParameter, currentPage]);

    // -------page parameters from url-------
    React.useEffect(() => {
        if (window.location.search) {
            console.log(window.location.search);

            const pageParameters = qs.parse(window.location.search.substring(1));

            dispatch(setPageParameters(pageParameters));
        }
    }, []);

    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                category: selectedCategoryIndex,
                categoryName: selectedCategoryName,
                sort: selectedSortParameter,
                page: currentPage
            });
            navigate(`?${queryString}`);
        }
        isMounted.current = true; // if we changed parameters and first render -> true;
    }, [selectedCategoryIndex, selectedSortParameter, currentPage]);
    // -------page parameters from url-------

    // --------overlay--------
    const [overlayOpened, setOverlayOpened] = React.useState(false);
    const [selectedPizza, setSelectedPizza] = React.useState(null);

    const onClickPizzaImage = (pizzaObj) => {
        setOverlayOpened(true);
        document.body.style.overflow = 'hidden';
        setSelectedPizza(pizzaObj);
    };

    const onClickCloseOverlay = () => {
        setOverlayOpened(false);
        document.body.style.overflow = 'visible';
    }
    // --------overlay--------

    const renderContentItems = () => {
        const skeletons = [...new Array(4)].map((_, index) => (
            <Skeleton key={index} />
        ));

        const filteredPizzas = fetchedPizzas.filter((item) => (
            item.name.toLowerCase().includes(searchValue.toLowerCase())
        )).map((pizza) => (
            <Pizza key={pizza.id} onClickImage={onClickPizzaImage} {...pizza} />
        ));

        return loading ? skeletons : filteredPizzas;
    };

    return (
        <>
            {
                overlayOpened && (
                    <Overlay
                        pizza={selectedPizza}
                        onCloseOverlay={onClickCloseOverlay} />
                )
            }
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">
                {searchValue ? `Search for: ${searchValue}` : `${selectedCategoryName} pizzas`}
            </h2>
            <div className="content__items">
                {
                    renderContentItems()
                }
            </div>
            <Pagination
                selectedPageIndex={currentPage}
                onChangePage={onChangePage} />
        </>
    );
}