<template>
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
</template>
<style scoped></style>
<script>
    import firebase from 'firebase';
    import jQuery from 'jquery';
    let $ = jQuery;
    import Swal from 'sweetalert2';
    import moment from 'moment';
    export default {
        data(){
            let stocks = [];
            let user = JSON.parse(localStorage.getItem('user'));
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
            return{
                stocks:stocks,
                stock:{},
                user:user
            }
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
        }
    }
</script>