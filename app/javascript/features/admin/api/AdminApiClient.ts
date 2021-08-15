import {
  AppointmentSerializer,
  castToAppointmentSerializer,
} from "../../../serializers/AppointmentSerializer";
import {
  castToMenuSerializer,
  MenuSerializer,
} from "../../../serializers/MenuSerializer";
import client from "../../../shared/api/client";

export class AdminApiClient {
  static async getMenus(): Promise<{
    success: boolean;
    data: MenuSerializer[];
  }> {
    try {
      const res = await client.get("/api/admin/menus/index");
      const json = JSON.parse(JSON.stringify(res.data));
      if (json["errors"]) {
        return { success: false, data: [] };
      }
      const menus: MenuSerializer[] = json.map((e: any) =>
        castToMenuSerializer(e)
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
}