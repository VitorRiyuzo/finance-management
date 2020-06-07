<template>
    <div>
        <div class="row">
            <div class="col">
                <button class="btn btn-secondary btn-block" data-toggle="modal" data-target="#addModal">Adicionar Negociação</button>
            </div>
            <div class="col">
                <div class="form-group">
                    <input type="text" class="form-control" v-model="search" @input="setSearch()" placeholder="Pesquisar Ação">
                </div>
            </div>
            <div class="col">
                <select v-model="filterList" @change="setType()" class="form-control form-control">
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
                    <input type="date" v-model="range.startDate" @input="setRange()" class="form-control">
                </div>
            </div>
            <div class="col">
                <div class="form-group date">
                    <label>Data Final</label>
                    <input type="date" v-model="range.endDate"  @input="setRange()" class="form-control">
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped></style>
<script>
    export default {
        data(){
            return{
                search:'',
                range:{},
                filterList:'all',
            }
        },
        methods:{
            setType(){
                this.$emit('typeChange', this.filterList);
            },
            setSearch(){
                this.$emit('searchChange', this.search);
            },
            setRange(){
                if(this.range.endDate && this.range.startDate){
                    this.$emit('rangeChange', this.range);
                }
            }
        }
    }
</script>
