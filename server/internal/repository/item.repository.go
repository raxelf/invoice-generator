package repository

import (
	"invoice-backend/internal/model"

	"gorm.io/gorm"
)

func FindItems(db *gorm.DB, code string) ([]model.Item, error) {
	var items []model.Item
	query := db.Model(&model.Item{})

	if code != "" {
		query = query.Where("code LIKE ?", "%"+code+"%")
	}

	result := query.Find(&items)
	return items, result.Error
}
