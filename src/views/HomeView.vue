<template>
  <section class=" flex flex-col justify-center items-center w-screen h-screen gap-2">
    <h1 class="  text-xl lg:text-[40px] lg:w-[60%] text-center text-green-900  lg:leading-[55px]  font-bold tracking-widest textshadow">BIENVENIDO   A MI APLICACION DE AGENDA Y CONTACTOS </h1>
    <section class=" flex justify-center  px-3">
     
      <p class=" lg:w-[60%]  tracking-widest   ">Esta es una aplicación web para el registro de usuarios
        y la gestión de contactos personales. Cada usuario puede crear una cuenta,
        iniciar sesión y administrar su propia agenda de contactos, añadiendo nombres, 
        teléfonos, correos electrónicos y otra información relevante.
        El objetivo es ofrecer una herramienta sencilla, 
        segura y organizada para mantener actualizados los datos de contacto desde cualquier dispositivo.

      </p>
    
    </section>
    <div class="w-34 self-center rounded  bg-green-500 text-white  p-2 text-xl  font-bold tracking-widest hover:bg-green-900">
      <router-link to="/register">Empezar</router-link>
    </div>
    <footer class="bg-gray-800 text-white text-center py-4 fixed w-screen justify-center flex bottom-0 border-2 shadow-[0_-1px_20px_2px_rgba(0,0,0,0.2)]">
      <p>&copy; 2025 Lucia Mansogo. Todos los derechos reservados.</p>
    </footer>
    
  </section>
</template>

<script>



export default {
  name: 'HomeView',
  
}
</script>
<style scoped>
.textshadow{
  text-shadow: 4px 4px 4px rgba(0, 0, 0, .34);
 
  

}


</style>
