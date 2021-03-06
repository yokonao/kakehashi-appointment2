import { format } from "date-fns";
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

  static async createMenu(
    startAt: Date,
    department: string
  ): Promise<{ message: string }> {
    try {
      const params = {
        start_at: format(startAt, "yyyy-MM-dd HH:mm:ss"),
        department: department,
      };
      const res = await client.post(`/api/admin/menus/create`, params);
      if (res.status !== 200) {
        return { message: "予約枠の作成に失敗しました" };
      }
      return { message: "予約枠を作成しました" };
    } catch (err) {
      return { message: "予約枠の作成に失敗しました" };
    }
  }

  static async deleteMenu(id: number): Promise<{ message: string }> {
    try {
      const res = await client.delete(`/api/admin/menus/${id.toString()}`);
      if (res.status !== 200) {
        return { message: "予約枠の削除に失敗しました" };
      }
      return { message: "予約枠を削除しました" };
    } catch (err) {
      return { message: "予約枠の削除に失敗しました" };
    }
  }

  static async deleteMenusOnTheDay(date: Date): Promise<{ message: string }> {
    try {
      const params = {
        min_date: format(date, "yyyy-MM-dd"),
        max_date: format(date, "yyyy-MM-dd"),
      };
      const res = await client.delete("/api/admin/menus", { params: params });
      if (res.status !== 200) {
        return { message: "予約枠の削除に失敗しました" };
      }
      const json = JSON.parse(JSON.stringify(res.data));
      return { message: json.message };
    } catch (err) {
      return { message: "予約枠の削除に失敗しました" };
    }
  }

  static async deleteAppointment(
    id: number,
    reason: string
  ): Promise<{ message: string }> {
    try {
      const res = await client.delete(
        `/api/admin/appointments/${id.toString()}`,
        { data: { reason: reason } }
      );
      const json = JSON.parse(JSON.stringify(res.data));
      if (res.status !== 200) {
        return { message: json.message };
      }
      return { message: json.message };
    } catch (err) {
      return { message: "予約枠の削除に失敗しました" };
    }
  }
}
