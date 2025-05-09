<template>
  <section class=" w-screen h-screen  border-red-50 border-4 flex flex-col  justify-center lg:items-center  ">
    
    <h1 class=" text-center font-bold text-3xl tracking-widest mb-6 text-green-900"> Registrarse </h1>
     <form class=" flex flex-col px-3 justify-center gap-2 h-[60%] lg:w-2/5 lg:h-[60%] border-2 lg:shadow-md lg:rounded-md  " @submit.prevent="registerUser">
        <div class="flex flex-col  ">
            <label class=" text-green-900 text-xl mb-2 font-bold" for="">Introduce tu correo </label>
            <input class=" py-2 border-2 outline-none px-2 rounded " type="text" placeholder="introduce un correo electronico" v-model="email" required>
            
        </div>
        <div class="flex flex-col " >
            <label class=" text-green-900 text-xl mb-2 font-bold" for="">Introduce una contraseña  </label>
            <input class=" py-2 border-2 outline-none px-2 rounded" type="password" placeholder="introduce una contraseña" v-model="password" required> 
            <p class="text-sm text-gray-500 mt-1"> <span class="text-red-500">*</span> La contraseña debe tener al menos 6 caracteres.</p>
     
        </div>
        <div id="divcheckbox" class=" flex flex-row items-center  gap-[7px]">
            <input  type="checkbox"  v-model="aceptado">
            <span class=" flex items-center justify-center text-[14px] lg:text-[10px] text-gray-700  h-fit">Acepto las <router-link class=" text-blue-600 underline ml-[5px]" to="/politicas"> Politicas de privacidad de datos </router-link> </span>  
        </div>
        <button  class=" border-red-200 border-2  text-left w-36 bg-green-500 text-white border-none p-2 text-xl rounded font-bold tracking-widest hover:bg-green-900 " type="submit" >Registrarse</button>
        <div class=" flex flex-row text-xl gap-2">
            <span class=" text-green-900">¿ya tienes cuenta?</span>
            <span class=" text-green-900 font-bold" ><router-link class="underline decoration-solid decoration-green-900" to="/login">Iniciar Sesion </router-link></span>
        </div>
     </form>
  </section>
</template>

<script>
import { auth } from '@/db/firebase';
import { createUserWithEmailAndPassword, sendEmailVerification} from 'firebase/auth';
import { toast} from 'vue-sonner';

export default {
    name:'RegisterView',
   
    data (){
        return {
            email:'',
            password:'',
            aceptado:false
        }
    },
    methods: {
        async registerUser(){
            const regex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+.)+[a-zA-Z]{2,}$/;
            try {
                
                if (this.password.length<6) {
                    toast.error("la contraseña debe tener seis caracteres")
                    return
                    
                }
                if(!regex.test(this.email) || !this.email.includes('.')){
                    toast.error("correo no valido")
                    return
                }
                if (this.aceptado==false){
                    toast.info("debes aceptar las politicas de privacidad")
                    let inputcheck=document.getElementById("divcheckbox")
                    inputcheck.style.border=" 1px solid red"
                    inputcheck.style.borderRadius="4px"
                    inputcheck.style.padding="5px 3px"
                    inputcheck.style.backgroundColor="#f7cad0"
                    return
                }
                let userCredentials= await createUserWithEmailAndPassword(auth,this.email,this.password)
                console.log("usuario creado ",userCredentials);
                
                let user=userCredentials.user
                console.log("el user",user)

                await sendEmailVerification(user)
                toast.info('debes verificar tu correo electronico')
                
                this.$router.push('/login')

                
                
            } catch (error) {
                console.log("ha ocurido un error",error);
                
                
            }
        }
    },

}
</script>

<style>

</style>