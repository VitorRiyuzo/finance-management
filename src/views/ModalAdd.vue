<template>
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
</template>
<style scoped></style>
<script>
    import firebase from 'firebase';
    import jQuery from 'jquery';
    let $ = jQuery;
    import Swal from 'sweetalert2';
    export default {
        data(){
            return{
                nameStock:'',
            }
        },
        methods:{
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
        }
    }
</script>