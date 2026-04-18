package repository

import (
	"invoice-backend/internal/model"

	"gorm.io/gorm"
)

func FindUserByEmail(db *gorm.DB, email string) (*model.User, error) {
	var user model.User

	result := db.Where("email = ?", email).First(&user)
	return &user, result.Error
}
