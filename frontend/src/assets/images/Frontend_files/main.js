// src/main.ts
import { bootstrapApplication } from "/@fs/Users/cole/Desktop/Online_Ordering_Workspace/Restraunt_Ordering_App/frontend/.angular/cache/17.3.3/vite/deps/@angular_platform-browser.js?v=6d55d485";

// src/app/app.config.ts
import { provideRouter } from "/@fs/Users/cole/Desktop/Online_Ordering_Workspace/Restraunt_Ordering_App/frontend/.angular/cache/17.3.3/vite/deps/@angular_router.js?v=6d55d485";

// src/app/pages/login/login.component.ts
import { Component } from "/@fs/Users/cole/Desktop/Online_Ordering_Workspace/Restraunt_Ordering_App/frontend/.angular/cache/17.3.3/vite/deps/@angular_core.js?v=6d55d485";
import { FormsModule } from "/@fs/Users/cole/Desktop/Online_Ordering_Workspace/Restraunt_Ordering_App/frontend/.angular/cache/17.3.3/vite/deps/@angular_forms.js?v=6d55d485";
import { RouterOutlet } from "/@fs/Users/cole/Desktop/Online_Ordering_Workspace/Restraunt_Ordering_App/frontend/.angular/cache/17.3.3/vite/deps/@angular_router.js?v=6d55d485";
import * as i02 from "/@fs/Users/cole/Desktop/Online_Ordering_Workspace/Restraunt_Ordering_App/frontend/.angular/cache/17.3.3/vite/deps/@angular_core.js?v=6d55d485";
import * as i12 from "/@fs/Users/cole/Desktop/Online_Ordering_Workspace/Restraunt_Ordering_App/frontend/.angular/cache/17.3.3/vite/deps/@angular_router.js?v=6d55d485";

// src/app/services/session.service.ts
import { Injectable } from "/@fs/Users/cole/Desktop/Online_Ordering_Workspace/Restraunt_Ordering_App/frontend/.angular/cache/17.3.3/vite/deps/@angular_core.js?v=6d55d485";
import * as i0 from "/@fs/Users/cole/Desktop/Online_Ordering_Workspace/Restraunt_Ordering_App/frontend/.angular/cache/17.3.3/vite/deps/@angular_core.js?v=6d55d485";
import * as i1 from "/@fs/Users/cole/Desktop/Online_Ordering_Workspace/Restraunt_Ordering_App/frontend/.angular/cache/17.3.3/vite/deps/@angular_common_http.js?v=6d55d485";
var _SessionService = class _SessionService {
  constructor(http) {
    this.http = http;
    this.apiUrl = "http://localhost:3000/session/";
  }
  login(email, password) {
    return this.http.post(this.apiUrl + "login", { email, password }, { withCredentials: true });
  }
  logout() {
    return this.http.get(this.apiUrl + "logout", { responseType: "text", withCredentials: true });
  }
};
_SessionService.\u0275fac = function SessionService_Factory(t) {
  return new (t || _SessionService)(i0.\u0275\u0275inject(i1.HttpClient));
};
_SessionService.\u0275prov = /* @__PURE__ */ i0.\u0275\u0275defineInjectable({ token: _SessionService, factory: _SessionService.\u0275fac, providedIn: "root" });
var SessionService = _SessionService;

// src/app/pages/login/login.component.ts
import * as i3 from "/@fs/Users/cole/Desktop/Online_Ordering_Workspace/Restraunt_Ordering_App/frontend/.angular/cache/17.3.3/vite/deps/@angular_forms.js?v=6d55d485";
var _LoginComponent = class _LoginComponent {
  constructor(router, sessionService) {
    this.router = router;
    this.sessionService = sessionService;
    this.user = {
      email: "",
      password: ""
    };
  }
  onSubmit() {
    this.sessionService.login(this.user.email, this.user.password).subscribe({
      next: (response) => {
        console.log("Login successful:", response.role + " role");
        const role = response.role;
        if (role === "admin")
          this.router.navigate(["/admin"]);
        else if (role === "owner")
          this.router.navigate(["/owner"]);
        else {
          console.error("Unexpected user role:", role);
          this.router.navigate(["/"]);
        }
      },
      error: (error) => {
        console.error("Login failed", error);
      }
    });
  }
};
_LoginComponent.\u0275fac = function LoginComponent_Factory(t) {
  return new (t || _LoginComponent)(i02.\u0275\u0275directiveInject(i12.Router), i02.\u0275\u0275directiveInject(SessionService));
};
_LoginComponent.\u0275cmp = /* @__PURE__ */ i02.\u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], standalone: true, features: [i02.\u0275\u0275StandaloneFeature], decls: 16, vars: 2, consts: [[1, "loginPageContainer"], [1, "leftContainer"], [1, "textContainer"], ["title", "logo", "src", "../../../assets/images/OnlineOrderingImage-removebg-preview.png", 1, "logo"], [3, "ngSubmit"], [1, "formInputContainer"], ["type", "email", "name", "email", "placeholder", "Email", "required", "", 1, "formInput", 3, "ngModelChange", "ngModel"], ["type", "password", "name", "password", "placeholder", "Password", "required", "", 1, "formInput", 3, "ngModelChange", "ngModel"], ["type", "submit", 1, "formInputLogin"], ["href", "", 1, "forgotPassword"], [1, "rightContainer"], ["title", "OnlineOrderingImage", "src", "../../../assets/images/OnlineOrderingImage-removebg-preview.png", 1, "image"]], template: function LoginComponent_Template(rf, ctx) {
  if (rf & 1) {
    i02.\u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
    i02.\u0275\u0275element(3, "img", 3);
    i02.\u0275\u0275elementStart(4, "h1");
    i02.\u0275\u0275text(5, "Login");
    i02.\u0275\u0275elementEnd();
    i02.\u0275\u0275elementStart(6, "form", 4);
    i02.\u0275\u0275listener("ngSubmit", function LoginComponent_Template_form_ngSubmit_6_listener() {
      return ctx.onSubmit();
    });
    i02.\u0275\u0275elementStart(7, "div", 5)(8, "input", 6);
    i02.\u0275\u0275twoWayListener("ngModelChange", function LoginComponent_Template_input_ngModelChange_8_listener($event) {
      i02.\u0275\u0275twoWayBindingSet(ctx.user.email, $event) || (ctx.user.email = $event);
      return $event;
    });
    i02.\u0275\u0275elementEnd();
    i02.\u0275\u0275elementStart(9, "input", 7);
    i02.\u0275\u0275twoWayListener("ngModelChange", function LoginComponent_Template_input_ngModelChange_9_listener($event) {
      i02.\u0275\u0275twoWayBindingSet(ctx.user.password, $event) || (ctx.user.password = $event);
      return $event;
    });
    i02.\u0275\u0275elementEnd();
    i02.\u0275\u0275elementStart(10, "button", 8);
    i02.\u0275\u0275text(11, "Login");
    i02.\u0275\u0275elementEnd();
    i02.\u0275\u0275elementStart(12, "a", 9);
    i02.\u0275\u0275text(13, "Forgot Password?");
    i02.\u0275\u0275elementEnd()()()()();
    i02.\u0275\u0275elementStart(14, "div", 10);
    i02.\u0275\u0275element(15, "img", 11);
    i02.\u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    i02.\u0275\u0275advance(8);
    i02.\u0275\u0275twoWayProperty("ngModel", ctx.user.email);
    i02.\u0275\u0275advance();
    i02.\u0275\u0275twoWayProperty("ngModel", ctx.user.password);
  }
}, dependencies: [FormsModule, i3.\u0275NgNoValidate, i3.DefaultValueAccessor, i3.NgControlStatus, i3.NgControlStatusGroup, i3.RequiredValidator, i3.NgModel, i3.NgForm], styles: ["\n\n.loginPageContainer[_ngcontent-%COMP%] {\n  margin: 0;\n  width: 100vw;\n  height: 100vh;\n  overflow: none;\n  display: flex;\n  justify-content: left;\n  flex-direction: row;\n}\n.leftContainer[_ngcontent-%COMP%] {\n  background-color: #121212;\n  width: 40vw;\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  align-content: center;\n}\n.leftContainer[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%] {\n  height: 30%;\n  background-color: #1E1E1E;\n  width: 50%;\n}\n.leftContainer[_ngcontent-%COMP%]   .textContainer[_ngcontent-%COMP%] {\n  color: white;\n  background-color: #1E1E1E;\n  text-align: center;\n  height: 65%;\n  width: 60%;\n  align-content: center;\n  justify-content: center;\n  align-items: center;\n}\n.leftContainer[_ngcontent-%COMP%]   .textContainer[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  color: #CF6679;\n  background-color: #1E1E1E;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  font-size: 50px;\n  margin-top: -10px;\n  margin-bottom: 10px;\n}\n.leftContainer[_ngcontent-%COMP%]   .textContainer[_ngcontent-%COMP%]   .formInputContainer[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  padding-top: 10px;\n  background-color: #1E1E1E;\n}\n.leftContainer[_ngcontent-%COMP%]   .textContainer[_ngcontent-%COMP%]   .formInputContainer[_ngcontent-%COMP%]   .formInput[_ngcontent-%COMP%] {\n  color: white;\n  background-color: #333333;\n  text-decoration: none;\n  width: 70%;\n  height: 5vh;\n  border-radius: 50px;\n  font-size: 16px;\n  border: none;\n  text-align: center;\n  margin: 10px;\n}\n.leftContainer[_ngcontent-%COMP%]   .textContainer[_ngcontent-%COMP%]   .formInputContainer[_ngcontent-%COMP%]   .formInputLogin[_ngcontent-%COMP%] {\n  color: white;\n  font-size: 18px;\n  background-color: #CF6679;\n  border-radius: 50px;\n  border: none;\n  width: 60%;\n  height: 5vh;\n  margin-top: 20px;\n}\n.leftContainer[_ngcontent-%COMP%]   .textContainer[_ngcontent-%COMP%]   .formInputContainer[_ngcontent-%COMP%]   .forgotPassword[_ngcontent-%COMP%] {\n  text-decoration: none;\n  color: #CF6679;\n  margin-top: 20px;\n  font-size: 16px;\n}\n.rightContainer[_ngcontent-%COMP%] {\n  background-color: #1E1E1E;\n  width: 60vw;\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n}\n.rightContainer[_ngcontent-%COMP%]   .image[_ngcontent-%COMP%] {\n  object-fit: contain;\n  margin-right: 2vw;\n  background-color: #1E1E1E;\n  height: 100%;\n  width: 90%;\n}\n/*# sourceMappingURL=login.component.css.map */"] });
var LoginComponent = _LoginComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i02.\u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent" });
})();

