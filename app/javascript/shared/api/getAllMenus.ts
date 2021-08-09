import {
  castToMenuSerializer,
  MenuSerializer,
} from "../../serializers/MenuSerializer";
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
