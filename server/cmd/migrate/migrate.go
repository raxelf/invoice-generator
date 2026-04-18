package migrate

import (
	"invoice-backend/internal/model"
	"log"

	"gorm.io/gorm"
)

func RunMigration(db *gorm.DB) {
	err := db.AutoMigrate(
		&model.User{},
		&model.Item{},
		&model.Invoice{},
		&model.InvoiceDetail{},
	)

	if err != nil {
		log.Fatalf("Migration Failed: %v", err)
	}

	log.Println("Migration Complete..")
}