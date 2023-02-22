import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSweetalert2 from 'vue-sweetalert2';

import 'sweetalert2/dist/sweetalert2.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import Select2 from 'vue3-select2-component'
window.$ = window.jquery = require("jquery")


import VueApexCharts from "vue3-apexcharts";
import SideNav from "@/components/layout/SideNav";


//
// import Pusher from 'pusher-js'
// import Echo from 'laravel-echo'
//
// // Enable pusher logging - don't include this in production
// Pusher.logToConsole = true;
//
// let pusher = new Pusher('e6b2e9ed1220a3a18793', {
//     cluster: 'ap1'
// });
//
// let channel = pusher.subscribe('my-channel');
// channel.bind('my-event', function(data) {
//     app.messages.push(JSON.stringify(data));
// });

createApp(App).use(store).use(router).use(jquery).use(VueSweetalert2).use(VueApexCharts)
    .component('SideNav',SideNav).component('Select2', Select2).use(VueApexCharts).mount('#app')
