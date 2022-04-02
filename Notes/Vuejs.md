npm install @vue/cli

vue --version   

vue create projectname  // create project

code .  // open visual studio code

npm run serve  // to compile the code  also it converts .vue file into pure javascript so that browser can understand

npm run build //  to build

npm install  // to download all the dependencies specifiecs in package.json

crtl+shift+l //multiple select
_________________________________________________________________________________________________________________________________

*********************************************************DashboardProject*********************************************
Steps


1.  npm i -g @vue/cli-init
 vue init [template-name] [project-name]   //vue init webpack-simple vue_weather_dashboard
     To get started:

     cd vue_weather_dashboard
     npm install
     npm run dev
        

____________________________________________________________________________________________________________________________
notes:
1.@submit.prevent will prevent reloading of page 
2. this.$emit('function', arguments)  
3.To communication between two siblings maintain data in parent component
4.this.$slots.slotname will be undefined if we dont pass anything
5. if we call any event and property on custom component it will apply to root element of the component
eg<base-button @click="method></base-button>    

in BaseButton.vue
<template>
//the click event will apply here
<button>
</button>
</template>
________________________________ ________________
1.Vue initial component code:

<template>
    <div>
        <h1>Hello , {{data}}</h1>
    </div>
</template>
<script>
export default {
    name:'Home',
    props:{ data:String} or props:['propertyname']  // used just like as data properties it is configured when we use <Home data=""> </Home>
	or
	props:{ prop1:{
	type:String,
	required:true,
	default:value,
	validator: function(value){ return bool}
	...}, prop2:Int,....}
}
</script>
<style >
    
</style>
______________________________________________
2. Vue basic event

<template>
    <div>
        <button v-on="hello()">
            Click me
        </button>
    </div>
</template>
<script>
export default {
    name:'Event',
    methods: {
        hello(){
            console.log("U click the button!")
            }
    }
    
}
</script>
________________________________________________________
3. Vue condition

steps:1. define v-if ="show" and v-else tags
			2.define data(){return {show:true}}
			<template>
    <div>
        <h1 v-if="show">If statemests</h1>
        <h1 v-else>else statemests</h1>
        <button v-on:click="Display">
            Toggle
        </button>
    </div>
</template>
<script>
export default {
    name:'Event',
    data(){ return {show:true}},
   methods:{Display(){this.show=!this.show;}}
    
}
</script>
<style>
    
</style>
__________________________________________________________
4. Vue forloop

<template>
    <div>
       <table>
           <tr>
               <td>
                 Id  
               </td>
               <td>
                   Name
               </td>
           </tr>
           <tr v-for="user in users" :key="user.id">
               <td>
                    {{user.id}}
               </td>
               <td>
                    {{user.name}}
               </td>
           </tr>
       </table>
    </div>
</template>
<script>
export default {
    name:'Event',
    data(){
        return{
      users:  [
            {id:1,name:"saddam"},
            {id:2,name:"zakir"},
            {id:3,name:"ahmed"},
        ]
        }
    },
    methods: {
        hello(){
            alert("Hello world");
            }
    }
    
}
</script>
<style>
    
</style>
---------------------------------------------------------------------------------------------------

Vue Directives

1.vi-if
2.v-once //only modify once
3.v-on:click  ="functionname"  // onclick event
4.v-bind:disable=true  // to disable a button
5. v-html =property holding any html  // to render hatml
6. v-bind:style="{color:'red'}"
7.v-bind:class="{display:show}"   //class binding with object,class creation will depend on show value
8. v-bind:class="[show?'classname':'classname2']" //class binding with array

9. v-model="property"  //databinding what ever u type in input text it reflects with the property

10. ref="anyname"   ==> to access in vueapp this.$refs.anyname.value

parent to child:
______________
10. <h1  v-bind:<childproperty>="<parentproperty>"> </h1>

Vue shorthands:
______________________________________________
v-on ---->@
v-bind: ---> :

Props:
__________________________________________________________

props are uni directional
data only changed in App.vue not in child.vue i.e., props should not mutataed

