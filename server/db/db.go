package db

import (
	"context"
	"os"

	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func ConnectDB(ctx context.Context) (*mongo.Client, error) {
	MONGODB_URI := os.Getenv("MONGODB_URI")
	client, err := mongo.Connect(options.Client().SetCompressors([]string{"zstd"}).ApplyURI(MONGODB_URI))
	if err != nil {
		panic(err)
	}
	err = client.Ping(context.Background(), nil)
	if err != nil {
		panic(err)
	}
	return client, nil
}
