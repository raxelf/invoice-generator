package model

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Item struct {
	ID string `gorm:"primaryKey;type:varchar(36)"`
	Code string `gorm:"uniqueIndex;not null"`
	Name string `gorm:"not null"`
	Price int64  `gorm:"not null"`
}

// hooks
func (i *Item) BeforeCreate(tx *gorm.DB) error {
	i.ID = uuid.New().String()
	return nil
}