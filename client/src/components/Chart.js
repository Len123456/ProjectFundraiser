import React from "react";
import { VictoryVoronoiContainer, VictoryScatter, VictoryTooltip, VictoryLine, VictoryChart, VictoryAxis } from 'victory';


// function that returns 110% of the max value of the data set in order to determine the length of the y-axis
function getMaxY(dataArray) {
    return 1.1*dataArray.reduce((max, p) => p.earnings > max ? p.earnings : max, dataArray[0].earnings);
}

// function that returns 90% of the min value of the data set in order to determine the length of the y-axis
function getMinY(dataArray) {
    return 0.9*dataArray.reduce((min, p) => p.earnings < min ? p.earnings : min, dataArray[0].earnings);
}



const Chart = ({
    chartData
    })=> (
    
    <VictoryChart
        containerComponent={<VictoryVoronoiContainer/>}

    >
        <VictoryLine
            data={chartData}
            // data accessor for x values
            x="quarter"
            // data accessor for y values
            y="earnings"
            style={{
                data: { stroke: "white"}
            }}
        />

        <VictoryScatter
            data={chartData}
            labels={(datum) => datum.earnings}
            labelComponent={
                <VictoryTooltip 
                    flyoutStyle={{
                        stroke: "transparent",
                        fill: "transparent",
                    }}
                />}
            // data accessor for x values
            x="quarter"
            // data accessor for y values
            y="earnings"
            style={{
                data: { fill: "white"}, labels: {fill: "white"}
            }}
            
        />
        
        <VictoryAxis independentAxis crossAxis
            domain={[0, chartData.length+1]}
            style={{
                axis: {stroke: "white"},
                
                //grid: {stroke: (t) => t > 0.5 ? "red" : "grey"},
                //ticks: {stroke: "grey", size: 5},
                tickLabels: {strokeWidth: "0", fill: "white", fontSize: 15, padding: 5}
            }}
        />

        <VictoryAxis dependentAxis crossAxis            
            //make dynamic for max and min of fucntion
            domain={[getMinY(chartData), getMaxY(chartData)]}
            style={{
            axis: {stroke: "white"},
            //grid: {stroke: (t) => t > 0.5 ? "red" : "grey"},
            //ticks: {stroke: "grey", size: 5},
            tickLabels: {strokeWidth: "0", fill: "white", fontSize: 15, padding: 5}
            }}     
        />
    </VictoryChart>
)
    

export default Chart;