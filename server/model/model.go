package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type User struct {
	Id       primitive.ObjectID `json:"id" bson:"_id"`
	Username string             `json:"username"`
}

type Message struct {
	Id   primitive.ObjectID `json:"id" bson:"_id"`
	Name string             `json:"name"`
}
