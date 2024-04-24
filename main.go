package main

import (
	"foreecoffeeshop/controllers"
	"log"
	"net/http/httptest"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	router := gin.Default()
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

	port := os.Getenv("ROUTER_PORT")

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{os.Getenv("FRONT_END_ADMIN_URL"), os.Getenv("FRONT_END_CUSTOMER_URL")},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// EMAIL
	router.GET("/restart-email-cron", controllers.AuthMiddleware("ADMIN"), controllers.StartCRON)
	router.GET("/email", controllers.AuthMiddleware("ADMIN"), controllers.SendEmail)

	// ORDERS
	ordersRoutes := router.Group("/orders")
	ordersRoutes.POST("", controllers.AuthMiddleware("CUSTOMER"), controllers.InsertOrder)
	ordersRoutes.GET("/history", controllers.AuthMiddleware("CUSTOMER"), controllers.HistoryOrder)
	ordersRoutes.GET("/latest-order", controllers.AuthMiddleware("CUSTOMER"), controllers.GetLatestOrder)
	ordersRoutes.GET("/view-order", controllers.AuthMiddleware("CUSTOMER"), controllers.GetViewOrder)
	ordersRoutes.PUT("/status/:id", controllers.AuthMiddleware("ADMIN"), controllers.UpdateOrderStatus)

	// LOGIN
	router.POST("/login", controllers.Login)
	router.POST("/signup", controllers.Signup)

	// PRODUCTS
	productsRoutes := router.Group("/products")
	productsRoutes.GET("", controllers.AuthMiddleware("ADMIN"), controllers.GetAllProductsAndTheirBranches)
	productsRoutes.GET("/branch", controllers.GetAllProductsByBranch)
	// productsRoutes.GET("/name", controllers.AuthMiddleware("ADMIN", "CUSTOMER"), controllers.GetProductByNameAndBranch)
	productsRoutes.GET("/name", controllers.GetProductByNameAndBranch)
	productsRoutes.GET("/coffee", controllers.AuthMiddleware("ADMIN", "CUSTOMER"), controllers.GetProductsCoffeeByBranch)
	productsRoutes.GET("/noncoffee", controllers.GetProductsNonCoffeeByBranch)
	productsRoutes.GET("/donut", controllers.GetProductsDonutByBranch)

	// productsRoutes.POST("", controllers.AuthMiddleware("ADMIN"), controllers.InsertProduct)
	productsRoutes.POST("", controllers.InsertProduct)
	// productsRoutes.PUT("/:id", controllers.AuthMiddleware("ADMIN"), controllers.UpdateProduct)
	productsRoutes.PUT("/:id", controllers.UpdateProduct)
	// productsRoutes.DELETE("/:id", controllers.AuthMiddleware("ADMIN"), controllers.DeleteProduct)
	productsRoutes.DELETE("/:id", controllers.DeleteProduct)

	// BRANCHES
	branchesRoutes := router.Group("/branches")
	branchesRoutes.GET("", controllers.AuthMiddleware("ADMIN", "CUSTOMER"), controllers.GetAllBranches)
	branchesRoutes.POST("", controllers.AuthMiddleware("ADMIN"), controllers.InsertBranch)
	branchesRoutes.PUT("/:id", controllers.AuthMiddleware("ADMIN"), controllers.UpdateBranch)
	branchesRoutes.DELETE("/:id", controllers.AuthMiddleware("ADMIN"), controllers.DeleteBranch)

	// CUSTOMER
	customerRoutes := router.Group("/customers")
	customerRoutes.PUT("/", controllers.AuthMiddleware("CUSTOMER"), controllers.UpdateCustomerProfile)
	customerRoutes.PUT("/password", controllers.AuthMiddleware("CUSTOMER"), controllers.UpdateCustomerPassword)

	// Product Branch
	productBranchRoutes := router.Group("/productBranch")
	// productBranchRoutes.POST("/:branchName", controllers.AuthMiddleware("ADMIN"), controllers.InsertMenuBranch)
	productBranchRoutes.POST("/:branchName", controllers.InsertMenuBranch)
	// productBranchRoutes.PUT("/:branchName", controllers.AuthMiddleware("ADMIN"), controllers.UpdateMenuBranch)
	productBranchRoutes.PUT("/:branchName", controllers.UpdateMenuBranch)
	productBranchRoutes.DELETE("/:branchName", controllers.AuthMiddleware("ADMIN"), controllers.DeleteMenuBranch)

	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)
	controllers.StartCRON(c)

	if err := router.Run(":" + port); err != nil {
		panic(err)
	}
}
