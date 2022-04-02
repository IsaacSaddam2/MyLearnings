### installation

npm install -g @angular/cli@latest

ng new my-dream-app

cd my-dream-app

ng serve

ng g c servers

npm install boootstrap3  // give refeerence in angular.json
### Notes

1. In app.module

import {FormsModule} from '@angular/forms';

2. v-model = [(ngModel)]

3. v-bind:disabled/ :disabled = [disabled]  // property binding

4. @click                    = (click)     // event binding

5. v-if                      = *ngIf

6. else demo

7 :class                       [ngclass]

8. v-for= "let item in items"       *ngFor = "let server of servers"
    <p *ngIf = "someMethod(); else idname"> </p>
    <ng-template #idname>
        <p> else data</p>
    </ng-template>

5. For Two-Way-Binding (covered in the next lecture) to work, you need to enable the ngModel  directive. This is done by adding the FormsModule  to the imports[]  array in the AppModule.

You then also need to add the import from @angular/forms  in the app.module.ts file:

import { FormsModule } from '@angular/forms'; 


9. Relative paths and Absolute Paths

servers - relstive path appends to current path

/servers - abolute path from basepath

## How Angular loaded and started

### Routing

import { RouterModule, Routes } from "@angular/router";

const appRoutes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "users",
    component: UsersComponent,
  },
  {
    path: "servers",
    component: ServersComponent,
  },
];

 imports: [BrowserModule, FormsModule, RouterModule.forRoot(appRoutes)],
  providers: [ServersService],
  bootstrap: [AppComponent],
})

<div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <ul class="nav nav-tabs">
        <li role="presentation" class="active"><a routerLink="/">Home</a></li>
        <li role="presentation"><a routerLink="/servers">Servers</a></li>
        <li role="presentation"><a routerLink ="/users">Users</a></li>
      </ul>
    </div>
  </div>
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <router-outlet></router-outlet>
    </div>
</div>


-------------------------------------------------------------------------------------------------

#### Route Stylying

<ul class="nav nav-tabs">
        <li role="presentation"
        routerLinkActive = "active" [routerLinkActiveOptions] = "{exact: true}"
        ><a routerLink="/" 
          >Home</a></li>
        <li role="presentation"
         routerLinkActive = "active"
        ><a routerLink="/servers"
         
          >Servers</a></li>
        <li role="presentation"
        routerLinkActive = "active"
        >
          <a routerLink ="/users"
          >Users</a></li>
      </ul>

------------------------------------------------------------------------------------------------------      
Route Navigation

 // ReLoad(){
  //   this.router.navigate(['servers'], { relativeTo: this.route});
  // }
  ---------------------------------------------------------------------------------------------

  passing and fetching queries

   ngOnInit() {
    this.user.id = this.router.snapshot.params['id'];
    this.user.name = this.router.snapshot.params['name'];
        //for dynamic use below
    this.router.params.subscribe(
      (params: Params)=>{
        this.user.id = params['id'];
        this.user.name = params['name'];
      }
      );
  }
  ------------------------------------------------------------------------------------------------------