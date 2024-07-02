import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Comparison, Filter, TypeEnum} from '@/lib/types';
import {FilterRow} from '@/components/FilterRow';
import {getAllFilters} from '@/api/endpoints/filter';
import '../app/globals.css';
import {FilterModal} from '@/components/modal/Modal';
import {RefreshContext} from '@/context/RefreshContext';
import {ModalContents} from '@/components/modal/ModalContents';

export const FilterTable = () => {
  const [filters, setFilters] = useState<Filter[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<Filter | undefined>(undefined);
  const [newFilterInline, setNewFilterInline] = useState(false);
  const [showInline, setShowInline] = useState(false);  const { refresh } = useContext(RefreshContext);

  const fetchAllFilters = useCallback(async () => {
    await getAllFilters().then((data) => {setFilters(data)});
  }, []);

  useEffect(() => {
    console.log('Fetching filters...'); // Add this line
    fetchAllFilters();
  }, [fetchAllFilters, refresh]);

  useEffect(() => {
    setSelectedFilter(undefined);

    if (!showInline) {
      setNewFilterInline(false);
    }
  }, [showInline]);

  const newFilter: Filter = {
    filterName: '',
    criteria: [{
      type: TypeEnum.AMOUNT,
      comparison: Comparison.EQUAL,
      valueText: null,
      valueNumber: 0,
      valueDate: null
    }]
  };

  const handleOpenModal = (filter: Filter) => {
    if (filter === newFilter) {
      setNewFilterInline(true);
    } else {
      setNewFilterInline(false);
      setSelectedFilter(filter);
      if (showInline) {
        setIsModalOpen(false);
      } else {
        setIsModalOpen(true);
      }
    }
  }

  const handleAddNewFilter = () => {
    setSelectedFilter(undefined);
    setIsModalOpen(false);
    handleOpenModal(newFilter);  }

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedFilter(undefined)
    setNewFilterInline(false);
  }

  return (
    <>
      <div className={"filter_table"}>
        <button className={"button_new_filter"} onClick={handleAddNewFilter}>+ Add new filter</button>
        <div className={"filter_inline_checkbox"}>
          <input type="checkbox" checked={showInline} onChange={(e) => setShowInline(e.target.checked)}/>
          Show filters inline
        </div>
        {newFilterInline &&
            <ModalContents filter={newFilter} setIsModalOpen={setIsModalOpen} handleClose={handleClose} />}
        {filters && filters.map((filter) => (
          <div key={filter.filterId}>
            <FilterRow filter={filter} selectedFilter={selectedFilter} setSelectedFilter={handleOpenModal} showInLine={showInline}/>
            {showInline && selectedFilter === filter &&
                <ModalContents filter={filter} setIsModalOpen={setIsModalOpen} handleClose={handleClose} />}
          </div>
        ))}
      </div>
      {!showInline && selectedFilter && <FilterModal filter={selectedFilter} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />}
    </>
  )
}
