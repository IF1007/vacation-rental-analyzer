import puppeteer from "puppeteer";
import { AirbnbCrawlerProvider } from "./providers/implementations/AirbnbCrawlerProvider";
import { ComputeUnavailableDaysByRoomAndMonthUseCase } from "./useCases/airbnb/computeUnavailableDaysByRoomAndMonth/ComputeUnavailableDaysByRoomAndMonthUseCase";
import { JsonFileUnavailableDaysRepository } from "./repositories/implementations/JsonFileUnavailableDaysRepository";

const listAirbnbRoomsUnavailableDays = async () => {
  const roomIds = (<string>process.env.AIRBNB_ROOM_IDS).split(",");
  console.log("Starting at " + new Date().getTime());
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });

  const airbnbCrawlerProvider = new AirbnbCrawlerProvider(browser);

  const jsonUnavailableDaysRepository = new JsonFileUnavailableDaysRepository(
    <string>"./tmp/unavailable_days.json"
  );

  const computeUnavailableDaysUseCase = new ComputeUnavailableDaysByRoomAndMonthUseCase(
    airbnbCrawlerProvider,
    jsonUnavailableDaysRepository
  );

  await computeUnavailableDaysUseCase.execute(roomIds)
  .catch(error => console.log(error))
  .finally(() => {
    console.log("Finishing at " + new Date().getTime());
    process.exit(0);
  })
  process.exit(0);
};

void listAirbnbRoomsUnavailableDays();