// src/app/pages/admin/admin.component.ts
import { Component as Component2 } from "/@fs/Users/cole/Desktop/Online_Ordering_Workspace/Restraunt_Ordering_App/frontend/.angular/cache/17.3.3/vite/deps/@angular_core.js?v=6d55d485";
import { finalize } from "/@fs/Users/cole/Desktop/Online_Ordering_Workspace/Restraunt_Ordering_App/frontend/.angular/cache/17.3.3/vite/deps/rxjs.js?v=6d55d485";
import { CommonModule, NgFor } from "/@fs/Users/cole/Desktop/Online_Ordering_Workspace/Restraunt_Ordering_App/frontend/.angular/cache/17.3.3/vite/deps/@angular_common.js?v=6d55d485";
import * as i04 from "/@fs/Users/cole/Desktop/Online_Ordering_Workspace/Restraunt_Ordering_App/frontend/.angular/cache/17.3.3/vite/deps/@angular_core.js?v=6d55d485";

// src/app/services/restaurant.service.ts
import { Injectable as Injectable2 } from "/@fs/Users/cole/Desktop/Online_Ordering_Workspace/Restraunt_Ordering_App/frontend/.angular/cache/17.3.3/vite/deps/@angular_core.js?v=6d55d485";
import * as i03 from "/@fs/Users/cole/Desktop/Online_Ordering_Workspace/Restraunt_Ordering_App/frontend/.angular/cache/17.3.3/vite/deps/@angular_core.js?v=6d55d485";
import * as i13 from "/@fs/Users/cole/Desktop/Online_Ordering_Workspace/Restraunt_Ordering_App/frontend/.angular/cache/17.3.3/vite/deps/@angular_common_http.js?v=6d55d485";
var _RestaurantService = class _RestaurantService {
  constructor(http) {
    this.http = http;
    this.baseUrl = "http://localhost:3000/admin/restaurants";
  }
  createRestaurant(restaurantData) {
    return this.http.post(`${this.baseUrl}`, restaurantData, { withCredentials: true });
  }
  getRestaurantById(id) {
    return this.http.get(`${this.baseUrl}/${id}`, { withCredentials: true });
  }
  updateRestaurant(id, restaurant) {
    return this.http.put(`${this.baseUrl}/${id}`, restaurant, { withCredentials: true });
  }
  deleteRestaurant(id) {
    return this.http.delete(`${this.baseUrl}/${id}`, { withCredentials: true });
  }
  getAllRestaurants() {
    return this.http.get(`${this.baseUrl}`, { withCredentials: true });
  }
};
_RestaurantService.\u0275fac = function RestaurantService_Factory(t) {
  return new (t || _RestaurantService)(i03.\u0275\u0275inject(i13.HttpClient));
};
_RestaurantService.\u0275prov = /* @__PURE__ */ i03.\u0275\u0275defineInjectable({ token: _RestaurantService, factory: _RestaurantService.\u0275fac, providedIn: "root" });
var RestaurantService = _RestaurantService;

// src/app/pages/admin/admin.component.ts
import * as i2 from "/@fs/Users/cole/Desktop/Online_Ordering_Workspace/Restraunt_Ordering_App/frontend/.angular/cache/17.3.3/vite/deps/@angular_material_dialog.js?v=6d55d485";
import * as i32 from "/@fs/Users/cole/Desktop/Online_Ordering_Workspace/Restraunt_Ordering_App/frontend/.angular/cache/17.3.3/vite/deps/@angular_common_http.js?v=6d55d485";
import * as i4 from "/@fs/Users/cole/Desktop/Online_Ordering_Workspace/Restraunt_Ordering_App/frontend/.angular/cache/17.3.3/vite/deps/@angular_router.js?v=6d55d485";
var _AdminComponent = class _AdminComponent {
  constructor(restaurantService, dialog, http, router, sessionService) {
    this.restaurantService = restaurantService;
    this.dialog = dialog;
    this.http = http;
    this.router = router;
    this.sessionService = sessionService;
    this.restaurants = [];
    this.filteredRestaurants = [];
    this.selectedRestaurant = null;
    this.totalIncome = 0;
  }
  ngOnInit() {
    this.loadRestaurants();
  }
  loadRestaurants() {
    this.restaurantService.getAllRestaurants().subscribe((data) => {
      this.restaurants = data.restaurants;
      console.log("Restaurants loaded successfully:", this.restaurants);
    }, (error) => {
      console.error("Error loading restaurants:", error);
    });
  }
  searchRestaurants(inputElement) {
    const searchTerm = inputElement.value;
  }
  addRestaurant() {
    this.router.navigate(["/addRestaurant"]);
  }
  selectRestaurant(restaurant) {
  }
  logout() {
    this.sessionService.logout().pipe(finalize(() => this.router.navigate(["/login"]))).subscribe({
      next: () => console.log("Logged out successfully"),
      error: (error) => console.error("Logout failed:", error)
    });
  }
};
_AdminComponent.\u0275fac = function AdminComponent_Factory(t) {
  return new (t || _AdminComponent)(i04.\u0275\u0275directiveInject(RestaurantService), i04.\u0275\u0275directiveInject(i2.MatDialog), i04.\u0275\u0275directiveInject(i32.HttpClient), i04.\u0275\u0275directiveInject(i4.Router), i04.\u0275\u0275directiveInject(SessionService));
};
_AdminComponent.\u0275cmp = /* @__PURE__ */ i04.\u0275\u0275defineComponent({ type: _AdminComponent, selectors: [["app-admin"]], standalone: true, features: [i04.\u0275\u0275StandaloneFeature], decls: 8, vars: 0, consts: [[1, "adminContainer"], ["type", "text", "placeholder", "Search by restaurant unique name...", 1, "searchbar", 3, "input"], [1, "topButtons"], ["aria-label", "addRestaurant", 1, "button", 3, "click"], ["aria-label", "logout", 1, "button", 3, "click"], [1, "restaurants-container"]], template: function AdminComponent_Template(rf, ctx) {
  if (rf & 1) {
    i04.\u0275\u0275elementStart(0, "div", 0)(1, "input", 1);
    i04.\u0275\u0275listener("input", function AdminComponent_Template_input_input_1_listener($event) {
      return ctx.searchRestaurants($event.target.value);
    });
    i04.\u0275\u0275elementEnd();
    i04.\u0275\u0275elementStart(2, "div", 2)(3, "button", 3);
    i04.\u0275\u0275listener("click", function AdminComponent_Template_button_click_3_listener() {
      return ctx.addRestaurant();
    });
    i04.\u0275\u0275text(4, "Add New");
    i04.\u0275\u0275elementEnd();
    i04.\u0275\u0275elementStart(5, "button", 4);
    i04.\u0275\u0275listener("click", function AdminComponent_Template_button_click_5_listener() {
      return ctx.logout();
    });
    i04.\u0275\u0275text(6, "Logout");
    i04.\u0275\u0275elementEnd()();
    i04.\u0275\u0275element(7, "div", 5);
    i04.\u0275\u0275elementEnd();
  }
}, dependencies: [CommonModule], styles: ["\n\n.adminContainer[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto auto;\n  justify-content: space-between;\n  align-items: center;\n  margin: 20px;\n}\n.adminContainer[_ngcontent-%COMP%]   .searchbar[_ngcontent-%COMP%] {\n  width: 60vw;\n  height: 5vh;\n  background-color: #f9f9f9;\n  border-radius: 20px;\n  padding-left: 2%;\n}\n.adminContainer[_ngcontent-%COMP%]   .topButtons[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-start;\n}\n.adminContainer[_ngcontent-%COMP%]   .topButtons[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%] {\n  width: 6vw;\n  height: 5vh;\n  border-radius: 20px;\n  margin-right: 20px;\n  background-color: #CF6679;\n  color: white;\n  text-align: center;\n  cursor: pointer;\n}\n.adminContainer[_ngcontent-%COMP%]   .topButtons[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%]:hover {\n  background-color: #ffffff;\n}\n.restaurants-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  margin-top: 10vh;\n  width: 60vw;\n  padding: 40px;\n}\n.restaurant-card[_ngcontent-%COMP%] {\n  background-color: #f9f9f9;\n  text-align: left;\n  margin: 20px;\n  width: 20vw;\n  height: 20vh;\n  color: rgb(0, 0, 0);\n  border: 1.5px solid #000000;\n  box-shadow: 0px 4px 8px rgba(0, 0, 0, 1);\n  border-radius: 8px;\n  padding: 20px;\n  box-sizing: border-box;\n  cursor: pointer;\n}\n.restaurant-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], p[_ngcontent-%COMP%] {\n  margin-top: 10px;\n  background-color: #f9f9f9;\n}\n.restaurant-card[_ngcontent-%COMP%]   income[_ngcontent-%COMP%] {\n  margin-top: 105px;\n  background-color: rgb(0, 0, 0);\n}\n/*# sourceMappingURL=admin.component.css.map */"] });
var AdminComponent = _AdminComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i04.\u0275setClassDebugInfo(AdminComponent, { className: "AdminComponent" });
})();

