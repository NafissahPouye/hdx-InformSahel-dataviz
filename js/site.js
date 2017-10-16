function generateringComponent(vardata, vargeodata){

  var lookup = genLookup(vargeodata) ;

  var Imap = dc.leafletChoroplethChart('#MapInform');
  var dataTab1 = dc.dataTable('#dataTable1');
  var dataTab2 = dc.dataTable('#dataTable2');
  var cf = crossfilter(vardata) ;
  var all = cf.groupAll();
  var mapDimension = cf.dimension(function(d) { return d.rowcacode1});
  var mapGroup = mapDimension.group().reduceSum(function(d){ return d.RISK});

dc.dataCount('#count-info')
  .dimension(cf)
  .group(all);

         Imap.width(400)
             .height(400)
             .dimension(mapDimension)
             .group(mapGroup)
             .label(function (p) { return p.key; })
             .renderTitle(true)
             .center([0,0])
             .zoom(0)
             .geojson(vargeodata)
             .colors(['#DDDDDD','#FFC8BF','#F59181', '#FE5A43', '#921301', '#620D00'])
             .colorDomain([0,4])
             .colorAccessor(function (d){
              var c = 0
               if (d>6.7) {
                 c = 5;
               } else if (d>5.7) {
                    c = 4;
               } else if (d>4.8){
                  c = 3;
              } else if (d>3.8) {
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

//dataTable 2016
dataTab2
        .size(600)
        .width(50)
        //.height(100)
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
                return d.Food_Insecurity_Probability;
                },
                 function (d) {
                return d.Physical_exposure_to_flood;
                },
                 function (d) {
                return d.Land_Degradation;
                },
                 function (d) {
                return d.Droughts_probability_and_historical_impact;
                },
                function (d) {
                return d.Natural;
                },
                function (d) {
                return d.Political_violence;
                },
                function (d) {
                return d.Conflict_probability;
                },
                function (d) {
                return d.Human;
                },
                function (d) {
                return d.HAZARD;
                },
                function (d) {
                return d.Development_Deprivation;
                },
                function (d) {
                return d.Inequality;
                },
                function (d) {
                return d.Aid_Dependency;
                },
                function (d) {
                return d.Socio_Economic_Vulnerability;
                },
                function (d) {
                return d.Uprooted_people;
                },
                function (d) {
                return d.Health_Conditions;
                },
                function (d) {
                return d.Children_U5;
                },
                function (d) {
                return d.Malnutrition;
                },
                function (d) {
                return d.Recent_Shocks;
                },
                function (d) {
                return d.Food_Security;
                },
                function (d) {
                return d.Other_Vulnerable_Groups;
                },
                function (d) {
                return d.Vulnerable_Groups;
                },
                function (d) {
                return d.VULNERABILITY;
                },
                function (d) {
                return d.DRR;
                },
                function (d) {
                return d.Governance;
                },
                function (d) {
                return d.Institutional;
                },
                function (d) {
                return d.Communication;
                },
                function (d) {
                return d.Physical_infrastructure;
                },
                function (d) {
                return d.Access_to_health_care;
                },
                function (d) {
                return d.Infrastructure;
                },
                function (d) {
                return d.LACK_OF_COPING_CAPACITY;
                },
                 function (d) {
                return d.RISK;
                }
                                               ]);

         dataTab1.renderlet(function (chart) {
                    chart.selectAll('#dataTable1')
                       // .style("text-anchor", "end")
                        //.attr('dx', '0')
                      
                        .attr('transform', "rotate(-85)");
                });

//dataTable 2
dataTab1
        .size(100)
        //.height(50)
        .width(10)
        .dimension(mapDimension)
        .group(function (d) {
            return d.mapGroup;
        })

        //.title(2017)
        .columns([
                    function (d) {
                return d.COUNTRY;
                },

                    function (d) {
                return d.ADMIN1;
                },
                        
                  function (d) {
                return d.Food_Insecurity_Probability_2016;
                },
                 function (d) {
                return d.Physical_exposure_to_flood_2016;
                },
                 function (d) {
                return d.Land_Degradation_2016;
                },
                 function (d) {
                return d.Droughts_probability_and_historical_impact_2016;
                },
                function (d) {
                return d.Natural_2016;
                },
                function (d) {
                return d.Political_violence_2016;
                },
                function (d) {
                return d.Conflict_probability_2016;
                },
                function (d) {
                return d.Human_2016;
                },
                function (d) {
                return d.HAZARD_2016;
                },
                function (d) {
                return d.Development_Deprivation_2016;
                },
                function (d) {
                return d.Inequality_2016;
                },
                function (d) {
                return d.Aid_Dependency_2016;
                },
                function (d) {
                return d.Socio_Economic_Vulnerability_2016;
                },
                function (d) {
                return d.Uprooted_people_2016;
                },
                function (d) {
                return d.Health_Conditions_2016;
                },
                function (d) {
                return d.Children_U5_2016;
                },
                function (d) {
                return d.Malnutrition_2016;
                },
                function (d) {
                return d.Recent_Shocks_2016;
                },
                
                function (d) {
                return d.Food_Security_2016;
                },
                function (d) {
                return d.Other_Vulnerable_Groups_2016;
                },
                function (d) {
                return d.Vulnerable_Groups_2016;
                },
                function (d) {
                return d.VULNERABILITY_2016;
                },
                function (d) {
                return d.DRR_2016;
                },
                function (d) {
                return d.Governance_2016;
                },
                function (d) {
                return d.Institutional_2016;
                },
                function (d) {
                return d.Communication_2016;
                },
                function (d) {
                return d.Physical_infrastructure_2016;
                },
                function (d) {
                return d.Access_to_health_care_2016;
                },
                function (d) {
                return d.Infrastructure_2016;
                },
                function (d) {
                return d.LACK_OF_COPING_CAPACITY_2016;
                },
                function (d) {
                return d.RISK_2016;
                }
])
     Winheight = $(window).height();
     $("#MapInform").css("height",((Winheight/2)+83));
     $("#MapInform").css("background-color","#FFFFFF");
      
      dc.renderAll();

      var map = Imap.map({ 
        /*maxZoom: 5,
        minZoom: 3*/
      });

      zoomToGeom(vargeodata);
      function zoomToGeom(geodata){
        var bounds = d3.geo.bounds(geodata) ;
        map.fitBounds([[bounds[0][1],bounds[0][0]],[bounds[1][1],bounds[1][0]]])
            .setZoom(5)
            .setView([9.80, 10.37], 4);
      }
     var legend = L.control({position: 'topright'});

    legend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legend'),
            labels = ['75 - 90','90 - 110','110 - 150 ','150+', "200"];
            colors =['#DDDDDD','#ffe6e3','#e85945', '#911200', '#730d00'];

        div.innerHTML = '<br />Légende<br />';
        for (var i = 0; i < labels.length; i++) {
            div.innerHTML +=
                '<i style="background:' + colors[i] + '"></i> ' + labels[4-i] +'<br />';

        }

        return div;
    };
     

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
    url: 'data/InformData2.json',
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
