import GroupedBar from './charts/grouped-bar';

let dataUrl = "/resources/age_group_data.csv";

let chart = new GroupedBar();
chart.render(dataUrl);