// src/app/pages/owner/owner.component.ts
import { Component as Component3 } from "/@fs/Users/cole/Desktop/Online_Ordering_Workspace/Restraunt_Ordering_App/frontend/.angular/cache/17.3.3/vite/deps/@angular_core.js?v=6d55d485";
import * as i05 from "/@fs/Users/cole/Desktop/Online_Ordering_Workspace/Restraunt_Ordering_App/frontend/.angular/cache/17.3.3/vite/deps/@angular_core.js?v=6d55d485";
var _OwnerComponent = class _OwnerComponent {
};
_OwnerComponent.\u0275fac = function OwnerComponent_Factory(t) {
  return new (t || _OwnerComponent)();
};
_OwnerComponent.\u0275cmp = /* @__PURE__ */ i05.\u0275\u0275defineComponent({ type: _OwnerComponent, selectors: [["app-owner"]], standalone: true, features: [i05.\u0275\u0275StandaloneFeature], decls: 2, vars: 0, template: function OwnerComponent_Template(rf, ctx) {
  if (rf & 1) {
    i05.\u0275\u0275elementStart(0, "p");
    i05.\u0275\u0275text(1, "owner works!");
    i05.\u0275\u0275elementEnd();
  }
} });
var OwnerComponent = _OwnerComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i05.\u0275setClassDebugInfo(OwnerComponent, { className: "OwnerComponent" });
})();

// src/app/guard/admin-auth.guard.ts
import { Router as Router3 } from "/@fs/Users/cole/Desktop/Online_Ordering_Workspace/Restraunt_Ordering_App/frontend/.angular/cache/17.3.3/vite/deps/@angular_router.js?v=6d55d485";
import { inject } from "/@fs/Users/cole/Desktop/Online_Ordering_Workspace/Restraunt_Ordering_App/frontend/.angular/cache/17.3.3/vite/deps/@angular_core.js?v=6d55d485";
import { map as map2 } from "/@fs/Users/cole/Desktop/Online_Ordering_Workspace/Restraunt_Ordering_App/frontend/.angular/cache/17.3.3/vite/deps/rxjs_operators.js?v=6d55d485";

// src/app/guard/auth.service.ts
import { Injectable as Injectable3 } from "/@fs/Users/cole/Desktop/Online_Ordering_Workspace/Restraunt_Ordering_App/frontend/.angular/cache/17.3.3/vite/deps/@angular_core.js?v=6d55d485";
import { map, catchError } from "/@fs/Users/cole/Desktop/Online_Ordering_Workspace/Restraunt_Ordering_App/frontend/.angular/cache/17.3.3/vite/deps/rxjs_operators.js?v=6d55d485";
import { of } from "/@fs/Users/cole/Desktop/Online_Ordering_Workspace/Restraunt_Ordering_App/frontend/.angular/cache/17.3.3/vite/deps/rxjs.js?v=6d55d485";
import * as i06 from "/@fs/Users/cole/Desktop/Online_Ordering_Workspace/Restraunt_Ordering_App/frontend/.angular/cache/17.3.3/vite/deps/@angular_core.js?v=6d55d485";
import * as i14 from "/@fs/Users/cole/Desktop/Online_Ordering_Workspace/Restraunt_Ordering_App/frontend/.angular/cache/17.3.3/vite/deps/@angular_common_http.js?v=6d55d485";
var _AuthenticationService = class _AuthenticationService {
  constructor(http) {
    this.http = http;
  }
  verifyAdminRole() {
    return this.http.get("http://localhost:3000/session/auth/admin", { withCredentials: true }).pipe(map((response) => response.authorized), catchError(() => of(false)));
  }
  verifyOwnerRole() {
    return this.http.get("http://localhost:3000/session/auth/owner", { withCredentials: true }).pipe(map((response) => response.authorized), catchError(() => of(false)));
  }
};
_AuthenticationService.\u0275fac = function AuthenticationService_Factory(t) {
  return new (t || _AuthenticationService)(i06.\u0275\u0275inject(i14.HttpClient));
};
_AuthenticationService.\u0275prov = /* @__PURE__ */ i06.\u0275\u0275defineInjectable({ token: _AuthenticationService, factory: _AuthenticationService.\u0275fac, providedIn: "root" });
var AuthenticationService = _AuthenticationService;

// src/app/guard/admin-auth.guard.ts
var adminAuthGuard = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router3);
  return authService.verifyAdminRole().pipe(map2((authorized) => {
    if (!authorized) {
      router.navigate(["/login"]);
      return false;
    }
    return true;
  }));
};

// src/app/guard/owner-auth.guard.ts
import { Router as Router4 } from "/@fs/Users/cole/Desktop/Online_Ordering_Workspace/Restraunt_Ordering_App/frontend/.angular/cache/17.3.3/vite/deps/@angular_router.js?v=6d55d485";
import { inject as inject2 } from "/@fs/Users/cole/Desktop/Online_Ordering_Workspace/Restraunt_Ordering_App/frontend/.angular/cache/17.3.3/vite/deps/@angular_core.js?v=6d55d485";
import { map as map3 } from "/@fs/Users/cole/Desktop/Online_Ordering_Workspace/Restraunt_Ordering_App/frontend/.angular/cache/17.3.3/vite/deps/rxjs_operators.js?v=6d55d485";
var ownerAuthGuard = (route, state) => {
  const authService = inject2(AuthenticationService);
  const router = inject2(Router4);
  return authService.verifyOwnerRole().pipe(map3((authorized) => {
    if (!authorized) {
      router.navigate(["/login"]);
      return false;
    }
    return true;
  }));
};

