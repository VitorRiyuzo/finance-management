<template>
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
</template>
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
</style>
<script>
    export default {
        data(){
            let user = JSON.parse(localStorage.getItem('user'));
            return{
                user:user
            }
        },
        methods:{
            logout(){
                localStorage.removeItem("user");
                this.$router.push('/');
            }
        }
    }
</script>