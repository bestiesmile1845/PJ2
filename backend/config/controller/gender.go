package controller

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"example.com/pj2/entity"
	"example.com/pj2/config"

)
func ListGenders(c *gin.Context) {
	var gender []entity.Genders

	db := config.DB()

	db.Find(&gender)

	c.JSON(http.StatusOK, &gender)
}