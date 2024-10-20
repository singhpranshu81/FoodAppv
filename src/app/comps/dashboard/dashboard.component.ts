import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/entity/Food';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {

   isAdmin: boolean =false;
   
searchQuery: any='';

  
  dummyfood: Food = {
    foodId: 0,
    foodName: '',
    quantity: 0,
    price: 0,
    description:'',
    url:'',
    category: {
      categoryId: 0,
      categoryName: '',
    },
    cart: {
      cartId: 0,
    },
  };

  food: any[] = []; //hold all food
  categoryfoodarray: any={}; 
  name:string='';
  constructor(private foodService: FoodService,private categoryService:CategoryService, private router: Router) {}
   
  category:any=[]

   

  ngOnInit(): void {
     this.categoryService.getAllCategory().subscribe((data)=>{
      this.category=data;
     })

    this.foodService.getAllFood().subscribe((data) => {
      this.food = data; // Store the list of all food
    });  
     

    const currentUserRole = JSON.parse(
      localStorage.getItem('user') || '{}'
    ).role;
    const currentUserName=JSON.parse(
      localStorage.getItem('user') || '{}'
    ).fullName;
    this.name=currentUserName;
    if(currentUserRole === 'Admin'){
      this.isAdmin=true;
    }
    console.log(this.isAdmin);
  }
  addToCart(food: any) {
    // console.log(food);
    this.dummyfood.foodId = food.foodId;
    this.dummyfood.foodName = food.foodName;
    this.dummyfood.price = food.price;
    this.dummyfood.quantity = food.quantity;
    this.dummyfood.category = food.category;
    this.dummyfood.cart.cartId = 1;
    console.log(this.dummyfood);
    //  console.log(this.dummyfood.foodId)
    //  debugger;
    // food.cart.cartId = 1;
    this.foodService.updateFood(this.dummyfood).subscribe((data) => {
      // Update the food item
      console.log("assdsdeee"+data); // Log the response
    });
    this.router.navigate(['/cart']);
  }
  deleteFood(id: any) {
          if (window.confirm('Are you sure you want to delete this food item?')) {
            this.foodService.deleteFood(id).subscribe(
              {
                next: (response) => {
                  console.log("Food deleted..", response);
                  this.router.navigate(['/dashboard']);
                },
                error: (error) => {
                  console.error("Error deleting food...", error);
                },
              }
            );
          }
  }
  addToCartofCat(id:number){

  }
  goToAddFood(){
    this.router.navigate(['/addfood'])
  }
  currentFilter: string = 'all';
  // filterSelection(filter: string): void {
  //   this.currentFilter = filter;

  // }
  foodbyCat: any = {};  //store the category food
  fetchFoodByCategory(categoryName:string){
 this.currentFilter=categoryName;
    //  const id= this.searchIDFromCategory(categoryName);
    //  this.categoryService.getCategoryById(id).subscribe(
    //   (data)=>{
    //     this.foodbyCat=data;
    //     this.categoryfoodarray=Array.isArray(this.foodbyCat) ? this.foodbyCat : [this.foodbyCat];
    //   }
    //  )
 
  }

  getNameofCat(id:number){
    let name='';
    for(let i=0;i<this.category.length;i++){
      if(this.category[i].categoryId===id){
        name=this.category[i].categoryName;
        break;
      }
    }
    return name
  }
  goToReview(){
    this.router.navigate(['/review'])
  }
  searchIDFromCategory(categoryName: any): number {
    let categoryID = 0;
    for (let i = 0; i < this.category.length; i++) {
      if (this.category[i].categoryName === categoryName) {
        categoryID = this.category[i].categoryId;
        break;
      }
    }
    return categoryID;
  }
  isClose : boolean=false
  toggleNav(): void {
    this.isClose = !this.isClose; // Toggle the sidebar state
    const sidenav = document.getElementById("mySidenav");
    const mainContent = document.getElementById("main");
 
    if (this.isClose) {
      // Open the sidenav
      if (sidenav && mainContent) {
        sidenav.style.width = "175px"; // Open the sidenav
        mainContent.style.marginLeft = "200px"; // Shift main content
        document.body.style.backgroundColor = "rgba(0,0,0,0.4)"; // Change background
      }
    } else {
      // Close the sidenav
      if (sidenav && mainContent) {
        sidenav.style.width = "0"; // Close the sidenav
        mainContent.style.marginLeft = "0"; // Reset main content margin
        document.body.style.backgroundColor = "white"; // Reset background color
      }
    }
  }
}
