import React from 'react';
import classes from "./home.module.scss"
import {useState} from 'react';

const Home = () =>{
    const [state, setState] = useState({
        menuStatus: 0,                  //0 - closed, 1 - openned
    })


    const openMenu = () =>{

        setState(prev=>{
            return {
                ...prev,
                menuStatus: !prev.menuStatus
            }
        })
    }

    let menuClass = null;
    if (state.menuStatus == 0){
        menuClass = classes.sideMenuClosed
    }else{
        menuClass = classes.sideMenuOpen
    }

    return(
        <>
            <div className={classes.wrapper}>
                <div className={menuClass}>
                    <div className={classes.closeMenu} onClick={openMenu}></div>
                </div>
                <div className={classes.menu}>
                    <div className={classes.openMenu} onClick={openMenu}></div>
                    <div className={classes.inputWrapper}>
                        <input type={"text"} name={"search"} className={classes.searchField}>

                        </input>
                        <div className={classes.searchButton}></div>
                    </div>
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