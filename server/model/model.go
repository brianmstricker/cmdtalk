package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type User struct {
	Id       primitive.ObjectID `json:"id" bson:"_id"`
	Username string             `json:"username"`
	Created  string             `json:"created"`
	IsActive bool               `json:"is_active"`
}

type Message struct {
	Id       primitive.ObjectID `json:"id" bson:"_id"`
	Username string             `json:"name"`
	Body     string             `json:"body"`
	Created  string             `json:"created"`
}
