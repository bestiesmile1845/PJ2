package entity

import (
	"gorm.io/gorm"
)

type Member struct {
	gorm.Model

	Firstname        string
	Lastname         string
	Email            string
	Password         string
	Username         string
	Phonenumber      string
	GenderID         uint
	Age              string
	Gender           Genders `gorm:"foreignKey:GenderID"`
	Bookings []Booking `gorm:"foreignKey:MemberID"`

	Payments [] Payment `gorm:"foreignKey:MemberID "`
}
