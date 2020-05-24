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
                            <option value="buy">Compras</option>
                            <option value="sell">Vendas</option>
                        </select>
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
                            <td><button type="button" class="btn btn-danger btn-sm">X</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="total">
            <div class="row justify-content-end">
                <div class="card text-white" v-bind:class="{'bg-success':this.total>0,'bg-danger':this.total<0}">
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
                            <!-- <div class="form-group">
                                <fieldset disabled>
                                    <label>Total</label>
                                    <input type="number" v-model="stock.total"  class="form-control">
                                </fieldset>
                            </div> -->
                            <div class="form-group">
                                <label>Data</label>
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
                            <h5 class="modal-title" id="createModalLabel">Adicionar Negociação</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label>Código da Ação</label>
                                <input type="text" v-model="nameStock" class="form-control" required>
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
                        stock.date = moment(stock.date).format("DD/MM/YYYY");
                        console.log(stock);
                        user.stocks.push(stock);
                        if(stock.type=="compra"){
                            total-=stock.total;
                        }else{
                            total+=stock.total;
                        }
                    }
                }
                console.log(user);
                console.log(total);
                this.total = total;
            })
            return{
                user:user,
                stock:{},
                nameStock:"",
                stocks:stocks,
                total:total,
                search:'',
                filterList:'all'
            }
        },
        methods:{
            add(){
                console.log(this.stock);
                let stock = this.stock;
                if(stock.type == 'compra'){
                    stock.total = (stock.price*stock.amount)+parseInt(stock.tax);
                }else{
                    stock.total = (stock.price*stock.amount)-parseInt(stock.tax);
                }
                console.log(stock);
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
            }
        },
        computed: {
            list() {
                console.log("list");
                const filter = this.search.toUpperCase();
                if (filter == '') {
                    return this.user.stocks;
                }else{
                    let filtered = this.user.stocks.filter((item)=>{
                        console.log(item);
                        console.log(filter);
                        console.log(item.stock.name);
                        if(item.stock.name.indexOf(filter)>=0){
                            console.log("return true");
                            console.log(item);
                            return true;
                        }
                    })
                    console.log(filtered);
                    return filtered;
                }
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
        color:green;
        text-transform: capitalize;
    }
    .sell{
        color:red;
        text-transform: capitalize;
    }
</style>
