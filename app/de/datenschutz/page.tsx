import PrivacyPage, { privacyMetadata } from '@/components/PrivacyPage';

export const metadata = privacyMetadata('de');

export default function Page() {
  return <PrivacyPage lang="de" />;
}
