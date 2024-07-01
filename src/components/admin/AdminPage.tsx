"use client";

import { useEffect, useState } from "react";
import { Event } from '@/types/Event';
import * as api from '@/api/admin';
import { EventItem, EventItemNotFound, EventItemPlaceholder } from "./events/EventItem";
import { ItemButton } from "./ItemButton";
import { FaPlus } from "react-icons/fa";
import { ModalScreen } from "@/types/ModalScreen";
import { Modal } from "./Modal";
import { EventAdd } from "./events/EventAdd";
import { EventEdit } from "./events/EventEdit";

export const AdminPage = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalScreen, setModalScreen] = useState<ModalScreen>(null);
    const [selectedEvent, setSelectedEvent] = useState<Event>();

    const loadEvents = async () => {
        setModalScreen(null);
        setLoading(true);
        try {
            const eventList = await api.getEvents();
            setEvents(Array.isArray(eventList) ? eventList : []);
        } catch (error) {
            console.error("Failed to load events:", error);
            setEvents([]);
        } finally {
            setLoading(false);
        }
    }

    const editEvent = (event: Event) => {
        setSelectedEvent(event);
        setModalScreen('edit');
    }

    useEffect(() => {
        loadEvents();
    }, []);

    return (
        <div>
            <div className="p-3 flex items-center">
                <h1 className="text-2xl flex-1">Events:</h1>
                <ItemButton 
                    IconElement={FaPlus}
                    onClick={() => { setModalScreen('add') }}
                />
            </div>
            <div className="my-3">
                {!loading && events.length > 0 && events.map(item => (
                    <EventItem 
                        key={item.id}
                        item={item}
                        refreshAction={loadEvents}
                        openModal={event => editEvent(event)}
                    />
                ))}
                {!loading && events.length === 0 && <EventItemNotFound />}
                {loading && 
                    <>
                        <EventItemPlaceholder />
                        <EventItemPlaceholder />
                        <EventItemPlaceholder />
                    </>
                }
            </div>
            {modalScreen &&
                <Modal onClose={() => setModalScreen(null)}>
                    {modalScreen === 'add' && <EventAdd refreshAction={loadEvents} />}
                    {modalScreen === 'edit' && <EventEdit event={selectedEvent} refreshAction={loadEvents} />}
                </Modal>
            }
        </div>
    )
}
