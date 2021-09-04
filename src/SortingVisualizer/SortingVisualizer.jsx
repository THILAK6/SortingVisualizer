import React, {useEffect, useRef, useState} from "react";
import './SortingVisualizer.css'
import {Box, Button, Slider} from '@material-ui/core';

const SortingVisualizer = () => {

    function generateRandomArray() {
        let tempArray = [];
        for (let i = 0; i < length; i++) {
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
                    if (isProcessingRef.current) {
                        queue.shift().cb();
                        processQueue();
                    } else queue = [];
                }, queue[0].delay);
            } else {
                setIsProcessing(false);
                isProcessingRef.current = false;
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
        setIsProcessing(true);
        isProcessingRef.current = true;
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
    }

    function changeLength(event, newLength) {
        setLength(newLength);
    }

    function showText(text) {

        if (!isProcessing) {
            return (
                <div>{text}</div>)
        } else
            return (
                <div className="disabled-text">{text}</div>)
    }

    useEffect(() => {
        let arrayBars = document.getElementsByClassName('array-bar');
        if(array.toString() !== Array(array.length).fill(0).toString()) {
            console.log(array)
            for (let i = 0; i < length; i++) {
                arrayBars[i].style.backgroundColor = 'pink';
            }
        }
    });

    const [length, setLength] = useState(50);
    const [array, setArray] = useState(Array(50).fill(0));
    const [time, setTime] = useState(100);
    const [isProcessing, setIsProcessing] = useState(false);
    const isProcessingRef = useRef(isProcessing);

    function showLength() {
        return `length`;
    }

    function stopExecution() {
        setIsProcessing(false);
        isProcessingRef.current = false;
    }

    function displayArray() {
        return <Box
            sx={{paddingTop: '3%', paddingBottom: '3%', height: '100px', width: '100%'}}>{array.map((value, idx) =>
            <div
                className='array-bar' key={idx} style={{height: `${value}px`, backgroundColor: 'pink'}}/>)}</Box>;
    }

    return (
        <div className="array-container">

            {displayArray()}
            <div>
                <Button disabled={isProcessing} variant="outlined" color="inherit" style={{borderColor: 'pink'}} active
                        onClick={() => generateRandomArray()}>New
                    Array</Button>
                <Button disabled={isProcessing} variant='text' onClick={() => bubbleSortCaller()}> bubble sort</Button>
                <Button disabled={isProcessing} onClick={() => mergeSortCaller()}> merge sort</Button>
                <Button disabled={isProcessing} onClick={() => quickSortCaller()}> quick sort</Button>
                <Button disabled={!isProcessing} onClick={() => stopExecution()}> stop</Button>
                {/*<Button disabled={isProcessing} onClick={() => playExecution()}> stop</Button>*/}
                <Box sx={{width: 200, margin: 'auto'}}>
                    {showText("speed")}
                    <Slider min={1} max={1000} value={time} disabled={isProcessing} track="inverted"
                            onChange={changeTime}
                            aria-labelledby="speed-slider"/>
                    {showText("length")}
                    <Slider min={5} max={50} value={length}
                            disabled={isProcessing}
                            onChange={changeLength}
                            getAriaValueText={showLength}
                            valueLabelDisplay="auto"
                            aria-labelledby="length-slider"/></Box>
            </div>
        </div>
    );
}

export default SortingVisualizer;