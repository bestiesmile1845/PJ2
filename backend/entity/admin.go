package entity


import (
   "gorm.io/gorm"
)

type Admin struct {

	gorm.Model
	FirstName string    
	LastName  string    
	Email     string    
	UserName string 
	Password  string    
	GenderID  uint 
	Gender    Genders  `gorm:"foreignKey: gender_id" json:"gender"`
	Classes []Class `gorm:"foreignKey:AdminID"`
}