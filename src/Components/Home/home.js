import React from 'react';
import classes from "./home.module.scss"
import {useState} from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faChartLine } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import GraphElement from  "../graph/graph"

const Home = () =>{
    const [state, setState] = useState({
        menuStatus: 0,                  //0 - closed, 1 - opened
        graphStatus: 0                  //0 - closed, 1 - opened
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
                        <input type={"text"} name={"search"} className={classes.searchField}>

                        </input>
                        <div className={classes.searchButton}>
                            <FontAwesomeIcon className={classes.search} icon={faSearch} size="lg" />
                        </div>
                    </div>
                </div>
                <div className={classes.chart} onClick={openGraph}>
                    <FontAwesomeIcon className={classes.chartLine}  icon={faChartLine} size="3x" />
                </div>


                <div className={classes.mainFrame}>
                    <div className={classes.lot}></div>
                    <div className={classes.lot}></div>
                    <div className={classes.lot}></div>
                    <div className={classes.lot}></div>
                    <div className={classes.lot}></div>
                    <div className={classes.lot}></div>
                </div>

            </div>

        </>
    )
}

export default Home;