"use client";

import { useState } from "react";
import { Event as CustomEvent } from '@/types/Event';
import { EventTabInfo } from "./EventTabInfo";
import { EventTabGroup } from "../groups/EventTabGroup";
import { EventTabPeople } from "../people/EventTabPeople";

type Props = {
    event: CustomEvent | undefined;
    refreshAction: () => void;
}

type TabNames = 'info' | 'groups' | 'people';

export const EventEdit = ({ event, refreshAction }: Props) => {
    if (!event) return null;

    const [tab, setTab] = useState<TabNames>('info');

    return (
        <div>
            <div className="flex text-center border-b border-gray-500 cursor-pointer">
                <div onClick={() => setTab('info')} className={`flex 1 p-3 hover:bg-gray-700 ${tab === 'info' ? 'bg-gray-600' : ''}`}>Info</div>
                <div onClick={() => setTab('groups')} className={`flex 1 p-3 hover:bg-gray-700 ${tab === 'groups' ? 'bg-gray-600' : ''}`}>Groups</div>
                <div onClick={() => setTab('people')} className={`flex 1 p-3 hover:bg-gray-700 ${tab === 'people' ? 'bg-gray-600' : ''}`}>People</div>
            </div>
            <div>
                {tab === 'info' && <EventTabInfo event={event} refreshAction={refreshAction} />}
                {tab === 'groups' && <EventTabGroup eventId={event.id}/>}
                {tab === 'people' && <EventTabPeople eventId={event.id} />}
            </div>
        </div>
    )
}
