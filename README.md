# MP Tick Visualizer

[MP Tick Visualizer][mp-tick] is a web application for users to track their ticks on [Mountain Project][mp]. The user can enter either an email or userId (typically found at the end of the url on a member's MP page) associated with an account and use that to access their data.

MP Tick Visualizer is a personal project by Jeff Gronewold.

## Features/Technology

- Rails backend to make data requests through Mountain Projects API
- React and Redux to manage state and UI on the frontend
- D3.js to bind data to images and create scales necessary for plotting both the bar graph and pie chart
- [React Faux DOM] to handle the interaction between React and D3 - to prevent React and D3 from fighting over the DOM, React Faux DOM provides an interface between the two that recognizes both D3 functions as well as enough Javascript functions to create React Components.

![demo ticks][ticks]




[mp-tick]: https://mp-visualize.herokuapp.com/
[mp]: https://www.mountainproject.com/
[ticks]: ./app/assets/images/Sample-MP.png "Splash page"
