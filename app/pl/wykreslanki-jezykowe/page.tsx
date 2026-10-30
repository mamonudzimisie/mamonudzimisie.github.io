import LandingPage, { landingMetadata } from '@/components/LandingPage';
import { getLanding } from '@/data/landings';

const landing = getLanding('pl', 'wykreslanki-jezykowe');

export const metadata = landingMetadata(landing);

export default function Page() {
  return <LandingPage landing={landing} />;
}
