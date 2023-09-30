package cmd

import (
	"fmt"

	"github.com/patilsuraj767/ros-devtools/internal/api"
	"github.com/spf13/cobra"
)

var startCmd = &cobra.Command{Use: "start", Short: "Use to start ros-devtools services"}

var apiCmd = &cobra.Command{
	Use:   "api",
	Short: "starts ros-devtools api server",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("Starting ros-ocp API server")
		api.StartAPIServer()
	},
}

func init() {
	rootCmd.AddCommand(startCmd)
	startCmd.AddCommand(apiCmd)
}