// src/app/pages/add-restaurant/add-restaurant.component.ts
import { NgIf } from "/@fs/Users/cole/Desktop/Online_Ordering_Workspace/Restraunt_Ordering_App/frontend/.angular/cache/17.3.3/vite/deps/@angular_common.js?v=6d55d485";
import { Component as Component4 } from "/@fs/Users/cole/Desktop/Online_Ordering_Workspace/Restraunt_Ordering_App/frontend/.angular/cache/17.3.3/vite/deps/@angular_core.js?v=6d55d485";
import { FormsModule as FormsModule2 } from "/@fs/Users/cole/Desktop/Online_Ordering_Workspace/Restraunt_Ordering_App/frontend/.angular/cache/17.3.3/vite/deps/@angular_forms.js?v=6d55d485";
import * as i07 from "/@fs/Users/cole/Desktop/Online_Ordering_Workspace/Restraunt_Ordering_App/frontend/.angular/cache/17.3.3/vite/deps/@angular_core.js?v=6d55d485";
import * as i22 from "/@fs/Users/cole/Desktop/Online_Ordering_Workspace/Restraunt_Ordering_App/frontend/.angular/cache/17.3.3/vite/deps/@angular_forms.js?v=6d55d485";
function AddRestaurantComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = i07.\u0275\u0275getCurrentView();
    i07.\u0275\u0275elementStart(0, "div")(1, "input", 5);
    i07.\u0275\u0275twoWayListener("ngModelChange", function AddRestaurantComponent_div_4_Template_input_ngModelChange_1_listener($event) {
      i07.\u0275\u0275restoreView(_r1);
      const ctx_r1 = i07.\u0275\u0275nextContext();
      i07.\u0275\u0275twoWayBindingSet(ctx_r1.restaurantName, $event) || (ctx_r1.restaurantName = $event);
      return i07.\u0275\u0275resetView($event);
    });
    i07.\u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = i07.\u0275\u0275nextContext();
    i07.\u0275\u0275advance();
    i07.\u0275\u0275twoWayProperty("ngModel", ctx_r1.restaurantName);
  }
}
function AddRestaurantComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = i07.\u0275\u0275getCurrentView();
    i07.\u0275\u0275elementStart(0, "div")(1, "h2");
    i07.\u0275\u0275text(2, "Restaurant Details");
    i07.\u0275\u0275elementEnd();
    i07.\u0275\u0275elementStart(3, "div", 6)(4, "input", 7);
    i07.\u0275\u0275twoWayListener("ngModelChange", function AddRestaurantComponent_div_5_Template_input_ngModelChange_4_listener($event) {
      i07.\u0275\u0275restoreView(_r3);
      const ctx_r1 = i07.\u0275\u0275nextContext();
      i07.\u0275\u0275twoWayBindingSet(ctx_r1.restaurantName, $event) || (ctx_r1.restaurantName = $event);
      return i07.\u0275\u0275resetView($event);
    });
    i07.\u0275\u0275elementEnd();
    i07.\u0275\u0275elementStart(5, "input", 7);
    i07.\u0275\u0275twoWayListener("ngModelChange", function AddRestaurantComponent_div_5_Template_input_ngModelChange_5_listener($event) {
      i07.\u0275\u0275restoreView(_r3);
      const ctx_r1 = i07.\u0275\u0275nextContext();
      i07.\u0275\u0275twoWayBindingSet(ctx_r1.restaurantName, $event) || (ctx_r1.restaurantName = $event);
      return i07.\u0275\u0275resetView($event);
    });
    i07.\u0275\u0275elementEnd();
    i07.\u0275\u0275elementStart(6, "input", 7);
    i07.\u0275\u0275twoWayListener("ngModelChange", function AddRestaurantComponent_div_5_Template_input_ngModelChange_6_listener($event) {
      i07.\u0275\u0275restoreView(_r3);
      const ctx_r1 = i07.\u0275\u0275nextContext();
      i07.\u0275\u0275twoWayBindingSet(ctx_r1.restaurantName, $event) || (ctx_r1.restaurantName = $event);
      return i07.\u0275\u0275resetView($event);
    });
    i07.\u0275\u0275elementEnd();
    i07.\u0275\u0275elementStart(7, "input", 7);
    i07.\u0275\u0275twoWayListener("ngModelChange", function AddRestaurantComponent_div_5_Template_input_ngModelChange_7_listener($event) {
      i07.\u0275\u0275restoreView(_r3);
      const ctx_r1 = i07.\u0275\u0275nextContext();
      i07.\u0275\u0275twoWayBindingSet(ctx_r1.restaurantName, $event) || (ctx_r1.restaurantName = $event);
      return i07.\u0275\u0275resetView($event);
    });
    i07.\u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = i07.\u0275\u0275nextContext();
    i07.\u0275\u0275advance(4);
    i07.\u0275\u0275twoWayProperty("ngModel", ctx_r1.restaurantName);
    i07.\u0275\u0275advance();
    i07.\u0275\u0275twoWayProperty("ngModel", ctx_r1.restaurantName);
    i07.\u0275\u0275advance();
    i07.\u0275\u0275twoWayProperty("ngModel", ctx_r1.restaurantName);
    i07.\u0275\u0275advance();
    i07.\u0275\u0275twoWayProperty("ngModel", ctx_r1.restaurantName);
  }
}
function AddRestaurantComponent_button_8_Template(rf, ctx) {
  if (rf & 1) {
    i07.\u0275\u0275elementStart(0, "button", 8);
    i07.\u0275\u0275text(1, " Submit ");
    i07.\u0275\u0275elementEnd();
  }
}
function AddRestaurantComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    i07.\u0275\u0275elementStart(0, "div")(1, "p", 9);
    i07.\u0275\u0275text(2);
    i07.\u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = i07.\u0275\u0275nextContext();
    i07.\u0275\u0275advance(2);
    i07.\u0275\u0275textInterpolate(ctx_r1.errorMsg);
  }
}
var _AddRestaurantComponent = class _AddRestaurantComponent {
  constructor(restaurantService) {
    this.restaurantService = restaurantService;
    this.currentStep = 1;
    this.restaurantName = "";
    this.errorMsg = "";
  }
  // Mock function to submit form
  submitForm() {
    console.log(this.currentStep);
    if (this.currentStep == 1) {
      console.log("step one");
      const newRestaurantData = {
        data: {
          details: {
            name: this.restaurantName
          }
        }
      };
      console.log(newRestaurantData);
      this.restaurantService.createRestaurant(newRestaurantData).subscribe({
        next: (response) => {
          console.log("Restaurant added successfully", response);
          this.nextStep();
          this.errorMsg = "";
          return response;
        },
        error: (error) => {
          console.log(error);
          this.errorMsg = error.error.error;
          return;
        }
      });
    } else {
    }
    console.log("Form submitted");
  }
  // Function to go to the next form part
  nextStep() {
    this.currentStep++;
  }
  // Function to go to the previous form part
  previousStep() {
    this.currentStep--;
  }
};
_AddRestaurantComponent.\u0275fac = function AddRestaurantComponent_Factory(t) {
  return new (t || _AddRestaurantComponent)(i07.\u0275\u0275directiveInject(RestaurantService));
};
_AddRestaurantComponent.\u0275cmp = /* @__PURE__ */ i07.\u0275\u0275defineComponent({ type: _AddRestaurantComponent, selectors: [["app-add-restaurant"]], standalone: true, features: [i07.\u0275\u0275StandaloneFeature], decls: 10, vars: 4, consts: [[1, "mainContainer"], [3, "ngSubmit"], [4, "ngIf"], ["type", "button", 1, "btnRounded", 3, "click"], ["type", "submit", "class", "btn", 4, "ngIf"], ["type", "text", "id", "restaurantName", "name", "restaurantName", "placeholder", "Enter restaurant name", "required", "", 1, "formInput", 3, "ngModelChange", "ngModel"], [1, "inputContainerTwo"], ["type", "text", "id", "restaurantName", "name", "restaurantName", "placeholder", "Enter restaurant name", 1, "formInput", 3, "ngModelChange", "ngModel"], ["type", "submit", 1, "btn"], [1, "errorClass"]], template: function AddRestaurantComponent_Template(rf, ctx) {
  if (rf & 1) {
    i07.\u0275\u0275elementStart(0, "div", 0)(1, "h1");
    i07.\u0275\u0275text(2, "Add New Restaurant");
    i07.\u0275\u0275elementEnd();
    i07.\u0275\u0275elementStart(3, "form", 1);
    i07.\u0275\u0275listener("ngSubmit", function AddRestaurantComponent_Template_form_ngSubmit_3_listener() {
      return ctx.submitForm();
    });
    i07.\u0275\u0275template(4, AddRestaurantComponent_div_4_Template, 2, 1, "div", 2)(5, AddRestaurantComponent_div_5_Template, 8, 4, "div", 2);
    i07.\u0275\u0275elementEnd();
    i07.\u0275\u0275elementStart(6, "button", 3);
    i07.\u0275\u0275listener("click", function AddRestaurantComponent_Template_button_click_6_listener() {
      return ctx.submitForm();
    });
    i07.\u0275\u0275text(7, "Next");
    i07.\u0275\u0275elementEnd();
    i07.\u0275\u0275template(8, AddRestaurantComponent_button_8_Template, 2, 0, "button", 4)(9, AddRestaurantComponent_div_9_Template, 3, 1, "div", 2);
    i07.\u0275\u0275elementEnd();
  }
  if (rf & 2) {
    i07.\u0275\u0275advance(4);
    i07.\u0275\u0275property("ngIf", ctx.currentStep === 1);
    i07.\u0275\u0275advance();
    i07.\u0275\u0275property("ngIf", ctx.currentStep === 2);
    i07.\u0275\u0275advance(3);
    i07.\u0275\u0275property("ngIf", ctx.currentStep > 2);
    i07.\u0275\u0275advance();
    i07.\u0275\u0275property("ngIf", ctx.errorMsg != "");
  }
}, dependencies: [NgIf, FormsModule2, i22.\u0275NgNoValidate, i22.DefaultValueAccessor, i22.NgControlStatus, i22.NgControlStatusGroup, i22.RequiredValidator, i22.NgModel, i22.NgForm], styles: ["\n\n.mainContainer[_ngcontent-%COMP%] {\n  padding: 20px;\n  border: 1px solid #000000;\n  border-radius: 5px;\n  width: 100vw;\n  height: 100vh;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  overflow: none;\n}\n.mainContainer[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  color: white;\n}\n.mainContainer[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: #CF6679;\n  margin-top: 10px;\n  text-align: center;\n}\n.inputContainerTwo[_ngcontent-%COMP%] {\n  display: flex;\n}\n.formInput[_ngcontent-%COMP%] {\n  background-color: #333333;\n  color: white;\n  border-radius: 20px;\n  margin: 30px;\n  width: 10vw;\n  text-align: center;\n  height: 4vh;\n}\n.btnRounded[_ngcontent-%COMP%] {\n  border-radius: 20px;\n  background-color: #CF6679;\n  color: white;\n  width: 6vw;\n  height: 4vh;\n  cursor: pointer;\n}\n.errorClass[_ngcontent-%COMP%] {\n  color: #CF6679;\n  text-align: center;\n  margin-top: 10px;\n}\n/*# sourceMappingURL=add-restaurant.component.css.map */"] });
var AddRestaurantComponent = _AddRestaurantComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i07.\u0275setClassDebugInfo(AddRestaurantComponent, { className: "AddRestaurantComponent" });
})();

// src/app/app.routes.ts
var routes = [
  { path: "login", component: LoginComponent, pathMatch: "full" },
  { path: "admin", component: AdminComponent, canActivate: [adminAuthGuard], pathMatch: "full" },
  { path: "addRestaurant", component: AddRestaurantComponent, canActivate: [adminAuthGuard], pathMatch: "full" },
  { path: "owner", component: OwnerComponent, canActivate: [ownerAuthGuard], pathMatch: "full" },
  { path: "", redirectTo: "/login", pathMatch: "full" }
];

// src/app/app.config.ts
import { provideClientHydration } from "/@fs/Users/cole/Desktop/Online_Ordering_Workspace/Restraunt_Ordering_App/frontend/.angular/cache/17.3.3/vite/deps/@angular_platform-browser.js?v=6d55d485";
import { provideHttpClient } from "/@fs/Users/cole/Desktop/Online_Ordering_Workspace/Restraunt_Ordering_App/frontend/.angular/cache/17.3.3/vite/deps/@angular_common_http.js?v=6d55d485";
import { provideAnimationsAsync } from "/@fs/Users/cole/Desktop/Online_Ordering_Workspace/Restraunt_Ordering_App/frontend/.angular/cache/17.3.3/vite/deps/@angular_platform-browser_animations_async.js?v=6d55d485";
var appConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideHttpClient(), provideAnimationsAsync()]
};

