package config

import (
	"fmt"
	"os"

	"github.com/mitchellh/mapstructure"
	clowder "github.com/redhatinsights/app-common-go/pkg/api/v1"
	"github.com/spf13/viper"
)

type Config struct {
	//Application config
	ServiceName string `mapstructure:"SERVICE_NAME"`
	LogFormater string `mapstructure:"LogFormater"`
	LogLevel    string `mapstructure:"LOG_LEVEL"`

	API_PORT string

	// Database config
	DBName     string
	DBUser     string
	DBPassword string
	DBHost     string
	DBPort     string
	DBssl      string
	DBCACert   string
}

var cfg *Config = nil

func initConfig() {
	viper.AutomaticEnv()
	if clowder.IsClowderEnabled() {
		viper.SetDefault("LogFormater", "json")

		c := clowder.LoadedConfig
		// clowder DB Config
		viper.SetDefault("DBName", c.Database.Name)
		viper.SetDefault("DBUser", c.Database.Username)
		viper.SetDefault("DBPassword", c.Database.Password)
		viper.SetDefault("DBHost", c.Database.Hostname)
		viper.SetDefault("DBPort", c.Database.Port)
		viper.SetDefault("DBssl", c.Database.SslMode)
		viper.SetDefault("DBCACert", c.Database.RdsCa)
	} else {
		viper.SetDefault("LogFormater", "text")

		// default DB Config
		viper.SetDefault("DBName", "postgres")
		viper.SetDefault("DBUser", "postgres")
		viper.SetDefault("DBPassword", "postgres")
		viper.SetDefault("DBHost", "localhost")
		viper.SetDefault("DBPort", "15432")
		viper.SetDefault("DBssl", "disable")
		viper.SetDefault("DBCACert", "")
	}

	viper.SetDefault("API_PORT", "8000")
	viper.SetDefault("LOG_LEVEL", "INFO")
	viper.SetDefault("SERVICE_NAME", "ros-devtools")

	// Hack till viper issue get fix - https://github.com/spf13/viper/issues/761
	envKeysMap := &map[string]interface{}{}
	if err := mapstructure.Decode(cfg, &envKeysMap); err != nil {
		fmt.Println(err)
	}
	for k := range *envKeysMap {
		if bindErr := viper.BindEnv(k); bindErr != nil {
			fmt.Println(bindErr)
		}
	}

	if err := viper.Unmarshal(&cfg); err != nil {
		fmt.Println("Can not unmarshal config. Exiting.. ", err)
		os.Exit(1)
	}
}

func GetConfig() *Config {
	if cfg == nil {
		initConfig()
		fmt.Println("Config initialized")
	}
	return cfg
}
