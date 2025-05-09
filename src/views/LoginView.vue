<template>
  <section class=" w-screen h-screen  flex flex-col  justify-center lg:items-center ">
    
    <h1 class=" text-center font-bold text-3xl tracking-widest mb-6 text-green-900"> Iniciar sesion  </h1>
     <form class=" flex flex-col px-3 justify-center gap-2 h-[60%] lg:w-2/5 lg:h-[60%] border-2 lg:shadow-md lg:rounded-md " @submit.prevent="loginUser">
        <div class="flex flex-col   ">
            <label class=" text-green-900 text-xl mb-2 font-bold" for="">Introduce tu correo </label>
            <input class=" py-2 border-2 outline-none px-2 rounded" type="text" placeholder="introduce un correo electronico" v-model="email" required>
            
        </div>
        <div class="flex flex-col " >
            <label class=" text-green-900 text-xl mb-2 font-bold" for="">Introduce tu contraseña </label>
            <input class=" py-2 border-2 outline-none px-2 rounded" type="password" placeholder="introduce un correo contraseña" v-model="password" required> 
     
        </div>
        <button  class="  text-left w-40 bg-green-500 text-white border-none p-2 text-xl rounded font-bold tracking-widest hover:bg-green-900 " type="submit">Inicia  Sesion </button>
        <div class=" flex flex-row text-xl gap-2">
            <span class=" text-green-900">¿No tienes cuenta?</span>
            <span class=" text-green-900 font-bold" ><router-link class="underline decoration-solid decoration-green-900" to="/register">Registrate </router-link></span>
        </div>
     </form>
  </section>
</template>

<script>
import { auth } from '@/db/firebase';
import { signInWithEmailAndPassword} from 'firebase/auth';
import { toast} from 'vue-sonner';

export default {
    name:'RegisterView',
    data (){
        return {
            email:'',
            password:''
        }
    },
    methods: {
        async loginUser(){
            try {
                let userCredentials= await signInWithEmailAndPassword(auth,this.email,this.password)
                console.log("cuando estamos iniciando sesion ",userCredentials);
                if( !userCredentials){
                    toast.info("usuario no existe")
                    return
                } 
                
                if (userCredentials.user.emailVerified){
                    console.log("hola estoy dentro del login");
                    
                    this.$router.push('/perfil')
                }
                else{
                    toast.warning("debes verificar tu correo ")
                }

                
                
            } catch (error) {
                console.log("ha ocurido un error",error);
                
                
            }
        }
    },

}
</script>

<style>

</style>