______________________________________________________________________________________________________________________________________
Component communication:



Parent to child: use props (custom html attributes)
eg;
parent code  App.vue:
  <section>
    <header>
      <h1>My Friends</h1>
    </header>
    <ul>
      <friend-contact v-for="friend in friends" :key="friend.id" :name="friend.name" :email="friend.email"></friend-contact>
      
    </ul>
  </section>
  
  child code  frinds.vue
  
    <li>
    <h2>{{ friend.name }}</h2>
    <button @click="toggleDetails">{{ detailsAreVisible ? 'Hide' : 'Show' }} Details</button>
    <ul v-if="detailsAreVisible">
      <li>
        <strong>Phone:</strong>
        {{ friend.phone }}
      </li>
      <li>
        <strong>Email:</strong>
        {{ friend.email }}
      </li>
    </ul>
  </li>

//use props when data is coming from parent 
        props:['phone','emial']  //normal form
        //props:[phone:String]   // some validation
        //props:[phone:{
									type:String,
									required:true,
									default:'9701133578
									validator(): function(value){ // regexto check valid number return true or false}
									}]  //more complex


Props behaviour:

1. Props cant be mutated
   once we send value from parent to child the values cannot bo changed
   
   To temporarily solution we can save the value of parentin temporary variable and the use that temporary variable for changed 
   
   Ideal solution is to inform parent that we are want to change then parent change the valueto do this we use 
   $emit method
   
   
********************   Child to parent*********************


this can be achieved by emitting custom events that parent can listen and pass through data through that event

this.$emit('function-name', arguments)

eg; App.vue

 <friend-contact v-for="friend in friends" 
      :key="friend.id" 
      :name="friend.name" 
      :email="friend.email" 
      :phone-number="friend.phone" 
      :is-favourite="friend.isFavourite"
      :id="friend.id"
      @toggle-favourite="someFunction"
      ></friend-contact>


 someFunction(id)
    {
       // alert("its working");
        const friend= this.friends.find(x=>x.id==id);  //to find object in a list
        
        friend.isFavourite=!friend.isFavourite;
    }
	
	friendcontact.vue
	
	   toggleFavourite(){
      //this.isFavourite=!this.isFavourite;  // we cant change props value here
      //temporarysolution
      //this.temporary=!this.temporary;
         this.$emit('toggle-favourite', this.id);
    }
	
	emits:[emitlist.....]  // to tell developers available events in that component
	or
	emits:{
	             'funtion-name':function(id){}
				 }
				 
				 
	-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------			 
				 
				 Prop / Event Fallthrough & Binding All Props
There are two advanced concepts you also should have heard about:

Prop Fallthrough

Binding All Props on a Component

Prop Fallthrough
You can set props (and listen to events) on a component which you haven't registered inside of that component.

For example:

BaseButton.vue

<template>  
  <button>
    <slot></slot>
  </button>
</template>
 
<script>export default {}</script>
This button component (which might exist to set up a button with some default styling) has no special props that would be registered.

Yet, you can use it like this:

<base-button type="submit" @click="doSomething">Click me</base-button>
Neither the type prop nor a custom click event are defined or used in the BaseButton component.

Yet, this code would work.

Because Vue has built-in support for prop (and event) "fallthrough".

Props and events added on a custom component tag automatically fall through to the root component in the template of that component. In the above example, type and @click get added to the <button> in the BaseButton component.

You can get access to these fallthrough props on a built-in $attrs property (e.g. this.$attrs).

This can be handy to build "utility" or pure presentational components where you don't want to define all props and events individually.

You'll see this in action the component course project ("Learning Resources App") later.

You can learn more about this behavior here: https://v3.vuejs.org/guide/component-attrs.html

Binding all Props
There is another built-in feature/ behavior related to props.

If you have this component:

UserData.vue

<template>
  <h2>{‌{ firstname }} {‌{ lastname }}</h2>
</template>
 
<script>
  export default {
    props: ['firstname', 'lastname']
  }
</script>
You could use it like this:

