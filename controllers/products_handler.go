package controllers

import (
	"database/sql"
	"encoding/base64"
	"fmt"
	"io"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/koffeinsource/go-imgur"
)

func GetAllProductsAndTheirBranches(c *gin.Context) {
	db := connect()
	defer db.Close()

	query := "SELECT p.id, p.name, p.price, p.pictureUrl, p.category, b.id, b.name, b.address " +
		"FROM products p " +
		"JOIN branchproduct bp ON p.id=bp.productId " +
		"JOIN branches b ON bp.branchId=b.id"

	rows, err := db.Query(query)
	if err != nil {
		log.Println(err)
		c.JSON(400, gin.H{"error": "Something has gone wrong with the Product query"})
		return
	}

	var products []ProductsDetails
	var product ProductsDetails
	for rows.Next() {
		var branch Branch
		if err := rows.Scan(
			&product.ID,
			&product.Name,
			&product.Price,
			&product.PictureUrl,
			&product.Category,
			&branch.ID,
			&branch.Name,
			&branch.Address,
		); err != nil {
			log.Println(err)
			c.JSON(400, gin.H{"error": "products not found"})
			return
		} else {

			var productIdFound = false
			if len(products) > 0 {
				for i := 0; i < len(products); i++ {
					if products[i].ID == product.ID {
						products[i].Branch = append(products[i].Branch, branch)
						productIdFound = true
						break
					}
				}
			}

			if !productIdFound {
				product.Branch = []Branch{branch}
				products = append(products, product)
			}
		}
	}

	var response Response
	response.Status = http.StatusOK
	response.Message = http.StatusText(http.StatusOK)
	response.Data = products
	c.JSON(http.StatusOK, response)

}

func GetAllProductsByBranch(c *gin.Context) {
	db := connect()
	defer db.Close()

	branchName := c.Query("Branch")

	if branchName == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Input branch cannot be empty"})
		return
	}

	query := "SELECT p.id, p.name, p.price, p.pictureUrl, p.category, b.id, b.name, b.address, bp.productQuantity " +
		"FROM products p " +
		"JOIN branchproduct bp ON p.id=bp.productId " +
		"JOIN branches b ON bp.branchId=b.id " +
		"WHERE b.name=?"

	rows, err := db.Query(query, branchName)
	if err != nil {
		log.Println(err)
		c.JSON(400, gin.H{"error": "Something has gone wrong with the Product query"})
		return
	}

	var product ProductForMenu
	var products []ProductForMenu
	var productQuantity int
	var branch Branch
	for rows.Next() {
		if err := rows.Scan(
			&product.ID,
			&product.Name,
			&product.Price,
			&product.PictureUrl,
			&product.Category,
			&branch.ID,
			&branch.Name,
			&branch.Address,
			&productQuantity,
		); err != nil {
			log.Println(err)
			c.JSON(400, gin.H{"error": "products not found"})
			return
		} else {
			if productQuantity > 0 {
				product.Status = "AVAILABLE"
			} else {
				product.Status = "UNAVAILABLE"
			}
			products = append(products, product)
		}
	}

	var data BranchProductsForMenu
	data.Product = products
	data.Branch = branch

	var response Response
	response.Status = http.StatusOK
	response.Message = http.StatusText(http.StatusOK)
	response.Data = data
	c.JSON(http.StatusOK, response)
}

