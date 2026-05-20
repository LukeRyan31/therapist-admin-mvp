// app/dashboard/page.tsx
// Main therapist dashboard showing key metrics and upcoming appointments

"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

export default function DashboardPage() {
  const [therapist, setTherapist] = useState<any>(null);
  const [upcomingAppointments, setUpcomingAppointments] = useState<any[]>([]);
  const [recentPatients, setRecentPatients] = useState<any[]>([]);
  const [pendingTasks, setPendingTasks] = useState<any[]>([]);
  const [metrics, setMetrics] = useState({
    totalPatients: 0,
    monthlyRevenue: 0,
    completedSessions: 0,
    pendingPreauths: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  async function loadDashboardData() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      // Load therapist profile
      const { data: therapistData } = await supabase
        .from("therapists")
        .select("*")
        .eq("id", user.id)
        .single();
      setTherapist(therapistData);

      // Load upcoming appointments (next 7 days)
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      const { data: appointments } = await supabase
        .from("sessions")
        .select(
          `
          *,
          patients(first_name, last_name, email)
        `
        )
        .eq("therapist_id", user.id)
        .eq("status", "scheduled")
        .gte("appointment_date", new Date().toISOString())
        .lte("appointment_date", nextWeek.toISOString())
        .order("appointment_date", { ascending: true })
        .limit(5);
      setUpcomingAppointments(appointments || []);

      // Load recent patients
      const { data: patients } = await supabase
        .from("patients")
        .select("*")
        .eq("therapist_id", user.id)
        .eq("status", "active")
        .order("updated_at", { ascending: false })
        .limit(5);
      setRecentPatients(patients || []);

      // Load pending tasks
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .eq("therapist_id", user.id)
        .eq("status", "open")
        .order("due_date", { ascending: true })
        .limit(5);
      setPendingTasks(tasks || []);

      // Load metrics
      const { data: allPatients } = await supabase
        .from("patients")
        .select("id")
        .eq("therapist_id", user.id)
        .eq("status", "active");

      const { data: completedSessions } = await supabase
        .from("sessions")
        .select("id, patient_id")
        .eq("therapist_id", user.id)
        .eq("status", "completed")
        .gte("appointment_date", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

      const { data: invoices } = await supabase
        .from("invoices")
        .select("amount")
        .eq("therapist_id", user.id)
        .eq("status", "paid")
        .gte("invoice_date", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

      const { data: preauths } = await supabase
        .from("insurance_preauths")
        .select("id")
        .eq("therapist_id", user.id)
        .eq("status", "pending");

      setMetrics({
        totalPatients: allPatients?.length || 0,
        monthlyRevenue: invoices?.reduce((sum, inv) => sum + inv.amount, 0) || 0,
        completedSessions: completedSessions?.length || 0,
        pendingPreauths: preauths?.length || 0,
      });

      setLoading(false);
    } catch (error) {
      console.error("Error loading dashboard:", error);
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome, {therapist?.name || "Therapist"}
        </h1>
        <p className="text-gray-600 mt-2">
          {therapist?.practice_name && `${therapist.practice_name} • `}
          Here's your practice overview
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Active Patients"
          value={metrics.totalPatients}
          icon="👥"
          color="blue"
        />
        <MetricCard
          title="Monthly Revenue"
          value={`$${metrics.monthlyRevenue.toLocaleString()}`}
          icon="💰"
          color="green"
        />
        <MetricCard
          title="Sessions This Month"
          value={metrics.completedSessions}
          icon="📅"
          color="purple"
        />
        <MetricCard
          title="Pending Pre-Auths"
          value={metrics.pendingPreauths}
          icon="📋"
          color="amber"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Appointments */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Upcoming Appointments
              </h2>
              <Link
                href="/dashboard/sessions"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View All →
              </Link>
            </div>

            {upcomingAppointments.length > 0 ? (
              <div className="space-y-4">
                {upcomingAppointments.map((apt) => (
                  <AppointmentCard key={apt.id} appointment={apt} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No upcoming appointments</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          {/* Pending Tasks */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Pending Tasks
            </h2>
            {pendingTasks.length > 0 ? (
              <div className="space-y-3">
                {pendingTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">All caught up!</p>
            )}
            <Link
              href="/dashboard/tasks"
              className="block mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All Tasks →
            </Link>
          </div>

          {/* Quick Actions Buttons */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                href="/dashboard/patients/new"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg text-center transition"
              >
                Add Patient
              </Link>
              <Link
                href="/dashboard/invoices"
                className="block w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg text-center transition"
              >
                Create Invoice
              </Link>
              <Link
                href="/dashboard/insurance"
                className="block w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-lg text-center transition"
              >
                Track Pre-Auth
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Patients */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Patients</h2>
          <Link
            href="/dashboard/patients"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View All →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Name
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Status
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Last Updated
                </th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {recentPatients.map((patient) => (
                <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 font-medium text-gray-900">
                    {patient.first_name} {patient.last_name}
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      {patient.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-600 text-sm">
                    {formatDistanceToNow(new Date(patient.updated_at), {
                      addSuffix: true,
                    })}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <Link
                      href={`/dashboard/patients/${patient.id}`}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      View →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Metric Card Component
function MetricCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: string | number;
  icon: string;
  color: string;
}) {
  const colorClasses = {
    blue: "bg-blue-50 border-blue-200",
    green: "bg-green-50 border-green-200",
    purple: "bg-purple-50 border-purple-200",
    amber: "bg-amber-50 border-amber-200",
  };

  return (
    <div className={`${colorClasses[color as keyof typeof colorClasses]} rounded-lg border p-6`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <span className="text-4xl">{icon}</span>
      </div>
    </div>
  );
}

// Appointment Card Component
function AppointmentCard({ appointment }: { appointment: any }) {
  const appointmentDate = new Date(appointment.appointment_date);
  const formattedDate = appointmentDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const formattedTime = appointmentDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Link
      href={`/dashboard/sessions/${appointment.id}`}
      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition"
    >
      <div className="flex-1">
        <p className="font-medium text-gray-900">
          {appointment.patients.first_name} {appointment.patients.last_name}
        </p>
        <p className="text-sm text-gray-600">
          {formattedDate} at {formattedTime}
        </p>
      </div>
      <span className="text-sm font-medium text-gray-500">
        {appointment.duration_minutes} min
      </span>
    </Link>
  );
}

// Task Card Component
function TaskCard({ task }: { task: any }) {
  const priorityColors = {
    low: "bg-blue-100 text-blue-800",
    medium: "bg-amber-100 text-amber-800",
    high: "bg-red-100 text-red-800",
  };

  return (
    <div className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition">
      <input
        type="checkbox"
        className="mt-1 w-4 h-4 text-blue-600 rounded cursor-pointer"
      />
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 text-sm truncate">{task.title}</p>
        {task.due_date && (
          <p className="text-xs text-gray-600 mt-1">
            Due {new Date(task.due_date).toLocaleDateString()}
          </p>
        )}
      </div>
      <span className={`text-xs font-medium px-2 py-1 rounded whitespace-nowrap ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
        {task.priority}
      </span>
    </div>
  );
}
