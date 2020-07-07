import React from "react";
import Preloader from "../Preloader/Preloader";
import {compose} from 'redux';
import {connect} from "react-redux";
import {selectInfiniteScrollIsLoading, selectInfiniteScrollPage} from "../../../redux/selectors/addition-selectors";
import {setIsLoading, setPage} from "../../../redux/addition-reducer";

const InfiniteScroll = ({dataLoader, totalCount, currentCount, scrollFinished, pageSize=20, preloader=Preloader, isLoading, page, setPage, setIsLoading}) => {

    const  hasMore = currentCount<totalCount;

    const onScroll =  ()=> {
        if ( !hasMore) return;
        if (
            window.innerHeight + document.documentElement.scrollTop
            >= document.documentElement.offsetHeight-400
        ) {
            getData();
        }
    }


    const getData = async ()=>{
        if (!isLoading && !scrollFinished) {
            setIsLoading(true);
            await dataLoader(page, pageSize);
            setPage(page+1);
            setIsLoading(false);
        }
    }

    window.onscroll = onScroll;

    if (document.documentElement.offsetHeight+400<window.innerHeight)
        getData();

    if (isLoading) return <div><Preloader/></div>
    else return <></>
}

export default compose(
    connect(
        state=>({
            isLoading: selectInfiniteScrollIsLoading(state),
            page: selectInfiniteScrollPage(state)
        }),

        dispatch=>({
            setIsLoading: (isLoading)=>{
                dispatch(setIsLoading(isLoading));
            },
            setPage: (page)=>{
                dispatch(setPage(page));
            },
        })
    )
)
(InfiniteScroll);