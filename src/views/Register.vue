<template>
    <div class="container h-100">
        <div class="row align-items-center h-100">
            <div class="col">
                <div class="jumbotron">
                    <h1 class="display-4">Cadastre-se</h1>
                    <hr class="my-4">
                    <form @submit.prevent="signup">
                        <div class="form-group">
                            <label>E-mail</label>
                            <input type="email" v-model="email" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>Senha</label>
                            <input type="password" v-model="password" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>Confirmar senha</label>
                            <input type="password" v-model="passwordConfirm" class="form-control">
                        </div>
                        <div class="row">
                            <div class="col">
                                <button class="btn btn-dark btn-lg">Cadastrar</button>
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
            return{
                email:'',
                password:'',
                passwordConfirm:''
            }
        },
        methods:{
            signup(){
                if(this.password == this.passwordConfirm){
                    firebase.auth().createUserWithEmailAndPassword(this.email,this.password).then((user)=>{
                        console.log(user);
                        Swal.fire({icon:"success", title:"Cadastro feito com sucesso!"});
                        this.$router.push('/');
                    },(error)=>{
                        console.log(error);
                        switch (error.code) {
                            case "auth/email-already-in-use":
                                error.message = "Email já está em uso";
                                break;
                            case "auth/invalid-email":
                                error.message = "Email inválido";
                                break;
                            case "auth/operation-not-allowed":
                                error.message = "Conta desativada";
                                break;
                            case "auth/weak-password":
                                error.message = "Senha não é forte o suficiente";
                                break;
                            default: "Erro no cadastro do usuário";
                        }
                        Swal.fire(error.message);
                    })
                }else{
                    Swal.fire('Senhas não coinciden');
                    this.$router.push('/')
                }
            }
        }
    }
</script>