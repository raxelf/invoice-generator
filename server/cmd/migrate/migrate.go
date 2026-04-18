package migrate

import (
	"invoice-backend/internal/config"
	"invoice-backend/internal/model"
	"log"

	"github.com/joho/godotenv"
)

func RunMigration() {
	_ = godotenv.Load()

	db := config.ConnectDatabase()

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