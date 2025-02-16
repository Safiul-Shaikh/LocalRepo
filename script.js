let bars = [];
let speed = 100;

document.addEventListener("DOMContentLoaded", generateArray);

function generateArray() {
    const container = document.querySelector(".array-container");
    container.innerHTML = "";
    bars = [];

    for (let i = 0; i < 30; i++) {
        let value = Math.floor(Math.random() * 300) + 50;
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${value}px`;
        bars.push(bar);
        container.appendChild(bar);
    }
}

function updateSpeed() {
    speed = document.getElementById("speed").value;
}

// Bubble Sort
async function bubbleSort() {
    for (let i = 0; i < bars.length - 1; i++) {
        for (let j = 0; j < bars.length - i - 1; j++) {
            if (parseInt(bars[j].style.height) > parseInt(bars[j + 1].style.height)) {
                await swap(j, j + 1);
            }
        }
    }
    highlightSorted();
}

// Quick Sort
async function quickSort(left, right) {
    if (left < right) {
        let pivotIndex = await partition(left, right);
        await quickSort(left, pivotIndex - 1);
        await quickSort(pivotIndex + 1, right);
    }
    highlightSorted();
}

async function partition(left, right) {
    let pivot = parseInt(bars[right].style.height);
    let i = left - 1;

    for (let j = left; j < right; j++) {
        if (parseInt(bars[j].style.height) < pivot) {
            i++;
            await swap(i, j);
        }
    }
    await swap(i + 1, right);
    return i + 1;
}

// Merge Sort
async function mergeSort(left, right) {
    if (left < right) {
        let mid = Math.floor((left + right) / 2);
        await mergeSort(left, mid);
        await mergeSort(mid + 1, right);
        await merge(left, mid, right);
    }
    highlightSorted();
}

async function mergeSort(left, right) {
    if (left < right) {
        let mid = Math.floor((left + right) / 2);
        await mergeSort(left, mid);
        await mergeSort(mid + 1, right);
        await merge(left, mid, right);
    }
    if (left === 0 && right === bars.length - 1) {
        highlightSorted();
    }
}

async function merge(left, mid, right) {
    let leftHeights = [];
    let rightHeights = [];

    for (let i = left; i <= mid; i++) {
        leftHeights.push(parseInt(bars[i].style.height));
    }
    for (let j = mid + 1; j <= right; j++) {
        rightHeights.push(parseInt(bars[j].style.height));
    }

    let i = 0, j = 0, k = left;

    while (i < leftHeights.length && j < rightHeights.length) {
        if (leftHeights[i] < rightHeights[j]) {
            bars[k].style.height = `${leftHeights[i]}px`;
            i++;
        } else {
            bars[k].style.height = `${rightHeights[j]}px`;
            j++;
        }
        k++;
        await sleep(speed);
    }

    while (i < leftHeights.length) {
        bars[k].style.height = `${leftHeights[i]}px`;
        i++;
        k++;
        await sleep(speed);
    }

    while (j < rightHeights.length) {
        bars[k].style.height = `${rightHeights[j]}px`;
        j++;
        k++;
        await sleep(speed);
    }
}

// Selection Sort
async function selectionSort() {
    for (let i = 0; i < bars.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < bars.length; j++) {
            if (parseInt(bars[j].style.height) < parseInt(bars[minIndex].style.height)) {
                minIndex = j;
            }
        }
        await swap(i, minIndex);
    }
    highlightSorted();
}

// Insertion Sort
async function insertionSort() {
    for (let i = 1; i < bars.length; i++) {
        let key = bars[i].style.height;
        let j = i - 1;

        while (j >= 0 && parseInt(bars[j].style.height) > parseInt(key)) {
            bars[j + 1].style.height = bars[j].style.height;
            await sleep(speed);
            j--;
        }
        bars[j + 1].style.height = key;
        await sleep(speed);
    }
    highlightSorted();
}

// Swap with GSAP animation
async function swap(i, j) {
    let tempHeight = bars[i].style.height;

    gsap.to(bars[i], { height: bars[j].style.height, background: "red", duration: speed / 1000 });
    gsap.to(bars[j], { height: tempHeight, background: "red", duration: speed / 1000 });

    await sleep(speed);

    gsap.to(bars[i], { background: "" });
    gsap.to(bars[j], { background: "" });
}

// Highlight sorted elements
function highlightSorted() {
    bars.forEach((bar) => {
        gsap.to(bar, { background: "#f1c40f", duration: 0.5 });
    });
}

// Sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
