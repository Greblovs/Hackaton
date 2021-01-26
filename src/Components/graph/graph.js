import React from 'react';
import classes from "./graph.module.scss"
import {useState} from 'react';
import axios from "axios";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);
const graphUrl = "https://buckwheat-price-seeker.herokuapp.com/chart/buckwheat"






const Graph = () =>{
    const [state, setState] = useState({
        chartData:  null,
        dataLoaded: false
    })

    if (state.dataLoaded == false) {
        let chartData = []
        axios.get(graphUrl)
            .then(result => {
                for (let i in result.data["values"]) {

                    chartData.push({label: i, value: result.data.values[i]})
                }
                setState(prev => {
                    return {
                        ...prev,
                        chartData: chartData,
                        dataLoaded: true
                    }
                })
            })
    }

    const chartConfigs = {
        type: "line", // The chart type
        width: (window.innerWidth-100), // Width of the chart
        height: window.innerHeight, // Height of the chart
        dataFormat: "json", // Data type
        dataSource: {
            // Chart Configuration
            chart: {
                caption: "Prices",    //Set the chart caption
                subCaption: "On Buckwheat",             //Set the chart subcaption
                xAxisName: "Date",           //Set the x-axis name
                yAxisName: "Price",  //Set the y-axis name

                theme: "fusion"                 //Set the theme for your chart
            },
            // Chart Data - from step 2
            data: state.chartData
        }
    }


    if (state.dataLoaded == false) {
        return (
            <>
                <>
                    <h2>Loading Your Data</h2>
                </>
            </>
        )
    }else{
        return (
            <>

                <ReactFC  {...chartConfigs} />
            </>
        )
    }
}

export default Graph;