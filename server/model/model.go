package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type User struct {
	Id        primitive.ObjectID `json:"id" bson:"_id"`
	Username  string             `json:"username"`
	CreatedAt string             `json:"created_at"`
	IsActive  bool               `json:"is_active"`
}

type Message struct {
	Id        primitive.ObjectID `json:"id" bson:"_id"`
	Username  string             `json:"username"`
	Body      string             `json:"body"`
	CreatedAt string             `json:"created_at"`
	UpdatedAt string             `json:"updated_at"`
	ExpiresAt string             `json:"expires_at"`
}
