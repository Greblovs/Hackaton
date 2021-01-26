import React from 'react';
import classes from "./home.module.scss"
import {useState} from 'react';
import {faBars} from '@fortawesome/free-solid-svg-icons'
import {faTimes} from '@fortawesome/free-solid-svg-icons'
import {faChartLine} from '@fortawesome/free-solid-svg-icons'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import {faSync} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import GraphElement from "../graph/graph"
import axios from "axios";

const searchLine = "https://buckwheat-price-seeker.herokuapp.com/products/search?"
const searchWheat = "https://grecha-back.herokuapp.com/buckwheat/search"
const getCategories = "https://buckwheat-price-seeker.herokuapp.com/categories/main?page=0&pageSize=8"

const Home = () => {
    const [state, setState] = useState({
        menuStatus: 0,                  //0 - closed, 1 - opened
        graphStatus: 0,                 //0 - closed, 1 - opened
        input: null,
        searchRes: null,
        categories: null,
        page: 0,
        items: [],
        added:0,
        but: 0,
        start: 0
    })

    const getGrecha = ()=>{
        state.start = 1

        axios.get(searchWheat).then(result => {
            setState(prev => {
                return {
                    ...prev,
                    searchRes: result,
                    page: 0,
                    but: 1,
                    added: 0,
                    items:[]
                }
            })
        })
    }
    if (state.start == 0) {
        getGrecha()
    }


    const openMenu = () => {

        setState(prev => {
            return {
                ...prev,
                menuStatus: !prev.menuStatus
            }
        })
    }

    const openGraph = () => {
        setState(prev => {
            return {
                ...prev,
                graphStatus: !prev.graphStatus
            }
        })
    }

    let menuClass = null;
    if (state.menuStatus == 0) {
        menuClass = classes.sideMenuClosed
    } else {
        menuClass = classes.sideMenuOpen
    }

    let graphClass = null
    if (state.graphStatus == 0) {
        graphClass = classes.graphHolderClosed
    } else {
        graphClass = classes.graphHolderOpened
    }
    const updateString = (event) => {
        setState(prev => {
            return {
                ...prev,
                input: event.target.value
            }
        })

    }

    if (state.categories == null) {
        axios.get(getCategories).then(result => {
            setState(prev => {
                return {
                    ...prev,
                    categories: result
                }
            })
        })
    }


    const search = (e) => {
        alert("searcg")
        e.preventDefault()
        let searchLineReq = searchLine + "page=0&pageSize=12&search=" + state.input
        axios.get(searchLineReq).then(result => {
            setState(prev => {
                return {
                    ...prev,
                    searchRes: result,
                    page: 0,
                    added: 0,
                    items: [],
                    but: 0
                }
            })
        })
    }


    const loadMore = (e) => {
        let num = state.page + 1;
        let searchLineReqQ = searchLine + "page=" + num + "&pageSize=12&search=" + state.input
        axios.get(searchLineReqQ).then(result => {
            setState(prev => {
                return {
                    ...prev,
                    searchRes: result,
                    page: num,
                    added: 0,
                    but:0
                }
            })
        })
    }

    let cat = null
    if (state.categories != null) {
        cat = []
        for (let i in state.categories.data["objects"]) {
            let e = state.categories.data.objects[i];

            cat.push(e.title)
        }
    }

    let catList = null;
    if (cat != null) {
        catList = [];
        catList = cat.map((element, index) => {
            return (
                <p className={classes.menuButton}>{element}</p>
            )
        })
    }


    if (state.searchRes != null && state.added == 0) {
        if (state.but == 0) {
            for (let i in state.searchRes.data["objects"]) {

                let e = state.searchRes.data.objects[i];
                let firstPrice = null;
                for (let key in e.prices) {
                    firstPrice = key;
                    break;
                }
                state.items.push({
                    img: e.img["s350x350"],
                    price: e.prices[firstPrice],
                    reseller: firstPrice,
                    title: e.title,
                    url: e.web_url,
                    weight: e.weight,
                    unit: e.unit,
                    producer: e.producer
                })
                state.added = 1;
            }
        }else{
            for (let i in state.searchRes.data) {

                console.log("--------")
                let e =state.searchRes.data[i]
                state.items.push({
                    img: e.img_url,
                    price: e.price,
                    reseller: e.shop,
                    title: e.title,
                    url: e.web_url,
                    weight: e.weight,
                    unit: e.unit,
                    producer: 1
                })
                state.added = 1;
            }
        }
    }

    let carts = null
    if (state.items != null) {
        carts = []
        console.log(state.items)
        carts = state.items.map((element, index) => {
            return (
                <div className={classes.lot}>
                    <img className={classes.img} src={element.img}/>
                    <div className={classes.info}>
                        <p className={classes.title}>{element.title}</p>
                        <div className={classes.textBlock}>
                            <p className={classes.reseller}>{element.reseller}</p>
                            <p className={classes.price}>Ціна: {element.price / 100} грн</p>
                            <p className={classes.weight}>Вага: {element.weight}</p>
                        </div>
                        <a href={element.url} className={classes.follow}>Купить</a>
                    </div>

                </div>
            )
        })


    }


    return (
        <>
            <div className={graphClass}>
                <div className={classes.exitGraph} onClick={openGraph}>
                    <FontAwesomeIcon className={classes.cross} icon={faTimes} size="4x"/>
                </div>
                <GraphElement className={classes.graphImage} GraphElement/>
            </div>
            <div className={classes.wrapper}>
                <div className={menuClass}>
                    <div className={classes.closeMenu} onClick={openMenu}>
                        <FontAwesomeIcon className={classes.cross} icon={faTimes} size="3x"/>
                    </div>
                    <div className={classes.menuName}>Меню</div>
                    <div className={classes.categories}>

                        <div onClick={getGrecha} className={classes.searchGrecha}>Посмотреть Гречу</div>
                        {catList}


                    </div>

                </div>
                <div className={classes.menu}>
                    <div className={classes.openMenu} onClick={openMenu}>
                        <FontAwesomeIcon className={classes.bars} icon={faBars} size="3x"/>
                    </div>
                    <div className={classes.inputWrapper}>
                        <form onSubmit={search}>
                            <input type={"text"} name={"search"} onChange={updateString}
                                   className={classes.searchField}>

                            </input>

                            <div onClick={search} type={"submit"} className={classes.searchButton}>
                                <FontAwesomeIcon className={classes.search} icon={faSearch} size="lg"/>
                            </div>

                        </form>
                    </div>
                </div>
                <div className={classes.chart} onClick={openGraph}>
                    <FontAwesomeIcon className={classes.chartLine} icon={faChartLine} size="3x"/>
                </div>


                <div className={classes.mainFrame}>

                    {carts}
                    <div className={classes.loadMoreWrapper}>
                        <div onClick={loadMore} className={classes.loadMore}>
                            <FontAwesomeIcon className={classes.chartLine} icon={faSync} size="3x"/>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default Home;