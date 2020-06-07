<template>
    <div>
        <table class="table table-striped">
            <thead class="thead-dark">
                <tr>
                <th scope="col">Ação</th>
                <th scope="col">Data</th>
                <th scope="col">Tipo</th>
                <th scope="col">Preço</th>
                <th scope="col">Taxas</th>
                <th scope="col">Quant</th>
                <th scope="col">Total</th>
                <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="stock in list" :key="stock.id">
                    <td>{{stock.stock.name}}</td>
                    <td>{{stock.date}}</td>
                    <td  class="font-weight-bold" v-bind:class="{ 'buy': stock.type=='compra', 'sell': stock.type=='venda' }">{{stock.type}}</td>
                    <td>R${{stock.price}}</td>
                    <td>R${{stock.tax}}</td>
                    <td>{{stock.amount}}</td>
                    <td>R${{stock.total}}</td>
                    <td><button type="button" @click="remove(stock)" class="btn btn-danger btn-sm">X</button></td>
                </tr>
            </tbody>
        </table>
        <div class="total">
            <div class="row justify-content-end">
                <div class="card text-white" style="opacity:0.7" v-bind:class="{'bg-success':this.total>=0,'bg-danger':this.total<0}">
                    <div class="card-body">
                        <h4>Total: R$: {{this.total}}</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Swal from 'sweetalert2';
    import firebase from 'firebase';
    import moment from 'moment';
    export default {
        props:["filters"],
        data(){
            this.filters;
            let user = JSON.parse(localStorage.getItem('user'));
            user.stocks = [];
            let total = 0;
            firebase.database().ref('users/'+user.uid+'/stocks').on('value',(snapshot)=>{
                let data = snapshot.val();
                user.stocks = [];
                if (data) {
                    for(var i in data){
                        let stock = data[i];
                        stock.id = i;
                        stock.total = stock.total.toFixed(2);
                        stock.date = moment(stock.date).format("DD/MM/YYYY");
                        user.stocks.push(stock);
                        
                    }
                }
            })
            return{
                user:user,
                total:total,
            }
        },
        methods:{
            calculator(listStock){
                let total = 0;
                for(var k in listStock){
                    let stock = listStock[k];
                    if(stock.type=="compra"){
                        total-=parseFloat(stock.total);
                    }else{
                        total+=parseFloat(stock.total);
                    }
                }
                this.total = total.toFixed(2);
            },
            remove(item){
                Swal.fire({
                    title: 'Deseja remover operação?',
                    text: "Essa operação não será reversível",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Sim, deletar!'
                    }).then((result) => {
                    if (result.value) {
                        firebase.database().ref('users/'+this.user.uid+"/stocks/"+item.id).remove();
                        Swal.fire('Deleted!','Your file has been deleted.','success')
                    }
                })
            }
        },
        computed: {
            list() {
                const filter1 = this.filters.search.toUpperCase();
                const filter2 = this.filters.type;
                const filter3 = this.filters.range
                let filtered = this.user.stocks;
                console.log("filtros 1",filter1);
                console.log("filtros 2",filter2);
                console.log("filtros 3",filter3);
                if(filter1 != ''){
                    filtered = filtered.filter((item)=>{
                        if(item.stock.name.indexOf(filter1)>=0){
                            return true;
                        }
                    })
                }
                if(filter2!='all'){
                    filtered = filtered.filter((item)=>{
                        if(item.type == filter2){
                            return true;
                        }
                    })
                }
                if(filter3){
                    filtered = filtered.filter((item)=>{
                        let startDate = moment(filter3.startDate);
                        let endDate = moment(filter3.endDate);
                        let date = moment(item.date,"DD/MM/YYYY");
                        let range = date.isBetween(startDate, endDate);
                        if(range){
                            return true;
                        }
                    })
                }
                this.calculator(filtered);
                return filtered
            }
        }
    }
</script>
<style scoped>
    table{
        margin-bottom: 10vh;
    }
    .total{
        position: fixed;
        right:20px;
        bottom:20px;
    }
    table button{
        padding: 0 3px;;
    }
    .buy{
        color:red;
        text-transform: capitalize;
    }
    .sell{
        color:green;
        text-transform: capitalize;
    }
</style>