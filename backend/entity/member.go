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
	TypeMember       string
	PaymentStatus    string
	SuspensionStatus string
	Age              string
	Gender           Genders `gorm:"foreignKey: gender_id" json:"gender"`
}
