import TeamSection from '@/components/TeamSection';

const teamMembers = [
  {
    id: 1,
    name: 'Elvis Karani',
    title: 'CEO',
    description: 'Promoted to CEO in 2025 and charged with driving our next phase of growth.',
    image: '/images/john-veichmanis.jpg',
  },
  {
    id: 2,
    name: 'Michael Njuguna',
    title: 'Co-Founder & Chief Technology Officer',
    description: 'Working alongside Leo, Michael is the head of technology. Co-Founder Michael now leads our ever-expanding team of engineers.',
    image: '/images/david-santoro.jpg',
  },
  {
    id: 3,
    name: 'Levi Kigunda',
    title: 'Co-founder &Chief Content Officer',
    description: 'Leading Carsawa\'s highly respected and influential editorial team, Mat is best known as the face of the Carwow YouTube channel, which he\'s grown into the world\'s largest automotive channel.',
    image: '/images/mat-watson.jpg',
  },
  {
    id: 4,
    name: 'Leo Muguchia',
    title: 'Co-Founder & Chief Technology Officer',
    description: 'Working alongside the whole team, Leo is the head engineer. Co-Founder Leo now leads our ever-expanding team of engineers.',
    image: '/images/james-hind.jpg',
  },
];

export default function AboutPage() {
  return (
    <div className="w-full bg-[#DEDCD9] ">
      <TeamSection teamMembers={teamMembers} />
    </div>
  );
}