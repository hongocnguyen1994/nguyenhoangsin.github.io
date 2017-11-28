'use strict';
var data = {
    labels: ['1', '2', '3', '4'],
    datasets: [{
        label: 'Tỉ lệ đúng / Bài kiểm tra',
        data: [80, 20, 50, 40],
        backgroundColor: 'rgba(247,251,254,0.7)',
        borderColor: '#539fe0',
    }]
};

var options = {
    maintainAspectRatio: false,
    elements: {
        line: {
            tension: 0.000001
        }
    },
    scales: {
        yAxes: [{
            stacked: true
        }]
    },
};

var chart = new Chart('chart-0', {
    type: 'line',
    data: data,
    options: options
});

var chart = new Chart('chart-1', {
    type: 'line',
    data: {
        labels: ['1', '2', '3', '4','5'],
        datasets: [{
            label: 'Tỉ lệ đúng / Bài kiểm tra',
            data: [40, 20, 44, 90, 65],
            backgroundColor: 'rgba(247,251,254,0.7)',
            borderColor: '#539fe0',
        }]
    },
    options: {
        maintainAspectRatio: false,
        elements: {
            line: {
                tension: 0.000001
            }
        },
        scales: {
            yAxes: [{
                stacked: true
            }]
        },
    }
});

