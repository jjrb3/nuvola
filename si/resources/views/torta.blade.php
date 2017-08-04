<html>
<head>
    <script type="text/javascript">
        google.charts.load("current", {packages:["corechart"]});
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            var data = google.visualization.arrayToDataTable([
                ['Task', 'Hours per Day'],
                    @if($data)
                        @foreach($data as $list)
                            @if($list['estado'] == 1)
                                ['Activos', {{$list['total']}}],
                            @else
                                ['Inactivos',{{$list['total']}}],
                            @endif
                        @endforeach
                    @endif
            ]);

            var options = {
                title: 'Estados de los clientes',
                is3D: true,
            };

            var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
            chart.draw(data, options);
        }
    </script>
</head>
<body>
@if($data)
    <div id="piechart_3d" style="width: 500px; height: 200px;"></div>
@else
    No se encontraron resultados...
@endif
</body>
</html>