// src/app/app.component.ts
import { HttpClientModule } from "/@fs/Users/cole/Desktop/Online_Ordering_Workspace/Restraunt_Ordering_App/frontend/.angular/cache/17.3.3/vite/deps/@angular_common_http.js?v=6d55d485";
import { Component as Component5 } from "/@fs/Users/cole/Desktop/Online_Ordering_Workspace/Restraunt_Ordering_App/frontend/.angular/cache/17.3.3/vite/deps/@angular_core.js?v=6d55d485";
import { FormsModule as FormsModule3 } from "/@fs/Users/cole/Desktop/Online_Ordering_Workspace/Restraunt_Ordering_App/frontend/.angular/cache/17.3.3/vite/deps/@angular_forms.js?v=6d55d485";
import { RouterOutlet as RouterOutlet2 } from "/@fs/Users/cole/Desktop/Online_Ordering_Workspace/Restraunt_Ordering_App/frontend/.angular/cache/17.3.3/vite/deps/@angular_router.js?v=6d55d485";
import * as i08 from "/@fs/Users/cole/Desktop/Online_Ordering_Workspace/Restraunt_Ordering_App/frontend/.angular/cache/17.3.3/vite/deps/@angular_core.js?v=6d55d485";
var _AppComponent = class _AppComponent {
  constructor() {
    this.title = "frontend";
  }
};
_AppComponent.\u0275fac = function AppComponent_Factory(t) {
  return new (t || _AppComponent)();
};
_AppComponent.\u0275cmp = /* @__PURE__ */ i08.\u0275\u0275defineComponent({ type: _AppComponent, selectors: [["app-root"]], standalone: true, features: [i08.\u0275\u0275StandaloneFeature], decls: 1, vars: 0, template: function AppComponent_Template(rf, ctx) {
  if (rf & 1) {
    i08.\u0275\u0275element(0, "router-outlet");
  }
}, dependencies: [RouterOutlet2, FormsModule3, HttpClientModule] });
var AppComponent = _AppComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && i08.\u0275setClassDebugInfo(AppComponent, { className: "AppComponent" });
})();

