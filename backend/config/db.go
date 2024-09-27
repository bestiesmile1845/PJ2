package config

import (
	"fmt"
	"example.com/pj2/entity"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func ConnectionDB() {
	database, err := gorm.Open(sqlite.Open("sa.db?cache=shared"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	fmt.Println("connected database")
	db = database
}

func SetupDatabase() {
	// AutoMigrate will create the tables and columns if they do not exist
	err := db.AutoMigrate(
		&entity.Member{},
		&entity.Genders{},
		&entity.Admin{},
	)
	if err != nil {
		fmt.Printf("Error during AutoMigrate: %v\n", err)
		return
	}

	// Create gender entries if they do not exist
	genders := []entity.Genders{
		{Gender: "Male"},
		{Gender: "Female"},
	}
	for _, gender := range genders {
		db.FirstOrCreate(&gender, entity.Genders{Gender: gender.Gender})
	}

	// Hash passwords
	hashedPassword, err := HashPassword("123456")
	if err != nil {
		fmt.Printf("Error hashing password: %v\n", err)
		return
	}

	hashedPassword1, err := HashPassword("admin")
	if err != nil {
		fmt.Printf("Error hashing password: %v\n", err)
		return
	}

	// Create member if not exists
	member := &entity.Member{
		Firstname:   "smile",
		Lastname:    "member",
		Email:       "member@gmail.com",
		Username:    "member1",
		Password:    hashedPassword,
		GenderID:    1,
		Phonenumber: "0655765586",
		Age:         "20",
	}
	db.FirstOrCreate(member, entity.Member{Email: "member@gmail.com"})

	// Create admin if not exists
	admin := &entity.Admin{
		Firstname: "admin",
		Lastname:  "smile",
		Email:     "admin@gmail.com",
		Username:  "admin1",
		Password:  hashedPassword1,
		GenderID:  1,
	}
	db.FirstOrCreate(admin, entity.Admin{Email: "admin@gmail.com"})


	
	
}