func GetProductsCoffeeByBranch(c *gin.Context) {
	db := connect()
	defer db.Close()

	branchName := c.Query("Branch")

	if branchName == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Input branch cannot be empty"})
		return
	}

	query := "SELECT p.id, p.name, p.price, p.pictureUrl, p.category, b.id, b.name, b.address, bp.productQuantity " +
		"FROM products p " +
		"JOIN branchproduct bp ON p.id=bp.productId " +
		"JOIN branches b ON bp.branchId=b.id " +
		"WHERE b.name=? AND p.category='COFFEE'"

	rows, err := db.Query(query, branchName)
	if err != nil {
		log.Println(err)
		c.JSON(400, gin.H{"error": "Something has gone wrong with the Product query"})
		return
	}

	var product ProductForMenu
	var products []ProductForMenu
	var branch Branch
	for rows.Next() {
		if err := rows.Scan(
			&product.ID,
			&product.Name,
			&product.Price,
			&product.PictureUrl,
			&product.Category,
			&branch.ID,
			&branch.Name,
			&branch.Address,
			&product.ProductQuantity,
		); err != nil {
			log.Println(err)
			c.JSON(400, gin.H{"error": "products not found"})
			return
		} else {
			if product.ProductQuantity > 0 {
				product.Status = "AVAILABLE"
			} else {
				product.Status = "UNAVAILABLE"
			}
			products = append(products, product)
		}
	}

	var data BranchProductsForMenu
	data.Product = products
	data.Branch = branch

	var response Response
	response.Status = http.StatusOK
	response.Message = http.StatusText(http.StatusOK)
	response.Data = data
	c.JSON(http.StatusOK, response)
}

func GetProductsYakultByBranch(c *gin.Context) {
	db := connect()
	defer db.Close()

	branchName := c.Query("Branch")

	if branchName == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Input branch cannot be empty"})
		return
	}

	query := "SELECT p.id, p.name, p.price, p.pictureUrl, p.category, b.id, b.name, b.address, bp.productQuantity " +
		"FROM products p " +
		"JOIN branchproduct bp ON p.id=bp.productId " +
		"JOIN branches b ON bp.branchId=b.id " +
		"WHERE b.name=? AND p.category='YAKULT'"

	rows, err := db.Query(query, branchName)
	if err != nil {
		log.Println(err)
		c.JSON(400, gin.H{"error": "Something has gone wrong with the Product query"})
		return
	}

	var product ProductForMenu
	var products []ProductForMenu
	var productQuantity int
	var branch Branch
	for rows.Next() {
		if err := rows.Scan(
			&product.ID,
			&product.Name,
			&product.Price,
			&product.PictureUrl,
			&product.Category,
			&branch.ID,
			&branch.Name,
			&branch.Address,
			&productQuantity,
		); err != nil {
			log.Println(err)
			c.JSON(400, gin.H{"error": "products not found"})
			return
		} else {
			if productQuantity > 0 {
				product.Status = "AVAILABLE"
			} else {
				product.Status = "UNAVAILABLE"
			}
			products = append(products, product)
		}
	}

	var data BranchProductsForMenu
	data.Product = products
	data.Branch = branch

	var response Response
	response.Status = http.StatusOK
	response.Message = http.StatusText(http.StatusOK)
	response.Data = data
	c.JSON(http.StatusOK, response)
}

func GetProductsTeaByBranch(c *gin.Context) {
	db := connect()
	defer db.Close()

	branchName := c.Query("Branch")
	if branchName == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Input branch cannot be empty"})
		return
	}

	query := "SELECT p.id, p.name, p.price, p.pictureUrl, p.category, b.id, b.name, b.address, bp.productQuantity " +
		"FROM products p " +
		"JOIN branchproduct bp ON p.id=bp.productId " +
		"JOIN branches b ON bp.branchId=b.id " +
		"WHERE b.name=? AND p.category='TEA'"

	rows, err := db.Query(query, branchName)
	if err != nil {
		log.Println(err)
		c.JSON(400, gin.H{"error": "Something has gone wrong with the Product query"})
		return
	}

	var product ProductForMenu
	var products []ProductForMenu
	var productQuantity int
	var branch Branch
	for rows.Next() {
		if err := rows.Scan(
			&product.ID,
			&product.Name,
			&product.Price,
			&product.PictureUrl,
			&product.Category,
			&branch.ID,
			&branch.Name,
			&branch.Address,
			&productQuantity,
		); err != nil {
			log.Println(err)
			c.JSON(400, gin.H{"error": "products not found"})
			return
		} else {
			if productQuantity > 0 {
				product.Status = "AVAILABLE"
			} else {
				product.Status = "UNAVAILABLE"
			}
			products = append(products, product)
		}
	}

	var data BranchProductsForMenu
	data.Product = products
	data.Branch = branch

	var response Response
	response.Status = http.StatusOK
	response.Message = http.StatusText(http.StatusOK)
	response.Data = data
	c.JSON(http.StatusOK, response)
}

