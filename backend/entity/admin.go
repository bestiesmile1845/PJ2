package entity


import (
   "gorm.io/gorm"
)

type Admin struct {

	gorm.Model
	Firstname string    
	Lastname  string    
	Email     string    
	Username string 
	Password  string    
	GenderID  uint 
	Gender    Genders  `gorm:"foreignKey: gender_id" json:"gender"`
	Classes []Class `gorm:"foreignKey:AdminID"`
}