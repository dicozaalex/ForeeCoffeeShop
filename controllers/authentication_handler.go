package controllers

import (
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

func generateToken(c *gin.Context, id int, name string, role string) string {
	jwtSecretKey := os.Getenv("JWT_SECRET_KEY")

	expiryTime := time.Now().Add(time.Hour * 24)
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, &CustomClaims{
		ID:       id,
		Username: name,
		Role:     role,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expiryTime.Unix(),
		},
	})

	tokenString, err := token.SignedString([]byte(jwtSecretKey))
	if err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
		return ""
	}

	return tokenString
}

func AuthMiddleware(roles ...string) gin.HandlerFunc {
	authorizationHeader := "Authorization"
	return func(c *gin.Context) {
		authHeader := c.GetHeader(authorizationHeader)
		if authHeader == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"error": "Unauthorized",
			})
			return
		}

		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"error": "Invalid authorization format",
			})
			return
		}

		tokenString := parts[1]
		jwtSecretKey := os.Getenv("JWT_SECRET_KEY")

		parsedToken, err := jwt.ParseWithClaims(tokenString, &CustomClaims{}, func(accessToken *jwt.Token) (interface{}, error) {
			return []byte(jwtSecretKey), nil
		})

		if err != nil || !parsedToken.Valid {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"error": "Unauthorized",
			})
			return
		}

		claims, ok := parsedToken.Claims.(*CustomClaims)
		if !ok {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"error": "Unauthorized",
			})
			return
		}

		authorized := false
		for _, role := range roles {
			if claims.Role == role {
				authorized = true
				break
			}
		}

		if !authorized {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"error": "Unauthorized",
			})
			return
		}
		c.Next()
	}
}

func GetUserId(c *gin.Context) int {
	cookieName := "_auth"
	if cookie, err := c.Cookie(cookieName); err == nil {
		if cookie == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"error": "Unauthorized",
			})
			return 0
		}
		jwtSecretKey := os.Getenv("JWT_SECRET_KEY")

		parsedToken, err := jwt.ParseWithClaims(cookie, &CustomClaims{}, func(accessToken *jwt.Token) (interface{}, error) {
			return []byte(jwtSecretKey), nil
		})

		if err != nil || !parsedToken.Valid {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"error": "Unauthorized",
			})
			return 0
		}

		claims, ok := parsedToken.Claims.(*CustomClaims)
		if !ok {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"error": "Unauthorized",
			})
			return 0
		}

		return claims.ID
	} else {
		return 0
	}
}
