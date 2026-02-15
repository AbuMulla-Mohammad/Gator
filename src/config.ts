import os from "os";
import fs from "fs";
import path from "path";

export type Config = {
    dbUrl: string;
    currentUserName: string | null;
}


export function setUser(userName: string) {
    const config = readConfig();
    config.currentUserName = userName;
    writeConfig(config);
}

export function readConfig():Config {
    const cfgFilePath = getConfigFilePath()

    if (!fs.existsSync(cfgFilePath)) {
        throw new Error("Config file not found");
    }
    const jsonCfgObject = JSON.parse(fs.readFileSync(cfgFilePath, {
        encoding: "utf8"
    }));

    return validateConfig(jsonCfgObject);
}

function getConfigFilePath():string {
    return path.join(os.homedir(), ".gatorconfig.json");
}

function writeConfig(cfg: Config) {
    const cfgFilePath = getConfigFilePath();

    const raw = {
        db_url: cfg.dbUrl,
        current_user_name: cfg.currentUserName,
    };
    
    fs.writeFileSync(cfgFilePath, JSON.stringify(raw,null,2), {
        encoding: "utf-8",
        flag: "w",
        mode: 0o644
    });
    
}

function validateConfig(raw: any): Config {
  if (!raw || typeof raw !== "object") {
    throw new Error("Invalid config file format");
  }

  if (typeof raw.db_url !== "string") {
    throw new Error("Invalid or missing db_url");
  }

  return {
    dbUrl: raw.db_url,
    currentUserName:
      typeof raw.current_user_name === "string"
        ? raw.current_user_name
        : null,
  };
}