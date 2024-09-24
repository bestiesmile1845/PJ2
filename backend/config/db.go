

package config

import (
	"fmt"
	"example.com/pj2/entity"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"time"
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
		&entity.ClassType{},
		&entity.Trainer{},
		&entity.Class{},
		&entity.Booking{},

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
		FirstName: "smile",
		LastName:  "member",
		Email:     "member@gmail.com",
		UserName:  "member1",
		Password:  hashedPassword,
		GenderID:  1,
		PhoneNumber: "0655765586",
		Age: "20",
	}
	db.FirstOrCreate(member, entity.Member{Email: "admin@gmail.com"})

	// Create admin if not exists
	admin := &entity.Admin{
		FirstName: "admin",
		LastName:  "smile",
		Email:     "admin@gmail.com",
		UserName:  "admin1",
		Password:  hashedPassword1,
		GenderID:  1,
	}
	TrainerJib := entity.Trainer{Name: "Jib"}
	TrainerAdam := entity.Trainer{Name: "Adam"}

	db.FirstOrCreate(&TrainerJib, &entity.Trainer{Name: "Jib"})
	db.FirstOrCreate(&TrainerAdam, &entity.Trainer{Name: "Adam"})

	ClassTypeCardio := entity.ClassType{Name: "Cardio"}
	ClassTypeCycling := entity.ClassType{Name: "Cycling"}

	db.FirstOrCreate(&ClassTypeCardio, &entity.ClassType{Name: "Cardio"})
	db.FirstOrCreate(&ClassTypeCycling, &entity.ClassType{Name: "Cycling"})

	db.FirstOrCreate(admin, entity.Admin{Email: "admin@gmail.com"})
	StartDate, _ := time.Parse("2006-01-02 15:04:05", "2024-08-31 14:30:00")
	EndDate, _ := time.Parse("2006-01-02 15:04:05", "2024-08-31 14:30:00")
	Class := &entity.Class{
		ClassName: "Hatha Yoga",
		Deets:  "Introduction to yoga for strength & flexibility",
		StartDate: StartDate,
		EndDate:  EndDate,
		TrainerID: 1,
		ClassPic: "aa",
		ParticNum: 30,
		ClassTypeID: 1,
		AdminID: 1,
	}
	db.FirstOrCreate(Class, &entity.Class{
        ClassName: "Hatha Yoga",
    })
}
