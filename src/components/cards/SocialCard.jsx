import React from 'react';
import { Mail, Phone, ExternalLink } from 'lucide-react';

const SocialCard = ({ item, isExpanded }) => {
    return (
        <div className="flex flex-col h-full justify-center items-center p-2">
            <h3 className="text-2xl font-bold font-mono mb-4 text-neon-green">Let's Connect</h3>

            <div className="flex flex-col gap-2 w-full">
                <a href={`mailto:${item.links.email}`} className="flex items-center gap-3 p-2 border border-white/20 hover:border-neon-green hover:bg-neon-green/10 hover:text-white transition-all duration-300 rounded-lg group">
                    <Mail size={16} className="text-neon-green group-hover:text-white transition-colors" />
                    <span className="font-mono text-sm">{item.links.email}</span>
                </a>

                <a href="https://linkedin.com/in/sujal-barwad-407444271" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-2 border border-white/20 hover:border-neon-green hover:bg-neon-green/10 hover:text-white transition-all duration-300 rounded-lg group">
                    <ExternalLink size={16} className="text-neon-green group-hover:text-white transition-colors" />
                    <span className="font-mono text-sm">LinkedIn</span>
                </a>
            </div>
        </div>
    );
};

export default SocialCard;
