<html>
<head>
    <script type="text/javascript">
        google.charts.load('current', {'packages':['bar']});
        google.charts.setOnLoadCallback(drawStuff);

        function drawStuff() {
            var data = new google.visualization.arrayToDataTable([
                ['Move', 'Percentage'],
                    @if($data)
                        @foreach($data as $list)
                            @if(strtolower($list['sexo']) == 'masculino')
                                ['Masculino', {{$list['total']}}],
                            @else
                                ['Femenino',{{$list['total']}}],
                            @endif
                        @endforeach
                    @endif
            ]);

            var options = {
                width: 300,
                legend: { position: 'none' },
                chart: {
                    title: 'Sexos' },
                axes: {
                    x: {
                        0: { side: 'top', label: ''} // Top x-axis.
                    }
                },
                bar: { groupWidth: "90%" }
            };

            var chart = new google.charts.Bar(document.getElementById('top_x_div'));
            // Convert the Classic options to Material options.
            chart.draw(data, google.charts.Bar.convertOptions(options));
        };
    </script>
</head>
<body>
@if($data)
    <div id="top_x_div" style="width: 500px; height: 200px;"></div>
@else
    No se encontraron resultados...
@endif
</body>
</html>