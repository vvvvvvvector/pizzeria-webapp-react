import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectHome } from '../../redux/home/selectors';
import { setSortParameter } from '../../redux/home/slice';

import arrowSVG from '../../assets/images/categories-arrow.svg';

const sortParameters: string[] = ["popularity ↑", "popularity ↓", "cost ↑", "cost ↓", "alphabet ↑", "alphabet ↓"];

export const Sort: React.FC = () => {
    const dispatch = useDispatch();

    const [showPopup, setShowPopup] = React.useState<boolean>(false);

    const popupReference = React.useRef<HTMLDivElement>(null);

    const {
        sortParameterIndex
    } = useSelector(selectHome);

    // clickOutsideSort is working only when sort component is on page(mounted?)
    React.useEffect(() => {
        const clickOutsideSort = (event: MouseEvent) => {
            if (popupReference.current && !event.composedPath().includes(popupReference.current)) {
                setShowPopup(false);
            }
        };

        document.body.addEventListener("click", clickOutsideSort); // add event listener on first render

        // unmount
        return () => document.body.removeEventListener("click", clickOutsideSort);  // delete event listener(unmount)
    }, []);

    return (
        <div ref={popupReference} className="sort">
            <div className="sort__label">
                <img className={showPopup ? "active" : ""} alt="arrow" src={arrowSVG} />
                <b>Sort by: </b>
                <span onClick={() => setShowPopup(!showPopup)}>
                    {sortParameters[sortParameterIndex]}
                </span>
            </div>
            {
                showPopup && (
                    <div className="sort__popup">
                        <ul>
                            {
                                sortParameters.map((parameter, index) => (
                                    <li onClick={() => { dispatch(setSortParameter(index)); setShowPopup(false); }} key={index} className={index === sortParameterIndex ? "active" : ""}>{parameter}</li>
                                ))
                            }
                        </ul>
                    </div>
                )}
        </div>
    );
};