<template>
  <user-data :firstname="person.firstname" :lastname="person.lastname"></user-data>
</template>
 
<script>
  export default {
    data() {
      return {
        person: { firstname: 'Max', lastname: 'Schwarz' }
      };
    }
  }
</script>
But if you have an object which holds the props you want to set as properties, you can also shorten the code a bit:

<template>
  <user-data v-bind="person"></user-data>
</template>
 
<script>
  export default {
    data() {
      return {
        person: { firstname: 'Max', lastname: 'Schwarz' }
      };
    }
  }
</script>
With v-bind="person" you pass all key-value pairs inside of person as props to the component. That of course requires person to be a JavaScript object.

This is purely optional but it's a little convenience feature that could be helpful.

Resources for this lecture
adv-props.pdf
Fullscreen
Expanded view
Go to Previous lecture95. Defining &

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 <ul>
       <!-- use the custom event which we emits in this component  use kabab case everywnere-->
        <!--
        we can pass all these props with v-bind=friend (all props will enter in v-bind make sure names are same in both parrties)
      :name="friend.name" 
      :email="friend.email" 
      :phone-number="friend.phone" 
      :is-favourite="friend.isFavourite"
      :id="friend.id" -->
      <friend-contact v-for="friend in friends" 
      :key="friend.id" 
       v-bind="friend"
      @toggle-favourite="someFunction"
      ></friend-contact>
      <!-- <friend-contact name="Saddam" email="Saddam@gmail.com" phone-number="9976550"></friend-contact> -->
      
    </ul>
	_______________________________________________________________________________________________________________________________________
	***********************************************************Scoped and Global components******************************************
	Scoped: only used in that component to register it 
	  1.import the component
       2. in export default{ components:'componentName'}	
	  3. using the component
  <componentName/>
or
<component-name><component-name/>  
	  
	  ______________________________________________________________________________________________________________________________________
	  *********************************Slot**************************
	  
	  Slot is used to wrap content with predefined styling
	  
	  eg>
	  card-slot.vue:
	  
	  <template>
    <section>
      <slot></slot>
        <!-- The content will be wrapped in a card style int slot -->
    </section>
</template>
<script>
export default {
    
}
</script>
<style scoped>
 section {
  margin: 2rem auto;
  max-width: 30rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
} 
    
</style>

//It is used to wrap any compomenet
-----------------------------------------------------------
BadgeList.vue:

<card-slot>
  <section>
    <h2>Available Badges</h2>
    <ul>
      <li>
        <base-badge type="admin" caption="ADMIN"></base-badge>
      </li>
      <li>
        <base-badge type="author" caption="AUTHOR"></base-badge>
      </li>
    </ul>
  </section>
</card-slot>

----------------------------------------------------------------
******************************Named Slots******************
<cardslot>
<slot name="anyname"> </slot>
</cardslot>

to put data--   
<cardslot>
  <template v-slot:anyname > or #anyname
  //code
  <template/>
  any code 
 </cardslot>
 
______________________________________________________________________________________________________________________________________

