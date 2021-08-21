import React, {useEffect, useState} from "react";
import './SortingVisualizer.css'
import {Box, Button, Slider} from '@material-ui/core';

const SortingVisualizer = () => {

    function generateRandomArray() {
        let tempArray = [];
        for (let i = 0; i < 50; i++) {
            tempArray.push(Math.floor(Math.random() * (800 - 1 + 5)) + 5);
        }
        setArray(tempArray);
    }

    function mergeSortCaller() {

        return undefined
    }

    const delayed = (function () {
        let queue = [];

        function processQueue() {
            if (queue.length > 0) {
                setTimeout(function () {
                    queue.shift().cb();
                    processQueue();
                }, queue[0].delay);
            } else {
                setIsProcessing(true);
            }
        }

        return function delayed(delay, cb) {
            queue.push({delay: delay, cb: cb});

            if (queue.length === 1) {
                processQueue();
            }
        };
    }());

    function bubbleSortCaller() {

        setIsProcessing(false);
        let i = 0, j;
        let arr = array.slice();
        let arrayBars = document.getElementsByClassName('array-bar');
        let len = arr.length;
        for (; i < len; i += 1) {
            for (j = 0; j < len - i - 1; j += 1) {
                delayed(time, function (i, j) {
                    return function () {
                        const barOneStyle = arrayBars[j].style;
                        const barTwoStyle = arrayBars[j + 1].style;
                        const color = 'red';
                        barOneStyle.backgroundColor = color;
                        barTwoStyle.backgroundColor = color;
                    };
                }(i, j));
                delayed(time * 1.25, function (i, j) {
                    return function () {
                        if (arr[j] > arr[j + 1]) {
                            let temp = arr[j]
                            arr[j] = arr[j + 1];
                            arr[j + 1] = temp;
                            const barOneStyle = arrayBars[j].style;
                            const barTwoStyle = arrayBars[j + 1].style;
                            barOneStyle.height = `${arr[j]}px`
                            barTwoStyle.height = `${arr[j + 1]}px`
                        }
                    }
                }(i, j));
                delayed(time * 1.5, function (i, j) {
                    return function () {
                        const barOneStyle = arrayBars[j].style;
                        const barTwoStyle = arrayBars[j + 1].style;
                        const color = 'pink';
                        barOneStyle.backgroundColor = color;
                        barTwoStyle.backgroundColor = color;
                    }
                }(i, j));
            }
        }
    }

    function quickSortCaller() {

        return undefined;
    }

    function changeTime(event, newTime) {

        setTime(newTime);
        console.log(time);
    }

    function isSpeed() {

        if (isProcessing) {
            return (
                <div>Speed</div>)
        } else
            return (
                <div className="disabled-text">Speed</div>)
    }

    useEffect(() => {
        generateRandomArray();
    }, []);

    const [array, setArray] = useState([]);
    const [time, setTime] = useState(100);
    const [isProcessing, setIsProcessing] = useState(true);

    return (
        <div className="array-container">

            <Box sx={{marginTop: '10px', marginBottom: '10px', height: '100px'}}>{array.map((value) => <div
                className="array-bar" style={{height: `${value}px`}}/>)}</Box>
            <div>
                <Button disabled={!isProcessing} variant="primary" active onClick={() => generateRandomArray()}>New
                    Array</Button>
                <Button disabled={!isProcessing} variant='text' onClick={() => bubbleSortCaller()}> bubble sort</Button>
                <Button disabled={!isProcessing} onClick={() => mergeSortCaller()}> merge sort</Button>
                <Button disabled={!isProcessing} onClick={() => quickSortCaller()}> quick sort</Button>
                <Box sx={{width: 200, margin: 'auto'}}>
                    {isSpeed()} <Slider min={1} max={1000} value={time} disabled={!isProcessing} track="inverted"
                                        onChange={changeTime}
                                        aria-labelledby="continuous-slider"/></Box>
            </div>
        </div>
    );
}

export default SortingVisualizer;