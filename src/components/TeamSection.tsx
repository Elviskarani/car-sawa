import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Define types for team members
interface TeamMember {
  id: number;
  name: string;
  title: string;
  description: string;
  image: string;
}

// Define props for the component
interface TeamSectionProps {
  teamMembers: TeamMember[];
}

const navigationItems = [
  { label: 'Meet the Team', href: '/team' },
];

const TeamSection: React.FC<TeamSectionProps> = ({ teamMembers }) => {
  return (
    <div className="max-w-screen-xl bg-[#DEDCD9] mx-auto px-4 py-8">
      <h1 className="text-5xl font-bold mb-2">OUR TEAM</h1>
      
      {/* Navigation */}
      <div className="border-b border-gray-200 mb-5">
        <nav className="flex space-x-8">
          {navigationItems.map((item, index) => (
            <Link 
              key={index}
              href={item.href}
              className={`pb-4 px-1 ${item.label === 'Team' ? 'border-b-2 border-black font-medium' : 'text-gray-600 hover:text-black'}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      
      {/* Leadership Team Section */}
      <div>
        <h2 className="text-3xl font-bold mb-2">Leadership team</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <div key={member.id} className="flex flex-col">
              <div className="relative h-40  mb-4 overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-md"
                />
              </div>
              
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-lg mb-2">{member.title}</p>
              
              <p className="text-gray-700 mb-3 line-clamp-3">
                {member.description}
              </p>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamSection;