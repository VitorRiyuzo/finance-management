<template>
    <div class="container h-100">
        <div class="row align-items-center h-100">
            <div class="col">
                <div class="jumbotron">
                    <h1 class="display-4">Olá!</h1>
                    <p class="lead">Gerencie aqui suas finanças</p>
                    <hr class="my-4">
                    <form @submit.prevent="signin">
                        <div class="form-group">
                            <label>E-mail</label>
                            <input type="email" v-model="email" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>Senha</label>
                            <input type="password" v-model="password" class="form-control">
                        </div>
                        <div class="row">
                            <div class="col">
                                <button class="btn btn-dark btn-lg">Acessar</button>
                            </div>
                            <div class="col">
                                <p>Ainda não é cadastrado? <router-link to="/register"><span class="btn btn-link" >Cadastrar</span></router-link></p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped></style>
<script>
import Swal from 'sweetalert2';
    import firebase from 'firebase';
    export default {
        data(){
            if(localStorage.getItem('user')){
                this.$router.push('/stocks');
            }
            return{
                email:'',
                password:''
            }
        },
        methods:{
            signin(){
                console.log(this.password);
                firebase.auth().signInWithEmailAndPassword(this.email,this.password).then((resp)=>{
                    console.log(resp.user);
                    localStorage.setItem("user",JSON.stringify(resp.user));
                    this.$router.push('/stocks');
                },(error)=>{
                    console.log(error);
                    switch (error.code) {
                        case "auth/invalid-email":
                            error.message = "Email não é válido";
                            break;
                        case "auth/user-disable":
                            error.message = "O usuário está desabilitado";
                            break;
                        case "auth/user-not-found":
                            error.message = "Usuário não encontrado";
                            break;
                        case "auth/wrong-password":
                            error.message = "Senha inválida";
                            break;
                        default: error.message = "Erro na autenticação, verifique sua conexão";
                    }
                    Swal.fire(error.message);
                })
            }
        }
    }
</script>