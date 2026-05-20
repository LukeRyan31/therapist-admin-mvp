// components/features/patient-form.tsx
// Reusable patient form for creating and editing patients

"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Patient } from "@/lib/supabase";

interface PatientFormProps {
  patient?: Patient | null;
  therapistId: string;
  onSuccess?: (patient: Patient) => void;
  onCancel?: () => void;
}

export function PatientForm({
  patient,
  therapistId,
  onSuccess,
  onCancel,
}: PatientFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    first_name: patient?.first_name || "",
    last_name: patient?.last_name || "",
    email: patient?.email || "",
    phone: patient?.phone || "",
    date_of_birth: patient?.date_of_birth || "",
    insurance_provider: patient?.insurance_provider || "",
    insurance_member_id: patient?.insurance_member_id || "",
    insurance_group_number: patient?.insurance_group_number || "",
    copay_amount: patient?.copay_amount?.toString() || "",
    session_rate: patient?.session_rate?.toString() || "",
    intake_date: patient?.intake_date || new Date().toISOString().split("T")[0],
    notes: patient?.notes || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const dataToSubmit = {
        ...formData,
        therapist_id: therapistId,
        copay_amount: formData.copay_amount
          ? parseFloat(formData.copay_amount)
          : null,
        session_rate: formData.session_rate
          ? parseFloat(formData.session_rate)
          : null,
      };

      let response;
      if (patient?.id) {
        // Update existing patient
        response = await supabase
          .from("patients")
          .update(dataToSubmit)
          .eq("id", patient.id)
          .select()
          .single();
      } else {
        // Create new patient
        response = await supabase
          .from("patients")
          .insert(dataToSubmit)
          .select()
          .single();
      }

      if (response.error) throw response.error;

      if (onSuccess) {
        onSuccess(response.data as Patient);
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "An error occurred";
      setError(message);
      console.error("Error saving patient:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information Section */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Personal Information
          </h3>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="John"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="(555) 123-4567"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Intake Date
          </label>
          <input
            type="date"
            name="intake_date"
            value={formData.intake_date}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Insurance Information Section */}
        <div className="md:col-span-2 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Insurance Information
          </h3>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Insurance Provider
          </label>
          <input
            type="text"
            name="insurance_provider"
            value={formData.insurance_provider}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Aetna, Blue Cross, UnitedHealth, etc."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Member ID
          </label>
          <input
            type="text"
            name="insurance_member_id"
            value={formData.insurance_member_id}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="123456789"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Group Number
          </label>
          <input
            type="text"
            name="insurance_group_number"
            value={formData.insurance_group_number}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Copay Amount ($)
          </label>
          <input
            type="number"
            name="copay_amount"
            value={formData.copay_amount}
            onChange={handleChange}
            step="0.01"
            min="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="30.00"
          />
        </div>

        {/* Billing Information Section */}
        <div className="md:col-span-2 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Billing Information
          </h3>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Session Rate ($) *
          </label>
          <input
            type="number"
            name="session_rate"
            value={formData.session_rate}
            onChange={handleChange}
            required
            step="0.01"
            min="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="120.00"
          />
          <p className="text-sm text-gray-500 mt-1">
            Standard rate charged per session
          </p>
        </div>

        {/* Notes Section */}
        <div className="md:col-span-2 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Notes</h3>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Clinical Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Any additional notes about the patient..."
          />
        </div>

        {/* Action Buttons */}
        <div className="md:col-span-2 flex gap-4 mt-8">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition"
          >
            {loading
              ? "Saving..."
              : patient
                ? "Update Patient"
                : "Create Patient"}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-2 px-4 rounded-lg transition"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
