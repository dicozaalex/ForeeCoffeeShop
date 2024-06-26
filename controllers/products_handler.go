package controllers

import (
	"database/sql"
	"encoding/base64"
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

	query := "SELECT p.id, p.name, p.price, p.pictureUrl, p.category, p.subcategory, b.id, b.name, b.address, bp.productQuantity, p.desc " +
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
	var branch Branch
	for rows.Next() {
		if err := rows.Scan(
			&product.ID,
			&product.Name,
			&product.Price,
			&product.PictureUrl,
			&product.Category,
			&product.SubCategory,
			&branch.ID,
			&branch.Name,
			&branch.Address,
			&product.ProductQuantity,
			&product.Desc,
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

func GetProductsCoffeeByBranch(c *gin.Context) {
	db := connect()
	defer db.Close()

	branchName := c.Query("Branch")

	if branchName == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Input branch cannot be empty"})
		return
	}

	query := "SELECT p.id, p.name, p.price, p.pictureUrl, p.category, p.subcategory, b.id, b.name, b.address, bp.productQuantity, p.desc " +
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
			&product.SubCategory,
			&branch.ID,
			&branch.Name,
			&branch.Address,
			&product.ProductQuantity,
			&product.Desc,
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

func GetProductsNonCoffeeByBranch(c *gin.Context) {
	db := connect()
	defer db.Close()

	branchName := c.Query("Branch")

	if branchName == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Input branch cannot be empty"})
		return
	}

	query := "SELECT p.id, p.name, p.price, p.pictureUrl, p.category, p.subcategory, b.id, b.name, b.address, bp.productQuantity, p.desc " +
		"FROM products p " +
		"JOIN branchproduct bp ON p.id=bp.productId " +
		"JOIN branches b ON bp.branchId=b.id " +
		"WHERE b.name=? AND p.category='NON COFFEE'"

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
			&product.SubCategory,
			&branch.ID,
			&branch.Name,
			&branch.Address,
			&product.ProductQuantity,
			&product.Desc,
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

func GetProductsDonutByBranch(c *gin.Context) {
	db := connect()
	defer db.Close()

	branchName := c.Query("Branch")

	if branchName == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Input branch cannot be empty"})
		return
	}

	query := "SELECT p.id, p.name, p.price, p.pictureUrl, p.category, p.subcategory, b.id, b.name, b.address, bp.productQuantity, p.desc " +
		"FROM products p " +
		"JOIN branchproduct bp ON p.id=bp.productId " +
		"JOIN branches b ON bp.branchId=b.id " +
		"WHERE b.name=? AND p.category='DONUT'"

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
			&product.SubCategory,
			&branch.ID,
			&branch.Name,
			&branch.Address,
			&product.ProductQuantity,
			&product.Desc,
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

	productName := c.PostForm("productName")
	productPrice := c.PostForm("productPrice")
	productCategory := c.PostForm("category")
	productSubCategory := c.PostForm("subCategory")
	productDesc := c.PostForm("desc")
	productQuantity := c.PostForm("stock")

	file, _, err := c.Request.FormFile("photo")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing product image"})
		return
	}

	imageBytes, err := io.ReadAll(file)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "File error"})
		return
	}

	base64Image := base64.StdEncoding.EncodeToString(imageBytes)
	client, _ := imgur.NewClient(new(http.Client), "ad02267f3d1ac90", "")
	imageInfo, _, err := client.UploadImage([]byte(base64Image), "", "base64", productName, productName)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "File error"})
		return
	}

	PictureUrl := imageInfo.Link

	if productName == "" || productPrice == "" || productCategory == "" || productSubCategory == "" || PictureUrl == "" || productDesc == "" || productQuantity == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Input product cannot be empty"})
		return
	}

	var oldProduct int
	errGetOldProduct := db.QueryRow("SELECT `id` FROM `products` WHERE `name`=?", productName).Scan(&oldProduct)
	if errGetOldProduct != sql.ErrNoRows {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Product existed already"})
		return
	}

	_, errQueryInsertProduct := db.Query("INSERT INTO products (name, price, category, subcategory, pictureUrl, `desc`) VALUES (?,?,?,?,?,?)",
		productName,
		productPrice,
		productCategory,
		productSubCategory,
		PictureUrl,
		productDesc,
	)

	if errQueryInsertProduct != nil {
		log.Println(errQueryInsertProduct)
		c.JSON(400, gin.H{"error": "insert to product table failed"})
		return
	}

	var newProductID int
	errGetNewProductId := db.QueryRow("SELECT `id` FROM `products` WHERE `name`=?", productName).Scan(&newProductID)
	if errGetNewProductId != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Get new product ID failed"})
		return
	}

	var response Response
	response.Status = http.StatusOK
	response.Message = http.StatusText(http.StatusOK)
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
	productDesc := c.PostForm("desc")
	file, _, err := c.Request.FormFile("photo")
	if file != nil {
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Missing product image"})
			return
		}

		imageBytes, err := io.ReadAll(file)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "File error"})
			return
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

	_, err = db.Exec("UPDATE products SET name= ?, price= ?, pictureurl= ?, category= ?, subcategory= ?, `desc`= ? WHERE id=?", productName, productPrice, productUrl, productCategory, productSubCategory, productDesc, productId)
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
