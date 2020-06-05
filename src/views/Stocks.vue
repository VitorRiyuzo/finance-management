<template>
    <div class="container mt-2 h-100">
        <header class="row align-items-center">
            <div class="col">
                <p class="m-0">{{user.email}}</p>
            </div>
            <div class="col">
                <div class="row justify-content-end">
                    <button type="button" class="btn btn-info mr-3" data-toggle="modal" data-target="#createModal">Cadastrar Ação</button>
                    <button type="button" @click="logout" class="btn btn-light">Sair</button>
                </div>
            </div>
        </header>
        <div class="row">
            <div class="col">
                <div class="row">
                    <div class="col">
                        <button class="btn btn-secondary btn-block" data-toggle="modal" data-target="#addModal">Adicionar Negociação</button>
                    </div>
                    <div class="col">
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="search" placeholder="Pesquisar Ação">
                        </div>
                    </div>
                    <div class="col">
                        <select v-model="filterList" class="form-control form-control">
                            <option value="all">Todos</option>
                            <option value="compra">Compras</option>
                            <option value="venda">Vendas</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="form-group date">
                            <label>Data inicial</label>
                            <input type="date" v-model="startDate" class="form-control">
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-group date">
                            <label>Data Final</label>
                            <input type="date" v-model="endDate" class="form-control">
                        </div>
                    </div>
                </div>
                <hr>
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
            </div>
        </div>
        <div class="total">
            <div class="row justify-content-end">
                <div class="card text-white" style="opacity:0.7" v-bind:class="{'bg-success':this.total>=0,'bg-danger':this.total<0}">
                    <div class="card-body">
                        <h4>Total: R$: {{this.total}}</h4>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="addModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <form @submit.prevent="add">
                        <div class="modal-header">
                            <h5 class="modal-title" id="addModalLabel">Adicionar Negociação</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label>Selecione a Ação</label>
                                <select v-model="stock.stock" required class="form-control form-control">
                                    <option v-for="option in stocks" :key="option.id" v-bind:value="option">{{ option.name }}</option>
                                </select>
                            </div>
                            <div class="form-group ">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" required name="exampleRadios" v-model="stock.type" value="compra" checked>
                                    <label class="form-check-label" for="exampleRadios1">
                                        Compra
                                    </label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" required name="exampleRadios" v-model="stock.type" value="venda" checked>
                                    <label class="form-check-label" for="exampleRadios1">
                                        Venda
                                    </label>
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Preço</label>
                                <input type="number" step="any" v-model="stock.price" required class="form-control">
                            </div>
                            <div class="form-group">
                                <label>Quantidade</label>
                                <input type="number" v-model="stock.amount" required class="form-control">
                            </div>
                            <div class="form-group">
                                <label>Taxas</label>
                                <input type="number" step="any" required v-model="stock.tax" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>Data de execução</label>
                                <input type="date" v-model="stock.date" required class="form-control">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                            <button type="submit" class="btn btn-primary">Salvar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="modal fade" id="createModal" tabindex="-1" role="dialog" aria-labelledby="createModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <form @submit.prevent="newStock">
                        <div class="modal-header">
                            <h5 class="modal-title" id="createModalLabel">Adicionar Código de ação</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label>Código da Ação</label>
                                <input type="text" style="text-transform: uppercase" v-model="nameStock" class="form-control" required>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                            <button type="submit" class="btn btn-primary">Salvar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import firebase from 'firebase';
    import jQuery from 'jquery';
    let $ = jQuery;
    import Swal from 'sweetalert2';
    import moment from 'moment';
    export default {
        data(){
            if(!localStorage.getItem('user')){
                this.$router.push('/');
            }
            let stocks = [];
            let user = JSON.parse(localStorage.getItem('user'));
            user.stocks = [];
            let total = 0;
            firebase.database().ref('stocks').on('value',(snapshot)=>{
                let data = snapshot.val();
                console.log(data);
                stocks = [];
                if (data) {
                    for(var i in data){
                        let stock = data[i];
                        stock.id = i;
                        stocks.push(stock);
                    }
                }
                this.stocks = stocks;
                console.log(stocks);
            })
            firebase.database().ref('users/'+user.uid+'/stocks').on('value',(snapshot)=>{
                let data = snapshot.val();
                console.log(data);
                user.stocks = [];
                if (data) {
                    for(var i in data){
                        let stock = data[i];
                        stock.id = i;
                        stock.total = stock.total.toFixed(2);
                        stock.date = moment(stock.date).format("DD/MM/YYYY");
                        console.log(stock);
                        user.stocks.push(stock);
                        
                    }
                }
                console.log(user);
            })
            return{
                user:user,
                stock:{},
                nameStock:'',
                stocks:stocks,
                total:total,
                search:'',
                startDate:'',
                endDate:'',
                filterList:'all',
                viewStocks:[]
            }
        },
        ready:function() {
            $(".input-group").datepicker();
        },
        methods:{
            add(){
                console.log(this.stock);
                let stock = this.stock;
                if(stock.type == 'compra'){
                    stock.total = (stock.price*stock.amount)+parseFloat(stock.tax);
                }else{
                    stock.total = (stock.price*stock.amount)-parseFloat(stock.tax);
                }
                console.log(stock);
                stock.created_at = moment().format("YYYY-MM-DD");
                firebase.database().ref('users/' + this.user.uid+"/stocks").push(this.stock).then(()=>{
                    this.stock = {};
                    $("#addModal").modal('hide');
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                }, (error)=>{
                    console.log(error);
                    Swal.fire('Erro ao salvar negociação');
                })
            },
            newStock(){
                console.log(this.nameStock);
                let cod =  this.nameStock.toUpperCase();
                console.log(cod);
                firebase.database().ref('stocks').push({name:cod}).then((resp)=>{
                    console.log(resp);
                    this.nameStock = "";
                    $("#createModal").modal('hide');
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                }, (error)=>{
                    console.log(error);
                    Swal.fire('Erro ao Salvar novo código de ação');
                })
            },
            logout(){
                localStorage.removeItem("user");
                this.$router.push('/');
            },
            calculator(listStock){
                let total = 0;
                console.log(listStock);
                for(var k in listStock){
                    let stock = listStock[k];
                    if(stock.type=="compra"){
                        total-=parseFloat(stock.total);
                    }else{
                        total+=parseFloat(stock.total);
                    }
                }
                console.log(total);
                this.total = total.toFixed(2);
            },
            remove(item){
                firebase.database().ref('users/'+this.user.uid+"/stocks/"+item.id).remove();
            }
        },
        computed: {
            list() {
                console.log("list");
                const filter1 = this.search.toUpperCase();
                const filter2 = this.filterList;
                const filter3 = {
                    "start":this.startDate,
                    "end":this.endDate
                }
                let filtered = this.user.stocks;
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
                if(filter3.start && filter3.end){
                    filtered = filtered.filter((item)=>{
                        let startDate = moment(filter3.start);
                        let endDate = moment(filter3.end);
                        let date = moment(item.date,"DD/MM/YYYY");
                        let range = date.isBetween(startDate, endDate);
                        if(range){
                            return true;
                        }
                    })
                    console.log(filtered);
                }
                this.calculator(filtered);
                return filtered
            }
        },
    }
</script>
<style scoped>
    header{
        background:rgb(51, 51, 51);
        height:50px;
        margin-bottom:10px;
        border-radius:7px;
        border:solid 1px black;
        box-sizing:content-box;
        color:white;
        padding-right:10px;
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
