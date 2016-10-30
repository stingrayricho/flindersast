var batteryHeatsinkTemp, heatsinkTemp, motorTemp, packAmpHours, packChargeState, packVoltage, rpm, speed;
var xmlhttp;

if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
	xmlhttp = new XMLHttpRequest();
} else {// code for IE6, IE5
	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}



xmlhttp.open("GET", "solar-car.gpx", false);
xmlhttp.send();

var solarCarXml = xmlhttp.responseXML; 
var gpxNode = solarCarXml.getElementsByTagName("gpx")[0];
var trkNode = gpxNode.getElementsByTagName("trk")[0];
var trksegNode = trkNode.getElementsByTagName("trkseg")[0];
var trkptNodes = trksegNode.getElementsByTagName("trkpt");



xmlhttp.open("GET", "speed.xml", false);
xmlhttp.send();

var speedXml = xmlhttp.responseXML;

var speedRootNode = speedXml.getElementsByTagName("root")[0];
var rpmNodes = speedRootNode.getElementsByTagName("rpm");


xmlhttp.open("GET", "temp.xml", false);
xmlhttp.send();

var tempXml = xmlhttp.responseXML;

var tempRootNode = tempXml.getElementsByTagName("root")[0];
var tempRows = tempRootNode.getElementsByTagName("row");

xmlhttp.open("GET", "Telemetry_Battery.xml", false);
xmlhttp.send();

var batteryXml = xmlhttp.responseXML;

var batteryRootNode = batteryXml.getElementsByTagName("root")[0];
var batteryRows = batteryRootNode.getElementsByTagName("row");


for (var i = 0; (i < trkptNodes.length) && (i < tempRows.length) && (i < rpmNodes.length) && (i < batteryRows.length); i++) {
	var trkptNode = trkptNodes[i];
	var extensionsNode = trkptNode.getElementsByTagName("extensions")[0];
	var gpxtpxTrackPointExtensionNode = extensionsNode.getElementsByTagName("gpxtpx:TrackPointExtension")[0];
	speed = parseInt(gpxtpxTrackPointExtensionNode.getElementsByTagName("gpxtpx:speed")[0].childNodes[0].nodeValue) * 3.6;
	document.getElementById("speedometer").innerHTML = speed + " km/h";

	var batteryRow = batteryRows[i];
	packVoltage = parseInt(batteryRow.getElementsByTagName("PackV")[0].childNodes[0].nodeValue);
	packChargeState = parseInt(batteryRow.getElementsByTagName("pack-charge")[0].childNodes[0].nodeValue);
	packAmpHours = parseInt(batteryRow.getElementsByTagName("PackAhr")[0].childNodes[0].nodeValue);

	//var speedRow = rpmNodes[i];
	//rpm = parseInt(speedRow.getElementsByTagName("rps")[0].childNodes[0].nodeValue);
    rpm = 300;

	var tempRow = tempRows[i];
	heatsinkTemp = parseInt(tempRow.getElementsByTagName("Motorcontrolertemp")[0].childNodes[0].nodeValue);
	motorTemp = parseInt(tempRow.getElementsByTagName("Motortemp")[0].childNodes[0].nodeValue);
	batteryHeatsinkTemp = parseInt(tempRow.getElementsByTagName("BatteryHeatsinkTemp")[0].childNodes[0].nodeValue);

	var odo = parseInt(document.getElementById("odometer").childNodes[0].nodeValue.replace(" m", ""));
	document.getElementById("odometer").innerHTML = odo + 1 + " m";
}



google.charts.load('current', { 'packages': ['gauge'] });

google.charts.setOnLoadCallback(drawBatteryHeatsinkTempChart);
google.charts.setOnLoadCallback(drawHeatsinkTempChart);
google.charts.setOnLoadCallback(drawMotorTempChart);
google.charts.setOnLoadCallback(drawPackAmpHoursChart);
google.charts.setOnLoadCallback(drawPackDHBusChart);
google.charts.setOnLoadCallback(drawPackChargeStateChart);
google.charts.setOnLoadCallback(drawPackVoltageChart);
google.charts.setOnLoadCallback(drawRpmChart);
google.charts.setOnLoadCallback(drawSpeedometerChart);


