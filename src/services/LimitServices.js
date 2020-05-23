export const LimitServices = {
    limitFromTwo,
    sortTopLivesInEvents,
    abbreviateIntToReadableString
}

/* Its for limiting events based on lives */
function limitFromTwo(data, from, to, type) {
    let newDataSet = []
    for (let i = 0; i <= data.length - 1; i++) {
        if (data[i][type] >= from && data[i][type] <= to) {
            newDataSet.push(data[i]);
        }
    }
    newDataSet = mergeSort(newDataSet, type).reverse()
    return newDataSet;
}

function sortTopLivesInEvents(data, type, slicesort) {
    let lives = mergeSort(data, type);
    lives.reverse();
    return lives.slice(0, slicesort)
}


function mergeSort(arr, type) {
    let len = arr.length;
    if (len < 2)
        return arr;
    let mid = Math.floor(len / 2),
        left = arr.slice(0, mid),
        right = arr.slice(mid);
    return merge(mergeSort(left, type), mergeSort(right, type), type);
}

function merge(left, right, type) {
    let result = [],
        lLen = left.length,
        rLen = right.length,
        l = 0,
        r = 0;
    while (l < lLen && r < rLen) {
        if (left[l][type] < right[r][type]) {
            result.push(left[l++]);
        }
        else {
            result.push(right[r++]);
        }
    }
    return result.concat(left.slice(l)).concat(right.slice(r));
}


/* Abbreviate numbers */
function abbreviateIntToReadableString(value) {
    var suffixes = ["", "K", "M", "B", "T"];
    var suffixNum = Math.floor(("" + value).length / 3);
    var shortValue = parseFloat((suffixNum !== 0 ? (value / Math.pow(1000, suffixNum)) : value).toPrecision(2));
    if (shortValue % 10 !== 0) {
        shortValue = shortValue.toFixed(1);
    }
    return shortValue + suffixes[suffixNum];
}