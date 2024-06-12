# Interactive Map Application

This project is an interactive map application built using Leaflet.js. It features a map with markers representing different regions, interactive elements, and custom behaviors based on user interactions such as resizing the window, clicking, and hovering over markers.

## Features

- **Responsive Zoom Adjustment**: Adjusts the zoom level of the map based on the window size.
- **Marker Interaction**: Markers on the map represent different regions. Users can interact with these markers to view more information.
- **Dynamic Sidebars**: Clicking on a marker opens a sidebar with more information about the region, and closes other open sidebars.
- **Custom UI Controls**: Includes a custom 'Close' button to reset the map view and close sidebars.

## Setup

To run this project locally, follow these steps:

1. Clone the repository to your local machine.
2. Open the `index.html` file in a web browser to view the map.

## Dependencies

- **Leaflet.js**: A JavaScript library for interactive maps.

## Usage

- **Zoom Adjustment**: The map's zoom level will adjust automatically when you resize the browser window.
- **Interacting with Markers**: Hover over or click on the markers to see interactions:
  - **Hover**: Other markers will fade out, highlighting the hovered marker.
  - **Click**: The map will zoom in on the marker, and a sidebar with more information about the region will appear.

## Code Structure

- `map.js`: Contains all the JavaScript code for initializing the map, adding markers, and defining interactive behaviors.

## Contributing

Contributions to this project are welcome. Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
