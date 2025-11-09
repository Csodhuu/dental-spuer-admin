"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useSuperAdminLogin } from "@/hooks/useAuth";
import { useHospitals, useCreateHospital, useDeleteHospital } from "@/hooks/useHospitals";
import { useEmployees, useCreateEmployee } from "@/hooks/useEmployees";

export default function AdminDashboard() {
  const login = useSuperAdminLogin();

  const { data: hospitals, isLoading: hLoading } = useHospitals();
  const createHospital = useCreateHospital();
  const deleteHospital = useDeleteHospital();

  const { data: employees, isLoading: eLoading } = useEmployees();
  const createEmployee = useCreateEmployee();

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  const onLogin = async () => {
    try {
      await login.mutateAsync(loginForm);
      toast.success("Super Admin logged in");
    } catch (e: any) {
      toast.error(e?.response?.data?.message ?? "Login failed");
    }
  };

  const onCreateHospital = async () => {
    try {
      await createHospital.mutateAsync({
        name: "Smile Dental",
        address: "Ulaanbaatar",
        phoneNumber: "99998888",
      });
      toast.success("Hospital created");
    } catch (e: any) {
      toast.error(e?.response?.data?.message ?? "Create failed");
    }
  };

  const onCreateEmployee = async () => {
    try {
      await createEmployee.mutateAsync({
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phoneNumber: "99110022",
      });
      toast.success("Employee created");
    } catch (e: any) {
      toast.error(e?.response?.data?.message ?? "Create failed");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold">Super Admin Login</h1>
        <div className="flex gap-2">
          <input
            className="border px-3 py-2 rounded-md"
            placeholder="Email"
            value={loginForm.email}
            onChange={(e) => setLoginForm((s) => ({ ...s, email: e.target.value }))}
          />
          <input
            className="border px-3 py-2 rounded-md"
            placeholder="Password"
            type="password"
            value={loginForm.password}
            onChange={(e) => setLoginForm((s) => ({ ...s, password: e.target.value }))}
          />
          <button
            onClick={onLogin}
            disabled={login.isPending}
            className="px-4 py-2 rounded-md bg-indigo-600 text-white"
          >
            {login.isPending ? "Logging in..." : "Login"}
          </button>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold">Hospitals</h2>
          <button
            onClick={onCreateHospital}
            disabled={createHospital.isPending}
            className="px-3 py-2 rounded-md bg-green-600 text-white"
          >
            + Create
          </button>
        </div>

        {hLoading ? (
          <div>Loading hospitals…</div>
        ) : (
          <ul className="space-y-2">
            {hospitals?.map((h) => (
              <li key={h.id} className="flex items-center justify-between border p-3 rounded-md">
                <div>
                  <div className="font-medium">{h.name}</div>
                  <div className="text-sm text-gray-600">
                    {h.address} · {h.phoneNumber}
                  </div>
                </div>
                <button
                  onClick={() => deleteHospital.mutate(h.id)}
                  className="px-3 py-1.5 rounded-md bg-red-600 text-white"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="space-y-3">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold">Employees</h2>
          <button
            onClick={onCreateEmployee}
            disabled={createEmployee.isPending}
            className="px-3 py-2 rounded-md bg-blue-600 text-white"
          >
            + Create
          </button>
        </div>

        {eLoading ? (
          <div>Loading employees…</div>
        ) : (
          <ul className="space-y-2">
            {employees?.map((emp) => (
              <li key={emp.id} className="border p-3 rounded-md">
                <div className="font-medium">
                  {emp.firstName} {emp.lastName}
                </div>
                <div className="text-sm text-gray-600">
                  {emp.email} · {emp.phoneNumber ?? "-"}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
