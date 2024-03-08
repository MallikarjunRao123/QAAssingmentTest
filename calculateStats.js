const {
    readJSONSync,
    writeJSON
} = require('./jsonFileUtils');

const inputData = readJSONSync('heartrate.json');

function calculateStatsForDate(measurements) {
    const beatsPerMinuteArray = measurements.map(item => item.beatsPerMinute);
    const min = Math.min(...beatsPerMinuteArray);
    const max = Math.max(...beatsPerMinuteArray);
    const median = calculateMedian(beatsPerMinuteArray);

    const latestDataTimestamp = measurements.reduce((latest, current) => {
        return current.timestamps.startTime > latest ? current.timestamps.startTime : latest;
    }, measurements[0].timestamps.startTime);

    return {
        min: min,
        max: max,
        median: median,
        latestDataTimestamp: latestDataTimestamp
    };
}

function calculateMedian(beatsPerMinuteArray) {
    const sortedBPM = beatsPerMinuteArray.sort((a, b) => a - b);
    const median = sortedBPM.length % 2 === 0 ?
        (sortedBPM[sortedBPM.length / 2 - 1] + sortedBPM[sortedBPM.length / 2]) / 2 :
        sortedBPM[Math.floor(sortedBPM.length / 2)];

    return median;
}

function groupDataByDate(data) {
    return data.reduce((acc, current) => {
        const date = current.timestamps.startTime.split('T')[0];
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(current);
        return acc;
    }, {});
}



function calculateStatistics(data) {
    const results = [];
    const groupedByDate = groupDataByDate(data);

    for (const date in groupedByDate) {
        const measurements = groupedByDate[date];
        const stats = calculateStatsForDate(measurements);

        results.push({
            date: date,
            ...stats
        });
    }

    return results;
}


const outputData = calculateStatistics(inputData);
writeJSON('output.json', outputData);