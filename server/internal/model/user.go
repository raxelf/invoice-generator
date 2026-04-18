package model

import (
	"invoice-backend/internal/utils"
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type User struct {
	ID        string    `gorm:"primaryKey;type:varchar(36)"`
	Email     string    `gorm:"uniqueIndex;not null"`
	Password  string    `gorm:"not null"`
	Role      string    `gorm:"not null"`
	CreatedAt time.Time
}

// hooks
func (u *User) BeforeCreate(tx *gorm.DB) error {
	u.ID = uuid.New().String()

	// password hash
	hashed, err := utils.HashPassword(u.Password)
	if err != nil {
		return err
	}
	u.Password = hashed

	return nil
}