function drawBatteryHeatsinkTempChart() {
    var data = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['Battery C', batteryHeatsinkTemp]
    ]);

    var options = {
        width: 400, height: 150,
        redFrom: 90, redTo: 100,
        yellowFrom: 75, yellowTo: 90,
        minorTicks: 5
    };

    var chart = new google.visualization.Gauge(document.getElementById('batteryHeatsinkTemp'));

    chart.draw(data, options);
}
function drawHeatsinkTempChart() {
    var data = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['Heatsink C', heatsinkTemp]
    ]);

    var options = {
        width: 400, height: 150,
        redFrom: 90, redTo: 100,
        yellowFrom: 75, yellowTo: 90,
        minorTicks: 5
    };

    var chart = new google.visualization.Gauge(document.getElementById('motorControlerTemp'));

    chart.draw(data, options);
}
function drawMotorTempChart() {
    var data = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['Motor C', motorTemp]
    ]);

    var options = {
        width: 400, height: 150,
        redFrom: 90, redTo: 100,
        yellowFrom: 75, yellowTo: 90,
        minorTicks: 5
    };

    var chart = new google.visualization.Gauge(document.getElementById('motorTemp'));

    chart.draw(data, options);
}
function drawPackAmpHoursChart() {
    var data = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['AmpHours', packAmpHours]
    ]);

    var options = {
        width: 400, height: 150,
        redFrom: 400, redTo: 500,
        yellowFrom: 250, yellowTo: 400,
        minorTicks: 5, max:500 
    };

    var chart = new google.visualization.Gauge(document.getElementById('packAmpHours'));

    chart.draw(data, options);
}
function drawPackDHBusChart() {
    var data = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['AmpHours', packAmpHours]
    ]);

    var options = {
        width: 400, height: 150,
        redFrom: 400, redTo: 500,
        yellowFrom: 250, yellowTo: 400,
        minorTicks: 5, max:500 
    };

    var chart = new google.visualization.Gauge(document.getElementById('packDHBus'));

    chart.draw(data, options);
}
function drawPackChargeStateChart() {
    var data = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['Charge %', packChargeState]
    ]);

    var options = {
        width: 400, height: 150,
        redFrom: 0, redTo: 10,
        yellowFrom: 10, yellowTo: 40,
        minorTicks: 5
    };

    var chart = new google.visualization.Gauge(document.getElementById('packChargeState'));

    chart.draw(data, options);
}
function drawPackVoltageChart() {
    var data = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['Voltage V', packVoltage]
    ]);

    var options = {
        width: 400, height: 150,
        redFrom: 400, redTo: 500,
        yellowFrom: 250, yellowTo: 400,
        minorTicks: 5, max:500 
    };

    var chart = new google.visualization.Gauge(document.getElementById('packVoltage'));

    chart.draw(data, options);
}
function drawRpmChart() {
    var data = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['RPM', rpm]
    ]);

    var options = {
        width: 400, height: 150,
        redFrom: 90, redTo: 100,
        yellowFrom: 75, yellowTo: 90,
        minorTicks: 5
    };

    var chart = new google.visualization.Gauge(document.getElementById('rpm'));

    chart.draw(data, options);
}

function drawSpeedometerChart() {

	var data = google.visualization.arrayToDataTable([
	  ['Label', 'Value'],
	  ['Velocity m/s', speed]
	]);

	var options = {
	  width: 800, height: 260,
	  redFrom: 90, redTo: 100,
	  yellowFrom:75, yellowTo: 90,
	  minorTicks: 5
	};

	var chart = new google.visualization.Gauge(document.getElementById('speedometer'));

	chart.draw(data, options);

}