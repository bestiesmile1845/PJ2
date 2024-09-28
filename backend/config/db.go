package config

import (
	"fmt"
	"time"
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
	db.AutoMigrate(
		&entity.Member{},
		&entity.Genders{},
		&entity.Admin{},
		&entity.ClassType{},
		&entity.Trainer{},
		&entity.Class{},
		&entity.Booking{},
		&entity.Package{},
		&entity.Payment{},
		&entity.PromptPay{},
		&entity.CreditCard{},

	)
	GenderMale := entity.Genders{Gender: "Male"}
	GenderFemale := entity.Genders{Gender: "Female"}

	db.FirstOrCreate(&GenderMale, &entity.Genders{Gender: "Male"})
	db.FirstOrCreate(&GenderFemale, &entity.Genders{Gender: "Female"})

	TrainerJib := entity.Trainer{Name: "Jib", TrainerPic: "aa"}
	TrainerAdam := entity.Trainer{Name: "Adam", TrainerPic: "aa"}

	db.FirstOrCreate(&TrainerJib, &entity.Trainer{Name: "Jib"})
	db.FirstOrCreate(&TrainerAdam, &entity.Trainer{Name: "Adam"})

	ClassTypeCardio := entity.ClassType{Name: "Cardio"}
	ClassTypeCycling := entity.ClassType{Name: "Cycling"}

	db.FirstOrCreate(&ClassTypeCardio, &entity.ClassType{Name: "Cardio"})
	db.FirstOrCreate(&ClassTypeCycling, &entity.ClassType{Name: "Cycling"})


	hashedPasswordAd, _ := HashPassword("123456")
	Admin := entity.Admin{
		Username: "Admin", 
		Password: hashedPasswordAd, 
		Email: "Admin@gmail.com", 
		Firstname: "Thawan",
		Lastname:  "Banda",
		GenderID: 2,
    }

	hashedPassword, _ := HashPassword("789012")
	Member := entity.Member{
		Username: "smile", 
		Password: hashedPassword, 
		Email: "smile@gmail.com", 
		Firstname: "Thawamhathai",
		Lastname:  "Bandasak",
		Phonenumber: "0655765586",
		GenderID: 2,
    }

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

	Package := entity.Package{
		PackageName:  "Daily",
		Description:  "Members can access all services within the fitness center for a full day",
		Price:     "59",
		Duration_days: "1 day" ,
		
	}


	db.FirstOrCreate(&Admin, entity.Admin{Email: "PsAdmin@gmail.com"})
	db.FirstOrCreate(&Member, entity.Member{Email: "Ps@gmail.com"})


	db.FirstOrCreate(Class, &entity.Class{
        ClassName: "Hatha Yoga",
    })

	db.FirstOrCreate(&Package, entity.Package{PackageName: "Daily_Membership"})

	
	
}
