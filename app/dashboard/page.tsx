// app/dashboard/page.tsx - Main dashboard for therapist admin
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Calendar, Users, DollarSign, FileCheck, AlertCircle, Plus } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

function MetricCard({ title, value, icon, color }: MetricCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 border-l-4" style={{ borderColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className="text-4xl opacity-20">{icon}</div>
      </div>
    </div>
  );
}

interface AppointmentCardProps {
  title: string;
  date: string;
  time: string;
  patientName: string;
  status: string;
}

function AppointmentCard({ title, date, time, patientName, status }: AppointmentCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 border-b-4 border-blue-500">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="font-semibold text-gray-900 mt-1">{patientName}</p>
          <p className="text-sm text-gray-600 mt-2">{date} at {time}</p>
        </div>
        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
          {status}
        </span>
      </div>
    </div>
  );
}

interface TaskCardProps {
  title: string;
  priority: string;
  patientName?: string;
  taskType: string;
}

function TaskCard({ title, priority, patientName, taskType }: TaskCardProps) {
  const priorityColor = {
    high: 'bg-red-100 text-red-700',
    medium: 'bg-yellow-100 text-yellow-700',
    low: 'bg-green-100 text-green-700',
  }[priority] || 'bg-gray-100 text-gray-700';

  return (
    <div className="bg-white rounded-lg shadow p-4 border-l-4 border-purple-500">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="font-semibold text-gray-900">{title}</p>
          {patientName && <p className="text-sm text-gray-600 mt-1">Patient: {patientName}</p>}
          <p className="text-xs text-gray-500 mt-1 capitalize">Type: {taskType}</p>
        </div>
        <span className={`px-2 py-1 text-xs font-semibold rounded ${priorityColor}`}>
          {priority}
        </span>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalRevenue: 0,
    upcomingSessions: 0,
    pendingPreauths: 0,
  });

  const [appointments, setAppointments] = useState<AppointmentCardProps[]>([]);
  const [tasks, setTasks] = useState<TaskCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [recentPatients, setRecentPatients] = useState<any[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  async function loadDashboardData() {
    try {
      // Get current therapist
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      // Fetch stats
      const { data: patients } = await supabase
        .from('patients')
        .select('*')
        .eq('therapist_id', user.id);

      const { data: invoices } = await supabase
        .from('invoices')
        .select('amount')
        .eq('therapist_id', user.id)
        .eq('status', 'paid');

      const { data: sessions } = await supabase
        .from('sessions')
        .select('*')
        .eq('therapist_id', user.id)
        .eq('status', 'scheduled');

      const { data: preauths } = await supabase
        .from('insurance_preauths')
        .select('*')
        .eq('therapist_id', user.id)
        .eq('status', 'pending');

      const totalRevenue = invoices?.reduce((sum, inv) => sum + (inv.amount || 0), 0) || 0;

      setStats({
        totalPatients: patients?.length || 0,
        totalRevenue: totalRevenue,
        upcomingSessions: sessions?.length || 0,
        pendingPreauths: preauths?.length || 0,
      });

      // Mock appointment data (would come from Calendly in production)
      const mockAppointments: AppointmentCardProps[] = [
        {
          title: 'Individual Therapy',
          date: 'May 22, 2026',
          time: '2:00 PM',
          patientName: 'Sarah Johnson',
          status: 'Confirmed',
        },
        {
          title: 'Couples Session',
          date: 'May 23, 2026',
          time: '3:30 PM',
          patientName: 'Mike & Rachel Chen',
          status: 'Confirmed',
        },
        {
          title: 'Follow-up Session',
          date: 'May 24, 2026',
          time: '10:00 AM',
          patientName: 'Alex Martinez',
          status: 'Pending Response',
        },
      ];
      setAppointments(mockAppointments);

      // Mock task data
      const mockTasks: TaskCardProps[] = [
        {
          title: 'Submit insurance pre-auth for Sarah Johnson',
          priority: 'high',
          patientName: 'Sarah Johnson',
          taskType: 'insurance',
        },
        {
          title: 'Follow up on unpaid invoice',
          priority: 'high',
          patientName: 'Mike Chen',
          taskType: 'billing',
        },
        {
          title: 'Complete session notes from May 20 session',
          priority: 'medium',
          patientName: 'Alex Martinez',
          taskType: 'documentation',
        },
        {
          title: 'Schedule next appointment with new patient',
          priority: 'low',
          taskType: 'admin',
        },
      ];
      setTasks(mockTasks);

      // Get recent patients
      const { data: recentPatientsData } = await supabase
        .from('patients')
        .select('id, first_name, last_name, email, insurance_provider, status')
        .eq('therapist_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      setRecentPatients(recentPatientsData || []);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's your therapy practice overview.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Active Patients"
            value={stats.totalPatients}
            icon={<Users />}
            color="#3B82F6"
          />
          <MetricCard
            title="Monthly Revenue"
            value={`$${stats.totalRevenue.toLocaleString()}`}
            icon={<DollarSign />}
            color="#10B981"
          />
          <MetricCard
            title="Upcoming Sessions"
            value={stats.upcomingSessions}
            icon={<Calendar />}
            color="#F59E0B"
          />
          <MetricCard
            title="Pending Pre-Auths"
            value={stats.pendingPreauths}
            icon={<FileCheck />}
            color="#EF4444"
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button className="flex items-center justify-center px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-700 font-medium transition">
              <Plus size={18} className="mr-2" />
              Add Patient
            </button>
            <button className="flex items-center justify-center px-4 py-3 bg-green-50 hover:bg-green-100 rounded-lg text-green-700 font-medium transition">
              <Plus size={18} className="mr-2" />
              Create Invoice
            </button>
            <button className="flex items-center justify-center px-4 py-3 bg-purple-50 hover:bg-purple-100 rounded-lg text-purple-700 font-medium transition">
              <Plus size={18} className="mr-2" />
              Track Pre-Auth
            </button>
            <button className="flex items-center justify-center px-4 py-3 bg-orange-50 hover:bg-orange-100 rounded-lg text-orange-700 font-medium transition">
              <Plus size={18} className="mr-2" />
              New Task
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Appointments and Tasks */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Appointments */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Upcoming Appointments</h2>
              <div className="space-y-4">
                {appointments.length > 0 ? (
                  appointments.map((apt, i) => (
                    <AppointmentCard key={i} {...apt} />
                  ))
                ) : (
                  <p className="text-gray-600 text-center py-4">No upcoming appointments</p>
                )}
              </div>
            </div>

            {/* Recent Patients */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Patients</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Name</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Email</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Insurance</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {recentPatients.length > 0 ? (
                      recentPatients.map((patient) => (
                        <tr key={patient.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-gray-900">
                            {patient.first_name} {patient.last_name}
                          </td>
                          <td className="px-4 py-3 text-gray-600">{patient.email || 'N/A'}</td>
                          <td className="px-4 py-3 text-gray-600">
                            {patient.insurance_provider || 'None'}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-2 py-1 rounded text-xs font-semibold ${
                                patient.status === 'active'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {patient.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-4 py-3 text-center text-gray-600">
                          No patients yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column: Pending Tasks */}
          <div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Pending Tasks</h2>
              <div className="space-y-4">
                {tasks.length > 0 ? (
                  tasks.map((task, i) => (
                    <TaskCard key={i} {...task} />
                  ))
                ) : (
                  <p className="text-gray-600 text-center py-4">No pending tasks</p>
                )}
              </div>
              <button className="w-full mt-6 px-4 py-2 border-2 border-purple-500 text-purple-700 font-semibold rounded-lg hover:bg-purple-50 transition">
                View All Tasks
              </button>
            </div>

            {/* Quick Tips */}
            <div className="bg-blue-50 rounded-lg p-4 mt-6 border-l-4 border-blue-500">
              <div className="flex items-start">
                <AlertCircle className="text-blue-600 mr-3 flex-shrink-0 mt-1" size={18} />
                <div>
                  <p className="font-semibold text-blue-900 text-sm">Tip</p>
                  <p className="text-blue-800 text-xs mt-1">
                    Use AI to auto-generate session notes and task recommendations to save time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
