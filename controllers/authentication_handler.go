package controllers

import (
	"net/http"
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

func generateToken(c *gin.Context, id int, name string, role string) {
	cookieName := os.Getenv("COOKIE_NAME")
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
		return
	}

	http.SetCookie(c.Writer, &http.Cookie{
		Name:     cookieName,
		Value:    tokenString,
		Expires:  expiryTime,
		Secure:   false,
		HttpOnly: true,
	})

}

func resetUserToken(c *gin.Context) {
	cookieName := os.Getenv("COOKIE_NAME")
	http.SetCookie(c.Writer, &http.Cookie{
		Name:     cookieName,
		Value:    "",
		Expires:  time.Now(),
		Secure:   false,
		HttpOnly: true,
	})
}

func AuthMiddleware(roles ...string) gin.HandlerFunc {
	cookieName := os.Getenv("COOKIE_NAME")
	return func(c *gin.Context) {
		if cookie, err := c.Cookie(cookieName); err == nil {
			if cookie == "" {
				c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
					"error": "Unauthorized",
				})
				return
			}
			jwtSecretKey := os.Getenv("JWT_SECRET_KEY")

			parsedToken, err := jwt.ParseWithClaims(cookie, &CustomClaims{}, func(accessToken *jwt.Token) (interface{}, error) {
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
		} else {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"error": "Unauthorized",
			})
			return
		}
	}
}

func GetUserId(c *gin.Context) int {
	cookieName := os.Getenv("COOKIE_NAME")
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
