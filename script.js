var osmMap = L.tileLayer.provider('OpenStreetMap.Mapnik');
var stamenMap = L.tileLayer.provider('Stamen.Watercolor');
var imageryMap = L.tileLayer.provider('Esri.WorldImagery');

var baseMaps = {
  OSM: osmMap,
  'Stamen Watercolor': stamenMap,
  'World Imagery': imageryMap
}

var map = L.map('map', {
    center: [-37.81235647148989, 144.9582427740097], //144.9582427740097,-37.81235647148989
    zoom:15,
    worldCopyJump: false,
    layers:[osmMap]
});

// var mapLayers = L.control.layers(baseMaps).addTo(map);



//print map
var browserControl = L.control.browserPrint().addTo(map);
//End of print map




function onEachFeature(feature, layer)
{
    layer.on({
        click: function populate()
        {
            document.getElementById('info').innerHTML = '<p><b>Name: </b>'+feature.properties.Name+'</p>';
        }
    });
}

function selectionMade(e) {
          // Check for selected
          if (selected) {
            // Reset selected to default style
            e.target.resetStyle(selected)
          }
          // Assign new selected
          selected = e.layer
          // Bring selected to front
          selected.bringToFront()
          // Style selected
          selected.setStyle({
            'color': 'yellow'
          })
        }

// Area of Interest
var polygon_aoi = json_aoi;
var selected
var layer_aoi = new L.GeoJSON(polygon_aoi, {
                                              onEachFeature: onEachFeature
                                            });

// map.addLayer(layer_aoi);
// End of Area of Interest

// Path from Melbourne Central Station to RMIT university
var line_mc_to_rmit = json_mc_to_rmit;
var selected
var layer_mc_to_rmit = new L.GeoJSON(line_mc_to_rmit, {
                                                        onEachFeature: onEachFeature
                                                      }).on('click', selectionMade);


map.addLayer(layer_mc_to_rmit);
// End of Path from Melbourne Central Station to RMIT university

// Path from Southern Cross Station to Flaggstaff Gardens
var line_sc_to_fg = json_sc_to_fg;
var selected
var layer_sc_to_fg = new L.GeoJSON(line_sc_to_fg, {
                                         onEachFeature: onEachFeature
                                       }).on('click', selectionMade);

map.addLayer(layer_sc_to_fg);
// End Path from Southern Cross Station to Flaggstaff Gardens


// Southern Cross Station
var point_sc = json_sc;
var selected
var layer_sc = new L.GeoJSON(point_sc, {
                                         onEachFeature: onEachFeature
                                       }).on('click', selectionMade);
map.addLayer(layer_sc);
// End of Southern Cross Station


// Melbourne Central
var point_mc = json_mc;
var selected
var layer_mc = new L.GeoJSON(point_mc, {
                                         onEachFeature: onEachFeature
                                       }).on('click', selectionMade);
map.addLayer(layer_mc);
// End of Melbourne Central



// RMIT
var polygon_rmit = json_rmit;
var selected
var layer_rmit = new L.GeoJSON(polygon_rmit, {
                                                onEachFeature: onEachFeature
                                              }).on('click', selectionMade);

map.addLayer(layer_rmit);
// End of RMIT

// Flagstaff Gardens
var polygon_fg = json_fg;
var selected
var layer_fg = new L.GeoJSON(polygon_fg, { onEachFeature: onEachFeature
                                                }).on('click', selectionMade);

map.addLayer(layer_fg);
// End of Flagstaff Gardens

var overlayMaps = {
                    "Southern Cross": layer_sc,
                    "Path SC to FG": layer_sc_to_fg,
                    "Flagstaff Gardens": layer_fg,

                    "RMIT Unviersity": layer_rmit,
                    "Path MC to RMIT": layer_mc_to_rmit,
                    "Melbourne Central": layer_mc,

                    "Area of Interest": layer_aoi,
                  };
var layerControl = L.control.layers(baseMaps, overlayMaps, {collapsed:false}).addTo(map);
