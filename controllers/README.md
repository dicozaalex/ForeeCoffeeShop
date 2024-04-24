# Controllers
Backend for Forree Coffee Shop using Go with Gin Framework.

# API Endpoint
|Endpoint|Menthod|Description|
|----|-----|-------|
|/login|POST|Users can login|
|/logout|POST|Users can logout|
|/register|POST|Customercan register|
|/email|GET|Send emails to inverstors|
|/restart-email-cron|GET|	Restarts the CRON job for email to investors|
|/orders|POST|Customer can place orders|
|/orders/status|PUT|Admins can edit order statuses.|
|/products|GET, POST, PUT, DELETE|Admin and customer can search menu, Admin can insert, update, or delete menu items|
|/products/name|GET|Admins and customers can search menu items by name|
|/branches|GET, POST, PUT, DELETE|Admins and customers can view branches, Admin can insert, update, or delete branches|
|/productBranch|POST, PUT, DELETE|Admins can manage product stock by branch.|


# Security Concern
This backend is built with authentication and authorization. If a user is not logged in, then the endpoint will return `{"error":"User not logged in!"}`. 

# Automatic Sales Recapitulation Email for Investors
An automatic sales recapitulation email is sent daily to investors, containing date, product image, name, price, quantity, total, and grand total.

# How to Run Local
1. Clone the repository.
    ```
    git clone https://github.com/dicozaalex/ForeeCoffeeShop.git
    ```
2. Create a .env file inside ForeeCoffeeShop with your own data. Refer to .env.example for the required variables and data.
3. Initialize a new go.mod and go.sum by running:
    ```
    go mod init
    ```
4. Run the Front End application
    ```
    go run main.go
    ```
5. It will run on `localhost:{ROUTER_PORT}.`