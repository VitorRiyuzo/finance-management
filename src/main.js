import Vue from 'vue'
import App from './App.vue'
import router from '@/router';
import store from '@/store';
import firebase from 'firebase';
// import "spectre.css/dist/spectre.min.css";
// import "spectre.css/dist/spectre-icons.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "@/style.css";
import "alertifyjs/build/css/alertify.min.css";
Vue.config.productionTip = false
var firebaseConfig = {
  apiKey: "AIzaSyBrMz34tZom9w5zPzHjLAbxkUfrSDVh-NY",
  authDomain: "finance-management-c5d76.firebaseapp.com",
  databaseURL: "https://finance-management-c5d76.firebaseio.com",
  projectId: "finance-management-c5d76",
  storageBucket: "finance-management-c5d76.appspot.com",
  messagingSenderId: "119785949890",
  appId: "1:119785949890:web:eab4c7c9ce75b1d9f2895b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
