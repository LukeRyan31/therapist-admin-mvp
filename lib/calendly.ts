// lib/calendly.ts - Calendly API integration

import axios from "axios";

const CALENDLY_API_BASE = "https://api.calendly.com";

export class CalendlyClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private getHeaders() {
    return {
      Authorization: `Bearer ${this.apiKey}`,
      "Content-Type": "application/json",
    };
  }

  // Get current user's Calendly profile
  async getCurrentUser() {
    try {
      const response = await axios.get(
        `${CALENDLY_API_BASE}/users/me`,
        {
          headers: this.getHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching Calendly user:", error);
      throw error;
    }
  }

  // Get all calendar events within a date range
  async getEvents(input: {
    startDate: string; // ISO 8601
    endDate: string; // ISO 8601
    status?: "active" | "canceled";
  }) {
    try {
      const user = await this.getCurrentUser();
      const userUri = user.resource.uri;

      const params = new URLSearchParams({
        user: userUri,
        min_start_time: input.startDate,
        max_start_time: input.endDate,
        ...(input.status && { status: input.status }),
      });

      const response = await axios.get(
        `${CALENDLY_API_BASE}/scheduled_events?${params}`,
        {
          headers: this.getHeaders(),
        }
      );

      return response.data.collection.map((event: any) => ({
        id: event.uri.split("/").pop(),
        uri: event.uri,
        name: event.name,
        status: event.status,
        startTime: event.start_time,
        endTime: event.end_time,
        eventType: event.event_type,
        inviteesCounterOffer: event.invitees_counter_offer,
        createdAt: event.created_at,
        updatedAt: event.updated_at,
        canceledAt: event.canceled_at,
      }));
    } catch (error) {
      console.error("Error fetching Calendly events:", error);
      throw error;
    }
  }

  // Get specific event details
  async getEvent(eventId: string) {
    try {
      const response = await axios.get(
        `${CALENDLY_API_BASE}/scheduled_events/${eventId}`,
        {
          headers: this.getHeaders(),
        }
      );

      const event = response.data.resource;
      return {
        id: event.uri.split("/").pop(),
        name: event.name,
        status: event.status,
        startTime: event.start_time,
        endTime: event.end_time,
        eventType: event.event_type,
        invitees: event.invitees || [],
      };
    } catch (error) {
      console.error("Error fetching Calendly event:", error);
      throw error;
    }
  }

  // Get invitees for an event (to extract patient info)
  async getEventInvitees(eventId: string) {
    try {
      const response = await axios.get(
        `${CALENDLY_API_BASE}/scheduled_events/${eventId}/invitees`,
        {
          headers: this.getHeaders(),
        }
      );

      return response.data.collection.map((invitee: any) => ({
        id: invitee.uri.split("/").pop(),
        name: invitee.name,
        email: invitee.email,
        status: invitee.status,
        canceledAt: invitee.canceled_at,
        createdAt: invitee.created_at,
      }));
    } catch (error) {
      console.error("Error fetching invitees:", error);
      throw error;
    }
  }

  // List all event types (therapy types/session types)
  async getEventTypes() {
    try {
      const user = await this.getCurrentUser();
      const userUri = user.resource.uri;

      const response = await axios.get(
        `${CALENDLY_API_BASE}/event_types?user=${userUri}`,
        {
          headers: this.getHeaders(),
        }
      );

      return response.data.collection.map((type: any) => ({
        id: type.uri.split("/").pop(),
        name: type.name,
        description: type.description,
        duration: type.duration, // in minutes
        color: type.color,
        active: type.active,
      }));
    } catch (error) {
      console.error("Error fetching event types:", error);
      throw error;
    }
  }

  // Sync appointments to database
  async syncAppointments(
    therapistId: string,
    startDate: string,
    endDate: string
  ) {
    try {
      const events = await this.getEvents({
        startDate,
        endDate,
        status: "active",
      });

      const appointments = [];

      for (const event of events) {
        const invitees = await this.getEventInvitees(event.id);
        const patientInfo = invitees[0]; // First invitee is typically the patient

        appointments.push({
          therapistId,
          calendlyEventId: event.id,
          title: event.name,
          startTime: event.startTime,
          endTime: event.endTime,
          patientName: patientInfo?.name || "Unknown",
          patientEmail: patientInfo?.email || "",
          status: "scheduled",
        });
      }

      return appointments;
    } catch (error) {
      console.error("Error syncing appointments:", error);
      throw error;
    }
  }
}

// Factory function to create Calendly client
export function createCalendlyClient(apiKey: string) {
  return new CalendlyClient(apiKey);
}
