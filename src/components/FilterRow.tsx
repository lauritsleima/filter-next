import React from 'react';
import {Filter} from '@/lib/types';

type Props = {
  filter: Filter;
  selectedFilter: Filter | undefined;
  setSelectedFilter: (filter: Filter | undefined) => void;
  showInLine: boolean;
}

export const FilterRow: React.FC<Props> = ({filter, selectedFilter, setSelectedFilter, showInLine}) => {
  const handleOpenModal = () => {
    if (showInLine && selectedFilter === filter) {
      setSelectedFilter(undefined);
    } else {
      setSelectedFilter(filter);
    }
  }

  return (
    <div onClick={handleOpenModal} className={'filter_row'}>{filter.filterName}</div>
  );
}
