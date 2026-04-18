package seed

import (
	"invoice-backend/internal/model"
	"log"

	"gorm.io/gorm"
)

func RunSeeders(db *gorm.DB) {
	seedUsers(db)
	seedItems(db)
}

func seedUsers(db *gorm.DB) {
	// avoid duplicate user
	var count int64
	db.Model(&model.User{}).Count(&count)
	if count > 0 {
		log.Println("Users already seeded, skipping..")
		return
	}

	users := []model.User{
		{Email: "admin@mail.id", Password: "admin123", Role: "admin"},
		{Email: "kerani@mail.id", Password: "kerani123", Role: "kerani"},
	}

	if err := db.Create(&users).Error; err != nil {
		log.Fatalf("Failed to seed users: %v", err)
	}

	log.Println("Users seeded..")
}

func seedItems(db *gorm.DB) {
	// avoid duplicate items
	var count int64
	db.Model(&model.Item{}).Count(&count)
	if count > 0 {
		log.Println("Items already seeded, skipping..")
		return
	}

	items := []model.Item{
		{Code: "BRG-001", Name: "Laptop", Price: 15000000},
		{Code: "BRG-002", Name: "Mouse", Price: 250000},
		{Code: "BRG-003", Name: "Keyboard", Price: 450000},
		{Code: "BRG-004", Name: "Monitor", Price: 3500000},
		{Code: "BRG-005", Name: "Headset", Price: 750000},
		{Code: "BRG-006", Name: "Webcam", Price: 500000},
		{Code: "BRG-007", Name: "USB Hub", Price: 200000},
	}

	if err := db.Create(&items).Error; err != nil {
		log.Fatalf("Failed to seed items: %v", err)
	}

	log.Println("items seeded..")
}