func GetProductByNameAndBranch(c *gin.Context) {
	db := connect()
	defer db.Close()

	branchName := c.Query("Branch")
	productName := c.Query("Name")

	if branchName == "" || productName == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Input branch and name cannot be empty"})
		return
	}

	productName = "%" + c.Query("Name") + "%"

	query := "SELECT p.id, p.name, p.price, p.pictureUrl, p.category, p.subcategory, p.desc, b.id, b.name, b.address, bp.productQuantity " +
		"FROM products p " +
		"JOIN branchproduct bp ON p.id=bp.productId " +
		"JOIN branches b ON bp.branchId=b.id " +
		"WHERE b.name=? AND p.name LIKE ?"

	rows, err := db.Query(query, branchName, productName)
	if err != nil {
		log.Println(err)
		c.JSON(400, gin.H{"error": "Something has gone wrong with the Product query"})
		return
	}

	var product ProductForMenu
	var products []ProductForMenu
	var productQuantity int
	var branch Branch
	for rows.Next() {
		if err := rows.Scan(
			&product.ID,
			&product.Name,
			&product.Price,
			&product.PictureUrl,
			&product.Category,
			&product.SubCategory,
			&product.Desc,
			&branch.ID,
			&branch.Name,
			&branch.Address,
			&productQuantity,
		); err != nil {
			log.Println(err)
			c.JSON(400, gin.H{"error": "products not found"})
			return
		} else {
			product.ProductQuantity = productQuantity

			if productQuantity > 0 {
				product.Status = "AVAILABLE"
			} else {
				product.Status = "UNAVAILABLE"
			}
			products = append(products, product)
		}
	}

	var data BranchProductsForMenu
	data.Product = products
	data.Branch = branch

	var response Response
	response.Status = http.StatusOK
	response.Message = http.StatusText(http.StatusOK)
	response.Data = data
	c.JSON(http.StatusOK, response)
}

func InsertProduct(c *gin.Context) {
	db := connect()
	defer db.Close()

	var newProduct Product

	if errBind := c.Bind(&newProduct); errBind != nil {
		fmt.Print(errBind)
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	file, _, err := c.Request.FormFile("photo")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing product image"})
		return
	}

	var imageBytes []byte
	buffer := make([]byte, 1024)
	for {
		n, err := file.Read(buffer)
		if err != nil {
			if err != io.EOF {
				c.JSON(http.StatusBadRequest, gin.H{"error": "File error"})
				return
			}
			break
		}
		imageBytes = append(imageBytes, buffer[:n]...)
	}

	base64Image := base64.StdEncoding.EncodeToString(imageBytes)
	client, _ := imgur.NewClient(new(http.Client), "ad02267f3d1ac90", "")
	imageInfo, _, err := client.UploadImage([]byte(base64Image), "", "base64", newProduct.Name, newProduct.Name)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "File error"})
		return
	}

	newProduct.PictureUrl = imageInfo.Link

	if newProduct.Name == "" || newProduct.Price <= 0 || newProduct.Category == "" || newProduct.SubCategory == "" || newProduct.PictureUrl == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Input product cannot be empty"})
		return
	}

	var oldProduct int
	errGetOldProduct := db.QueryRow("SELECT `id` FROM `products` WHERE `name`=?", newProduct.Name).Scan(&oldProduct)
	if errGetOldProduct != sql.ErrNoRows {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Product existed already"})
		return
	}

	_, errQueryInsertProduct := db.Query("INSERT INTO products (name, price, category, subcategory, pictureUrl) VALUES (?,?,?,?,?)",
		newProduct.Name,
		newProduct.Price,
		newProduct.Category,
		newProduct.SubCategory,
		newProduct.PictureUrl,
	)

	if errQueryInsertProduct != nil {
		log.Println(errQueryInsertProduct)
		c.JSON(400, gin.H{"error": "insert to product table failed"})
		return
	}

	errGetNewProductId := db.QueryRow("SELECT `id` FROM `products` WHERE `name`=?", newProduct.Name).Scan(&newProduct.ID)
	if errGetNewProductId != nil {
		fmt.Println(errGetNewProductId)
		c.JSON(http.StatusBadRequest, gin.H{"message": "Get new product ID failed"})
		return
	}

	var response Response
	response.Status = http.StatusOK
	response.Message = http.StatusText(http.StatusOK)
	response.Data = newProduct
	c.JSON(http.StatusOK, response)
}

