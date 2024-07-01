import { Event } from "@/types/Event";
import { ItemButton } from "../ItemButton";
import { FaLink, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import * as api from '@/api/admin';

type Props = {
    item: Event;
    refreshAction: () => void;
    openModal: (event: Event) => void; 
}
export const EventItem = ({ item, refreshAction, openModal }:Props) => {
    
    const handleEditButton = () => openModal(item)
    
    const handleDeleteButton = async () => {
        if(confirm('Are you sure you want to delete this event?')){
            await api.deleteEvent(item.id);
            refreshAction();
        }
    }

    return(
        <div className="border border-gray-700 rounded p-3 mb-3 flex flex-col items-center md:flex-row">
            <div className="flex-1 text-xl mb-3 md:mb-0 md:text-base">{item.title}</div>
            <div className="flex item-center gap-2 mt-2 md:mt-0">
            {item.status && 
                <div className="border border-dashed border-white rounded">
                    <ItemButton 
                    IconElement={FaLink}   
                    label="Event Link"
                    href={`/event/${item.id}`}
                    target="_blank"
                    />
                </div>
            }
            <ItemButton 
                    IconElement={FaRegEdit}
                    label="Edit"
                    onClick={handleEditButton}
                />
                <ItemButton 
                    IconElement={FaRegTrashAlt}
                    label="Delete"
                    onClick={handleDeleteButton}
                />
            </div>
        </div>
    )
}

export const EventItemPlaceholder = () => {
    return(
        <div className="w-full h-16 border border-gray-700 rounded mb-3
         bg-gradient-to-r from-gray-900 to-gray-950
         animate-pulse">
        </div>
    )
}

export const EventItemNotFound = () => {
    return(
        <div className="text-center py-3 text-gray-500">Não há eventos cadastrados</div>
    )
}