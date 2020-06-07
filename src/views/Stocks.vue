<template>
    <div class="container mt-2 h-100">
        <app-header></app-header>
        <app-filters  @typeChange="filters.type = $event" @searchChange="filters.search = $event" @rangeChange="filters.range = $event"></app-filters>
        <app-table :filters="filters"></app-table>
        <app-modal-order></app-modal-order>
        <app-modal-add></app-modal-add>
    </div>
</template>
<script>
    //Components
    import Header from './Header';
    import ModalOrder from './ModalOrder';
    import ModalAdd from './ModalAdd';
    import Table from './Table';
    import Filters from './Filters'

    export default {
        components:{
            'app-header': Header,
            'app-modal-order': ModalOrder,
            'app-modal-add': ModalAdd,
            'app-table' : Table,
            'app-filters' : Filters 
        },
        data(){
            if(!localStorage.getItem('user')){
                this.$router.push('/');
            }
            return{
                filters:{
                    search:"",
                    type:"all",
                    range:null
                }
            }
        }
    }
</script>
<style scoped>
</style>
