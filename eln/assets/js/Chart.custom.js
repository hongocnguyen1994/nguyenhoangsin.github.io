'use strict';
var options = {
    maintainAspectRatio: false,
    elements: {
        line: {
            tension: 0.000001
        }
    },
    // scales: {
    //     yAxes: [{
    //         stacked: true
    //     }]
    // },
};

// Biểu đồ 1
var data0 = {
    labels: [0,20,40,60,80,100,120,140],
    datasets: [{
        label: 'Tỉ lệ đúng / Bài kiểm tra',
        data: [0,97,48,83,100,58,76,60],
        backgroundColor: 'rgba(247,251,254,0.7)',
        borderColor: '#539fe0',
    },
    {
        label: 'Tỉ lệ đúng tối đa',
        data: [100],
        backgroundColor: 'rgba(247,251,254,0.7)',
        borderColor: '#539fe0',
    }
    ]
};

var chart = new Chart('chart-0', {
    type: 'line',
    data: data0,
    options: options
});

// Biểu đồ 2
var data1 = {
    labels: [0,20,40,60,80,100,120,140],
    datasets: [{
        label: 'Tỉ lệ đúng / Bài kiểm tra',
        data: [0,70,50,85,60,58,72,60],
        backgroundColor: 'rgba(247,251,254,0.7)',
        borderColor: '#539fe0',
    },
    {
        label: 'Tỉ lệ đúng tối đa',
        data: [100],
        backgroundColor: 'rgba(247,251,254,0.7)',
        borderColor: '#539fe0',
    }
    ]
};

var chart = new Chart('chart-1', {
    type: 'line',
    data: data1,
    options: options
});