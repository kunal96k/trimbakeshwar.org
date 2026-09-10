import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import { PUJA_DETAILS_RECORD } from '../data/pujaDetailedData';
import { PujaDetailPageTemplate } from '../components/PujaDetailPageTemplate';
import { PujaDirectoryPage } from './PujaDirectoryPage';

interface PujaDetailPageProps {
  slug?: string;
}

export function PujaDetailPage({ slug }: PujaDetailPageProps) {
  const { currentRoute } = useNavigation();

  // Extract slug from currentRoute if not passed directly
  let targetSlug = slug;
  if (!targetSlug && currentRoute.startsWith('/puja/')) {
    targetSlug = currentRoute.replace('/puja/', '').trim();
  }

  // Handle fallback if not found
  const pujaData = targetSlug ? PUJA_DETAILS_RECORD[targetSlug] : null;

  if (!pujaData) {
    return <PujaDirectoryPage />;
  }

  return <PujaDetailPageTemplate {...pujaData} />;
}
