package controllers

import (
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

func InsertOrder(c *gin.Context) {

	db := connect()
	defer db.Close()

	activeUserId := GetUserId(c)
	println(activeUserId)

	branchName := c.PostForm("branch_name")
	println(branchName)
	phoneNumber := c.PostForm("phone_number")
	println(phoneNumber)
	address := c.PostForm("address")
	println(address)
	productNames := strings.Split(c.PostForm("product_name"), ",")

	println(productNames)
	quantity := strings.Split(c.PostForm("quantity"), ",")
	println(quantity)

	var branchId int
	err := db.QueryRow("SELECT id FROM branches WHERE name = ?", branchName).Scan(&branchId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid branch name"})
		return
	}

	productIds := make([]int, len(productNames))
	for i, productName := range productNames {
		println(productName)
		err = db.QueryRow("SELECT id FROM products WHERE name = ?", productName).Scan(&productIds[i])
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid product name", "debug": err.Error()})
			return
		}

		quantity, err := strconv.Atoi(quantity[i])
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid quantity"})
			return
		}

		_, err = db.Exec("UPDATE branchproduct bp "+
			"JOIN branches b ON bp.branchId = b.id "+
			"JOIN products p ON bp.productId = p.id "+
			"SET bp.productQuantity = bp.productQuantity - ? "+
			"WHERE b.id = ? AND p.id = ?", quantity, branchId, productIds[i])
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
	}

	now := time.Now()

	result, err := db.Exec("INSERT INTO `orders` (transactionTime, userId, status, branchId) VALUES (?, ?, 'ON PROGRESS',  ?)", now, activeUserId, branchId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	lastInsertId, err := result.LastInsertId()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	orderId := int(lastInsertId)
	for i, _ := range productNames {
		_, err = db.Exec("INSERT INTO orderdetails (orderId, productId, quantity) VALUES (?, ?, ?)", orderId, productIds[i], quantity[i])
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
	}
	// get latest order id
	query := "SELECT id FROM `orders` WHERE userId = ? AND status = 'ON PROGRESS' AND devileryMethod = 'DELIVERY' ORDER BY orders.transactionTime DESC LIMIT 1"
	orderRows, err := db.Query(query, activeUserId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to fetch orders"})
		return
	}
	defer orderRows.Close()
	var orderID int
	for orderRows.Next() {
		err := orderRows.Scan(&orderID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to scan order ID"})
			return
		}
	}
	// insert to delivery details
	_, err2 := db.Exec("INSERT INTO `deliveryDetails` (orderId, phoneNumber, address) VALUES (?, ?, ?)", orderID, phoneNumber, address)
	if err2 != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var response Response
	response.Status = http.StatusOK
	response.Message = http.StatusText(http.StatusOK)
	response.Data = gin.H{"message": "order created successfully"}
	c.JSON(http.StatusOK, response)
}

func HistoryOrder(c *gin.Context) {
	db := connect()
	defer db.Close()

	activeUserId := GetUserId(c)

	var orders []Order
	query := "SELECT id FROM `orders` WHERE userId = ?"
	orderRows, err := db.Query(query, activeUserId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to fetch orders"})
		return
	}
	defer orderRows.Close()

	for orderRows.Next() {
		totalPrice := 0
		var orderID int
		err := orderRows.Scan(&orderID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to scan order ID"})
			return
		}

		var order Order
		var orderDetails []OrderDetails
		detailRows, err := db.Query("SELECT product.name, product.price, orderdetails.quantity FROM products product"+
			" JOIN orderdetails ON product.id = orderdetails.productId"+
			" JOIN `orders` ON orderdetails.orderid = orders.id WHERE orders.id = ?", orderID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to fetch order details"})
			return
		}
		defer detailRows.Close()

		for detailRows.Next() {
			var orderDetail OrderDetails
			err := detailRows.Scan(&orderDetail.Product.Name, &orderDetail.Product.Price, &orderDetail.Quantity)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to scan order detail"})
				return
			}
			totalPrice += (orderDetail.Product.Price * orderDetail.Quantity)
			orderDetails = append(orderDetails, orderDetail)
		}

		order.TotalPrice = totalPrice
		order.Details = orderDetails
		order.ID = orderID
		err = db.QueryRow("SELECT transactionTime, branchid, `status` FROM `orders` WHERE id = ?", orderID).Scan(&order.TransactionTime, &order.BranchID, &order.Status)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		orders = append(orders, order)
	}

	var response Response
	response.Status = http.StatusOK
	response.Message = http.StatusText(http.StatusOK)
	response.Data = orders
	c.IndentedJSON(http.StatusOK, response)
}

func UpdateOrderStatus(c *gin.Context) {
	db := connect()
	defer db.Close()

	status := strings.ToUpper(c.PostForm("status"))
	validStatusValues := []string{"ONGOING", "COMPLETED", "CANCELLED"}

	isValidStatus := false
	for _, validStatus := range validStatusValues {
		if status == validStatus {
			isValidStatus = true
			break
		}
	}
	if !isValidStatus {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid Order Status Value"})
		return
	}

	orderId := c.Param("id")

	_, errQueryUpdateOrderStatus := db.Exec("UPDATE `orders` SET `status`=? WHERE `id`=?",
		status,
		orderId,
	)

	if errQueryUpdateOrderStatus != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Update Order Status Failed"})
		return
	}

	var response Response
	response.Status = http.StatusOK
	response.Message = http.StatusText(http.StatusOK)
	response.Data = gin.H{"message": "Update Order Status Success"}
	c.JSON(http.StatusOK, response)
}

