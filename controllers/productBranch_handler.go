package controllers

import (
	"database/sql"
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func InsertMenuBranch(c *gin.Context) {
	db := connect()
	defer db.Close()

	branchName := c.Param("branchName")
	productName := c.PostForm("productName")
	productStok := c.PostForm("stock")

	var branch Branch
	queryBranch := "SELECT id, name, address FROM `branches` WHERE name = ?"
	row, _ := db.Prepare(queryBranch)
	err := row.QueryRow(branchName).Scan(&branch.ID, &branch.Name, &branch.Address)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Nama Branch tidak ditemukan",
			"status":  http.StatusBadRequest,
		})
		return
	}

	var product Product
	err = db.QueryRow("SELECT `id` FROM `products` WHERE `name`= ?", productName).Scan(&product.ID)
	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusBadRequest, gin.H{
				"message": "Product tidak tersedia di list product...",
				"status":  http.StatusBadRequest,
			})
			return
		}
		c.AbortWithStatus(http.StatusBadRequest)
		log.Println("error 1: ", err)
		return
	}

	query := "SELECT bp.productQuantity FROM `branchproduct` bp JOIN branches b ON bp.branchId = b.id WHERE bp.productId = ? AND b.id = ?"
	rows, _ := db.Prepare(query)
	var productQuantity int

	err = rows.QueryRow(product.ID, branch.ID).Scan(&productQuantity)
	if err != nil && err != sql.ErrNoRows {
		c.AbortWithStatus(http.StatusBadRequest)
		log.Println("error 2: ", err)
		return
	}
	if productQuantity != 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Product sudah terdaftar di branch tersebut",
			"status":  http.StatusBadRequest,
		})
		return
	}

	queryInsert := "INSERT INTO `branchproduct`(`branchId`, `productId`, `productQuantity`) VALUES (?,?,?)"
	_, err = db.Exec(queryInsert,
		branch.ID,
		product.ID,
		productStok)
	if err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		log.Println(err)
		return
	}

	var response Response
	response.Status = http.StatusOK
	response.Message = http.StatusText(http.StatusOK)
	response.Data = gin.H{
		"Branch":        branch,
		"Product":       product,
		"Product Stock": productStok,
	}
	c.JSON(http.StatusOK, response)
}

func UpdateMenuBranch(c *gin.Context) {
	db := connect()
	defer db.Close()

	branchName := "%" + c.Param("branchName") + "%"
	productName := "%" + c.PostForm("productName") + "%"
	newStock, _ := strconv.Atoi(c.PostForm("stock"))

	var updateProduct UpdateProductBranch

	// Fetch branch information
	queryBranch := "SELECT id, name, address FROM `branches` WHERE name LIKE ?"
	rowBranch, err := db.Prepare(queryBranch)
	if err != nil {
		log.Println("Error preparing branch query:", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Internal Server Error",
			"status":  http.StatusInternalServerError,
		})
		return
	}
	defer rowBranch.Close()

	err = rowBranch.QueryRow(branchName).Scan(&updateProduct.Branch.ID, &updateProduct.Branch.Name, &updateProduct.Branch.Address)
	if err != nil {
		log.Println("Error querying branch:", err)
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Nama Branch tidak ditemukan",
			"status":  http.StatusBadRequest,
		})
		return
	}

	// Fetch product information
	queryProduct := "SELECT id, name, price, pictureUrl, category FROM `products` WHERE name LIKE ?"
	rowProduct, err := db.Prepare(queryProduct)
	if err != nil {
		log.Println("Error preparing product query:", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Internal Server Error",
			"status":  http.StatusInternalServerError,
		})
		return
	}
	defer rowProduct.Close()

	err = rowProduct.QueryRow(productName).Scan(&updateProduct.Product.ID, &updateProduct.Product.Name, &updateProduct.Product.Price, &updateProduct.Product.PictureUrl, &updateProduct.Product.Category)
	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusBadRequest, gin.H{
				"message": "Product tidak tersedia di list product...",
				"status":  http.StatusBadRequest,
			})
			return
		}
		c.AbortWithStatus(http.StatusBadRequest)
		log.Println("Error querying product:", err)
		return
	}

	// Check existing stock in branch
	queryStock := "SELECT bp.productQuantity FROM `branchproduct` bp JOIN branches b ON bp.branchId = b.id WHERE bp.productId = ? AND b.id = ?"
	rowStock, err := db.Prepare(queryStock)
	if err != nil {
		log.Println("Error preparing stock query:", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Internal Server Error",
			"status":  http.StatusInternalServerError,
		})
		return
	}
	defer rowStock.Close()

	err = rowStock.QueryRow(updateProduct.Product.ID, updateProduct.Branch.ID).Scan(&updateProduct.OldStock)
	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusBadRequest, gin.H{
				"message": "Product tidak tersedia di branch ini",
				"status":  http.StatusBadRequest,
			})
			return
		}
		c.AbortWithStatus(http.StatusBadRequest)
		log.Println("Error querying stock:", err)
		return
	}

	// Update stock quantity in branch
	updateProduct.NewStock = newStock
	queryUpdate := "UPDATE `branchproduct` SET `productQuantity`= ? WHERE branchId = ? AND productId = ?"
	_, err = db.Exec(queryUpdate,
		updateProduct.NewStock,
		updateProduct.Branch.ID,
		updateProduct.Product.ID)
	if err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		log.Println("Error updating stock:", err)
		return
	}

	// Respond with success and updated product information
	var response Response
	response.Status = http.StatusOK
	response.Message = http.StatusText(http.StatusOK)
	response.Data = updateProduct
	c.JSON(http.StatusOK, response)
}

func DeleteMenuBranch(c *gin.Context) {
	db := connect()
	defer db.Close()

	branchName := "%" + c.Param("branchName") + "%"
	productName := "%" + c.Query("productName") + "%"

	var branch Branch
	queryBranch := "SELECT id, name, address FROM `branches` WHERE name LIKE ?"
	row, _ := db.Prepare(queryBranch)
	err := row.QueryRow(branchName).Scan(&branch.ID, &branch.Name, &branch.Address)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Nama Branch tidak ditemukan",
			"status":  http.StatusBadRequest,
		})
		return
	}

	query := "SELECT id, name, price, pictureUrl, category FROM `product` WHERE name LIKE ?"
	rows, _ := db.Prepare(query)
	var product Product
	err = rows.QueryRow(productName).Scan(&product.ID, &product.Name, &product.Price, &product.PictureUrl, &product.Category)
	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusBadRequest, gin.H{
				"message": "Product tidak tersedia di list product...",
				"status":  http.StatusBadRequest,
			})
			return
		}
		c.AbortWithStatus(http.StatusBadRequest)
		log.Println("error 1: ", err)
		return
	}

	queryDelete := "DELETE FROM `branchproduct` WHERE productId = ? AND branchId = ?"
	result, err := db.Exec(queryDelete,
		product.ID,
		branch.ID)
	rowsAffected, _ := result.RowsAffected()
	if err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		log.Println("error: ", err)
		return
	}
	if rowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Product tidak ditemukan di branch ini",
			"status":  http.StatusBadRequest,
		})
		return
	}

	var response Response
	response.Status = http.StatusOK
	response.Message = http.StatusText(http.StatusOK)
	response.Data = gin.H{
		"message": "Delete product success",
		"Branch":  branch,
		"Product": product,
	}
	c.JSON(http.StatusOK, response)
}