****************************************Provide and Inject*****************************************
in Child Components
export default {
    //fetch the value from provider component with the key
  inject: ['resources'],
  components: {
    LearningResource
  }

inParent component export defalt
 //this will give access to every child of this component 
    provide(){

return{
    resources:this.storedResources
}
    }


Note:***  we can aslo pass pointer to function in parent component to all child components 
eg

in parent 

 //this will give access to every child of this component
    provide(){

return {
    resources:this.storedResources,
    addResource:this.resourceAdd,
    
    
};

in export metods
resourceAdd(title, description, url) {
      const newResource = {
        id: new Date().toISOString(),
        title: title,
        description: description,
        link: url,
      };
      this.storedResources.unshift(newResource);
      this.selectedTab = 'stored-resources';
    }


in child 

export default {
  inject: ['addResource'],
  methods: {
    submitData() {
        // alert("triggerd")
        const enteredTitle = this.$refs.titleInput.value;
      const enteredDescription = this.$refs.descInput.value;
      const enteredUrl = this.$refs.linkInput.value;

      this.addResource(enteredTitle, enteredDescription, enteredUrl);
        
    
    },
	
	Note2** when deleting the item in a array which provided to all child make sure it doesnt override meand stoted procedure = some other value
	
	use this method
	
	 resourceDelete(id)
        {
            var i= this.storedResources.findIndex(x=>x.id==id);
            this.storedResources.splice(i,1);

        }, 

********************************************************************use of refs instead of v-model*********************************

<input type="text"  refs="username"/>

export default{
methods:{

useData(){

const name=this.$refs.username.value      // it will always have the value that user entered
}



********************************************************************BaseCard********************************************************
<template>
    <div>
        <slot></slot>
    </div>
</template>
<script>
export default {
    
}
</script> 
<style scoped>
    div {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  margin: 2rem auto;
  max-width: 40rem;
}
</style>

************************************************************************BaseButton*****************************************************
<template>
  <button
    v-if="name == 'stored-resources' || name == 'add-resource'"
    :type="type"
    :class="mode"
    @click="$emit('changeTab', name)"
  >
    <slot></slot>

  </button>

  <button v-else :type="type" :class="mode">
    <slot></slot>
  </button>
  
</template>
<script>
export default {
  props: ["type", "mode", "name"],
};
</script>
<style>
button {
  padding: 0.75rem 1.5rem;
  font-family: inherit;
  background-color: #3a0061;
  border: 1px solid #3a0061;
  color: white;
  cursor: pointer;
}

button:hover,
button:active {
  background-color: #270041;
  border-color: #270041;
}

.flat {
  background-color: transparent;
  color: #3a0061;
  border: none;
}

.flat:hover,
.flat:active {
  background-color: #edd2ff;
}
</style>

Note:::
427

If you want to listen to a native event on the root element of a component, you have to use the .native modifier for v-on, like following:

<template>
  <div id="app">
    <test v-on:click.native="testFunction"></test>
  </div>
</template>
or in shorthand, as suggested in comment, you can as well do:

<template>
  <div id="app">
    <test @click.native="testFunction"></test>
  </div>
</template>
***************************************************************BaseDialog**********************************************





*****************************************************************Firebase connectivity***************************************************
Goto firebase.google.com
create project
disable analytics
goto build > realtime database>start in test mode

**sending http request to database *******************************

by default form send http request to the same local address

get the url fromfirebase database

axios is the ideal package used to send http requests from javascript

however browsers have built-in methods to send httprequests eg fetch()

fetch() send the httprequest without reloading 
   fetch('https://vue-http-demo-49b8e-default-rtdb.firebaseio.com/')
   
   to the link add some name as survey.json its a fiebase requirement
   
   fetch('https://vue-http-demo-49b8e-default-rtdb.firebaseio.com/survey.json')
   
   for posting data we need to pass configurations for method, header and body
   

   fetch('https://vue-http-demo-49b8e-default-rtdb.firebaseio.com/survey.json',{
   
   method:POST,
   headers:{'ContentType':'application/json'},
   body: JSON.stringify({name:this.enteredName, rating: this.chosenRating})
   }
   )
   ****************with axios*********************
   Instead of:

fetch('https://vue-http-demo-85e9e.firebaseio.com/surveys.json', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: this.enteredName,
    rating: this.chosenRating,
  }),
});
you can write this code with Axios:

import axios from 'axios'; // at the start of your <script> tag, before you "export default ..."
...
axios.post('https://vue-http-demo-85e9e.firebaseio.com/surveys.json', {
  name: this.enteredName,
  rating: this.chosenRating,
});
As you can see, with Axios, you have to write less code. It automatically sets the Content-Type header for you, it also automatically converts the body data to JSON.

BUT - as a downside - you have to add an extra package

*********************************************************8getting data from firebase*********************************

fetch('https://vue-http-demo-85e9e.firebaseio.com/surveys.json')   // this will return a promise(status codes) based on that we can tell sucess or not

refer this link https://vuejs.org/v2/cookbook/using-axios-to-consume-apis.html

  axios
      .get('https://vue-http-demo-49b8e-default-rtdb.firebaseio.com/survey.json')
      .then(response => (console.log(response)))

Te result is:{data: {…}, status: 200, statusText: "OK", headers: {…}, config: {…}, …}
config: {url: "https://vue-http-demo-49b8e-default-rtdb.firebaseio.com/survey.json", method: "get", headers: {…}, transformRequest: Array(1), transformResponse: Array(1), …}
data:
-Ma9ca1RmcDcfOgcFnMR: {name: "Kouthalam Saddam Hussain", rating: "average"}
-Ma9fU_JfcGLJialfI7F: {name: "Wedding Invitation", rating: "poor"}
__proto__: Object
headers: {cache-control: "no-cache", content-length: "148", content-type: "application/json; charset=utf-8"}
request: XMLHttpRequest {readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, onreadystatechange: ƒ, …}
status: 200
statusText: "OK"
__proto__: Object

  axios
      .get('https://vue-http-demo-49b8e-default-rtdb.firebaseio.com/survey.json')
      .then((response)=>{
         //console.log(response.data['-Ma9ca1RmcDcfOgcFnMR'].name)
           const result=[];
         for(var id in response.data)
         {
          //  console.log(response.data[id].name)
           result.push({
             id:response.data[id],
             name:response.data[id].name,
             rating:response.data[id].rating
           });
         }
         this.results=result;
         
         })
         console.log(this.results[1]);



______________________________________________________________________________________________________________________________________
********************************************************Error response Message***********************************************

      this.error = null;
      fetch('https://vue-http-demo-85e9e.firebaseio.com/surveys.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.enteredName,
          rating: this.chosenRating,
        }),
      })
        .then((response) => {
          if (response.ok) {
            // ...
          } else {
            throw new Error('Could not save data!');
          }
        })
        .catch((error) => {
          console.log(error);
          this.error = error.message;
        });
		
		*************************************************************Routing**************************************************************
		
		Why routing?
		
		
		routing help us to reflects the url with respective state we are in the application and also we can share this url to other user 
		to be able to redirect to that state of application
		
		
		How?

		command:   npm install --save vue-router@next
		
		//import { function } from package