func GetLatestOrder(c *gin.Context) {
	db := connect()
	defer db.Close()

	activeUserId := GetUserId(c)

	var orders []Order
	query := "SELECT id FROM `orders` WHERE userId = ? ORDER BY orders.transactionTime DESC LIMIT 1"
	orderRows, err := db.Query(query, activeUserId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to fetch orders"})
		return
	}
	defer orderRows.Close()

	for orderRows.Next() {
		totalPrice := 0
		var orderID int
		err := orderRows.Scan(&orderID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to scan order ID"})
			return
		}

		var order Order
		var orderDetails []OrderDetails
		detailRows, err := db.Query("SELECT product.name, product.price, orderdetails.quantity FROM products product"+
			" JOIN orderdetails ON product.id = orderdetails.productId"+
			" JOIN `orders` ON orderdetails.orderid = orders.id WHERE orders.id = ?", orderID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to fetch order details"})
			return
		}
		defer detailRows.Close()

		for detailRows.Next() {
			var orderDetail OrderDetails
			err := detailRows.Scan(&orderDetail.Product.Name, &orderDetail.Product.Price, &orderDetail.Quantity)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to scan order detail"})
				return
			}
			totalPrice += (orderDetail.Product.Price * orderDetail.Quantity)
			orderDetails = append(orderDetails, orderDetail)
		}

		order.TotalPrice = totalPrice
		order.Details = orderDetails
		order.ID = orderID
		err = db.QueryRow("SELECT transactionTime, branchid, `status` FROM `orders` WHERE id = ?", orderID).Scan(&order.TransactionTime, &order.BranchID, &order.Status)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		orders = append(orders, order)
	}

	var response Response
	response.Status = http.StatusOK
	response.Message = http.StatusText(http.StatusOK)
	response.Data = orders
	c.IndentedJSON(http.StatusOK, response)
}

func GetViewOrder(c *gin.Context) {
	db := connect()
	defer db.Close()

	activeUserId := GetUserId(c)

	var orderDetails []OrderDetails2

	query := "SELECT id FROM `orders` WHERE userId = ? ORDER BY orders.transactionTime DESC LIMIT 1"
	orderRows, err := db.Query(query, activeUserId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to fetch orders"})
		return
	}
	defer orderRows.Close()

	for orderRows.Next() {
		totalPrice := 0
		var orderID int
		err := orderRows.Scan(&orderID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to scan order ID"})
			return
		}

		detailRows, err := db.Query("SELECT product.name, product.price, product.pictureUrl, orderdetails.quantity FROM products product"+
			" JOIN orderdetails ON product.id = orderdetails.productId"+
			" JOIN `orders` ON orderdetails.orderid = orders.id WHERE orders.id = ?", orderID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to fetch order details"})
			return
		}
		defer detailRows.Close()

		for detailRows.Next() {
			var orderDetail OrderDetails2
			err := detailRows.Scan(&orderDetail.Product.Name, &orderDetail.Product.Price, &orderDetail.PictureUrl, &orderDetail.Quantity)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to scan order detail"})
				return
			}
			totalPrice += (orderDetail.Product.Price * orderDetail.Quantity)
			orderDetails = append(orderDetails, orderDetail)
		}
	}

	var response Response
	response.Status = http.StatusOK
	response.Message = http.StatusText(http.StatusOK)
	print(orderDetails)
	response.Data = orderDetails
	c.IndentedJSON(http.StatusOK, response)
}

func InsertOrderPickup(c *gin.Context) {
	db := connect()
	defer db.Close()

	activeUserId := GetUserId(c)
	println(activeUserId)

	branchName := c.PostForm("branch_name")
	println(branchName)
	productNames := strings.Split(c.PostForm("product_name"), ",")

	println(productNames)
	quantity := strings.Split(c.PostForm("quantity"), ",")
	println(quantity)

	var branchId int
	err := db.QueryRow("SELECT id FROM branches WHERE name = ?", branchName).Scan(&branchId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid branch name"})
		return
	}

	productIds := make([]int, len(productNames))
	for i, productName := range productNames {
		println(productName)
		err = db.QueryRow("SELECT id FROM products WHERE name = ?", productName).Scan(&productIds[i])
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid product name", "debug": err.Error()})
			return
		}

		quantity, err := strconv.Atoi(quantity[i])
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid quantity"})
			return
		}

		_, err = db.Exec("UPDATE branchproduct bp "+
			"JOIN branches b ON bp.branchId = b.id "+
			"JOIN products p ON bp.productId = p.id "+
			"SET bp.productQuantity = bp.productQuantity - ? "+
			"WHERE b.id = ? AND p.id = ?", quantity, branchId, productIds[i])
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
	}

	now := time.Now()

	result, err := db.Exec("INSERT INTO `orders` (transactionTime, userId, status, branchId, devileryMethod) VALUES (?, ?, 'ON PROGRESS',  ?, 'PICK UP')", now, activeUserId, branchId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	lastInsertId, err := result.LastInsertId()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	orderId := int(lastInsertId)
	for i, _ := range productNames {
		_, err = db.Exec("INSERT INTO orderdetails (orderId, productId, quantity) VALUES (?, ?, ?)", orderId, productIds[i], quantity[i])
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
	}

	var response Response
	response.Status = http.StatusOK
	response.Message = http.StatusText(http.StatusOK)
	response.Data = gin.H{"message": "order created successfully"}
	c.JSON(http.StatusOK, response)
}
