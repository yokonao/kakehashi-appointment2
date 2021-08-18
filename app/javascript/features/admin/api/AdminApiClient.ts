import {
  AppointmentSerializer,
  castToAppointmentSerializer,
} from "../../../serializers/AppointmentSerializer";
import {
  castToMenuAdminSerializer,
  MenuAdminSerializer,
} from "../../../serializers/MenuAdminSerializer";
import client from "../../../shared/api/client";

export class AdminApiClient {
  static async getMenus(): Promise<{
    success: boolean;
    data: MenuAdminSerializer[];
  }> {
    try {
      const res = await client.get("/api/admin/menus/index");
      const json = JSON.parse(JSON.stringify(res.data));
      if (json["errors"]) {
        return { success: false, data: [] };
      }
      const menus: MenuAdminSerializer[] = json.map((e: any) =>
        castToMenuAdminSerializer(e)
      );
      return { success: true, data: menus };
    } catch (err) {
      return { success: false, data: [] };
    }
  }

  static async getAppointments(): Promise<{
    success: boolean;
    data: AppointmentSerializer[];
  }> {
    try {
      const res = await client.get("/api/admin/appointments/index");
      const json = JSON.parse(JSON.stringify(res.data));
      if (json["errors"]) {
        return { success: false, data: [] };
      }
      const appointments: AppointmentSerializer[] = json.map((e: any) =>
        castToAppointmentSerializer(e)
      );
      return { success: true, data: appointments };
    } catch (err) {
      return { success: false, data: [] };
    }
  }

  static async deleteMenu(id: number): Promise<{ message: string }> {
    try {
      const res = await client.delete(
        `/api/admin/menus/${id.toString()}`
      );
      if (res.status !== 200) {
        return { message: "予約枠の削除に失敗しました" };
      }
      return { message: "予約枠を削除しました" };
    } catch (err) {
      return { message: "予約枠の削除に失敗しました" };
    }
  }
}