import {createRouter, createWebHistory} from 'vue-router'

import App from './App.vue';

const router = createRouter(
    {
        history:createWebHistory(),  // this used to reert back from page the fuction uses builtin mechanism of browser
        routes:[]   //all routes for components
    }
);

***************************************routing link******************************
  <nav>
      <ul>
        <li>
          <router-link to="/teams">Teams</router-link>
        </li>
        <li>
          <router-link to="/users">Users</router-link>
        </li>
      </ul>
    </nav>
	********************************router-view********************************
	 <the-navigation></the-navigation>
  <main>
    <router-view></router-view>
  </main>
  
  ****************************router register***************************
  import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/teams', component: TeamsList }, // our-domain.com/teams => TeamsList
    { path: '/users', component: UsersList },
    { path: '/',  redirect:'\teams' },   // if path is / then it will redirect alternative way is adding alias   { path: '/teams', component: TeamsList , alias:'/'},
	    { path: '/teams/:teamId', component: TeamMembers , props:true}
  ]
});

const app = createApp(App)

app.use(router);

app.mount('#app');
*****************************************navigating programitacally********************************
<template>
  <button @click="confirmInput">Confirm</button>
  <ul>
    <user-item v-for="user in users" :key="user.id" :name="user.fullName" :role="user.role"></user-item>
  </ul>
</template>

  methods: {
    confirmInput() {
      // do something
      this.$router.push('/teams');
    }
  }
  *********************************************************dynamic routing****************************
   <template>
  <section>
    <h2>{{ teamName }}</h2>
    <ul>
      <user-item
        v-for="member in members"
        :key="member.id"
        :name="member.fullName"
        :role="member.role"
      ></user-item>
    </ul>
  </section>
