import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.lostdutchmanmine.app",
  appName: "lost-dutchman-mine",
  webDir: "",
  server: {
    hostname: "play.lostmine.cc",
    androidScheme: "https",
    url: "https://play.lostmine.cc",
  },
};

export default config;
