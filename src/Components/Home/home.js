import React from 'react';
import classes from "./home.module.scss"
import {useState} from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faChartLine } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import GraphElement from  "../graph/graph"
import axios from "axios";

const searchLine = "https://buckwheat-price-seeker.herokuapp.com/products/search?"

const Home = () =>{
    const [state, setState] = useState({
        menuStatus: 0,                  //0 - closed, 1 - opened
        graphStatus: 0,                 //0 - closed, 1 - opened
        input: null,
        searchRes: null
    })


    const openMenu = () =>{

        setState(prev=>{
            return {
                ...prev,
                menuStatus: !prev.menuStatus
            }
        })
    }

    const openGraph = () => {
        setState( prev => {
            return{
                ...prev,
                graphStatus: !prev.graphStatus
            }
        })
    }

    let menuClass = null;
    if (state.menuStatus == 0){
        menuClass = classes.sideMenuClosed
    }else{
        menuClass = classes.sideMenuOpen
    }

    let graphClass = null
    if (state.graphStatus == 0){
        graphClass = classes.graphHolderClosed
    }else{
        graphClass = classes.graphHolderOpened
    }
    const updateString = (event) =>{
        setState( prev => {
            return{
                ...prev,
                input: event.target.value
            }
        })

    }

    const search = () =>{
        alert("searching")
        let searchLineReq = searchLine + "page=1&pageSize=12&search=" + state.input
        axios.get(searchLineReq).then(result => {
            setState( prev => {
                return{
                    ...prev,
                    searchRes: result
                }
            })
        })
    }
    console.log(state.searchRes)

    let items = null
    if (state.searchRes != null) {
        items = []

        for (let i in state.searchRes.data["objects"]) {
            let e = state.searchRes.data.objects[i];
            let firstPrice = null;
            for (let key in e.prices){
                firstPrice = key;
                break;
            }
            items.push({
                img: e.img["s350x350"],
                price: e.prices[firstPrice],
                title: e.title,
                url: e.web_url,
                weight: e.weight,
                unit: e.unit,
                producer: e.producer
            })

        }
        console.log(items)
    }
    let carts = null
    if (items != null) {
        carts = [];
        carts = items.map((element, index)=>{
           return(
               <div className={classes.lot}>
                   <img className={classes.img} src={element.img}/>
                   <div className={classes.info}>
                       <p className={classes.title}>{element.title}</p>
                       <p className={classes.price}>Ціна: {element.price/100} грн</p>
                       <p className={classes.weight}>Вага: {element.weight}</p>
                   </div>

               </div>
           )
        })
        for (let i in items) {
            carts.push(


            )
        }
    }


    return(
        <>
            <div className={graphClass}>
                <div className={classes.exitGraph} onClick={openGraph}>
                    <FontAwesomeIcon className={classes.cross} icon={faTimes} size="4x" />
                </div>
                <GraphElement className ={classes.graphImage} GraphElement/>
            </div>
            <div className={classes.wrapper}>
                <div className={menuClass}>
                    <div className={classes.closeMenu} onClick={openMenu}>
                        <FontAwesomeIcon className={classes.cross} icon={faTimes} size="3x" />
                    </div>
                </div>
                <div className={classes.menu}>
                    <div className={classes.openMenu} onClick={openMenu}>
                        <FontAwesomeIcon className={classes.bars} icon={faBars} size="3x" />
                    </div>
                    <div className={classes.inputWrapper}>
                        <form onSubmit={search}>
                            <input type={"text"} name={"search"} onChange={updateString} className={classes.searchField}>

                            </input>
                            <div onClick={search} type={"submit"} className={classes.searchButton}>
                                <FontAwesomeIcon className={classes.search} icon={faSearch} size="lg" />
                            </div>

                        </form>
                    </div>
                </div>
                <div className={classes.chart} onClick={openGraph}>
                    <FontAwesomeIcon className={classes.chartLine}  icon={faChartLine} size="3x" />
                </div>


                <div className={classes.mainFrame}>

                    {carts}
                </div>

            </div>

        </>
    )
}

export default Home;