</template>


   data() {
    return {
      teamName: '',
      members: []
    };
	
	 
   created() {
    // this.$route.path // /teams/t1  
    const teamId = this.$route.params.teamId;
    const selectedTeam = this.teams.find(team => team.id === teamId);
    const members = selectedTeam.members;
    const selectedMembers = [];
    for (const member of members) {
      const selectedUser = this.users.find(user => user.id === member);
      selectedMembers.push(selectedUser);
    }
    this.members = selectedMembers;
    this.teamName = selectedTeam.name;
  }
  
  ******************************************************nested routes*****************************************
  
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/teams' },
    {
      name: 'teams',  //gives name 
      path: '/teams',
      component: TeamsList,
      children: [   // need to add <route-view> tag inside the TeamList component to ,oad the child route componnt
        { name: 'team-members', path: ':teamId', component: TeamMembers, props: true } // /teams/t1
      ]
    }, // our-domain.com/teams => TeamsList
    { path: '/users', component: UsersList },

    { path: '/:notFound(.*)', component: NotFound }
  ],
  linkActiveClass: 'active'
});

*****************************************************name routing******************************************

 <router-link :to="teamMembersLink">View Members</router-link>
 
  computed: {
    teamMembersLink() {
      // return '/teams/' + this.id;
      return { name: 'team-members', params: { teamId: this.id }, query:{sort:'asc'} };
      // this.$router.push({ name: 'team-members', params: { teamId: this.id } });
    }
  }
  
  this.$route.query//to access the query
  
  ******************************************************178. Rendering Multiple Routes with Named Router Views*************************************************
  
  1.create userfooter and teams footer component
  
  2.in main.js
  
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/teams' },
    {
      name: 'teams',
      path: '/teams',
      components: { default: TeamsList, footer: TeamsFooter },
      children: [
        {
          name: 'team-members',
          path: ':teamId',
          component: TeamMembers,
          props: true
        } // /teams/t1
      ]
    }, // our-domain.com/teams => TeamsList
    {
      path: '/users',
      components: {
        default: UsersList,
        footer: UsersFooter
      }
    },
    { path: '/:notFound(.*)', component: NotFound }
  ],
  linkActiveClass: 'active'
});

const app = createApp(App)
  
  3. In App.vue
  <template>
  <the-navigation></the-navigation>
  <main>
    <router-view></router-view>
  </main>
  <footer>
    <router-view name="footer"></router-view>
  </footer>
</template>

*************************************************************Installing vuex**********************************************
npm install  --save vuex/@next

import {createStore} from 'vuex'  //first step

//2.create a store
const store = createStore(
    {
        state(){
            return{
                counter:0
            }
        }
    }
)

//step3 use store
app.use(store);

<template>
  <base-container title="Vuex">
  <h2>{{$store.state.counter}}</h2>
  <button @click="$store.state.counter++">Add 1</button>  
  </base-container>
</template>
*********************************************************mutations**************************************
const store = createStore(
    {
        state(){
            return{
                counter:0
            }
        },
        //to call this use $store.commit('increment')
        mutations:{
            increment(state)
            {
                state.counter++;
            }
        }
    }
)
****************************************************Getters*******************************************
<template>
  <h3>{{ counter }}</h3>
  <p>We do more...</p>
</template>
<script>
export default {
  computed: {
    counter() {
      return this.$store.getters.normalizedCounter;
    },
  },
};
</script>

In main.js

  getters: {
    finalCounter(state) {
      return state.counter * 3;
    },
	// _ represent argument is expected but not passed intentionally
    normalizedCounter(_, getters) {
      const finalCounter = getters.finalCounter;
      if (finalCounter < 0) {
        return 0;
      }
      if (finalCounter > 100) {
        return 100;
      }
      return finalCounter;
    }
  }
});

****************************************************Actions********************************************
	  
	  strore =createStore({
	  state(){  return { }},  // stores all state variables 
	  mutations: {  mehod1()state{}}, // methods to cange states
	  getters:{ }, // method to access state
	  actions:{}, //  method to call mutations in async code
	  modules:{} // to merge different store modules
	  namespace:true
	  })
	  
	 