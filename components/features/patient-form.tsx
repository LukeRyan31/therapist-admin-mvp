// components/features/patient-form.tsx - Patient create/edit form

'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { AlertCircle } from 'lucide-react';

interface PatientFormProps {
  patientId?: string;
  initialData?: {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    date_of_birth?: string;
    insurance_provider?: string;
    insurance_member_id?: string;
    insurance_group_number?: string;
    copay_amount?: number;
    session_rate?: number;
    intake_date?: string;
    notes?: string;
  };
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function PatientForm({
  patientId,
  initialData,
  onSuccess,
  onCancel,
}: PatientFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    firstName: initialData?.first_name || '',
    lastName: initialData?.last_name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    dateOfBirth: initialData?.date_of_birth || '',
    insuranceProvider: initialData?.insurance_provider || '',
    insuranceMemberId: initialData?.insurance_member_id || '',
    insuranceGroupNumber: initialData?.insurance_group_number || '',
    copayAmount: initialData?.copay_amount || '',
    sessionRate: initialData?.session_rate || '',
    intakeDate: initialData?.intake_date || '',
    notes: initialData?.notes || '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError('You must be logged in');
        setLoading(false);
        return;
      }

      // Validate required fields
      if (!formData.firstName || !formData.lastName) {
        setError('First name and last name are required');
        setLoading(false);
        return;
      }

      const patientPayload = {
        therapist_id: user.id,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email || null,
        phone: formData.phone || null,
        date_of_birth: formData.dateOfBirth || null,
        insurance_provider: formData.insuranceProvider || null,
        insurance_member_id: formData.insuranceMemberId || null,
        insurance_group_number: formData.insuranceGroupNumber || null,
        copay_amount: formData.copayAmount ? parseFloat(String(formData.copayAmount)) : null,
        session_rate: formData.sessionRate ? parseFloat(String(formData.sessionRate)) : null,
        intake_date: formData.intakeDate || null,
        status: 'active',
        notes: formData.notes || null,
      };

      let result;

      if (patientId) {
        // Update existing patient
        result = await supabase
          .from('patients')
          .update(patientPayload)
          .eq('id', patientId)
          .select()
          .single();
      } else {
        // Create new patient
        result = await supabase
          .from('patients')
          .insert([patientPayload])
          .select()
          .single();
      }

      if (result.error) {
        setError(result.error.message || 'Failed to save patient');
        return;
      }

      // Success
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error('Error saving patient:', err);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg shadow p-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
          <AlertCircle className="text-red-600 mr-3 flex-shrink-0 mt-0.5" size={18} />
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      {/* Personal Information */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Intake Date</label>
            <input
              type="date"
              name="intakeDate"
              value={formData.intakeDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Insurance Information */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Insurance Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Insurance Provider</label>
            <input
              type="text"
              name="insuranceProvider"
              value={formData.insuranceProvider}
              onChange={handleChange}
              placeholder="e.g., Blue Cross Blue Shield"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Member ID</label>
            <input
              type="text"
              name="insuranceMemberId"
              value={formData.insuranceMemberId}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Group Number</label>
            <input
              type="text"
              name="insuranceGroupNumber"
              value={formData.insuranceGroupNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Copay Amount ($)</label>
            <input
              type="number"
              name="copayAmount"
              value={formData.copayAmount}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Billing Information */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Session Rate ($)
            </label>
            <input
              type="number"
              name="sessionRate"
              value={formData.sessionRate}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Notes */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Notes</h3>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Any additional notes about this patient..."
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition"
        >
          {loading ? 'Saving...' : patientId ? 'Update Patient' : 'Create Patient'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
