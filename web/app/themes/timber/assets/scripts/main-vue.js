

/* --------------------------------------------------------------------------------
Polyfill
-------------------------------------------------------------------------------- */
import 'babel-polyfill';

/* --------------------------------------------------------------------------------
Helpers
-------------------------------------------------------------------------------- */
import 'svgxuse'; 

/* --------------------------------------------------------------------------------
Vue
-------------------------------------------------------------------------------- */
import Vue from 'vue';
import store from './store'
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";

/* --------------------------------------------------------------------------------
Vue - Directives
-------------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------------
Vue - Components
-------------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------------
APP
-------------------------------------------------------------------------------- */
let vm = new Vue({
    el: '#app',
    store,
    components: {},
    data: {},
    computed: {},
    methods: {},
    mounted: function () { },
    destroyed: function () { }
});

