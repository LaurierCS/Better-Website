/**
 * TeamCard Component
 * Displays a team member's profile with photo, name, and optional social links
 * Styled with dark theme and accent color hover effects
 */

interface TeamMember {
  id: string;
  name: string;
  picture: string;
  role?: string;
  links?: {
    github?: string;
    linkedin?: string;
  };
}

interface TeamCardProps {
  member: TeamMember;
}

// SVG Icons to avoid deprecated lucide imports
const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c2.6-.4 5.6-1.3 5.6-6a4.7 4.7 0 0 0-1.3-3.3 4.4 4.4 0 0 0-.1-3.3s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.4 4.4 0 0 0-.1 3.3A4.7 4.7 0 0 0 4 9.5c0 4.6 3 5.6 5.6 6a4.8 4.8 0 0 0-1 3.5v4" />
    <path d="M9 18c-4.51 2-5-2.5-7-2.5" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export function TeamCard({ member }: TeamCardProps) {
  // Assign accent colors based on member id for consistency
  const accentColorMap = [
    { border: '#FF9FC4', shadow: 'rgba(255,159,196,0.3)' },    // Pink
    { border: '#FF9770', shadow: 'rgba(255,151,112,0.3)' },    // Orange
    { border: '#FFD670', shadow: 'rgba(255,214,112,0.3)' },    // Yellow
    { border: '#268AF9', shadow: 'rgba(38,138,249,0.3)' },     // Blue
  ];
  
  // Use member id to consistently assign the same color
  const colorIndex = member.id.charCodeAt(0) % accentColorMap.length;
  const accentColor = accentColorMap[colorIndex];

  return (
    <div className="group relative flex items-center gap-8 py-6 px-8 transition-all duration-300 cursor-pointer hover:scale-105">
      {/* Image Container - Circular with colored border */}
      <div 
        className="relative w-32 h-32 shrink-0 rounded-full overflow-hidden border-4 group-hover:scale-110 transition-transform duration-300"
        style={{ borderColor: accentColor.border }}
      >
        {member.picture ? (
          <img
            src={member.picture}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        ) : (
          // Placeholder for missing image
          <div className="w-full h-full flex items-center justify-center bg-[#2C3844]">
            <div className="text-center text-gray-400">
              <div className="text-4xl">👤</div>
            </div>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        {/* Member Name */}
        <h3 className="font-dosis font-bold text-white text-lg group-hover:text-[#FFD670] transition-colors duration-200 whitespace-nowrap">
          {member.name}
        </h3>
        
        {/* Member Role */}
        {member.role && (
          <p className="font-montserrat font-thin text-gray-400 text-sm whitespace-nowrap">
            {member.role}
          </p>
        )}

        {/* Social Links Container */}
        <div className="flex gap-2 mt-1">
          {/* GitHub Link */}
          <a
            href={member.links?.github || '#'}
            className={`p-1 rounded transition-all duration-200 ${
              member.links?.github
                ? 'text-white hover:text-[#FF9FC4]'
                : 'text-gray-600 opacity-40 cursor-not-allowed'
            }`}
            title={member.links?.github ? 'GitHub' : 'GitHub - Not Added'}
            onClick={(e) => {
              if (!member.links?.github) e.preventDefault();
            }}
          >
            <GitHubIcon />
          </a>

          {/* LinkedIn Link */}
          <a
            href={member.links?.linkedin || '#'}
            className={`p-1 rounded transition-all duration-200 ${
              member.links?.linkedin
                ? 'text-white hover:text-[#268AF9]'
                : 'text-gray-600 opacity-40 cursor-not-allowed'
            }`}
            title={member.links?.linkedin ? 'LinkedIn' : 'LinkedIn - Not Added'}
            onClick={(e) => {
              if (!member.links?.linkedin) e.preventDefault();
            }}
          >
            <LinkedInIcon />
          </a>
        </div>
      </div>
    </div>
  );
}
