import { UnavailableDaysByRoomAndMonth } from "../../entities/UnavailableDays";
import { IUnavailableDaysRepository } from "../IUnavailableDaysRepository";
import fs from "fs";

export class JsonFileUnavailableDaysRepository
  implements IUnavailableDaysRepository {
  constructor(private readonly jsonFilePath: string) {}

  async loadUnavailableDays(): Promise<UnavailableDaysByRoomAndMonth> {
    if (
      fs.existsSync(this.jsonFilePath) &&
      fs.statSync(this.jsonFilePath).size > 0
    ) {
      const file = fs.readFileSync(this.jsonFilePath, "utf-8");
      return new UnavailableDaysByRoomAndMonth(JSON.parse(file));
    }

    if (!fs.existsSync("./tmp/result")) {
      fs.mkdirSync("./tmp/result", {
        recursive: true
      });
    }
    return new UnavailableDaysByRoomAndMonth({});
  }

  upsertUnavailableDays(unavailableDays: UnavailableDaysByRoomAndMonth): void {
    const setToJson = (_: string, value: Set<string>) => {
      if (typeof value === "object" && value instanceof Set) {
        return [...value];
      }
      return value;
    };

    fs.writeFileSync(
      this.jsonFilePath,
      JSON.stringify(unavailableDays, setToJson, 0),
      { flag: "w+" }
    );
    console.log(this.jsonFilePath);
    console.log(JSON.stringify(unavailableDays, setToJson, 0));
  }
}
