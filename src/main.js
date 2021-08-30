import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';

import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './components/nav/NotFound.vue';
import TeamsFooter from './components/teams/TeamsFooter.vue';
import UsersFooter from './components/users/UsersFooter.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/teams'
    },
    {
      name: 'teams',
      path: '/teams',
      //   component: TeamsList,
      //adding multipe components for mulitple router-views
      components: {
        default: TeamsList,
        // depending on the given name to the router view,
        // which is in this case footer
        footer: TeamsFooter
      },
      children: [
        // nested routing, which means it is gonna render inside the same page
        // where the parent is
        {
          name: 'team-members',
          path: ':teamId',
          component: TeamMembers,
          props: true
        }
      ]
    },
    {
      path: '/users',
      //   component: UsersList,
      components: {
        default: UsersList,
        footer: UsersFooter
      },
      // this method is similar to before each, but this only fire
      // when routing to this specific route
      beforeEnter(to, from, next) {
        console.log('you are allowed to route into users');
        next();
      }
    },

    // you can wirte any name you want insted of notFound
    {
      path: '/:notFound(.*)',
      component: NotFound
    }
  ],
  linkActiveClass: 'active',
  //i'v used _ and _2 just to reach the third argument without the need to use
  // to use the first 2 arguments
  scrollBehavior(_, _2, savedPosition) {
    //   console.log(to,from ,savedPosition)
    //it is usually undiefined but, when we go back it gets value,
    // in the written function below it will go back to same positon
    if (savedPosition) {
      return savedPosition;
    }
    return {
      righ: 0,
      top: 0
    };
  }
});

router.beforeEach((to, from, next) => {
  console.log('global');
  console.log(to, from);
  // to not allow the routing to contiue
  // next(false)
  // to allow the routing to continue ,
  next();
  //another ways of utilzing next()
  // next('/somewhere')
  // next({name:'somethine", params:{someId:'d1'}})
  // it is better to redirect with next() condtionally, other wise
  // we are going to end up in a loop
});

// router.afterEach((to, from) => {
router.afterEach((_, _2) => {
  //good for sending anlaytic data
  // you dont use to control what user sees because it is too late 
});
const app = createApp(App);

app.use(router);

app.mount('#app');
