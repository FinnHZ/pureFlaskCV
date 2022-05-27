function calendarPart(startDate, endDate, dateRange, detailData, totalData){
    let appdays_refresh = {};
    let chartDom_days_refresh = document.getElementById('chartDaysYields');
    let myChart_days_refresh = echarts.init(chartDom_days_refresh);
    let option_days_refresh;

    const cellSize = [80, 80];            /////////////////////
    const pieRadius = 30;                 ////////////////////
    function getVirtulData() {
        let date_days = +echarts.number.parseDate(startDate);   //////////waitting for change
        let end_days = +echarts.number.parseDate(endDate);    //////////////waitting for change
        let dayTime_days = 3600 * 24 * 1000;
        let data_days = [];
        let timesFlag = 0;
        for (let time = date_days; time < end_days; time += dayTime_days) {
            data_days.push([
            echarts.format.formatTime('yyyy-MM-dd', time),
            totalData[timesFlag]
            // Math.floor(Math.random() * 10000)                         ///////// need to be changed or deleted
            ]);
            timesFlag += 1;
        }
        return data_days;
    }

    function getPieSeries(scatterData, chart) {
    return scatterData.map(function (item, index) {
        var center = chart.convertToPixel('calendar', item);
        return {
        id: index + 'pie',
        type: 'pie',
        center: center,
        label: {
            formatter: '{c}',
            position: 'inside'
        },
        radius: pieRadius,
        data: detailData[index]
        };
    });
    }
    function getPieSeriesUpdate(scatterData, chart) {
    return scatterData.map(function (item, index) {
        var center = chart.convertToPixel('calendar', item);
        return {
        id: index + 'pie',
        center: center
        };
    });
    }
    var scatterData = getVirtulData();
    option_days_refresh = {
        title: {
            bottom:0,
            right:10,
            text: dateRange
        },
        tooltip: {},
        toolbox: {
            bottom:0,
            right:100,
            feature: {
            // dataView: { show: true, readOnly: false },
            // magicType: { show: true, type: ['line', 'bar'] },
            // restore: { show: true },
            saveAsImage: { show: true }
            }
        },
        legend: {
            data: ['Work', 'Entertainment', 'Sleep'],
            bottom: 20
        },
        calendar: {
            top: 'middle',
            left: 'center',
            orient: 'vertical',
            cellSize: cellSize,
            yearLabel: {
            show: false,
            fontSize: 30
            },
            dayLabel: {
            margin: 20,
            firstDay: 1,
            nameMap: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            monthLabel: {
            show: false
            },
            range: [dateRange]                 //////////////waitting for change
        },
        series: [
            {
            id: 'label',
            type: 'scatter',
            coordinateSystem: 'calendar',
            symbolSize: 1,
            label: {
                show: true,
                formatter: function (params) {
                return echarts.format.formatTime('dd', params.value[0]);
                },
                offset: [-cellSize[0] / 2 + 10, -cellSize[1] / 2 + 10],
                fontSize: 14
            },
            data: scatterData
            }
        ]
    };
    let pieInitialized;
    setTimeout(function () {
    pieInitialized = true;
    myChart_days_refresh.setOption({
        series: getPieSeries(scatterData, myChart_days_refresh)
    });
    }, 10);
    appdays_refresh.onresize = function () {
    if (pieInitialized) {
        myChart_days_refresh.setOption({
        series: getPieSeriesUpdate(scatterData, myChart_days_refresh)
        });
    }
    };

    option_days_refresh && myChart_days_refresh.setOption(option_days_refresh);
};



function monthLinePart(yearNum, passNum, failNum, passRate){
    let chartDom_monthly_refresh = document.getElementById('chartMonthsYields');
    let myChart_monthly_refresh = echarts.init(chartDom_monthly_refresh);
    let option_monthly_refresh;
    let yearNum_str = yearNum;

    option_monthly_refresh = {
        title: {
            bottom:0,
            right:30,
            text: yearNum_str
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999'
            }
            }
        },
        toolbox: {
            bottom:0,
            right:100,
            feature: {
            dataView: { show: true, readOnly: false },
            // magicType: { show: true, type: ['line', 'bar'] },
            // restore: { show: true },
            saveAsImage: { show: true }
            }
        },
        legend: {
            top:0,
            data: ['Pass', 'Fail', 'Passing Rate']
        },
        xAxis: [
            {
                type: 'category',
                data: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
                axisPointer: {
                    type: 'shadow'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: 'Number',
                // min: 0,        //////////wait for calculate based on dynamic data
                // max: 250,        //////////wait for calculate based on dynamic data
                // interval: 1,        //////////wait for calculate based on dynamic data
                axisLabel: {
                    formatter: '{value} p'
                }
            },
            {
                type: 'value',
                name: 'Rate',
                // min: 0,        //////////wait for calculate based on dynamic data
                // max: 25,        //////////wait for calculate based on dynamic data            
                // interval: 5,         //////////wait for calculate based on dynamic data
                axisLabel: {
                    formatter: '{value} %'
                }
            }
        ],
        series: [
            {
                name: 'Pass',
                type: 'bar',
                data:passNum            ///////////////////
            },
            {
                name: 'Fail',
                type: 'bar',
                data:failNum               ///////////////////
            },
            {
                name: 'Passing Rate',
                type: 'line',
                yAxisIndex: 1,
                data: passRate               ///////////////////
            }
        ]
    };

    option_monthly_refresh && myChart_monthly_refresh.setOption(option_monthly_refresh);

}

function aLabelConfirm(url){
    if(confirm("Are you sure you want to modify account information? That will lose the recording information and stop the uploading work!")){
        location.href = url
    }
}