func UpdateProduct(c *gin.Context) {
	db := connect()
	defer db.Close()

	productId := c.Param("id")
	productName := c.PostForm("productName")
	productPrice := c.PostForm("productPrice")
	productCategory := c.PostForm("category")
	productSubCategory := c.PostForm("subCategory")
	productUrl := c.PostForm("picture_url")
	file, _, err := c.Request.FormFile("photo")
	if file != nil {
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Missing product image"})
			return
		}

		var imageBytes []byte
		buffer := make([]byte, 1024)
		for {
			n, err := file.Read(buffer)
			if err != nil {
				if err != io.EOF {
					c.JSON(http.StatusBadRequest, gin.H{"error": "File error"})
					return
				}
				break
			}
			imageBytes = append(imageBytes, buffer[:n]...)
		}

		base64Image := base64.StdEncoding.EncodeToString(imageBytes)
		client, _ := imgur.NewClient(new(http.Client), "ad02267f3d1ac90", "")
		imageInfo, _, err := client.UploadImage([]byte(base64Image), "", "base64", productName, productName)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "File error"})
			return
		}

		productUrl = imageInfo.Link
	}

	fmt.Println("productName = ", productName)
	fmt.Println("productPrice = ", productPrice)
	fmt.Println("productUrl = ", productUrl)
	fmt.Println("productCategory = ", productCategory)
	fmt.Println("productSubCategory = ", productSubCategory)

	var product Product

	errGetOldProduct := db.QueryRow("SELECT id, name, price FROM products WHERE id = ?", productId).Scan(&product.ID, &product.Name, &product.Price)
	if errGetOldProduct == sql.ErrNoRows {
		c.JSON(http.StatusNotFound, gin.H{"error": "Product does not exist"})
		return
	} else if errGetOldProduct != nil {
		log.Fatal(errGetOldProduct)
		return
	}

	if productId == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Product ID cannot be empty"})
		return
	}

	_, err = db.Exec("UPDATE products SET name= ?, price= ?, pictureurl= ?, category= ?, subcategory= ? WHERE id=?", productName, productPrice, productUrl, productCategory, productSubCategory, productId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error in update query"})
		return
	}

	var response Response
	response.Status = http.StatusOK
	response.Message = http.StatusText(http.StatusOK)
	response.Data = gin.H{"message": "Product update successful"}
	c.JSON(http.StatusOK, response)
}

func DeleteProduct(c *gin.Context) {
	db := connect()
	defer db.Close()

	productId := c.Param("id")

	var product Product

	errGetOldProduct := db.QueryRow("SELECT id, name, price FROM products WHERE id = ?", productId).Scan(&product.ID, &product.Name, &product.Price)
	if errGetOldProduct == sql.ErrNoRows {
		c.JSON(http.StatusNotFound, gin.H{"error": "Product does not exist"})
		return
	} else if errGetOldProduct != nil {
		log.Fatal(errGetOldProduct)
		return
	}

	if productId == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Product ID cannot be empty"})
		return
	}

	_, errDelFromProductBranch := db.Exec("DELETE FROM branchproduct WHERE productid = ?", productId)
	if errDelFromProductBranch != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error in delete query for product branch"})
		return
	}

	_, errDelFromOrderDetails := db.Exec("DELETE FROM orderdetails WHERE productid = ?", productId)
	if errDelFromOrderDetails != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error in delete query for product branch"})
		return
	}

	_, err := db.Exec("DELETE FROM products WHERE id = ?", productId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error in delete query"})
		return
	}

	var response Response
	response.Status = http.StatusOK
	response.Message = http.StatusText(http.StatusOK)
	response.Data = gin.H{"message": "Product delete successful"}
	c.JSON(http.StatusOK, response)
}
