import { addDays, format, startOfDay } from "date-fns";
import {
  castToMenuSerializer,
  MenuSerializer,
} from "../../serializers/MenuSerializer";
import { MAX_NUMBER_OF_DAYS_RESERVABLE } from "../utils/const";
import client from "./client";

export async function getAllMenus(): Promise<{
  result: MenuSerializer[];
  error: string;
}> {
  try {
    const res = await client.get("/api/v1/menus/index");
    const items = JSON.parse(JSON.stringify(res.data));
    if (items["errors"] && items["errors"].length > 0) {
      return { result: [], error: items["errors"] };
    }
    const menus: MenuSerializer[] = items.map((e: any) =>
      castToMenuSerializer(e)
    );
    return { result: menus, error: "" };
  } catch (err) {
    return { result: [], error: "サーバーとの通信に失敗しました" };
  }
}

export async function getReservableMenus(): Promise<{
  result: MenuSerializer[];
  error: string;
}> {
  try {
    const params = {
      min_date: format(addDays(startOfDay(new Date()), 1), "yyyy-MM-dd"),
      max_date: format(
        addDays(startOfDay(new Date()), MAX_NUMBER_OF_DAYS_RESERVABLE),
        "yyyy-MM-dd"
      ),
    };
    const res = await client.get("/api/v1/menus/index", { params: params });
    const items = JSON.parse(JSON.stringify(res.data));
    if (items["errors"] && items["errors"].length > 0) {
      return { result: [], error: items["errors"] };
    }
    const menus: MenuSerializer[] = items.map((e: any) =>
      castToMenuSerializer(e)
    );
    return { result: menus, error: "" };
  } catch (err) {
    return { result: [], error: "サーバーとの通信に失敗しました" };
  }
}
