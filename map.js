const mapInitialPosition = [20, 30]
const map = L.map('map', {
  center: mapInitialPosition,
  zoom: 3,
  maxZoom: 10,
  minZoom: 0,
  zoomControl: false,
  attributionControl: false,
  dragging: false,
  scrollWheelZoom: false,
  doubleClickZoom: false,
  touchZoom: false,
  keyboard: false,
})
var getZoomLevel = 2
function zoomLevelAdjuster(event) {
  // Get the width of the screen after the resize event
  var width = document.documentElement.clientWidth
  // Tablets are between 768 and 922 pixels wide
  // Phones are less than 768 pixels wide
  if (width > 1920) {
    // Set the zoom level to 10
    map.setZoom(3)
    getZoomLevel = 3
  } else {
    // Set the zoom level to 8
    map.setZoom(3)
    getZoomLevel = 3
  }
}
window.addEventListener('resize', zoomLevelAdjuster)
L.tileLayer(
  'https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png',
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    noWrap: true,
    transparent: true,
  }
).addTo(map)
const markersData = [
  {
    latLng: [40.7128, -74.006],
    info: 'United States',
    size: 500000,
    id: 'marker-0',
  },
  {
    latLng: [48.8566, 2.3522],
    info: 'Europe and Central Asia',
    size: 700000,
    id: 'marker-1',
  },
  {
    latLng: [35.6895, 139.6917],
    info: 'Asia Pacific',
    size: 600000,
    id: 'marker-2',
  },
  {
    latLng: [-23.5505, -46.6333],
    info: 'Latin America and the Caribbean',
    size: 400000,
    id: 'marker-3',
  },
  { latLng: [0, 25], info: 'Africa', size: 800000, id: 'marker-4' },
  {
    latLng: [25, 45],
    info: 'Middle East and North Africa',
    size: 450000,
    id: 'marker-5',
  },
]

const elements = []

const closeButton = document.createElement('button')
closeButton.textContent = 'Close'
closeButton.style.position = 'absolute'
closeButton.style.top = '10px'
closeButton.style.right = '10px'
closeButton.onclick = () => {
  zoomLevelAdjuster()
  map.flyTo(mapInitialPosition, getZoomLevel, {
    animate: true,
    duration: 1,
  })

  const sidebars = document.querySelectorAll('.sidebar')
  sidebars.forEach((sidebar) => {
    sidebar.style.transition = 'right 0.5s ease-in, opacity 0.5s ease-in'
    sidebar.style.right = '-300px'
    sidebar.style.opacity = 0
    setTimeout(() => {
      sidebar.style.display = 'none'
    }, 500)
  })

  const interactiveElements = document.querySelectorAll('.leaflet-interactive')
  interactiveElements.forEach((element) => {
    if (element.classList.contains('fade')) {
      element.classList.remove('fade')
    }
  })
}

function handleMarkerInteraction(marker, labelMarker, line) {
  marker.on('mouseover', () => {
    elements.forEach((el) => {
      if (el.marker !== marker) {
        el.marker.getElement().classList.add('fade')
        el.label.getElement().classList.add('fade')
        el.line.getElement().classList.add('fade')
      }
    })
  })

  marker.on('mouseout', () => {
    elements.forEach((el) => {
      el.marker.getElement().classList.remove('fade')
      el.label.getElement().classList.remove('fade')
      el.line.getElement().classList.remove('fade')
    })
  })

  marker.on('click', () => {
    map.flyTo(marker.getLatLng(), 3, {
      animate: true,
      duration: 1,
    })

    const sidebarElement = document.getElementById(
      'sidebar-' + marker.options.id
    )

    // Close all other sidebars
    const sidebars = document.querySelectorAll('.sidebar')
    sidebars.forEach((sidebar) => {
      if (sidebar !== sidebarElement) {
        sidebar.style.transition = 'right 0.5s ease-in, opacity 0.5s ease-in'
        sidebar.style.right = '-300px'
        sidebar.style.opacity = 0
        setTimeout(() => {
          sidebar.style.display = 'none'
        }, 500)
      }
    })

    // Open the selected sidebar
    sidebarElement.style.display = 'block'
    sidebarElement.style.position = 'absolute'
    sidebarElement.style.right = '-300px'
    sidebarElement.style.opacity = 0
    sidebarElement.style.zIndex = 999
    setTimeout(() => {
      sidebarElement.style.transition =
        'right 0.5s ease-in, opacity 0.5s ease-in'
      sidebarElement.style.right = '0px'
      sidebarElement.style.opacity = 1
    }, 10)
    document
      .getElementById('sidebar-' + marker.options.id)
      .appendChild(closeButton)

    elements.forEach((el) => {
      if (el.marker !== marker) {
        el.marker.getElement().classList.add('fade')
        el.label.getElement().classList.add('fade')
        el.line.getElement().classList.add('fade')
      } else {
        el.marker.getElement().classList.remove('fade')
        el.label.getElement().classList.remove('fade')
        el.line.getElement().classList.remove('fade')
      }
    })
  })

  labelMarker.on('click', () => {
    marker.fire('click')
  })
}

markersData.forEach((markerData, index) => {
  const marker = L.circle(markerData.latLng, {
    color: '#0094D6',
    fillColor: '#0094D6',
    stroke: 0,
    fillOpacity: 0.5,
    radius: markerData.size,
    id: markerData.id,
    info: markerData.info,
  }).addTo(map)

  const labelLatLng = [markerData.latLng[0] - 10, markerData.latLng[1]]

  const markerLine = L.polyline([markerData.latLng, labelLatLng], {
    color: 'black',
    weight: 2,
    className: 'line',
  }).addTo(map)

  const markerLabel = L.divIcon({
    className: 'label',
    html: markerData.info,
    iconSize: false,
    iconAnchor: [0, 20],
  })

  const labelMarker = L.marker(labelLatLng, {
    icon: markerLabel,
  }).addTo(map)

  handleMarkerInteraction(marker, labelMarker, markerLine)
  elements.push({ marker, label: labelMarker, line: markerLine })
})

function highlightMarker(index) {
  const markerData = markersData[index]
  const marker = elements[index].marker
  marker.fire('click')
}
