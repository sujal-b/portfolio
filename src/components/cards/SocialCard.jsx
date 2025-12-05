import React from 'react';
import { Mail, Phone, ExternalLink } from 'lucide-react';

const SocialCard = ({ item, isExpanded }) => {
    return (
        <div className="flex flex-col h-full justify-center items-center bg-neo-black text-white p-2">
            <h3 className="text-2xl font-bold font-mono mb-4 text-neo-accent">Let's Connect</h3>

            <div className="flex flex-col gap-2 w-full">
                <a href={`mailto:${item.links.email}`} className="flex items-center gap-3 p-2 border border-white hover:bg-white hover:text-black transition-colors">
                    <Mail size={16} />
                    <span className="font-mono text-sm">{item.links.email}</span>
                </a>

                <a href="https://linkedin.com/in/sujal-barwad-407444271" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-2 border border-white hover:bg-white hover:text-black transition-colors">
                    <ExternalLink size={16} />
                    <span className="font-mono text-sm">LinkedIn</span>
                </a>
            </div>
        </div>
    );
};

export default SocialCard;