// src/main.ts
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tYWluLnRzIiwic3JjL2FwcC9hcHAuY29uZmlnLnRzIiwic3JjL2FwcC9wYWdlcy9sb2dpbi9sb2dpbi5jb21wb25lbnQudHMiLCJzcmMvYXBwL3BhZ2VzL2xvZ2luL2xvZ2luLmNvbXBvbmVudC5odG1sIiwic3JjL2FwcC9zZXJ2aWNlcy9zZXNzaW9uLnNlcnZpY2UudHMiLCJzcmMvYXBwL3BhZ2VzL2FkbWluL2FkbWluLmNvbXBvbmVudC50cyIsInNyYy9hcHAvcGFnZXMvYWRtaW4vYWRtaW4uY29tcG9uZW50Lmh0bWwiLCJzcmMvYXBwL3NlcnZpY2VzL3Jlc3RhdXJhbnQuc2VydmljZS50cyIsInNyYy9hcHAvcGFnZXMvb3duZXIvb3duZXIuY29tcG9uZW50LnRzIiwic3JjL2FwcC9wYWdlcy9vd25lci9vd25lci5jb21wb25lbnQuaHRtbCIsInNyYy9hcHAvZ3VhcmQvYWRtaW4tYXV0aC5ndWFyZC50cyIsInNyYy9hcHAvZ3VhcmQvYXV0aC5zZXJ2aWNlLnRzIiwic3JjL2FwcC9ndWFyZC9vd25lci1hdXRoLmd1YXJkLnRzIiwic3JjL2FwcC9wYWdlcy9hZGQtcmVzdGF1cmFudC9hZGQtcmVzdGF1cmFudC5jb21wb25lbnQudHMiLCJzcmMvYXBwL3BhZ2VzL2FkZC1yZXN0YXVyYW50L2FkZC1yZXN0YXVyYW50LmNvbXBvbmVudC5odG1sIiwic3JjL2FwcC9hcHAucm91dGVzLnRzIiwic3JjL2FwcC9hcHAuY29tcG9uZW50LnRzIiwic3JjL2FwcC9hcHAuY29tcG9uZW50Lmh0bWwiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYm9vdHN0cmFwQXBwbGljYXRpb24gfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IGFwcENvbmZpZyB9IGZyb20gJy4vYXBwL2FwcC5jb25maWcnO1xuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSAnLi9hcHAvYXBwLmNvbXBvbmVudCc7XG5cbmJvb3RzdHJhcEFwcGxpY2F0aW9uKEFwcENvbXBvbmVudCwgYXBwQ29uZmlnKVxuICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5lcnJvcihlcnIpKTtcbiIsImltcG9ydCB7IEFwcGxpY2F0aW9uQ29uZmlnIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBwcm92aWRlUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuaW1wb3J0IHsgcm91dGVzIH0gZnJvbSAnLi9hcHAucm91dGVzJztcbmltcG9ydCB7IHByb3ZpZGVDbGllbnRIeWRyYXRpb24gfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IHByb3ZpZGVIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgcHJvdmlkZUFuaW1hdGlvbnNBc3luYyB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucy9hc3luYyc7XG5cbmV4cG9ydCBjb25zdCBhcHBDb25maWc6IEFwcGxpY2F0aW9uQ29uZmlnID0ge1xuICBwcm92aWRlcnM6IFtwcm92aWRlUm91dGVyKHJvdXRlcyksIHByb3ZpZGVDbGllbnRIeWRyYXRpb24oKSxwcm92aWRlSHR0cENsaWVudCgpLCBwcm92aWRlQW5pbWF0aW9uc0FzeW5jKCldXG59O1xuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFJvdXRlciwgUm91dGVyT3V0bGV0IH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFNlc3Npb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvc2Vzc2lvbi5zZXJ2aWNlJztcbmltcG9ydCB7IHJlc3BvbnNlIH0gZnJvbSAnZXhwcmVzcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1sb2dpbicsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtGb3Jtc01vZHVsZSwgUm91dGVyT3V0bGV0XSxcbiAgdGVtcGxhdGVVcmw6ICcuL2xvZ2luLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmw6ICcuL2xvZ2luLmNvbXBvbmVudC5jc3MnLFxufSlcbmV4cG9ydCBjbGFzcyBMb2dpbkNvbXBvbmVudCB7XG4gIHVzZXIgPSB7XG4gICAgZW1haWw6ICcnLFxuICAgIHBhc3N3b3JkOiAnJyxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHNlc3Npb25TZXJ2aWNlOiBTZXNzaW9uU2VydmljZSkge31cblxuICBvblN1Ym1pdCgpIHtcbiAgICB0aGlzLnNlc3Npb25TZXJ2aWNlLmxvZ2luKHRoaXMudXNlci5lbWFpbCwgdGhpcy51c2VyLnBhc3N3b3JkKS5zdWJzY3JpYmUoe1xuICAgICAgbmV4dDogKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdMb2dpbiBzdWNjZXNzZnVsOicsIHJlc3BvbnNlLnJvbGUgKyAnIHJvbGUnKTtcbiAgICAgICAgY29uc3Qgcm9sZSA9IHJlc3BvbnNlLnJvbGU7XG4gICAgICAgIGlmIChyb2xlID09PSAnYWRtaW4nKSB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9hZG1pbiddKTtcbiAgICAgICAgZWxzZSBpZiAocm9sZSA9PT0gJ293bmVyJykgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvb3duZXInXSk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1VuZXhwZWN0ZWQgdXNlciByb2xlOicsIHJvbGUpO1xuICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLyddKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGVycm9yOiAoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcignTG9naW4gZmFpbGVkJywgZXJyb3IpO1xuICAgICAgICAvLyBIYW5kbGUgbG9naW4gZXJyb3IgKHNob3cgZXJyb3IgbWVzc2FnZSB0byB1c2VyLCBldGMuKVxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImxvZ2luUGFnZUNvbnRhaW5lclwiPlxuICAgIDxkaXYgY2xhc3M9XCJsZWZ0Q29udGFpbmVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0Q29udGFpbmVyXCI+XG4gICAgICAgICAgICA8aW1nIGNsYXNzPVwibG9nb1wiIHRpdGxlPVwibG9nb1wiIHNyYz1cIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvT25saW5lT3JkZXJpbmdJbWFnZS1yZW1vdmViZy1wcmV2aWV3LnBuZ1wiPlxuICAgICAgICAgICAgPGgxPkxvZ2luPC9oMT5cbiAgICAgICAgICAgIDxmb3JtIChuZ1N1Ym1pdCk9XCJvblN1Ym1pdCgpXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm1JbnB1dENvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImVtYWlsXCIgY2xhc3M9XCJmb3JtSW5wdXRcIiBbKG5nTW9kZWwpXT1cInVzZXIuZW1haWxcIiBuYW1lPVwiZW1haWxcIiBwbGFjZWhvbGRlcj1cIkVtYWlsXCIgcmVxdWlyZWQ+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicGFzc3dvcmRcIiBjbGFzcz1cImZvcm1JbnB1dFwiIFsobmdNb2RlbCldPVwidXNlci5wYXNzd29yZFwiIG5hbWU9XCJwYXNzd29yZFwiIHBsYWNlaG9sZGVyPVwiUGFzc3dvcmRcIiByZXF1aXJlZD5cblx0XHQgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImZvcm1JbnB1dExvZ2luXCI+TG9naW48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJmb3Jnb3RQYXNzd29yZFwiIGhyZWY9XCJcIj5Gb3Jnb3QgUGFzc3dvcmQ/PC9hPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXHRcdCAgICA8L2Zvcm0+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cInJpZ2h0Q29udGFpbmVyXCI+XG4gICAgICAgIDxpbWcgY2xhc3M9XCJpbWFnZVwiIHRpdGxlPVwiT25saW5lT3JkZXJpbmdJbWFnZVwiIHNyYz1cIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvT25saW5lT3JkZXJpbmdJbWFnZS1yZW1vdmViZy1wcmV2aWV3LnBuZ1wiPlxuICAgIDwvZGl2PlxuICAgICAgICBcblxuPC9kaXY+IiwiaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuXG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgU2Vzc2lvblNlcnZpY2Uge1xuICBwcml2YXRlIGFwaVVybCA9ICdodHRwOi8vbG9jYWxob3N0OjMwMDAvc2Vzc2lvbi8nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkgeyB9XG5cbiAgbG9naW4oZW1haWw6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHRoaXMuYXBpVXJsICsgJ2xvZ2luJywgeyBlbWFpbCwgcGFzc3dvcmQgfSx7IHdpdGhDcmVkZW50aWFsczogdHJ1ZSB9KTtcbiAgfVxuXG4gIGxvZ291dCgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuYXBpVXJsICsgJ2xvZ291dCcsIHsgcmVzcG9uc2VUeXBlOiAndGV4dCcsIHdpdGhDcmVkZW50aWFsczogdHJ1ZSB9KTtcbiAgfVxuXG5cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlc3RhdXJhbnRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcmVzdGF1cmFudC5zZXJ2aWNlJztcbmltcG9ydCB7IE1hdERpYWxvZyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IGZpbmFsaXplIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUsIE5nRm9yIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFNlc3Npb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvc2Vzc2lvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFJlc3RhdXJhbnQgfSBmcm9tICcuLi8uLi8uLi8uLi90eXBlcyc7XG5cblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtYWRtaW4nLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLE5nRm9yXSxcbiAgdGVtcGxhdGVVcmw6ICcuL2FkbWluLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmw6ICcuL2FkbWluLmNvbXBvbmVudC5jc3MnXG59KVxuZXhwb3J0IGNsYXNzIEFkbWluQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgcmVzdGF1cmFudHM6IFJlc3RhdXJhbnRbXSA9IFtdO1xuICBmaWx0ZXJlZFJlc3RhdXJhbnRzOiBSZXN0YXVyYW50W10gPSBbXTtcbiAgc2VsZWN0ZWRSZXN0YXVyYW50OiBSZXN0YXVyYW50IHwgbnVsbCA9IG51bGw7XG4gIHRvdGFsSW5jb21lOiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVzdGF1cmFudFNlcnZpY2U6IFJlc3RhdXJhbnRTZXJ2aWNlLCBwdWJsaWMgZGlhbG9nOiBNYXREaWFsb2cscHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgc2Vzc2lvblNlcnZpY2U6IFNlc3Npb25TZXJ2aWNlKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMubG9hZFJlc3RhdXJhbnRzKCk7XG4gIH1cblxuICBsb2FkUmVzdGF1cmFudHMoKTogdm9pZCB7XG4gICAgdGhpcy5yZXN0YXVyYW50U2VydmljZS5nZXRBbGxSZXN0YXVyYW50cygpLnN1YnNjcmliZShcbiAgICAgIChkYXRhOiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5yZXN0YXVyYW50cyA9IGRhdGEucmVzdGF1cmFudHM7IC8vIEFzc2lnbiByZXRyaWV2ZWQgZGF0YSB0byByZXN0YXVyYW50cyBhcnJheVxuICAgICAgICBjb25zb2xlLmxvZygnUmVzdGF1cmFudHMgbG9hZGVkIHN1Y2Nlc3NmdWxseTonLCB0aGlzLnJlc3RhdXJhbnRzKTtcbiAgICAgIH0sXG4gICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgbG9hZGluZyByZXN0YXVyYW50czonLCBlcnJvcik7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuICBcblxuXG4gIHNlYXJjaFJlc3RhdXJhbnRzKGlucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudCk6IHZvaWQge1xuICBjb25zdCBzZWFyY2hUZXJtID0gaW5wdXRFbGVtZW50LnZhbHVlO1xuICAvLyBJbXBsZW1lbnQgc2VhcmNoIGZ1bmN0aW9uYWxpdHlcbiAgfVxuXG4gIGFkZFJlc3RhdXJhbnQoKTogdm9pZCB7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvYWRkUmVzdGF1cmFudCddKTtcbn1cblxuICBzZWxlY3RSZXN0YXVyYW50KHJlc3RhdXJhbnQ6IFJlc3RhdXJhbnQpOiB2b2lkIHtcbiAgICAvLyBTZXQgc2VsZWN0ZWRSZXN0YXVyYW50IGZvciBlZGl0aW5nIGFuZCBzaG93IG1vZGFsL2Zvcm1cbiAgfVxuXG4gIGxvZ291dCgpOiB2b2lkIHtcbiAgICB0aGlzLnNlc3Npb25TZXJ2aWNlLmxvZ291dCgpXG4gICAgLnBpcGUoXG4gICAgICBmaW5hbGl6ZSgoKSA9PiB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9sb2dpbiddKSlcbiAgICApXG4gICAgLnN1YnNjcmliZSh7XG4gICAgICBuZXh0OiAoKSA9PiBjb25zb2xlLmxvZygnTG9nZ2VkIG91dCBzdWNjZXNzZnVsbHknKSxcbiAgICAgIGVycm9yOiAoZXJyb3IpID0+IGNvbnNvbGUuZXJyb3IoJ0xvZ291dCBmYWlsZWQ6JywgZXJyb3IpLFxuICAgIH0pO1xufVxuXG59XG5cbiIsIjxkaXYgY2xhc3M9XCJhZG1pbkNvbnRhaW5lclwiPlxuICA8aW5wdXQgY2xhc3M9XCJzZWFyY2hiYXJcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiU2VhcmNoIGJ5IHJlc3RhdXJhbnQgdW5pcXVlIG5hbWUuLi5cIiAoaW5wdXQpPVwic2VhcmNoUmVzdGF1cmFudHMoJGFueSgkZXZlbnQudGFyZ2V0KS52YWx1ZSlcIj5cbiAgPGRpdiBjbGFzcz1cInRvcEJ1dHRvbnNcIj5cbiAgICBcbiAgICA8YnV0dG9uICBjbGFzcz1cImJ1dHRvblwiIGFyaWEtbGFiZWw9XCJhZGRSZXN0YXVyYW50XCIgKGNsaWNrKT1cImFkZFJlc3RhdXJhbnQoKVwiPkFkZCBOZXc8L2J1dHRvbj5cbiAgICA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uXCIgYXJpYS1sYWJlbD1cImxvZ291dFwiIChjbGljayk9XCJsb2dvdXQoKVwiPkxvZ291dDwvYnV0dG9uPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cInJlc3RhdXJhbnRzLWNvbnRhaW5lclwiPlxuICA8L2Rpdj5cbjwvZGl2PlxuXG5cbiIsImltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBSZXN0YXVyYW50IH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBSZXN0YXVyYW50U2VydmljZSB7XG5cbiAgcHJpdmF0ZSBiYXNlVXJsID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9hZG1pbi9yZXN0YXVyYW50cyc7IC8vIEFzc3VtaW5nIHlvdXIgYmFja2VuZCBBUEkgZW5kcG9pbnRcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHsgfVxuXG4gIGNyZWF0ZVJlc3RhdXJhbnQocmVzdGF1cmFudERhdGE6IGFueSk6IE9ic2VydmFibGU8UmVzdGF1cmFudD4ge1xuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdDxSZXN0YXVyYW50PihgJHt0aGlzLmJhc2VVcmx9YCwgcmVzdGF1cmFudERhdGEsIHsgd2l0aENyZWRlbnRpYWxzOiB0cnVlIH0pO1xuICB9XG4gIFxuICBnZXRSZXN0YXVyYW50QnlJZChpZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxSZXN0YXVyYW50PiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8UmVzdGF1cmFudD4oYCR7dGhpcy5iYXNlVXJsfS8ke2lkfWAse3dpdGhDcmVkZW50aWFsczogdHJ1ZSB9KTtcbiAgfVxuXG4gIHVwZGF0ZVJlc3RhdXJhbnQoaWQ6IHN0cmluZywgcmVzdGF1cmFudDogUmVzdGF1cmFudCk6IE9ic2VydmFibGU8UmVzdGF1cmFudD4ge1xuICAgIHJldHVybiB0aGlzLmh0dHAucHV0PFJlc3RhdXJhbnQ+KGAke3RoaXMuYmFzZVVybH0vJHtpZH1gLCByZXN0YXVyYW50LHt3aXRoQ3JlZGVudGlhbHM6IHRydWUgfSk7XG4gIH1cblxuICBkZWxldGVSZXN0YXVyYW50KGlkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZTx2b2lkPihgJHt0aGlzLmJhc2VVcmx9LyR7aWR9YCx7d2l0aENyZWRlbnRpYWxzOiB0cnVlIH0pO1xuICB9XG5cbiAgZ2V0QWxsUmVzdGF1cmFudHMoKTogT2JzZXJ2YWJsZTxSZXN0YXVyYW50W10+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDxSZXN0YXVyYW50W10+KGAke3RoaXMuYmFzZVVybH1gLHt3aXRoQ3JlZGVudGlhbHM6IHRydWUgfSk7XG4gIH1cbn0iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLW93bmVyJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW10sXG4gIHRlbXBsYXRlVXJsOiAnLi9vd25lci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsOiAnLi9vd25lci5jb21wb25lbnQuY3NzJ1xufSlcbmV4cG9ydCBjbGFzcyBPd25lckNvbXBvbmVudCB7XG5cbn1cbiIsIjxwPm93bmVyIHdvcmtzITwvcD5cbiIsIi8vIHNyYy9hcHAvYWRtaW4tYXV0aC5ndWFyZC50c1xuaW1wb3J0IHsgQ2FuQWN0aXZhdGVGbiwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBpbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG1hcCwgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBBdXRoZW50aWNhdGlvblNlcnZpY2UgfSBmcm9tICcuL2F1dGguc2VydmljZSc7XG5cbmV4cG9ydCBjb25zdCBhZG1pbkF1dGhHdWFyZDogQ2FuQWN0aXZhdGVGbiA9IChyb3V0ZSwgc3RhdGUpID0+IHtcbiAgY29uc3QgYXV0aFNlcnZpY2UgPSBpbmplY3QoQXV0aGVudGljYXRpb25TZXJ2aWNlKTtcbiAgY29uc3Qgcm91dGVyID0gaW5qZWN0KFJvdXRlcik7XG4gIFxuICByZXR1cm4gYXV0aFNlcnZpY2UudmVyaWZ5QWRtaW5Sb2xlKCkucGlwZShcbiAgICBtYXAoYXV0aG9yaXplZCA9PiB7XG4gICAgICBpZiAoIWF1dGhvcml6ZWQpIHtcbiAgICAgICAgcm91dGVyLm5hdmlnYXRlKFsnL2xvZ2luJ10pO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KVxuICApO1xufTtcbiIsIi8vIHNyYy9hcHAvYXV0aGVudGljYXRpb24uc2VydmljZS50c1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IG1hcCwgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IG9mIH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEF1dGhlbnRpY2F0aW9uU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge31cblxuICB2ZXJpZnlBZG1pblJvbGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8e2F1dGhvcml6ZWQ6IGJvb2xlYW59PignaHR0cDovL2xvY2FsaG9zdDozMDAwL3Nlc3Npb24vYXV0aC9hZG1pbicsIHsgd2l0aENyZWRlbnRpYWxzOiB0cnVlIH0pLnBpcGUoXG4gICAgICBtYXAocmVzcG9uc2UgPT4gcmVzcG9uc2UuYXV0aG9yaXplZCksXG4gICAgICBjYXRjaEVycm9yKCgpID0+IG9mKGZhbHNlKSlcbiAgICApO1xuICB9XG5cbiAgdmVyaWZ5T3duZXJSb2xlKCkge1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PHthdXRob3JpemVkOiBib29sZWFufT4oJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9zZXNzaW9uL2F1dGgvb3duZXInLCB7IHdpdGhDcmVkZW50aWFsczogdHJ1ZSB9KS5waXBlKFxuICAgICAgbWFwKHJlc3BvbnNlID0+IHJlc3BvbnNlLmF1dGhvcml6ZWQpLFxuICAgICAgY2F0Y2hFcnJvcigoKSA9PiBvZihmYWxzZSkpXG4gICAgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ2FuQWN0aXZhdGVGbiwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBpbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG1hcCwgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBBdXRoZW50aWNhdGlvblNlcnZpY2UgfSBmcm9tICcuL2F1dGguc2VydmljZSc7XG5cbmV4cG9ydCBjb25zdCBvd25lckF1dGhHdWFyZDogQ2FuQWN0aXZhdGVGbiA9IChyb3V0ZSwgc3RhdGUpID0+IHtcbiAgY29uc3QgYXV0aFNlcnZpY2UgPSBpbmplY3QoQXV0aGVudGljYXRpb25TZXJ2aWNlKTtcbiAgY29uc3Qgcm91dGVyID0gaW5qZWN0KFJvdXRlcik7XG4gIFxuICByZXR1cm4gYXV0aFNlcnZpY2UudmVyaWZ5T3duZXJSb2xlKCkucGlwZShcbiAgICBtYXAoYXV0aG9yaXplZCA9PiB7XG4gICAgICBpZiAoIWF1dGhvcml6ZWQpIHtcbiAgICAgICAgcm91dGVyLm5hdmlnYXRlKFsnL2xvZ2luJ10pO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KVxuICApO1xufTtcbiIsImltcG9ydCB7IE5nSWYgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgeyBSZXN0YXVyYW50U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3Jlc3RhdXJhbnQuc2VydmljZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLWFkZC1yZXN0YXVyYW50JyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW05nSWYsIEZvcm1zTW9kdWxlXSxcbiAgdGVtcGxhdGVVcmw6ICcuL2FkZC1yZXN0YXVyYW50LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmw6ICcuL2FkZC1yZXN0YXVyYW50LmNvbXBvbmVudC5jc3MnXG59KVxuZXhwb3J0IGNsYXNzIEFkZFJlc3RhdXJhbnRDb21wb25lbnQge1xuICBjdXJyZW50U3RlcDogbnVtYmVyID0gMTtcbiAgcmVzdGF1cmFudE5hbWU6IHN0cmluZyA9ICcnO1xuICBlcnJvck1zZyA9ICcnO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVzdGF1cmFudFNlcnZpY2U6IFJlc3RhdXJhbnRTZXJ2aWNlKSB7fVxuXG4gIC8vIE1vY2sgZnVuY3Rpb24gdG8gc3VibWl0IGZvcm1cbiAgc3VibWl0Rm9ybSgpIHtcbiAgICBjb25zb2xlLmxvZyh0aGlzLmN1cnJlbnRTdGVwKTtcbiAgICBcbiAgICBpZih0aGlzLmN1cnJlbnRTdGVwID09IDEpe1xuICAgICAgY29uc29sZS5sb2coXCJzdGVwIG9uZVwiKTtcbiAgICAgIGNvbnN0IG5ld1Jlc3RhdXJhbnREYXRhID0ge1xuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgZGV0YWlsczoge1xuICAgICAgICAgICAgbmFtZTogdGhpcy5yZXN0YXVyYW50TmFtZVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGNvbnNvbGUubG9nKG5ld1Jlc3RhdXJhbnREYXRhKTtcblxuICAgICAgICB0aGlzLnJlc3RhdXJhbnRTZXJ2aWNlLmNyZWF0ZVJlc3RhdXJhbnQobmV3UmVzdGF1cmFudERhdGEpLnN1YnNjcmliZSh7XG4gICAgICAgICAgbmV4dDogKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnUmVzdGF1cmFudCBhZGRlZCBzdWNjZXNzZnVsbHknLCByZXNwb25zZSk7XG4gICAgICAgICAgICB0aGlzLm5leHRTdGVwKClcbiAgICAgICAgICAgIHRoaXMuZXJyb3JNc2cgPSAnJ1xuICAgICAgICAgICAgcmV0dXJuKHJlc3BvbnNlKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZXJyb3I6IChlcnJvcikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmVycm9yTXNnID0gZXJyb3IuZXJyb3IuZXJyb3I7XG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIFxuXG4gICAgICBcbiAgICB9XG4gICAgY29uc29sZS5sb2coJ0Zvcm0gc3VibWl0dGVkJyk7XG4gIH1cbiAgXG5cbiAgLy8gRnVuY3Rpb24gdG8gZ28gdG8gdGhlIG5leHQgZm9ybSBwYXJ0XG4gIG5leHRTdGVwKCkge1xuICAgIHRoaXMuY3VycmVudFN0ZXArKztcbiAgfVxuICAvLyBGdW5jdGlvbiB0byBnbyB0byB0aGUgcHJldmlvdXMgZm9ybSBwYXJ0XG4gIHByZXZpb3VzU3RlcCgpIHtcbiAgICB0aGlzLmN1cnJlbnRTdGVwLS07XG4gIH1cbn0iLCI8ZGl2IGNsYXNzPVwibWFpbkNvbnRhaW5lclwiPlxuICA8aDE+QWRkIE5ldyBSZXN0YXVyYW50PC9oMT5cbiAgPGZvcm0gKG5nU3VibWl0KT1cInN1Ym1pdEZvcm0oKVwiPlxuICAgIDxkaXYgKm5nSWY9XCJjdXJyZW50U3RlcCA9PT0gMVwiPlxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgY2xhc3M9XCJmb3JtSW5wdXRcIlxuICAgICAgICAgIGlkPVwicmVzdGF1cmFudE5hbWVcIlxuICAgICAgICAgIFsobmdNb2RlbCldPVwicmVzdGF1cmFudE5hbWVcIlxuICAgICAgICAgIG5hbWU9XCJyZXN0YXVyYW50TmFtZVwiXG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciByZXN0YXVyYW50IG5hbWVcIlxuICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgIC8+XG5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgKm5nSWY9XCJjdXJyZW50U3RlcCA9PT0gMlwiPlxuICAgICAgPGgyPlJlc3RhdXJhbnQgRGV0YWlsczwvaDI+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dENvbnRhaW5lclR3b1wiPlxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgY2xhc3M9XCJmb3JtSW5wdXRcIlxuICAgICAgICAgIGlkPVwicmVzdGF1cmFudE5hbWVcIlxuICAgICAgICAgIFsobmdNb2RlbCldPVwicmVzdGF1cmFudE5hbWVcIlxuICAgICAgICAgIG5hbWU9XCJyZXN0YXVyYW50TmFtZVwiXG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciByZXN0YXVyYW50IG5hbWVcIlxuICAgICAgICAvPlxuICAgICAgICA8aW5wdXRcbiAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICBjbGFzcz1cImZvcm1JbnB1dFwiXG4gICAgICAgIGlkPVwicmVzdGF1cmFudE5hbWVcIlxuICAgICAgICBbKG5nTW9kZWwpXT1cInJlc3RhdXJhbnROYW1lXCJcbiAgICAgICAgbmFtZT1cInJlc3RhdXJhbnROYW1lXCJcbiAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciByZXN0YXVyYW50IG5hbWVcIlxuICAgICAgLz5cblxuICAgICAgPGlucHV0XG4gICAgICB0eXBlPVwidGV4dFwiXG4gICAgICBjbGFzcz1cImZvcm1JbnB1dFwiXG4gICAgICBpZD1cInJlc3RhdXJhbnROYW1lXCJcbiAgICAgIFsobmdNb2RlbCldPVwicmVzdGF1cmFudE5hbWVcIlxuICAgICAgbmFtZT1cInJlc3RhdXJhbnROYW1lXCJcbiAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgcmVzdGF1cmFudCBuYW1lXCJcbiAgICAvPlxuXG4gICAgPGlucHV0XG4gICAgdHlwZT1cInRleHRcIlxuICAgIGNsYXNzPVwiZm9ybUlucHV0XCJcbiAgICBpZD1cInJlc3RhdXJhbnROYW1lXCJcbiAgICBbKG5nTW9kZWwpXT1cInJlc3RhdXJhbnROYW1lXCJcbiAgICBuYW1lPVwicmVzdGF1cmFudE5hbWVcIlxuICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgcmVzdGF1cmFudCBuYW1lXCJcbiAgLz5cblxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZm9ybT5cbiAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG5Sb3VuZGVkXCIgKGNsaWNrKT1cInN1Ym1pdEZvcm0oKVwiPk5leHQ8L2J1dHRvbj4gXG4gIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiYnRuXCIgKm5nSWY9XCJjdXJyZW50U3RlcCA+IDJcIj5cbiAgICBTdWJtaXRcbiAgPC9idXR0b24+XG4gIDxkaXYgKm5nSWY9XCJlcnJvck1zZyAhPSAnJ1wiPlxuICAgIDxwIGNsYXNzPVwiZXJyb3JDbGFzc1wiPnt7ZXJyb3JNc2d9fTwvcD5cbiAgPC9kaXY+XG48L2Rpdj5cblxuPCEtLSBBZGRpdGlvbmFsIHN0ZXBzIGFuZCBmb3JtIGNvbnRyb2xzIGhlcmUgLS0+XG5cbjwhLS0gU3VibWl0IGJ1dHRvbiAtLT5cbiIsImltcG9ydCB7IFJvdXRlcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBMb2dpbkNvbXBvbmVudCB9IGZyb20gJy4vcGFnZXMvbG9naW4vbG9naW4uY29tcG9uZW50JztcbmltcG9ydCB7IEFkbWluQ29tcG9uZW50IH0gZnJvbSAnLi9wYWdlcy9hZG1pbi9hZG1pbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3duZXJDb21wb25lbnQgfSBmcm9tICcuL3BhZ2VzL293bmVyL293bmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBhZG1pbkF1dGhHdWFyZCB9IGZyb20gJy4vZ3VhcmQvYWRtaW4tYXV0aC5ndWFyZCc7XG5pbXBvcnQgeyBvd25lckF1dGhHdWFyZCB9IGZyb20gJy4vZ3VhcmQvb3duZXItYXV0aC5ndWFyZCc7XG5pbXBvcnQgeyBBZGRSZXN0YXVyYW50Q29tcG9uZW50IH0gZnJvbSAnLi9wYWdlcy9hZGQtcmVzdGF1cmFudC9hZGQtcmVzdGF1cmFudC5jb21wb25lbnQnO1xuXG5leHBvcnQgY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXG4gICAgeyBwYXRoOiAnbG9naW4nLCBjb21wb25lbnQ6IExvZ2luQ29tcG9uZW50LCBwYXRoTWF0Y2g6ICdmdWxsJyB9LFxuICAgIHsgcGF0aDogJ2FkbWluJywgY29tcG9uZW50OiBBZG1pbkNvbXBvbmVudCwgY2FuQWN0aXZhdGU6IFthZG1pbkF1dGhHdWFyZF0sIHBhdGhNYXRjaDogJ2Z1bGwnLCB9LFxuICAgIHsgcGF0aDogJ2FkZFJlc3RhdXJhbnQnLCBjb21wb25lbnQ6IEFkZFJlc3RhdXJhbnRDb21wb25lbnQsIGNhbkFjdGl2YXRlOiBbYWRtaW5BdXRoR3VhcmRdLCBwYXRoTWF0Y2g6ICdmdWxsJywgfSxcbiAgICB7IHBhdGg6ICdvd25lcicsIGNvbXBvbmVudDogT3duZXJDb21wb25lbnQsIGNhbkFjdGl2YXRlOiBbb3duZXJBdXRoR3VhcmRdLCBwYXRoTWF0Y2g6ICdmdWxsJywgfSxcbiAgICB7IHBhdGg6ICcnLCByZWRpcmVjdFRvOiAnL2xvZ2luJywgcGF0aE1hdGNoOiAnZnVsbCcgfSxcblxuXG5dO1xuIiwiaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNYXREaWFsb2dNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHsgTWF0Rm9ybUZpZWxkTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZm9ybS1maWVsZCc7XG5pbXBvcnQgeyBNYXRJbnB1dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2lucHV0JztcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7IFxuaW1wb3J0IHsgUm91dGVyT3V0bGV0IH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLXJvb3QnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbUm91dGVyT3V0bGV0LCBGb3Jtc01vZHVsZSwgSHR0cENsaWVudE1vZHVsZV0sXG4gIHRlbXBsYXRlVXJsOiAnLi9hcHAuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybDogJy4vYXBwLmNvbXBvbmVudC5jc3MnXG59KVxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCB7XG4gIHRpdGxlID0gJ2Zyb250ZW5kJztcbn1cbiIsIjxyb3V0ZXItb3V0bGV0Pjwvcm91dGVyLW91dGxldD4iXSwibWFwcGluZ3MiOiI7QUFBQSxTQUFTLDRCQUE0Qjs7O0FDQ3JDLFNBQVMscUJBQXFCOzs7QUNEOUIsU0FBUyxpQkFBaUI7QUFDMUIsU0FBUyxtQkFBbUI7QUFDNUIsU0FBaUIsb0JBQW9COzs7OztBRURyQyxTQUFTLGtCQUFrQjs7O0FBU3JCLElB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Ozs7QWRUdkQsU0FBUyw4QkFBOEI7QUFDdkMsU0FBUyx5QkFBeUI7QUFDbEMsU0FBUyw4QkFBOEI7QUFFaEMsSUFBTSxZQUErQjtFQUMxQyxXQUFXLENBQUMsY0FBYyxNQUFNLEdBQUcsdUJBQXNCLEdBQUcsa0JBQWlCLEdBQUksdUJBQXNCLENBQUU7Ozs7QWVUM0csU0FBUyx3QkFBd0I7QUFDakMsU0FBUyxhQUFBQyxrQkFBaUI7QUFDMUIsU0FBUyxlQUFBQyxvQkFBbUI7QUFLNUIsU0FBUyxnQkFBQUMscUJBQW9COztBQVN2QixJQUFPLGdCQUFQLE1BQU8sY0FBWTtFQVB6QixjQUFBO0FBUUUsU0FBQSxRQUFROzs7O21CQURHLGVBQVk7QUFBQTtrRkFBWixlQUFZLFdBQUEsQ0FBQSxDQUFBLFVBQUEsQ0FBQSxHQUFBLFlBQUEsTUFBQSxVQUFBLENBQUEsaUNBQUEsR0FBQSxPQUFBLEdBQUEsTUFBQSxHQUFBLFVBQUEsU0FBQSxzQkFBQSxJQUFBLEtBQUE7QUFBQSxNQUFBLEtBQUEsR0FBQTtBQ2hCekIsSUFBQSx3QkFBQSxHQUFBLGVBQUE7O2tCRFlZQSxlQUFjRCxjQUFhLGdCQUFnQixFQUFBLENBQUE7QUFJakQsSUFBTyxlQUFQOztpRkFBTyxjQUFZLEVBQUEsV0FBQSxlQUFBLENBQUE7QUFBQSxHQUFBOzs7QWhCWnpCLHFCQUFxQixjQUFjLFNBQVMsRUFDekMsTUFBTSxDQUFDLFFBQVEsUUFBUSxNQUFNLEdBQUcsQ0FBQzsiLCJuYW1lcyI6WyJDb21wb25lbnQiLCJJbmplY3RhYmxlIiwiQ29tcG9uZW50IiwiUm91dGVyIiwibWFwIiwiSW5qZWN0YWJsZSIsIlJvdXRlciIsIm1hcCIsIlJvdXRlciIsImluamVjdCIsIm1hcCIsImluamVjdCIsIlJvdXRlciIsIm1hcCIsIkNvbXBvbmVudCIsIkZvcm1zTW9kdWxlIiwiRm9ybXNNb2R1bGUiLCJDb21wb25lbnQiLCJGb3Jtc01vZHVsZSIsIlJvdXRlck91dGxldCJdfQ==