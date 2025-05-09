<template>
  <div class=" flex flex-col justify-center items-center h-screen w-screen">
    <header class="h-fit flex fixed top-0 w-screen justify-end px-2 py-2  ">
      <nav class="flex "  >
        <button class=" self-end bg-red-800  text-white font-bold p-2 rounded  cursor-pointer hover:bg-red-950"  @click="logout">Cerrar Sesion</button>
      </nav>
    </header>
    <!----->
    <main class="flex flex-col gap-2 border-2   w-screen px-2">
      <section> <!-- para datos del usuario ------------------>
        <div class="flex flex-col  " v-if="user.nombre">
          <!-- aqui es donde tengo que poner lo de se estan cargando los datos -->
          <h1 class="font-bold text-green-600" > Perfil</h1>
          <span>Nombre: {{ user.nombre }}</span>
          <span>Apellidos: {{ user.apellidos }}</span>
        </div>
        <div v-else>
          <form @submit.prevent="crearPerfil">
            <div class="h-[45px]">
              <label for="">Nombre: </label>
              <input class="border-2 rounded  w-[70%] px-2 py-[4px]"
                type="text"
                placeholder="introduce tu nombre"
                required
                v-model="nombre"
              />
            </div>
            <div class="my-2 h-[45px]">
              <label for="">Apellidos: </label>
              <input class="border-2 rounded  w-[70%] px-2 py-[4px]"
                type="text"
                placeholder="introduce tu Apellidos"
                required
                v-model="apellidos"
              />
            </div>
            <button class="border-2 border-green-400 mt-2 rounded py-1 px-[7px] font-bold text-green-600 cursor-pointer hover:bg-green-200" type="submit">Crear Perfil</button>
          </form>
        </div>
      </section> 
      <!-- ------------------------------------------------>
      <section >
        <h2 class=" text-center font-bold text-green-600">MIS CONTACTOS</h2>
        <div  class=" overflow-y-scroll" v-if="listaContactos.length != 0">
          <div v-for="(contacto, index) in listaContactos" :key="index">
            <p>Nombre :{{ contacto.nombre }}</p>
            <p>telefono :{{ contacto.telefono }}</p>
            <HR></HR>
          </div>
        </div>
       
        <div>
          
          <form @submit.prevent="guardarContacto">
            <h3 class=" text-center font-bold text-green-600 mt-3 ">Introduce nuevo contacto </h3>
            <div class="flex flex-col h-[45px]">
              <label for="">Nombre:</label>
              <input class="border-2 rounded  w-[70%] px-2 py-[4px]"
                type="text"
                placeholder="introduce su  nombre "
                v-model="nombrecontacto"
              />
            </div>
            <div class="flex flex-col h-[45px] my-4">
              <label for="">Telefono: </label>
              <input class="border-2 rounded  w-[70%] px-2 py-[4px]"
                type="tel"
                placeholder="introduce su telefono "
                v-model="telf"
              />
            </div>
            <button class="border-2 border-green-400 mt-2 rounded py-1 px-[7px] font-bold text-green-600 cursor-pointer hover:bg-green-200" type="submit">Guardar contacto</button>
          </form>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { auth, db } from "@/db/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default {
  name: "PerfilView",
  data() {
    return {
      nombre: "",
      apellidos: "",
      user: {},
      nombrecontacto: "",
      telf: "",
      listaContactos: [],
    };
  },
  methods: {
    async crearPerfil() {
      // VAMOS A CREAR UN DATOS DENTRO DE NUESTRO DOCUEMENTO USUARIO DE LA COLLECION DE USUARIOS
      try {
        let uid = auth.currentUser.uid;
        await setDoc(doc(db, `/usuarios/${uid}`), {
          nombre: this.nombre,
          apellidos: this.apellidos,
        });
        this.user.nombre=this.nombre
        this.user.apellidos=this.apellidos
      } catch (error) {
        console.log("ha ocurrido un error", error);
      }
    },
    // traerme los datos de firestore nada mas que el usuario ya ha metido sus datos
    async recuperarDatos(uid) {
      try {
        //let uid=auth.currentUser.uid // igual aun no se ha terminado de cargar la pagina y por eso no podemos depender del uid
        let docSnap = await getDoc(doc(db, `/usuarios/${uid}`));
        if (docSnap.exists()) {
          this.user = docSnap.data();
        }
      } catch (error) {
        console.log("ha ocurrido un error", error);
      }
    },
    async guardarContacto() {
      try {
        let uid = auth.currentUser.uid;
        let contacto = {
          "nombre": this.nombrecontacto,
          "telefono": this.telf,
        }
        await addDoc(collection(db, `usuarios/${uid}/contactos`),contacto);
        this.listaContactos.push(contacto)
        this.nombrecontacto="";
        this.telf=""
      } catch (error) {
        console.log("ha ocuriido un error", error);
      }
    },

    //recuperar los contactos de una la subcoleccion contactos
    async recuperarContactos(uid) {
      try {
        let collecRef = collection(db, `usuarios/${uid}/contactos`);
        let snapcollection = await getDocs(collecRef);
        this.listaContactos = snapcollection.docs.map((contactoId) => contactoId.data());
        console.log("listacontactos",this.listaContactos);
        
      } catch (error) {
        console.log("ha ocuriido un errros", error);
      }
    },

    async logout() {
      await signOut(auth);
      this.$router.push("/");
    },
  },
  //de esta forma estaamos esperando , igual los datos no estan cuando hemos cargado esta vista , por eso usamos callback ,
  // async mounted() {
  //     await this.recuperarDatos()

  //   },
  mounted() {
    onAuthStateChanged(auth, async (usuario) => {
      if (usuario) {
        await this.recuperarDatos(usuario.uid);
        await this.recuperarContactos(usuario.uid);
      }
    });
  },
};
</script>


<style scoped>
label{
  font-family: "Nunito", sans-serif;
  font-optical-sizing: auto;
  font-weight: 300;
    font-style: normal;
  
}
h2,H1,h3{
  font-family: "Ubuntu", sans-serif;
  font-weight: 700;
  font-style: normal;

}

</style>
