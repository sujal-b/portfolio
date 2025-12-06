import React from 'react';

const WidgetCard = ({ item, isExpanded }) => {
    // Widget display logic
    if (item.id === "widget-german") {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="text-4xl mb-2">{item.icon}</div>
                <h3 className="font-bold font-mono text-white">{item.title}</h3>
                <p className="text-sm font-bold text-neon-green border border-neon-green/30 px-2 mt-1 rounded">{item.content}</p>
                <div className="text-xs mt-2 opacity-75">{item.status}</div>
            </div>
        )
    }

    if (item.id === "widget-hardware") {
        return (
            <div className="flex flex-col justify-between h-full">
                <h3 className="font-bold font-mono border-b-2 border-white/20 text-neon-green">{item.title}</h3>
                <div className="my-2">
                    <div className="text-2xl font-black">{item.content.split(' ').slice(0, 2).join(' ')}</div>
                    <div className="text-sm">{item.specs}</div>
                </div>
                {isExpanded && <p className="text-xs mt-2 bg-white/5 border border-white/10 text-gray-300 p-2 font-mono">{item.subtext}</p>}
            </div>
        )
    }

    return (
        <div>{item.title}</div>
    );
};

export default WidgetCard;
