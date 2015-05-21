google.load('visualization', '1', {packages: ['corechart', 'line']});
google.setOnLoadCallback(drawChart);

var raw_rows = [
    [new Date('2014-01-20'), 2.115, 26.756, null, null],
    [new Date('2014-02-18'), 1.898, null,   null, null],
    [new Date('2014-02-21'), 1.830, null,   null, null],
    [new Date('2014-02-28'), 1.941, null,   null, null],
    [new Date('2014-03-07'), 1.906, null,   null, null],
    [new Date('2014-03-14'), 1.941, null,   null, null],
    [new Date('2014-03-21'), 1.941, null,   null, null],
    [new Date('2014-03-28'), 1.821, null,   null, null],
    [new Date('2014-04-04'), 1.571, 23.676, null, null],
    [new Date('2014-04-11'), 1.559, 22.592, null, null],
    [new Date('2014-04-18'), 1.515, 21.503, null, null],
    [new Date('2014-04-25'), 1.492, 20.857, null, null],
    [new Date('2014-05-05'), 1.414, 18.957, null, null],
    [new Date('2014-05-18'), 1.490, 18.913, null, null],
    [new Date('2014-05-26'), 1.432, 18.245, null, null],
    [new Date('2014-06-03'), 1.492, 17.403, null, null],
    [new Date('2014-06-09'), 1.497, 16.540, null, null],
    [new Date('2014-06-30'), 1.412, 15.940, null, null],
    [new Date('2014-07-09'), 1.367, 15.850, null, null],
    [new Date('2014-07-14'), 1.407, 14.810, "Zeev's blog", '<img src="img/zeevsblog.png" />'],
    [new Date('2014-08-15'), 1.350, 14.864, null, null],
    [new Date('2014-09-02'), 1.302, 14.150, null, null],
    [new Date('2014-10-07'), 1.219, 13.890, 'ZendCon 2014', '<img src="img/zendcon2014.png" />'],
    [new Date('2014-11-21'), 1.201, 13.430, null, null],
    [new Date('2014-12-31'), 1.159, 12.629, null, null],
    [new Date('2015-03-19'), 0.837, 11.756, 'Fluent 2015', '<img src="img/rasmus2015.png" />'],
    [new Date('2015-04-30'), 0.777, 11.081, null, null]
];

function drawChart(content) {
    if (typeof content === 'undefined') content = 'wordpress';

    var data = new google.visualization.DataTable();
    data.addColumn('date', 'date');
    data.addColumn('number', 'PHP 5.6 (estimated)');
    data.addColumn('number', 'PHP 7');
    data.addColumn({type:'string', role:'annotation'});
    data.addColumn({type:'string', role:'annotationText', p: {html: true}});

    var rows, title;
    if (content == 'bench.php') {
	rows = raw_rows.map(function(arr){return [arr[0], 1.85, arr[1], arr[3], arr[4]];});
	title = 'bench.php';
    } else {
	rows = raw_rows.map(function(arr){return [arr[0], 23.6, arr[2], arr[3], arr[4]];});
	title = 'WordPress-3.6.0 Home Page (x1000)';
    }
    rows = rows.filter(function(arr){return arr[2] != null;});

    data.addRows(rows);

    var options = {
	title: title,
	titleTextStyle: { fontSize: 32 },

	pointSize:7,
	vAxis: {title: 'sec', minValue:0, minorGridlines: {count: 4} },
	hAxis: {format: 'yyyy-MM', minorGridlines: {count:2} },

	width: 1000,
	height: 500,

	tooltip: {
            isHtml: true
	}

	/*    tooltip: {trigger: 'selection'},*/
    };

    var chart = new google.visualization.LineChart(document.getElementById('chart'));
    chart.draw(data, options);
}

$(window).load(function() {
    // select third list item
    $("li:first").addClass("active");

    // dynamically activate list items when clicked
    $(".nav.nav-pills li").on("click",function(){
	$(".nav.nav-pills li").removeClass("active");
	drawChart($(this).text());
	$(this).addClass("active");
    });
});
