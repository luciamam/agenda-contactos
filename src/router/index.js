import { auth } from '@/db/firebase'

import { createRouter, createWebHistory } from 'vue-router'


const routes = [
 
  {
    path: '/',
    name: 'home',
    
    component: () => import( '../views/HomeView.vue')
  },
  
  {
    path: '/register',
    name: 'register',
    
    component: () => import( '../views/RegisterView.vue')
  },
  {
    path: '/login',
    name: 'login',
    
    component: () => import( '../views/LoginView.vue')
  },
  {
    path: '/perfil',
    name: 'perfil',
    meta:{
      requiresAuth:true
    },
    
    component: () => import( '../views/PerfilView.vue')
  },
  {
    path: '/politicas',
    name: 'politicas',
    
    component: () => import( '../views/PoliticasView.vue')
  },
  
]




const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})




router.beforeEach((to,from, next)=>{
  const requiresAuth=to.matched.some((route)=>route.meta.requiresAuth)//devuelve la lista de que tengan el meta la propiedad meta y que este a true



  // el  .onAuthStateChanged me devuelve una funcion unsubscribe 
  // y es lo que se almacena en la variable unsubscribe 
  const unsubscribe=auth.onAuthStateChanged((user)=>{
    if (requiresAuth && !user){
      next('/login')
    }
    else if (requiresAuth && user && !user.emailVerified){
        next('/login')
      }
    
    else{
      next()  // para permitir la navegacion a todas las rutas que no requieran autentificacion 
    }
    unsubscribe() 
  })
 

  
  
})


router.beforeEach((to,from,next)=>{
   const requiresAuth=to.matched.some((record)=>record.meta.requiresAuth)
   const unsubscribe=auth.onAuthStateChanged((user)=>{
    if (requiresAuth&&!user){
      next('/register')
    }
    else if(requiresAuth &&user&& !user.emailVerified){
      next('/login')

    }
    else{
      next()
    }
    unsubscribe()
   })
   console.log(from);
   

})
  

/*
router.beforeEach((to,from, next)=>{
  console.log("este se ejecuta antes de redirigir");
  console.log("esta es la ruta desde la cual se hizo la peticion",from);
  console.log("esta es la ruta donde quiere ir el usario ",to);
  // next es una funcion que utilizamos para permitir o bloquear la navegacion
  // hacia una ruta 
  console.log("next ",next);
  //next(false) bloquea la navegacion 
  // next() permite la navegacion 
  if (to.name !== 'login') {
    next('/login')
  } else {
    next() 
  }
  // if (to.path !== '/login') {
  //   next('/login')
  // } else {
  //   next() 
  // }
  

  
  
})
  */





export default router
