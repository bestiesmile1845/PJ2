package controller

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"example.com/pj2/entity"
	"example.com/pj2/config"

)

// POST /users
func CreateAdmin(c *gin.Context) {
	var admin entity.Admin

	// bind เข้าตัวแปร admin
	if err := c.ShouldBindJSON(&admin); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	// ค้นหา gender ด้วย id
	var genders entity.Genders
	db.First(&genders, admin.GenderID)
	if genders.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "gender not found"})
		return
	}	

	// เข้ารหัสลับรหัสผ่านที่ผู้ใช้กรอกก่อนบันทึกลงฐานข้อมูล
	hashedPassword1, _ := config.HashPassword(admin.Password)

	// สร้าง Member
	m := entity.Admin{
		FirstName: admin.FirstName, // ตั้งค่าฟิลด์ FirstName
		LastName:  admin.LastName,  // ตั้งค่าฟิลด์ LastName
		Email:     admin.Email,     // ตั้งค่าฟิลด์ Email
		Password:  hashedPassword1,
		UserName: admin.UserName,
		GenderID:  admin.GenderID,
		Gender:    genders, // โยงความสัมพันธ์กับ Entity Gender
	}

	// บันทึก
	if err := db.Create(&m).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": m})
}

// GET /admin/:id
func GetAdmin(c *gin.Context) {
	ID := c.Param("id")
	var admin entity.Member

	db := config.DB()
	results := db.Preload("Gender").First(&admin, ID)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	if admin.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	c.JSON(http.StatusOK, admin)
}

// GET /users
func ListAdmins(c *gin.Context) {

	var admins []entity.Admin

	db := config.DB()
	results := db.Preload("Gender").Find(&admins)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, admins)
}

// DELETE /users/:id
func DeleteAdmin(c *gin.Context) {

	id := c.Param("id")
	db := config.DB()
	if tx := db.Exec("DELETE FROM users WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})

}

// PATCH /users
func UpdateAdmin(c *gin.Context) {
	var admin entity.Member

	AdminID := c.Param("id")

	db := config.DB()
	result := db.First(&admin, AdminID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}

	if err := c.ShouldBindJSON(&admin); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	result = db.Save(&admin)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}