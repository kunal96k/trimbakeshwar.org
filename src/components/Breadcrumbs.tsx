import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { AppRoute } from '../types';

export interface BreadcrumbItem {
  label: string;
  route?: AppRoute;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const { navigate } = useNavigation();

  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-stone-300 font-medium">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-1 hover:text-amber-300 transition-colors cursor-pointer"
        title="Go to Home"
      >
        <Home className="w-3.5 h-3.5" />
        <span className="uppercase tracking-wider">Home</span>
      </button>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3 h-3 text-stone-400/70 shrink-0" />
            {isLast || !item.route ? (
              <span className="text-amber-200/90 font-semibold truncate max-w-[200px] sm:max-w-none">
                {item.label}
              </span>
            ) : (
              <button
                onClick={() => item.route && navigate(item.route)}
                className="hover:text-amber-300 transition-colors uppercase tracking-wider cursor-pointer truncate max-w-[150px] sm:max-w-none"
              >
                {item.label}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
