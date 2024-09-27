package controller

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"example.com/pj2/entity"
	"example.com/pj2/config"

)

// POST /users
func CreateMember(c *gin.Context) {
	var member entity.Member

	// bind เข้าตัวแปร member
	if err := c.ShouldBindJSON(&member); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	// ค้นหา gender ด้วย id
	var genders entity.Genders
	db.First(&genders, member.GenderID)
	if genders.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "gender not found"})
		return
	}	

	// เข้ารหัสลับรหัสผ่านที่ผู้ใช้กรอกก่อนบันทึกลงฐานข้อมูล
	hashedPassword, _ := config.HashPassword(member.Password)

	// สร้าง Member
	m := entity.Member{
		Firstname: member.Firstname, // ตั้งค่าฟิลด์ FirstName
		Lastname:  member.Lastname,  // ตั้งค่าฟิลด์ LastName
		Email:     member.Email,     // ตั้งค่าฟิลด์ Email
		Password:  hashedPassword,
		Username: member.Username,
		Phonenumber: member.Phonenumber,
		GenderID:  member.GenderID,
		Gender:    genders, // โยงความสัมพันธ์กับ Entity Gender
		Age: member.Age,
		TypeMember:member.TypeMember,
		PaymentStatus:member.PaymentStatus,
		SuspensionStatus:member.SuspensionStatus,
	}

	// บันทึก
	if err := db.Create(&m).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": m})
}

// GET /member/:id
func GetMember(c *gin.Context) {
	ID := c.Param("id")
	var member entity.Member

	db := config.DB()
	results := db.Preload("Gender").First(&member, ID)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	if member.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	c.JSON(http.StatusOK, member)
}
func GetUsername(c *gin.Context) {
	Username := c.Param("username")
	var member entity.Member

	db := config.DB()
	results := db.Preload("Gender").First(&member, Username)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	if member.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	c.JSON(http.StatusOK, member)
}

func GetPassword(c *gin.Context) {
	Password := c.Param("password")
	var member entity.Member

	db := config.DB()
	results := db.Preload("Gender").First(&member, Password)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	if member.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	c.JSON(http.StatusOK, member)
}

// GET /users
func ListMembers(c *gin.Context) {

	var users []entity.Member

	db := config.DB()
	results := db.Preload("Gender").Find(&users)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, users)
}

// DELETE /users/:id
func DeleteMember(c *gin.Context) {

	id := c.Param("id")
	db := config.DB()
	if tx := db.Exec("DELETE FROM users WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})

}

// PATCH /users
func UpdateMember(c *gin.Context) {
	var member entity.Member

	UserID := c.Param("id")

	db := config.DB()
	result := db.First(&member, UserID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}

	if err := c.ShouldBindJSON(&member); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	result = db.Save(&member)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}