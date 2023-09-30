package logging

import (
	"os"

	"github.com/sirupsen/logrus"

	"github.com/patilsuraj767/ros-devtools/internal/config"
)

var logger *logrus.Logger = nil
var log *logrus.Entry = nil

func initLogger() {
	logger = logrus.New()
	cfg := config.GetConfig()
	var logLevel logrus.Level

	switch cfg.LogLevel {
	case "DEBUG":
		logLevel = logrus.DebugLevel
	case "ERROR":
		logLevel = logrus.ErrorLevel
	default:
		logLevel = logrus.InfoLevel
	}

	if cfg.LogFormater == "text" {
		logger.Formatter = &logrus.TextFormatter{}
	} else {
		logger.Formatter = &logrus.JSONFormatter{}
	}

	logger.Level = logLevel
	logger.Out = os.Stdout
	logger.ReportCaller = true

	log = logger.WithField("service", cfg.ServiceName)
}

func GetLogger() *logrus.Entry {
	if log == nil {
		initLogger()
		log.Info("Logging initialized")
		return log
	}
	return log
}
