package main

import (
	"context"
	"log"
	"os"
	"strings"
	"time"

	"github.com/brianmstricker/cmdtalk/controller"
	"github.com/brianmstricker/cmdtalk/db"
	"github.com/brianmstricker/cmdtalk/ws"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cache"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/v2/mongo"
)

type App struct {
	httpServer *fiber.App
	client     *mongo.Client
	database   *mongo.Database
}

func main() {
	app := App{}
	app.init()
	defer app.shutdown()
}

func (a *App) init() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	a.setupDB()
	a.setupHttp()

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
	ws.Ws(app)
	userController := controller.NewUserController(a.database.Collection("users"), a.client)
	messageController := controller.NewMessageController(a.database.Collection("messages"), a.client)
	app.Get("/api/messages", messageController.GetMessages)
	app.Get("/api/users", userController.GetUsers)
	app.Post("/api/user/create", userController.CreateUser)
	a.httpServer = app
}

func (a *App) setupDB() {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	var err error
	a.client, err = db.ConnectDB(ctx)
	if err != nil {
		log.Fatal(err)
	}
	a.database = a.client.Database("cmdtalk")
	if a.database == nil {
		log.Fatal("Could not get database")
	}
}

func (a *App) shutdown() {
	if err := a.client.Disconnect(context.Background()); err != nil {
		log.Fatal(err)
	}
}
