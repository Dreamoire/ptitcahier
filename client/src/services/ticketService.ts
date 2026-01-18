import type { Ticket } from "../types/ticket";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchTickets(): Promise<Ticket[]> {
  const response = await fetch(`${API_BASE_URL}/api/tickets`);

  if (!response.ok) {
    throw new Error(`Failed to fetch tickets: ${response.status}`);
  }

  return response.json() as Promise<Ticket[]>;
}
