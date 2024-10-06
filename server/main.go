package main

import (
	"log"
	"os"
	"strings"
	"time"

	"github.com/brianmstricker/cmdtalk/db"
	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cache"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/v2/mongo"
)

type App struct {
	httpServer *fiber.App
	database   *mongo.Database
}

func main() {
	app := App{}
	app.init()
}

func (a *App) init() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	a.setupHttp()
	a.setupDB()

	PORT := os.Getenv("PORT")
	if PORT == "" {
		panic("PORT is not set")
	}
	log.Fatal(a.httpServer.Listen(":" + PORT))
}

func (a *App) setupHttp() {
	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
		AllowOrigins:     "http://localhost:5173",
	}))
	app.Use(cache.New(cache.Config{
		Next: func(c *fiber.Ctx) bool {
			return strings.Contains(c.Route().Path, "/ws")
		},
		CacheControl: true,
		Expiration:   10 * time.Minute,
	}))
	app.Use("/ws", func(c *fiber.Ctx) error {
		if websocket.IsWebSocketUpgrade(c) {
			c.Locals("allowed", true)
			return c.Next()
		}
		return fiber.ErrUpgradeRequired
	})
	a.httpServer = app
}

func (a *App) setupDB() {
	client, err := db.ConnectDB()
	if err != nil {
		log.Fatal(err)
	}
	a.database = client.Database("cmdtalk")
	// client, err := db.ConnectDB()
	// if err != nil {
	// 	panic(err)
	// }
	// client.Disconnect(context.Background())

	// mongoClient, err := db.ConnectDB()
	// if err != nil {
	// 	panic(err)
	// }
	// ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	// defer cancel()
	// defer func() {
	// 	if err = mongoClient.Disconnect(ctx); err != nil {
	// 		panic(err)
	// 	}
	// }()
}
