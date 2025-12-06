import React from 'react';

const ListCard = ({ item, isExpanded }) => {
    return (
        <div className="flex flex-col h-full w-full">
            <h3 className="text-lg font-bold font-mono mb-3 uppercase tracking-wider border-b-2 border-white/20 pb-1 text-neon-green">{item.title}</h3>

            <ul className={`space-y-2 ${isExpanded ? 'text-base' : 'text-sm'}`}>
                {item.items.slice(0, isExpanded ? undefined : 4).map((listItem, i) => (
                    <li key={i} className="flex items-start">
                        <span className="mr-2 text-neon-green font-mono">0{i + 1}</span>
                        <span className={isExpanded ? '' : 'line-clamp-1'}>{listItem}</span>
                    </li>
                ))}
                {!isExpanded && item.items.length > 4 && (
                    <li className="text-xs opacity-50 pl-6">+{item.items.length - 4} more...</li>
                )}
            </ul>
        </div>
    );
};

export default ListCard;
