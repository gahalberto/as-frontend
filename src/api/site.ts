import { Event } from "@/types/Event";
import { req } from "./axios";
import { SearchResult } from "@/types/SearchResult";


export const getEvent = async (id: number): Promise<Event | false> => {
    try {
        const json = await req.get(`events/${id}`);
        console.log(`Fetched event: ${JSON.stringify(json.data)}`);
        return json.data.event as Event ?? false;
    } catch (error) {
        console.error(`Error fetching event with ID ${id}:`, error);
        return false;
    }
};


export const searchCPF = async (eventId: number, cpf: string): Promise<SearchResult | undefined> => {
    try {
        const json = await req.get(`/events/${eventId}/search?cpf=${cpf}`);
        if (json.data.person && json.data.personMatched) {
            return json.data as SearchResult;
        }
    } catch (error) {
        console.error(`Error fetching event with ID ${eventId}:`, error);
    }
}
