function generateringComponent(vardata, vargeodata){

  var lookup = genLookup(vargeodata) ;

  var Imap = dc.leafletChoroplethChart('#MapInform');
  var datatabGraph = dc.dataTable('#dataTable1');
  var cf = crossfilter(vardata) ;
  var all = cf.groupAll();

  
  var mapDimension = cf.dimension(function(d) { return d.rowcacode1});
  var mapGroup = mapDimension.group().reduceSum(function(d){ return d.RISK});

dc.dataCount('#count-info')
  .dimension(cf)
  .group(all);

  Imap.width(700)
             .height(450)
             .dimension(mapDimension)
             .group(mapGroup)
             .center([0,0])
             .zoom(0)
             .geojson(vargeodata)
             .colors(['#CCCCCC','#03a9f4','#DDDDDD','#ffeda0','#f7fcb9'])
             .colorDomain([0,4])
             .colorAccessor(function (d){
              var c = 0
               if (d>6) {
                 c = 4;
               } else if (d>4) {
                    c = 3;
               } else if (d>2){
                  c = 2;
              } else if (d>0) {
                c = 1;
              }
               return c

    })
    
             .featureKeyAccessor(function (feature){
               return feature.properties['rowcacode1'];
             }).popup(function (d){
               return d.properties['ADM1_NAME'];
             })
             .renderPopup(true)
             .featureOptions({
                'fillColor': 'gray',
                'color': 'gray',
                'opacity':0.8,
                'fillOpacity': 0.1,
                'weight': 1
            });
     //datatable
    datatabGraph
        .width(400)
        .height(800)
        .dimension(mapDimension)
        .group(function (d) {
            return d.mapGroup;
        })
        .columns([
                    function (d) {
                return d.COUNTRY;
                },

                    function (d) {
                return d.ADMIN1;
                },
                        function (d) {
                return d.RISK;
                },
                 function (d) {
                return d.Food_Insecurity_Probability;
                },
                 function (d) {
                return d.Physical_exposure_to_flood;
                },
                 function (d) {
                return d.Land_Degradation;
                },

                                   ])
        .sortBy(function (d) {
            return [d.COUNTRY, d.ADMIN1, d.RISK, d.Food_Insecurity_Probability, d.Physical_exposure_to_flood, d.Land_Degradation];
            // return d[config.whoFieldName];
        });

      dc.renderAll();

      var map = Imap.map();

      zoomToGeom(vargeodata);

      function zoomToGeom(geodata){
        var bounds = d3.geo.bounds(geodata) ;
        map.fitBounds([[bounds[0][1],bounds[0][0]],[bounds[1][1],bounds[1][0]]]);
      }

      function genLookup(geojson) {
        var lookup = {} ;
        geojson.features.forEach(function (e) {
          lookup[e.properties['rowcacode1']] = String(e.properties['ADM1_NAME']);
        });
        return lookup ;
      }
}

var dataCall = $.ajax({
    type: 'GET',
    url: 'data/InformData.json',
    dataType: 'json',
});

var geomCall = $.ajax({
    type: 'GET',
    url: 'data/sahel.geojson',
    dataType: 'json',
});


$.when(dataCall, geomCall).then(function(dataArgs, geomArgs){
    var geom = geomArgs[0];
    geom.features.forEach(function(e){
        e.properties['rowcacode1'] = String(e.properties['rowcacode1']);
    });
    generateringComponent(dataArgs[0],geom);
});
